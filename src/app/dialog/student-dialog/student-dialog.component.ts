import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/model/status.model';
import { Student } from 'src/app/model/student.model';
import { StatusService } from 'src/app/service/status.service';
import { StudentService } from 'src/app/service/student.service';
import { Departman } from 'src/app/model/departman.model';
import { DepartmanService } from 'src/app/service/departman.service';



@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {

  public flag!: number;

  statusi!: Status[];
  departmani!: Departman[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Student,
    public studentService: StudentService,
    public statusService: StatusService,
    public departmanService: DepartmanService ) { }

  ngOnInit(): void {
      this.statusService.getAllStatus().subscribe(statusi =>
      this.statusi = statusi)
      this.departmanService.getAllDepartman ().subscribe(departmani =>
        this.departmani = departmani)
  }

  public add(): void {
    this.studentService.addStudent(this.data);
    this.snackBar.open('Uspešno dodat student ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.studentService.updateStudent(this.data);
    this.snackBar.open('Uspešno izmenjen student ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.studentService.deleteStudent(this.data.id);
    this.snackBar.open('Uspešno obrisan student ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

  compareTo(a: any, b: any) {
    return a.id === b.id;
  }

}
