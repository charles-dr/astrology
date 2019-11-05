import { Component, OnInit } from '@angular/core';

import { History } from './../../models/history.model';

import { HistoryService } from './../../services/histroy.service';


@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {
  displayedColumns: string[] = ['sn', 'date', 'result', 'time', 'action'];

  histories: Array<History>;

  constructor(
    private historyService: HistoryService
  ) { }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.histories = this.historyService.getHistoryList();
  }

  clearHistory() {
    this.historyService.deleteAllHistory();
    this.loadHistory();
  }

  deleteHistory(index) {
    // console.log('[deleteHistory]', index);
    this.historyService.deleteHistory(index);
    this.loadHistory();
  }
}
