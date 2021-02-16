import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { IlevelMenu, IlevelsMenu } from '../../models/levels';
import { PositionService } from '../../game/player/position.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IInstruction } from '../../models/instruction';
import { MapProviderService } from './map/map-provider.service';
import { Subscription } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IBoxes, IInfos } from '../../models/boxes';
import { MapComponent } from './map/map.component';
import { ProviderService } from '../menu/provider.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  /** LEVEL */
  @Input('level') level : IlevelMenu = null;
  @ViewChild('mapComponent') mapComponent : MapComponent
  /** TUTORIAL */
  @ViewChild('runTuto') runTuto
  @ViewChild('editorTuto') editorTuto
  @ViewChild('playerTuto') playerTuto

  @ViewChild('mapTuto') mapTuto
  // @ViewChild('mapTuto1') mapTuto1
  // @ViewChild('mapTuto2') mapTuto2
  @ViewChild('conditionsTuto') conditionsTuto
  @ViewChild('instructionTuto') instructionTuto
  @ViewChild('sialorsTuto') sialorsTuto

  @Output() exit = new EventEmitter<IlevelMenu>()

  /** MODAL */
  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  isModalShown : Boolean = false

  /** ATTRIBUTE's COMPONENT */
  conditions : Array<String> = ['green', 'yellow', 'red', 'blue', 'orange']
  instructions : Array<String> = ['-left', '-right', '-up']
  backup_ : {conditions:Array<String>, instructions:Array<String>}

  ifs : Array<IInstruction> = [
    // {idCondition: "idc-1", idInstruction: "idi-1",dataI:['-up'], dataC:['blue']},
  ]

  TARGET_CONDITIONS = ['conditionsList']
  TARGET_INSTRUCTION = ['instructionsList']

  menuState : Boolean = false

  isPlaying : number = 0
  isPlayingSubscription : Subscription = null

  lunchtutorial : Boolean = true

  infos : IInfos = null
  infosSubscription : Subscription = null

  scoreSubscription : Subscription = null
  score : IlevelsMenu = null
  currentScore : any

  constructor(private positionProvider:PositionService, private map: MapProviderService,
    private scoreService:ProviderService) {
  }
  ngOnDestroy(){
    this.positionProvider.gameState('stop')
    this.isPlayingSubscription.unsubscribe()
    this.infosSubscription.unsubscribe()
    this.scoreSubscription.unsubscribe()
  }
  ngOnInit() {
    this.isPlayingSubscription = this.positionProvider.isPlaying.subscribe(
      (e:number)=>this.setGameState(e)
    )
    this.scoreSubscription = this.scoreService.levels.subscribe(
      e=> {
        this.score = e
        this.currentScore = e[Object.keys(e)[this.level.world - 1]][this.level.level-1].score
      }
    )
    this.infosSubscription = this.map.infos.subscribe(
      (e:IInfos)=>{this.initLevel(e)}
    )
    setTimeout(()=>{
      this.modalToggle('show')
    },500)
  }
  initLevel(i:IInfos):void{
    if(i){
      console.log('chargé')

      this.infos = i
      this.conditions = i.conditions
      this.instructions = i.instructions

      this.backup('save')
      this.loadTutorial(i)
    }
  }
  unloadTutorial():void{
    this.mapTuto.nativeElement.removeAttribute('data-step');this.mapTuto.nativeElement.removeAttribute('data-intro')
    this.conditionsTuto.nativeElement.removeAttribute('data-step');this.conditionsTuto.nativeElement.removeAttribute('data-intro')
    this.instructionTuto.nativeElement.removeAttribute('data-step');this.instructionTuto.nativeElement.removeAttribute('data-intro')
    this.sialorsTuto.nativeElement.removeAttribute('data-step');this.sialorsTuto.nativeElement.removeAttribute('data-intro')
  }
  loadTutorial(i:IInfos){
    if(i){
      if(typeof i.tutorial !== 'undefined' && i.tutorial && i.tutorial.length>0){

        for(let k = 0; k<i.tutorial.length;k++){

          if(i.tutorial[k].tag === 'mapTuto'){
            this.mapTuto.nativeElement.setAttribute('data-step', k+1);this.mapTuto.nativeElement.setAttribute('data-intro', i.tutorial[k].body)
          }if(i.tutorial[k].tag === 'conditionsTuto'){
            this.conditionsTuto.nativeElement.setAttribute('data-step', k+1);this.conditionsTuto.nativeElement.setAttribute('data-intro', i.tutorial[k].body)
          }if(i.tutorial[k].tag === 'instructionTuto'){
            this.instructionTuto.nativeElement.setAttribute('data-step', k+1);this.instructionTuto.nativeElement.setAttribute('data-intro', i.tutorial[k].body)
          }if(i.tutorial[k].tag === 'sialorsTuto'){
            this.sialorsTuto.nativeElement.setAttribute('data-step', k+1);this.sialorsTuto.nativeElement.setAttribute('data-intro', i.tutorial[k].body)
          }
        }
      }
    }
  }
  /**
   * MENU
   */
  showMenu():void{
    // console.log("showMenu")
    this.menuState = true
    // console.log(this.menuState);
    this.modalToggle('show')
  }
  goMenu():void{
    this.setGameState(0)
    this.exit.emit(this.level)
    // this.menuState = false
  }
  onModalHide(){
    this.menuState = false
    this.isModalShown = false
    if(this.isPlaying ==2){
      this.isPlaying = 0
    }
  }
  goLevelNext(){
    this.ifs = []
    this.TARGET_CONDITIONS = ['conditionsList']
    this.TARGET_INSTRUCTION = ['instructionsList']

    if(this.level.level === 9){
      this.level = { level : 1, world: this.level.world+1 }
    }else{
      this.level.level = this.level.level + 1
    }
    this.mapComponent.setLevel(this.level)
    this.setGameState(0)
    // this.modalToggle('hide')
  }
  setGameState(state:number):void{
    console.log('[SETGAME STATE]')
    console.log('state : ' + state)
    this.isPlaying=state
    if(state===2){
      this.unloadTutorial()
      this.map.reset()
      this.modalToggle('show')
    }
    if(state===3){
      this.modalToggle('show')
      this.map.reset()
    }
  }
  modalToggle(state:string, event?:any){
    if(state === 'show'){
      this.isModalShown = true;
    }else{
      // this.isModalShown = false;
      this.autoShownModal.hide();
      this.menuState = false

    }
  }
  deleteComponent(elt:any, event:any):void{
    let tmp = this.ifs.filter(_=>_.idCondition !== elt.idCondition)

    this.ifs = []
    this.TARGET_CONDITIONS = ['conditionsList']
    this.TARGET_INSTRUCTION = ['instructionsList']
    let i = 0
    for(let block = 0; block < tmp.length; block++){

      this.TARGET_INSTRUCTION.push('idi-'+block)
      this.TARGET_CONDITIONS.push('idc-'+block)
      this.ifs.push({idCondition:'idc-'+block, idInstruction:'idi-'+block, dataC:tmp[block].dataC, dataI:tmp[block].dataI})
    }
    // this.ifs = tmp

    console.log(this.ifs)
  }
  addInstruction():void{
    let id : number = this.ifs.length
    let idC = 'idc-'+id, idI='idi-'+id
    this.TARGET_CONDITIONS.push(idC)
    this.TARGET_INSTRUCTION.push(idI)
    this.ifs.push({idCondition:idC, idInstruction:idI, dataC:[], dataI:[]})

  }
  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      }
  }
  play(){
    this.positionProvider.runInstruction(this.ifs)
  }
  stop(){
    this.map.reset()
    this.positionProvider.gameState('stop')
  }
  dropOrderInstruction(event: CdkDragDrop<{idCondition:String, idInstruction:String, dataC:Array<String>, dataI:Array<String>}>) {
    moveItemInArray(this.ifs, event.previousIndex, event.currentIndex);
  }

  cdkDropListExited(event/*: CdkDragExit<string[]>*/){
    this.backup('restore')
  }
  dropping(event:any):void {
    // console.log('%  dropping %')
    // this.backup('restore')
  }
  backup(mode:string):void{
    switch (mode) {
      case 'save':
      this.backup_ = {
        conditions : this.conditions.slice(0),
        instructions : this.instructions.slice(0)
      }
      break;
      case 'restore':
        this.conditions = this.backup_.conditions.slice(0)
        this.instructions = this.backup_.instructions.slice(0)
      break;
      default:
        break;
    }
  }
}
