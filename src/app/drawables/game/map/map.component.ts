import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapProviderService } from './map-provider.service';
import { IBoxes } from '../../../models/boxes';
import { IlevelMenu } from '../../../models/levels';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map_subscription : Subscription = null
  map : IBoxes = null

  @Input('level') level : IlevelMenu = null;

  constructor(private mapProvider:MapProviderService) {


  }

  trackByFn(index, item) { 
    return item.id; 
  }
  
  ngOnInit() {
    this.map_subscription = this.mapProvider.map.subscribe(
      e=> this.map = e
    )
    this.setLevel(this.level)
  }
  setLevel(level:IlevelMenu){
    this.mapProvider.load(level)
  }
}