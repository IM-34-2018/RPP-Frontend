import { StatusService } from './service/status.service';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { StatusComponent } from './status/status.component';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { AuthorComponent } from './core/author/author.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FakultetService } from './service/fakultet.service';

import { DepartmanService } from './service/departman.service';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StudentService } from './service/student.service';
import { DepartmanComponent } from './departman/departman.component';
import { StatusDialogComponent } from './dialog/status-dialog/status-dialog.component';
import { StudentComponent } from './student/student.component';
import { FakultetComponent } from './fakultet/fakultet.component';
import { FakultetDialogComponent } from './dialog/fakultet-dialog/fakultet-dialog.component';
import { DepartmanDialogComponent } from './dialog/departman-dialog/departman-dialog.component';
import { StudentDialogComponent } from './dialog/student-dialog/student-dialog.component';

//RUTIRANJE se vrsi u odvojenom modulu (app-routing module ts) a mi taj modul importujemo ovde
const Routes = [ //rute na koje vodi URL zahtev sa web-a npr. lh4200/status na status // ovde definisemo sve rute na nivaou nase klase
  { path: 'status', component: StatusComponent},
  { path: 'fakultet', component: FakultetComponent },
  { path: 'departman', component: DepartmanComponent },
  { path: 'student', component: StudentComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'author', component: AuthorComponent },
  { path: '',   redirectTo: '/home', pathMatch: "full" }, //ako je prazna putanja stavljamo da vodi na home, full sprecava beskonacno trazenje prazne putanje
 ];

@NgModule({
  declarations: [ //niz svih komponenti koje ce biti definisane na nivou angular aplikacije
    AppComponent,
    StatusComponent,
    FakultetComponent,
    DepartmanComponent,
    StudentComponent,
    HomeComponent,
    AboutComponent,
    AuthorComponent,
    StatusDialogComponent,
    FakultetDialogComponent,
    DepartmanDialogComponent,
    StudentDialogComponent
  ],
  imports: [ //ovde importujemo rout modul //svako modul koji ovde bude definisan, mocice da se koristi bilo gde u nasoj aplikaciji
    BrowserModule,
    MatSidenavModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [StatusService, FakultetService, DepartmanService, StudentService], //ovo se tice dependency injection -- ovde mozemo da definisemo tokene za svaku klasu koju zelimo da imamo u providers nizu i da istu instancu injektujemo u bilo koju klasu koju zelimo -- mi koristimo samo servisne klase pa nam ovo ne treba
                                                                  //da bi radio injectable iz servisnih komponenti 
  bootstrap: [AppComponent] //definisemo koje to sve komponente bootstrapuju(ucitavaju) kada se ucita nas modul
})
export class AppModule { }
