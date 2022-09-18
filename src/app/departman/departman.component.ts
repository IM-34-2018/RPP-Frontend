import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmanDialogComponent } from '../dialog/departman-dialog/departman-dialog.component';
import { Departman } from '../model/departman.model';
import { DepartmanService } from '../service/departman.service';
import { Fakultet } from '../model/fakultet.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-departman',
  templateUrl: './departman.component.html',
  styleUrls: ['./departman.component.css']
})
export class DepartmanComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'oznaka','fakultet', 'actions'];

  Fakultet!: Fakultet;

  //dataSource!: Observable<Departman[]>;
  dataSource!: MatTableDataSource<Departman>; //iyvor podataka ya nasu tabelu

  selektovanDepartman!: Departman;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public departmanService: DepartmanService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.departmanService.getAllDepartman();
    this.departmanService.getAllDepartman().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);

      // pretraga po nazivu stranog kljuca
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'fakultet' ? currentTerm + data.fakultet.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      //sortiranje po nazivu ugnježdenog objekta
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'id': return data[property];

          default: return data.naziv.toLocaleLowerCase();
      }
    };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

  public openDialog(flag: number, id: number, naziv: string, oznaka: string, fakultet: Fakultet) {
    const dialog = this.dialog.open(DepartmanDialogComponent, {data: {id: id, naziv: naziv, oznaka: oznaka, fakultet: fakultet}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  public selectedRow(row: Departman): void {
    this.selektovanDepartman = row;

  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


}
