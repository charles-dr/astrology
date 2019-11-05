import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Zodiac } from './../../models/zodiac.model';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  currentId: number;
  detail: Zodiac;



  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.currentId = Number(this.route.snapshot.paramMap.get('id'));

    this.detail = this.dataService.getZodiacDetailById(this.currentId - 1); // current Id starts from 1.

  }

}
