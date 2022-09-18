import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { StudentDialogComponent } from '../dialog/student-dialog/student-dialog.component';
import { Student } from '../model/student.model';
import { StudentService } from '../service/student.service';
import { DatePipe } from '@angular/common';
import { Status } from 'src/app/model/status.model';
import { Departman } from '../model/departman.model';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  displayedColumns = ['id', 'ime', 'prezime', 'brojIn', 'status', 'departman', 'actions'];

  Status!: Status;
  Departman!: Departman;
  //dataSource!: Observable<Student[]>;
  dataSource!: MatTableDataSource<Student>;
  selektovanStudent!: Student;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  @Input()
  selektovanDepartman!: Departman;

  constructor(public studentService: StudentService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(): void {
    if (this.selektovanDepartman.id) {
      this.loadData();
    }
  }

  public loadData(){
    //this.dataSource = this.studentService.getAllStudent();
    this.studentService.getAllStudentsDepartman(this.selektovanDepartman.id).subscribe( data => {
      this.dataSource = new MatTableDataSource(data);

      // pretraga po nazivu stranog kljuca
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'departman' ? currentTerm + data.departman.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) =>{
        switch(property){
          case 'id': return data[property];
          case 'ime': return data[property];
          case 'prezime': return data[property];
          case 'brojIn': return data[property];
          case 'status': return data.Status.naziv;
          case 'departman': return data.departman.naziv;
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

  public openDialog(flag: number, id: number, ime: string, prezime: string, brojIn: number, status: Status, departman: Departman) {
    const dialog = this.dialog.open(StudentDialogComponent, {data: {id: id, ime: ime, prezime: prezime, brojIn: brojIn, status: status, departman: departman}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  public selectedRow(row: Student): void {
    this.selektovanStudent = row;

  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


}
