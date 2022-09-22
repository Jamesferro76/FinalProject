export class Profile {

    id: number;
    birthday: string;
    sex: string;
    firstName: string;
    lastName: string;
    user?: User;
    address?: Address;
    profilePic: string;
    active: boolean;
    updatedOn: string;
    preferences?: Preference[];
    images?: Image[];
    mixers?: Mixer[];
    mixersAttending?: Mixer[];
    messagesSent?:Message[];
    messagesRecieved?:Message[];
    matchers?:Star[];
    matcheds?:Star[];
    blocked?:Star[];
    favorited?:Profile[];
    favoriter?:Profile[];
    categories?:Category[];
    profileAnswers?:ProfileAnswer[];

    constructor(
      id: number=0,
      birthday: string="",
      sex: string="",
      firstName: string="",
      lastName: string="",
      user?: User,
      address?: Address,
      profilePic: string="",
      active: boolean=true,
      updatedOn: string="",
      preferences?: Preference[]=[],
      images?: Image[]=[],
      mixers?: Mixer[]=[],
      mixersAttending?: Mixer[]=[],
      messagesSent?:Message[]=[],
      messagesRecieved?:Message[]=[],
      matchers?:Star[]=[],
      matcheds?:Star[]=[],
      blocked?:Star[]=[],
      favorited?:Profile[]=[],
      favoriter?:Profile[]=[],
      categories?:Category[]=[],
      profileAnswers?:ProfileAnswer[]=[]
    ){
      this.id=id;
      this.birthday=birthday;
      this.sex=sex;
      this.firstName=firstName;
      this.lastName=lastName;
      this.user=user;
      this.address=address;
      this.profilePic=profilePic;
      this.active=active;
      this.updatedOn=updatedOn;
      this.preferences=preferences;
      this.images=images;
      this.mixers=mixers;
      this.mixersAttending=mixersAttending;
      this.messagesSent=messagesSent;
      this.messagesRecieved=messagesRecieved;
      this.matchers=matchers;
      this.matcheds=matcheds;
      this.blocked=blocked;
      this.favorited=favorited;
      this.favoriter=favoriter;
      this.categories=categories;
      this.profileAnswers=profileAnswers;
    }

}
