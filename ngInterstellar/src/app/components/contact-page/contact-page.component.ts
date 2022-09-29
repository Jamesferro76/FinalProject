import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent implements OnInit {
  image1: string =
    'https://marketplace.canva.com/Foblk/MAEItxFoblk/1/tl/canva-happy-man-icon-MAEItxFoblk.png';

  image2: string =
    'https://marketplace.canva.com/Foblk/MAEItxFoblk/1/tl/canva-happy-man-icon-MAEItxFoblk.png';

  image3: string =
    'https://marketplace.canva.com/Foblk/MAEItxFoblk/1/tl/canva-happy-man-icon-MAEItxFoblk.png';

  backgroundImage: string =
    'https://mixkit.imgix.net/videos/preview/mixkit-spectacular-fluorescent-colored-nebulae-in-universe-31596-0.jpg?q=80&auto=format%2Ccompress&w=460';

  link11: string = 'https://www.linkedin.com/in/daniel-schulenberg-2a0837b6/';
  link12: string = 'https://github.com/dschulenberg';
  link13: string = 'http://50.112.59.150:8080/RewardForPay/';

  link21: string = 'https://www.linkedin.com/in/zachary-kotterer-8226b2184/';
  link22: string = 'https://github.com/zachkott';
  link23: string = 'http://50.112.59.150:8080/RewardForPay/';
  link24: string = 'http://50.112.59.150/';

  link31: string = 'https://www.linkedin.com/in/jamesferro/';
  link32: string = 'https://github.com/Jamesferro76';
  link33: string = 'http://34.238.32.159:8080/InsideScoop/';
  link34: string = 'http://34.238.32.159:8080/it3/#/home';
  constructor() {}

  ngOnInit(): void {}
}
