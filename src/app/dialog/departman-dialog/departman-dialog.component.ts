import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fakultet } from 'src/app/model/fakultet.model';
import { Departman } from 'src/app/model/departman.model';
import { FakultetService } from 'src/app/service/fakultet.service';
import { DepartmanService } from 'src/app/service/departman.service';



@Component({
  selector: 'app-departman-dialog',
  templateUrl: './departman-dialog.component.html',
  styleUrls: ['./departman-dialog.component.css']
})
export class DepartmanDialogComponent implements OnInit {

  public flag!: number;

  fakulteta!: Fakultet[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DepartmanDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Departman,
    public departmanService: DepartmanService,
    public fakultetService: FakultetService ) { }

  ngOnInit(): void {
      this.fakultetService.getAllFakultet().subscribe(fakulteta =>
      this.fakulteta = fakulteta)
  }

  public add(): void {
    this.departmanService.addDepartman(this.data);
    this.snackBar.open('Uspešno dodat departman ' + this.data.id, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.departmanService.updateDepartman(this.data);
    this.snackBar.open('Uspešno izmenjen departman ' + this.data.id, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.departmanService.deleteDepartman(this.data.id);
    this.snackBar.open('Uspešno obrisan departman ' + this.data.id, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});
  }

  compareTo(a: any, b: any) { //poredi id-eve predizeca i ako nisu razliciti, treba da ostanu isti podaci -- ovo nam sluzi za kad korisnik hoce da doda novo fakultet za departman da mu izadju ponudjena
    return a.id === b.id;
  }

}
