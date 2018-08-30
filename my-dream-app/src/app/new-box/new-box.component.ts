import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Box} from '../box.model';
import {BoxService} from '../box.service';

@Component({
  selector: 'app-new-box',
  templateUrl: './new-box.component.html',
  styleUrls: ['./new-box.component.css']
})
export class NewBoxComponent implements OnInit {

  constructor(private boxService: BoxService) { }
  @Input() boxI;
  @Output() updateEvent = new EventEmitter<string>();
  myVar = false;
  ngOnInit() {
  }
  edit() {
    this.myVar = !this.myVar;
    console.log('edit');
  }
  addText(boxtext: string, boxId: string) {
    this.myVar = !this.myVar;
    const box = new Box(boxId, boxtext);
    this.boxService.updateBoxes(box).then((result: any) => {
      this.updateEvent.next();
    });
  }
  close(boxId: number) {
    this.boxService.deleteBoxes(boxId).subscribe(data => {
    });
    console.log('deleted');
  }


}
