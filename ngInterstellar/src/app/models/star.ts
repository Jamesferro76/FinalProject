import { Profile } from "./profile";

export class Star {
  matcher: Profile;
  matched: Profile;
  matchOn: string;
  blocked: boolean;
  blockedBy: Profile|null;
  blockedDate: string;
  blockedReason: string;

  constructor(
  matcher: Profile= new Profile,
  matched: Profile= new Profile,
  matchOn: string="",
  blocked: boolean=false,
  blockedBy: Profile|null= null,
  blockedDate: string="",
  blockedReason: string=""
  ){
  this.matcher=matcher;
  this.matched=matched;
  this.matchOn=matchOn;
  this.blocked=blocked;
  this.blockedBy=blockedBy;
  this.blockedDate=blockedDate;
  this.blockedReason=blockedReason;
  }
}
