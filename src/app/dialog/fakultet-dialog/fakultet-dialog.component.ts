import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fakultet } from 'src/app/model/fakultet.model';
import { FakultetService } from 'src/app/service/fakultet.service';


@Component({
  selector: 'app-fakultet-dialog',
  templateUrl: './fakultet-dialog.component.html',
  styleUrls: ['./fakultet-dialog.component.css']
})
export class FakultetDialogComponent implements OnInit {

  public flag!: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FakultetDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Fakultet,
    public fakultetService: FakultetService ) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.fakultetService.addFakultet(this.data);
    this.snackBar.open('Uspešno dodat fakultet ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.fakultetService.updateFakultet(this.data);
    this.snackBar.open('Uspešno izmenjen fakultet ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.fakultetService.deleteFakultet(this.data.id);
    this.snackBar.open('Uspešno obrisan fakultet ' + this.data.id, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});
  }

}
