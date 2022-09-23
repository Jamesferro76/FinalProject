import { Profile } from "./profile";

export class Preference {
  id:number;
  name:string;
  profile: Profile;

  constructor(
    id:number=0,
    name:string="",
    profile:Profile=new Profile
  ){
  this.id=id;
  this.name=name;
  this.profile=profile;
  }
}
