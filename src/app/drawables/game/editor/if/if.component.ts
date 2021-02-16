import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { IInstruction } from '../../../../models/instruction';
import { ModalDirective } from 'ngx-bootstrap/modal';

interface cache {
  element: string,
  type:string,
  index?:number
}

@Component({
  selector: 'app-if',
  templateUrl: './if.component.html',
  styleUrls: ['./if.component.scss']
})
export class IfComponent implements OnInit {

  @Input('assertion') assertion? : IInstruction
  @Input('sourceCondition') sourceCondition? : Array<String>
  @Input('sourceInstruction') sourceInstruction? : Array<String>
  @Input('cdkDropListDisabled_') cdkDropListDisabled_? : Boolean

  @Output() dropped = new EventEmitter();
  @Output() deleteComponent = new EventEmitter();

  @ViewChild('tutoModal') tutoModal: ModalDirective;
  isModalShown : Boolean = false

  
  // tmp pour une couleur : besoin seulement du nom
  tmpElement : cache = null
  tuto : number
  constructor() { }

  ngOnInit() {
  }
  onModalHide(){
    this.isModalShown = false
  }
  // Récupère l'élément à temporiser pour une suppression
  temporize(element:string, type:string, event){
    event.stopPropagation()
    this.tmpElement = {element:element, type:type}
  }
  deleteElement(event:any){
    event.stopPropagation()
    console.log('deleteElement()')
    if(this.tmpElement.element){
      if(this.tmpElement.type === 'instruction'){
        console.log("*** Supression d'une instruction");
        
        let index = this.assertion.dataI.indexOf(this.tmpElement.element)
        console.log(index);
        
        if(index !== -1){
          this.assertion.dataI.splice(index, 1)
        }
      }else if(this.tmpElement.type === 'condition'){
        console.log("*** Supression d'une condition");
        this.assertion.dataC = [] 
      }
    }else if(this.tmpElement.type === 'block'){
      console.log("*** Supression du composant");
      this.deleteComponent.emit({assertion:this.assertion})
      this.tmpElement.element = null
    } 
  }
  tutoElement(event:any){
    event.stopPropagation()
    console.log('tuToElement()')
    if(this.tmpElement.element){
      if(this.tmpElement.type === 'instruction'){
        this.tuto = 2
      }else if(this.tmpElement.type === 'condition'){
        this.tuto = 1
      }
    }else if(this.tmpElement.type === 'block'){
      this.tuto = 3
    }
    this.isModalShown = true
    return true
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log("------------");
    console.log(this.sourceCondition);
    console.log(this.sourceCondition);

    
    if (event.previousContainer === event.container) {
      
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

        console.log(event)

      if((event.previousContainer.id === this.sourceCondition[0] 
        || event.previousContainer.id.includes('idc-')) 
        && event.container.data.length>1){

        console.log('on y est');
        this.assertion.dataC = [this.assertion.dataC[event.currentIndex]]

      }
    }
    this.dropped.emit()
  }

}
