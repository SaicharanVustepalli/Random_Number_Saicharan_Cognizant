import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RandomNumberService } from '../../services/random-number.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  title = 'Favourite Number Sequence Saicharan';
  randomNumberForm!: FormGroup;
  numbers = [
    { key: 0, value: '0' },
    { key: 1, value: '1' },
    { key: 2, value: '2' },
    { key: 3, value: '3' },
    { key: 4, value: '4' },
    { key: 5, value: '5' },
    { key: 6, value: '6' },
    { key: 7, value: '7' },
    { key: 8, value: '8' },
    { key: 9, value: '9' },
  ];

  generatedNumber: string = '';
  private intervalSubscription!: Subscription;

  constructor(private fb: FormBuilder, private randomNumberService: RandomNumberService) { }

  ngOnInit() {
    this.randomNumberForm = this.fb.group({
      favouriteNumber: [null, Validators.required],
      length: [null, [Validators.required, Validators.min(1)]],
    });
  }

  get f() {
    return this.randomNumberForm.controls;
  }

  onSubmit() {
    if (this.randomNumberForm.valid) {
      const { favouriteNumber, length } = this.randomNumberForm.value;
      this.generateRandomNumber(favouriteNumber, length);

      if (this.intervalSubscription) {
        this.intervalSubscription.unsubscribe();
      }

      this.intervalSubscription = interval(5000).subscribe(() => {
        this.generateRandomNumber(favouriteNumber, length);
      });
    }
  }

  generateRandomNumber(favouriteNumber: number, length: number) {
    this.generatedNumber = this.randomNumberService.generateNumber(favouriteNumber, length);
  }

  changeFavouriteNumber(data: any) {
    this.randomNumberForm.controls['length'].setValue('');
    this.intervalSubscription.unsubscribe();
    this.generatedNumber = '';
  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
