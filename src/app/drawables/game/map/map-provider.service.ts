import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { IBoxes, IInfos } from '../../../models/boxes';
import { HttpClient } from '@angular/common/http';
import { IlevelMenu } from '../../../models/levels';

@Injectable()
export class MapProviderService {

  private map_ = new BehaviorSubject<IBoxes>(null);
  map: Observable<IBoxes> = this.map_.asObservable();
  map_backup: IBoxes = null
  // ?
  getLevelSubscription : Subscription = null

  private infos_ = new BehaviorSubject<IInfos>(null);
  infos: Observable<IInfos> = this.infos_.asObservable();

  constructor(private http:HttpClient) { }
  private currentLevel_ = new BehaviorSubject<IlevelMenu>(null)
  currentLevel : Observable<IlevelMenu> = this.currentLevel_.asObservable()


  /**
   * @description charge la carte du world-level et broadcast
   * @param level 
   * @param world 
   */
  load(level:IlevelMenu):void{
    this.currentLevel_.next({level:level.level, world:level.world})
    let URI = `./assets/data/levels/level-${level.world}-${level.level}.json`

    this.http.get<IBoxes>(URI).subscribe(
      (e:IBoxes)=>{
        this.map_backup = JSON.parse(JSON.stringify(e))
        /** MAJ Sauvegarde. Restaurée quand reset() */
        this.setMap(e)
        this.setInfos(e.infos)
      })
  }
  /**
   * @description restaure la carte
   */
  reset():void{
    this.setMap(this.map_backup)
    
  }

  setMap(new_map: IBoxes):void{
    this.map_.next(JSON.parse(JSON.stringify(new_map)))
  }
  setInfos(new_infos: IInfos):void{
    this.infos_.next(JSON.parse(JSON.stringify(new_infos)))
  }

}
