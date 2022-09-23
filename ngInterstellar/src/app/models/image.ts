import { Profile } from "./profile";

export class Image {
  id: number;
  imageUrl:string;
  profile:Profile;

  constructor(
    id: number=0,
  imageUrl:string="",
  profile:Profile=new Profile()
  ){
    this.id=id;
    this.imageUrl=imageUrl;
    this.profile=profile;
  }
}
