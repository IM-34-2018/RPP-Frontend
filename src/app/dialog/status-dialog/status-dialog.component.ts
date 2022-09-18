import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/model/status.model';
import { StatusService } from 'src/app/service/status.service';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {

  public flag!: number; //u odnosu na njega prikazujemo polja // u html-u imamo flag 1 2 3

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StatusDialogComponent>, //na koju komponentu dijaloga se odnosi
    @Inject(MAT_DIALOG_DATA)//komunikacija izmedju kompoenente i dialoga
    public data: Status, //tip status
    public statusService: StatusService ) { } //treba nam da saljemo zahtev npr. prilikom edit-a - saljemo zahtev servisu a servis SB-u 

  ngOnInit(): void {
  }

  public add(): void {        //definisanje metoda
    this.statusService.addStatus(this.data);
    this.snackBar.open('Uspešno dodat status ' + this.data.naziv, 'U redu', {duration: 2000}); //otvara poruku //vreme kolko ce da stoji otvoren
  }

  public update(): void {
    this.statusService.updateStatus(this.data);
    this.snackBar.open('Uspešno izmenjen status ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.statusService.deleteStatus(this.data.id);
    this.snackBar.open('Uspešno obrisan status ' + this.data.id, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});
  }

}
