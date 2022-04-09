import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  imgPath: String = 'https://exoplanets.nasa.gov/system/news_items/main_images/1581_ManyExoplanets1280.jpg';

  constructor() { }

  ngOnInit(): void {
  }

}
