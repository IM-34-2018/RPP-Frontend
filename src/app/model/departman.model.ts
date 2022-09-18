import { Fakultet } from "./fakultet.model";

export class Departman {
  id!: number;
  naziv!: string;
  oznaka!: string;
  fakultet!: Fakultet;
}
