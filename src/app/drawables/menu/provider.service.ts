import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IlevelsMenu, IlevelMenu } from '../../models/levels';
import { MapProviderService } from '../game/map/map-provider.service';


@Injectable()
export class ProviderService implements OnInit, OnDestroy {
  private levels_ = new BehaviorSubject<IlevelsMenu>(null);
  levels: Observable<IlevelsMenu> = this.levels_.asObservable();
  getLevelSubscription : Subscription = null

  currentLevel : IlevelMenu = null
  currentLevelSubscription : Subscription = null

  constructor(private http:HttpClient, private mapProvider:MapProviderService) { 
    console.log("init");
    console.log("init");
    // @TODO partager le score 
    // @TODO valider les étoiles
    let URI = `./assets/data/levels.json`
    this.http.get<IlevelsMenu>(URI).subscribe(
      (e:IlevelsMenu)=>{
        this.levels_.next(e)
    })
    this.currentLevelSubscription = this.mapProvider.currentLevel.subscribe(
      e=>{
        this.currentLevel=e
    })
  }

  /**
   * @description charge la carte du world-level et broadcast
   * @param level 
   * @param world 
   */
  ngOnInit(){
    
  }
  ngOnDestroy(){
    this.getLevelSubscription.unsubscribe()
    this.currentLevelSubscription.unsubscribe()
  }
  setScore(score:number):void{
    console.log('PROVIDERSERVICE')
    let copy:IlevelsMenu = JSON.parse(JSON.stringify(this.levels_.value))
    if(this.currentLevel.world === 1)
      copy.worldOne[this.currentLevel.level-1].score = score
    if(this.currentLevel.world === 2)
      copy.worldTwo[this.currentLevel.level-1].score = score
    if(this.currentLevel.world === 3)
      copy.worldThree[this.currentLevel.level-1].score = score
    this.levels_.next(copy)
  }

}
