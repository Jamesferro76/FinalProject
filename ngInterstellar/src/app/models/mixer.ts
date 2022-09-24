import { Address } from './address';
export class Mixer {
  id: number;
  name: string;
  description: string;
  eventDate: string;
  address: Address;
  eventStart: string;
  eventEnd: string;
  imageUrl: string;

  constructor(
    id: number = 0,
    name: string = 'Default Name',
    description: string = 'Default Description',
    eventDate: string = '',
    address: Address = new Address(),
    eventStart: string = '',
    eventEnd: string = '',
    imageUrl: string = 'https://projectwishuponastar.org/wp-content/uploads/2016/08/cropped-2015-04-14-1428991110-5164937-starpic.jpg'
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.eventDate = eventDate;
    this.address = address;
    this.eventStart = eventStart;
    this.eventEnd = eventEnd;
    this.imageUrl = imageUrl;
  }
}
