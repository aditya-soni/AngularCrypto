import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
  result: any;
  specRes: any;
  constructor(
    private _http: HttpClient
  ) { }

  getPrices(){
    // tslint:disable-next-line:max-line-length
    return this._http.get('https://api.coinmarketcap.com/v1/ticker/?convert=INR&limit=10')
    .map(result => this.result = result)
    .catch((error:Response) =>{
      return Observable.throw(error);
    } );
  }

  getCrypto(name:string){
    const url = 'https://api.coinmarketcap.com/v1/ticker/'+name+'/?convert=INR';
    return this._http.get(url).map(result => this.specRes = result).catch(err => Observable.throw(alert('Please enter a valid crypto')));
  }
}
