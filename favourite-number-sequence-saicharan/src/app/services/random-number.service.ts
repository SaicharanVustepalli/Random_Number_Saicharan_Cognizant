import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomNumberService {
  generateNumber(endingNumber: number, length: number): string {
    const randomPart = Array.from({ length: length - 1 }, () =>
      Math.floor(Math.random() * 10)
    ).join('');
    return `${randomPart}${endingNumber}`;
  }
}
