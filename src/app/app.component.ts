import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription  } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AjitVaishWedding';
  private future: Date;
  private futureString: string;
  private diff: number;
  public $counter: Observable<number>;
  private subscription: Subscription;
  private message: string;
  private countdownStart :number= 3;
  ngOnInit() {
    this.future = new Date(this.futureString);
    this.$counter = interval(1000).pipe(
      map((x) => {
         this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
         return x;
     })
   )



    this.subscription = this.$counter
        .subscribe((x) => this.message = this.dhms(this.diff));
     
}



  dhms(t) {
    let days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
        days + 'd',
        hours + 'h',
        minutes + 'm',
        seconds + 's'
    ].join(' ');
}
}
