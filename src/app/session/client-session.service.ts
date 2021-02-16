import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ClientSessionService {

  cookieValue = 'UNKNOWN';
 
  constructor(private cookieService: CookieService ) { }

  getData(name:string): void {
    this.cookieValue = this.cookieService.get(name);
  }
  setData(name:string, data:any) : any {
    let data_ = JSON.stringify(data)
    this.cookieService.set(name, data_);
  }
}
