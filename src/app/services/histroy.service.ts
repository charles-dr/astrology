import { Injectable } from '@angular/core';

import { History } from './../models/history.model';

@Injectable({
    providedIn: 'root'
})

export class HistoryService {
    histories: Array<History>;

    constructor() {
        this.loadHistory();
    }

    addHistory(history: History) {
        this.histories.push(history);
        this.storeHistory();
        // this.loadHistory();
    }

    deleteHistory(index: number) {
        this.histories.splice(index, 1);
        this.storeHistory();
        this.loadHistory();
    }

    deleteAllHistory() {
        this.histories = [];
        this.storeHistory();
        // this.loadHistory();
    }

    loadHistory() {
        // console.log('[History Service] - load History');
        const strHistory = localStorage.getItem('history');
        if (strHistory !== null && strHistory !== undefined && strHistory !== '') {
            this.histories = JSON.parse(strHistory);
        } else {
            this.histories = [];
        }
        // console.log(this.histories);
    }

    storeHistory() {
        const strHistory = JSON.stringify(this.histories);
        localStorage.setItem('history', strHistory);
    }

    getHistoryList() {
        return this.histories;
    }
}
