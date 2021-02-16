import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IlevelsMenu } from '../../models/levels';
import { Subscription } from 'rxjs';
import { ProviderService } from './provider.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  @Output() level = new EventEmitter<{world:number, level:number}>()
  @Input('forceState') forceState : number
  
  public pseudo:string= ''
  private error: Boolean=false
  public step: number = 1
  private lightMenu: number = 1
  private activeTab: number = 1
  // step : number = 0; // { 0 | 1 | 2 }

  levels: IlevelsMenu = null
  levelsSubscription: Subscription = null

  constructor(private scoreProvider:ProviderService) { }
  ngOnInit() {
    this.levelsSubscription = this.scoreProvider.levels.subscribe(
      e=> this.levels = e
    )
    if(this.forceState){
      console.log('inside');
      
      this.goStep(3)
    }
  }
  ngOnDestroy(){

  }
  goStep(step:number):void{
    this.pseudo = 'toto'
    console.log('step ' + step)
    console.log('pseudo ' + this.pseudo)
    if((step === 3 && this.pseudo==="") && !this.forceState){
      console.log('if inside')
      this.error=true
    }else{
      this.error=false
      this.step = step
    }
  }
  setLightMenu(item:number):void{
    this.lightMenu=item
  }
  changeTab(tab:number):void{
    this.activeTab=tab
  }
  goLevel(world:number, level:number):void{
    this.level.emit({world:world, level:level})
  }

}
