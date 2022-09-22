export class Mixer {
  id: number;
  name: string;
  description: string;
  eventDate: string;
  address: string;
  eventStart: string;
  eventEnd: string;
  imageUrl: string;

  constructor(
    id: number = 0,
    name: string = '',
    description: string = '',
    eventDate: string = '',
    address: string = '',
    eventStart: string = '',
    eventEnd: string = '',
    imageUrl: string = ''
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
