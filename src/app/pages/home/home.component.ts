import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MyForm } from './../../models/my.form.model';
import { History } from './../../models/history.model';

import { DataService } from './../../services/data.service';
import { HistoryService } from './../../services/histroy.service';
import { Zodiac } from 'src/app/models/zodiac.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formValue: MyForm;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private historyService: HistoryService
    ) { }

  ngOnInit() {
    this.formValue = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      hour: '',
      minute: '',
      ampm: 'AM',
      dob: ''
    };
  }

  /**
   * @function submitForm
   * @param void
   * @return void
   */
  submitForm() {
    let isFormValid: boolean;

    isFormValid = this.checkFormValid(); console.log(isFormValid);

    if (!isFormValid) {
      return;
    }

    this.dataService.calculateZodiac(this.formValue).then((res: any) => {
      console.log('[Calc Result]', res);
      if (res.status === true) {

        // add history to the list
        const zodiac: Zodiac = this.dataService.getZodiacDetailById(res.idx - 1);
        const history: History = {
          birthdate: this.dataService.getMonthName(this.formValue.month - 1) + ' ' +  this.formValue.date,
          result: zodiac.name,
          savedAt: new Date(),
          updatedAt: new Date(),
        };
        this.historyService.addHistory(history);

        // navigate to details
        this.router.navigate([`details/${res.idx}`]);
      } else {
        this.openSnackBar('Please input valid information!');
      }
    })
    .catch((err: any) => {
      console.log(err);
      this.openSnackBar('Something went wrong');
    });
  }

  /**
   * @function checkFormValid
   * @param null
   * @return boolean
   */
  checkFormValid() {
    console.log('[Values]  ', this.formValue);
    let valid = true;

    let required = [];
    // year, month, date are required
    if (
      this.formValue.year === null || this.formValue.year <= 0) {
        valid = false;
        required.push('Year');
    }

    if (
      this.formValue.month === null || this.formValue.month <= 0
    ) {
      valid = false;
      required.push('Month');
    }

    if (this.formValue.date === null || this.formValue.date <= 0) {
      valid = false;
      required.push('Date');
    }

    if (!valid) {
      this.openSnackBar(`${required.join(', ')} ${required.length > 1 ? 'are' : 'is'} required`);
    }

    return valid;
  }

  openSnackBar(message: string, action: string = 'Ok') {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
