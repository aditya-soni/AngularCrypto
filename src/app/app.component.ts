import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from './data.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // objectKeys = Object.keys;
  cryptos: any;
  specCurr: any;
  detailedCrypto: any;
  getListSubs: Subscription;
  getCurrencySubs: Subscription;

  @ViewChild('speccurr') name: ElementRef;


  constructor (private _data: DataService) {
    }

  showDetails(crypto){
    this.detailedCrypto = crypto;
  }

  getCurr() {
   const name = this.name.nativeElement.value;
   this.getCurrencySubs = this._data.getCrypto(name).subscribe(
     (res) => {
       this.specCurr = res;
     }
   );
 
   this.name.nativeElement.value = '';
  }


  ngOnInit() {
  this.getListSubs = this._data.getPrices()
  .subscribe(res => {
  this.cryptos = res;
  // console.log(res);
  });
 }
 ngOnDestroy(){
  this.getListSubs.unsubscribe();
  this.getCurrencySubs.unsubscribe();
 }

}
