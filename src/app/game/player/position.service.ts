import { Injectable } from '@angular/core';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { IBoxes } from '../../models/boxes';
import { MapProviderService } from '../../drawables/game/map/map-provider.service';
import { IInstruction } from '../../models/instruction';
import { ProviderService } from '../../drawables/menu/provider.service';
import { IlevelsMenu } from '../../models/levels';
// import { getCurrentDebugContext } from '@angular/core/src/view/services';

export interface coord{
  y:number, x:number,
  sens?:String
}
enum sens{
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right"
}

@Injectable()
export class PositionService {

  cScore = 0
  map_subscription : Subscription = null
  map : IBoxes = null
  instructions:Array<IInstruction>
  noFail:Boolean= true

  private isPlaying_ = new BehaviorSubject<number>(0)
  isPlaying : Observable<number> = this.isPlaying_.asObservable()

  score:IlevelsMenu = null
  scoreSubscription: Subscription = null

  origin : coord = null

  constructor(private scoreService:ProviderService, private mapProvider:MapProviderService) {
    this.map_subscription = this.mapProvider.map.subscribe(
      e=> this.map = e
    )
    this.scoreSubscription = this.scoreService.levels.subscribe(
      e=> this.score = e
    )
  }
  ngOnDestroy() {
    // console.log('destroyed');
  }
  resolvePlayerPosition():coord{
    let coord : coord = null
    // console.log(this.map)
    for(let i = 0 ; i< this.map.boxes.length; i++){
      for(let j = 0 ; j< this.map.boxes[j].length; j++){
        if(!this.map.boxes[i][j].isEmpty){
          // console.log("POINT D'ENTRÉ TROUVÉ À LA POSITION : ", i, j);
          coord = {x:j, y:i, sens:this.map.boxes[i][j].player.direction}
          break
        }
      }
      if(coord) break
    }
    return coord
  }
  gameState(isPlaying:string){
    if(isPlaying === 'play')  {
      this.isPlaying_.next(1)
    }else if(isPlaying === 'stop'){
      this.isPlaying_.next(0)
    }else if(isPlaying === 'win'){
      this.isPlaying_.next(2)
    }else if(isPlaying === 'loose'){
      this.isPlaying_.next(3)
    }
  }
  /**
   * Étape 0
   * @param instructions
   */
  runInstruction(instructions:Array<IInstruction>):void{
    this.instructions = instructions
    this.isPlaying_.next(1)

    this.play()
  }
  /**
   * Étape 1
   */
  play():void{
    let coord : coord,old_coord : coord, win:Boolean=false
    coord = this.resolvePlayerPosition()
    this.origin = coord

    // console.log("START OOOOOOOOOOOOOOOOOOO");
    // console.log(coord);

    let timer = setInterval(() => {
      // console.log(" !!!!!!! this.noFail 1 !!!!!!!");
        // console.log(this.noFail);
      if(this.ok(coord) && this.noFail && this.isPlaying_.value > 0 && this.isPlaying_.value !== 3){
        old_coord = coord
        coord = this.treat(coord)

        // console.log(" !!!!!!! this.noFail 2 !!!!!!!");
        // console.log(this.noFail);

        /** On gagne ici */
        if(this.hasWin(coord)){
          clearInterval(timer)
          this.makeWin(coord)

        }
      }else{
        // console.log('*** ONE')
        if(this.isPlaying_.value === 3){
          console.log('*** LOOSe stop !!! ')
          /** Le joueur a perdu */
          this.gameState('loose')
        }else{
          /** Le joueur a stoppé le jeu */
          this.gameState('stop')

        }

        this.mapProvider.reset()
        // console.log(this.isPlaying_.value);
        // console.log('\t*** LOOSE END')
        // console.log('\t*** CLEAR INTERVAL')
        clearInterval(timer)
      }
      console.log('# TICK #');

    }, 500)

  }
  makeWin(coord:coord):void{
    this.map.boxes[coord.y][coord.x].player.classes = ['win']
    this.map.boxes[coord.y][coord.x].win = false
    this.isPlaying_.next(2)
    let score = {t:0, v:this.cScore}
    for(let x of this.map.boxes){
      for(let y of x){
        if(y.color!== 'white'){
          if(y.hasOwnProperty('star')){
            console.log("star found")
            console.log("score.t " + score.t);
            console.log("score.v " + score.v);
            console.log(y.star);
            score.t++
          }
        }
      }
    }
    console.log('WIN, SCORE : ');
    console.log(score);

    if(score.t === 0){ // il n'y a pas d'étoiles
      this.scoreService.setScore(5)
    }else{ // Il y a des étoiles
      console.log(Math.floor((score.v * 5) / score.t));

      this.scoreService.setScore(Math.floor((score.v * 5) / score.t))
    }
    this.cScore = 0
    // console.log(Math.floor((score.v * 5) / score.t))
  }
  makeLoose(){

  }
  hasWin(coord:coord):Boolean{

    if(this.ok(coord) && this.map.boxes[coord.y][coord.x].hasOwnProperty('win')){
      return this.map.boxes[coord.y][coord.x].win
    }else{
      return false
    }
  }
   /**
   * Étape 2
   * @description varifie qu'on sorte pas du plateau
   * @param coord
   */
  ok(coord:coord):Boolean{
    // on est dedans
    // console.log('OOOOOOOOOOOOOOKKKKKKKKKKKKKKKKKKKKK ??????????')

    if(coord.y>-1 && coord.y<this.map.boxes.length && coord.x>-1 && coord.x<this.map.boxes[0].length
      && this.map.boxes[coord.y][coord.x].color !== 'white'){
      console.log('\tok');
      // vérifie la boucle infinie
      this.noFail = true
      return true
    }else{
      console.log('\tpas ok');
      this.noFail = false
      return false
    }
  }
  /**
   * @description Ce qu'il y a à traiter
   * @param coord
   */
  treat(coord:coord):coord{
    let newCoord : coord = coord,
    fail: Boolean = false
    /** Parcours des block sialors dans l'ordre naturel */
    for(let INST_BLOC of this.instructions){
      /** Collision entre la case sur laquelle se trouve le joueur et les conditions d'un block */
      if(INST_BLOC.dataC.length > 0 && this.map.boxes[coord.y][coord.x].color === INST_BLOC.dataC[0]){
        // console.log('2222222222');
        /** parcours des instructions dans un block sialors  */

        for(let instruction of INST_BLOC.dataI){
          // console.log('boucle sur les instruction ');
          // console.log(instruction)
          if(!this.ok(coord)) break

          if(instruction === "-up"){
            this.checkStar(newCoord)
            newCoord = this.goUp(newCoord)
            if(this.ok(newCoord)){
              this.checkStar(newCoord)
            }else{
              fail=true
              break
            }
          }else if(instruction === "-left" || instruction === "-right"){
            newCoord.sens = this.rotate(newCoord, instruction)
          }
          if(fail) break
        }
      }
      if(fail) break
    }
    return fail ? this.origin : newCoord
  }
  checkStar(coord:coord):void{

    if(this.map.boxes[coord.y][coord.x].color !== 'white' && this.map.boxes[coord.y][coord.x].hasOwnProperty('star') && this.map.boxes[coord.y][coord.x].star){
      // console.log('star hit');
      this.map.boxes[coord.y][coord.x].star = false
      this.cScore++
    }

  }
  /**
   * @description Avance le joueur d'une case
   * @param coord
   */
  goUp(coord:coord):coord{
    let val : coord
    switch (coord.sens) {
      case "up":
        val = {x:coord.x, y:coord.y-1, sens:coord.sens}
        break;
      case "down":
        val = {x:coord.x, y:coord.y+1, sens:coord.sens}
        break;
      case "right":
        val = {x:coord.x+1, y:coord.y, sens:coord.sens}
        break;
      case "left":
        val = {x:coord.x-1, y:coord.y, sens:coord.sens}
        break;

      default:
        break;
    }

    // console.log('DEBUG');
    // console.log('coord, val', coord, val);

    if(this.ok(val)){
      // console.log("\nOK SUCCESS\nOK SUCCESS\nOK SUCCESS\nOK SUCCESS\nOK SUCCESS\nOK SUCCESS")
      this.mooveTo(coord, val)
    }else{
      // console.log("\nNO SUCCESS\nNO SUCCESS\nNO SUCCESS\nNO SUCCESS\nNO SUCCESS\nNO SUCCESS")
      this.gameState('loose')
    }
    return val
  }
  /**
   * @description Déplace d'une case à l'autre
   * @param old_coord
   * @param coord
   */
  mooveTo(old_coord:coord, coord:coord){
    let tmp_player : {direction:String}
    tmp_player = this.map.boxes[old_coord.y][old_coord.x].player
    this.map.boxes[old_coord.y][old_coord.x].player = null
    this.map.boxes[old_coord.y][old_coord.x].isEmpty = true
    this.map.boxes[coord.y][coord.x].player = tmp_player
    this.map.boxes[coord.y][coord.x].isEmpty = false
  }
  /**
   * @description Éffectue une rotation
   * @param sens
   */
  rotate(coord:coord, instruction:String):String{
    let val :String = ""
    switch (coord.sens) {
      case "up":
        val = instruction === "-left" ? "left" : "right"
        break;
      case "down":
        val = instruction === "-left" ? "right" : "left"
        break;
      case "right":
        val = instruction === "-left" ? "up" : "down"
        break;
      case "left":
        val = instruction === "-left" ? "down" : "up"
        break;

      default:
        break;
    }
    /** La valeur du la direction est mise à jour */
    this.map.boxes[coord.y][coord.x].player.direction = val
    return val
  }
}
