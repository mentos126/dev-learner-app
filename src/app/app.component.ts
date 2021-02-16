import { Component, ViewChild } from '@angular/core';
import { IlevelMenu } from './models/levels';
import { MenuComponent } from './drawables/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  mode : String = 'menu' // { menu | game }
  level : IlevelMenu = null

  menu_next_invocation : number = null

  @ViewChild('menu') menu : MenuComponent

  constructor(){
    // this.level = {level:1, world:1}
  }
  devMode(){
    this.mode = "dev"
  }
  escapeGame(level: IlevelMenu){
    console.log(level);
    
    this.menu_next_invocation = level.world
    this.mode = 'menu'
    // this.menu.changeTab(level.world)
  }
  goLevel(data:IlevelMenu):void{

    this.level = data
    // data = {level : 1, world : 1}
    // this.level = {level : 1, world : 1}

    if(data.level<10 && data.world<4){
      console.log(data)
      this.level=data // Init niveau et monde
      this.mode='game' // On affiche le jeu
    }
  }
}
