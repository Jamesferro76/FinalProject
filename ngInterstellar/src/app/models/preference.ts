import { Profile } from "./profile";

export class Preference {
  id:number;
  name:string;

  constructor(
    id:number=0,
    name:string="",
  ){
  this.id=id;
  this.name=name;
  }
}
