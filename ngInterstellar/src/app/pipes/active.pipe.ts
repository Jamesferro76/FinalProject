import { Pipe, PipeTransform } from '@angular/core';
import { Profile } from '../models/profile';

@Pipe({
  name: 'active'
})
export class ActivePipe implements PipeTransform {

  transform(profiles: Profile[], showInactive: boolean=false, ...args: unknown[]): Profile[] {
   if(showInactive){
    return profiles;
   }

   const result:Profile[]=[];
   for(const profile of profiles){
    if(profile.active){
      result.push(profile);
    }
   }
    return result;
  }



}
