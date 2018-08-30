import { Component, OnInit } from '@angular/core';
import {Box} from './box.model';
import {BoxService} from './box.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name: String;
  title = 'my-dream-app';
  public boxes: Box[] = [];
  public box: Box;
  myVar = false;

  constructor(private boxService: BoxService) {
  }
  ngOnInit() {
    this.boxService.getBoxes().subscribe(data => {
      this.boxes = data;
    });
  }


  addTag(tag) {
    this.box = new Box('', 'Tag');
    this.boxService.postBoxes(this.box).then((result: any) => {
      this.ngOnInit();
    });
  }
}
