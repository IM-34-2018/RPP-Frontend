import { Status } from 'src/app/model/status.model';
import { Departman } from 'src/app/model/departman.model';

export class Student {
  id!: number;
  ime!: string;
  prezime!: string;
  brojIn!: string;
  status!: Status;
  departman!: Departman;
}
