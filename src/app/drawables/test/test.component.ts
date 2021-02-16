import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  todo = [ 2, 4, 6, 8];

  done_1 = [1, 3, 5, 7];

  done_2 = [1, 3, 5, 7];

  drop(event: CdkDragDrop<number[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    console.log(event.container.data)
    this.todo = [ 2, 4, 6, 8]
    console.log('----------START-----------')
    console.log('TODO')
    console.log(this.todo)
    console.log('DONE_1')
    console.log(this.done_1)
    console.log('DONE_2')
    console.log(this.done_2)
  }
  
}