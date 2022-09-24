import { Preference } from 'src/app/models/preference';
import { User } from './user';

export class Profile {
  id: number;
  birthday: string;
  age: number;
  description: string;
  sex: string;
  firstName: string;
  lastName: string;
  user: User;
  address?: any;
  profilePic: string;
  active: boolean;
  updatedOn: string;
  preferences: Preference[];
  images: any[];
  mixers: any[];
  mixersAttending: any[];
  messagesSent: any[];
  messagesRecieved: any[];
  matchers: any[];
  matcheds: any[];
  blocked: any[];
  favorited: Profile[];
  favoriter: Profile[];
  categories: any[];
  profileAnswers: any[];

  constructor(
    id: number = 0,
    birthday: string = '',
    age: number = 0,
    description: string = '',
    sex: string = '',
    firstName: string = '',
    lastName: string = '',
    user: User = new User(),
    address: any = null,
    profilePic: string = '',
    active: boolean = true,
    updatedOn: string = '',
    preferences: Preference[] = [],
    images: any[] = [],
    mixers: any[] = [],
    mixersAttending: any[] = [],
    messagesSent: any[] = [],
    messagesRecieved: any[] = [],
    matchers: any[] = [],
    matcheds: any[] = [],
    blocked: any[] = [],
    favorited: Profile[] = [],
    favoriter: Profile[] = [],
    categories: any[] = [],
    profileAnswers: any[] = []
  ) {
    this.id = id;
    this.birthday = birthday;
    this.description = description;
    this.age = age;
    this.sex = sex;
    this.firstName = firstName;
    this.lastName = lastName;
    this.user = user;
    this.address = address;
    this.profilePic = profilePic;
    this.active = active;
    this.updatedOn = updatedOn;
    this.preferences = preferences;
    this.images = images;
    this.mixers = mixers;
    this.mixersAttending = mixersAttending;
    this.messagesSent = messagesSent;
    this.messagesRecieved = messagesRecieved;
    this.matchers = matchers;
    this.matcheds = matcheds;
    this.blocked = blocked;
    this.favorited = favorited;
    this.favoriter = favoriter;
    this.categories = categories;
    this.profileAnswers = profileAnswers;
  }
}
