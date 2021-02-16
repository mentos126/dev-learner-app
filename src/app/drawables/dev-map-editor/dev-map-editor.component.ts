import { Component, OnInit } from '@angular/core';
import { IBoxes } from '../../models/boxes';

@Component({
  selector: 'app-dev-map-editor',
  templateUrl: './dev-map-editor.component.html',
  styleUrls: ['./dev-map-editor.component.scss']
})
export class DevMapEditorComponent implements OnInit {

  constructor() { }

  colors : Array<String> = ['red', 'blue', 'green', 'red', 'yellow', 'orange', 'white']
  currentColor : String = ""
  currentStart : String =""
  currentEnd : String =""
  currentStar : String = ""
  map : IBoxes = {
    "infos": {
      "conditions":["blue"],
      "instructions":["-up"],
      "tutorial":[
        {
          "tag":"playerTuto",
          "body":"Vous êtes la fusée"
        },{
          "tag":"mapTuto",
          "body":"Déplacez-vous jusqu'au drapeau.<br>"
        },{
          "tag":"conditionsTuto",
          "body":"Utilisez une condition"
        },{
          "tag":"instructionTuto",
          "body":"instructionTuto"
        },{
          "tag":"sialorsTuto",
          "body":"sialorsTuto"
        }
      ]
    },
    "boxes":[
      [
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []} 
      ],
      [
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "win":true, "isEmpty" : true, "color" : "blue", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []} 
      ],
      [
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "blue", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []} 
      ],
      [
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "blue", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []} 
      ],
      [
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "blue", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []} 
      ],
      [
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "blue", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []} 
      ],
      [
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "player":{"direction":"up", "classes":["play"]}, "isEmpty" : false, "color" : "blue", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []} 
      ],
      [
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []},
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []} 
      ]
    ]
  }

  clear(){
    for(let x = 0; x < this.map.boxes.length; x++){
      for(let y = 0; y < this.map.boxes[x].length; y++){
        this.map.boxes[x][y] = { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []}
      }
    }
  }
  generate(){
    this.map.infos.conditions = []
    for(let x of this.map.boxes){
      for(let y of x){
        if(y.color !== 'white'){
          let found = this.map.infos.conditions.find(e=>{
            return e === y.color
          })
          if(!found){
            this.map.infos.conditions.push(y.color + '')
          }
        }
      }
    }
  }
  setFinal(none:String):void{
    this.currentEnd = none
    this.userUse("end")
  }
  setStart(direction:String):void{
    this.currentStart = direction
    this.userUse("start")
  }
  handler(x:number, y:number):void{
    if(this.currentColor !== ""){
      this.setTileColor(x, y)
    }else if(this.currentEnd !== ""){
      this.setEndPosition(x, y)
    }else if(this.currentStart !== ""){
      this.setStartPosition(x, y)
    }else if(this.currentStar !== ""){
      this.setStarPosition(x, y)
    }
  }
  setTileColor(x:number, y:number):void{
    if(this.currentColor === 'white'){
      this.map.boxes[x][y] = 
        { "isEmpty" : true, "color" : "white", "classes" : [], "elements" : []}
    }
    this.map.boxes[x][y].color = this.currentColor
  }
  setStartPosition(x:number, y:number):void{
    this.map.boxes[x][y] = 
      { "player":{"direction":this.currentStart.substr(1), "classes":["play"]}, "isEmpty" : false, "color" : this.map.boxes[x][y].color, "classes" : [], "elements" : []}
  }
  setEndPosition(x:number, y:number):void{
    this.map.boxes[x][y] = 
      { "win":true, "isEmpty" : true, "color" : this.map.boxes[x][y].color, "classes" : [], "elements" : []}
  }
  setCurrentColor(color:String):void{
    this.currentColor = color
    this.userUse("color")

  }
  setStarPosition(x:number, y:number){
    this.map.boxes[x][y].star = true
  }
  setStar(none:String){
    this.currentStar = "none"
    this.userUse('star')

  }
  userUse(tool:string){
    if(tool==="color"){
      this.currentEnd = ""
      this.currentStar = ""
      this.currentStart = ""
    }else if(tool==="start"){
      this.currentColor = ""
      this.currentStar = ""
      this.currentEnd = ""
    }else if(tool==="end"){
      this.currentColor = ""
      this.currentStar = ""
      this.currentStart = ""
    }else if(tool==="star"){
      this.currentColor = ""
      this.currentEnd = ""
      this.currentStart = ""
    }
  }
  ngOnInit() {
  }

}
