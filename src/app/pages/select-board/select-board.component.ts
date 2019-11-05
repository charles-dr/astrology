import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';


@Component({
  selector: 'app-select-board',
  templateUrl: './select-board.component.html',
  styleUrls: ['./select-board.component.css']
})
export class SelectBoardComponent implements OnInit {

  months: Array<number>;

  selDate: { month: number, date: number };
  interval: any;
  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.months = [];
    for (let i = 0; i < 12; i ++) {
      this.months.push( i + 1 );
    }

    this.selDate = {
      month: new Date().getMonth() + 1,
      date: new Date().getDate()
    };
  }

  generateRandom() {
    console.log('[generateRandom]');
    this.triggerInterval();
    setTimeout(() => {
      clearInterval(this.interval);
      this.checkNOpenDetails();
    }, 2000);
  }

  triggerInterval() {
    this.interval = setInterval(() => {
      this.selDate.month = Math.floor(Math.random() * 11) + 1;
      this.selDate.date = Math.floor(Math.random() * 31) + 1;
    }, 50);
  }

  checkNOpenDetails() {
    const zodiacId = this.dataService.getZodiacID(this.selDate.month, this.selDate.date);
    setTimeout(() => {
      this.router.navigate(['/details/' + zodiacId]);
    }, 1000);
  }

}
