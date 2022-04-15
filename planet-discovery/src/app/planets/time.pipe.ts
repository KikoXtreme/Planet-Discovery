import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  private now = new Date();
  
  transform(value: string): string {
    const then = new Date(value);
    const timePassed = this.now.getTime() - then.getTime();

    const milliseconds = 1000;
    const minutes = 60 * milliseconds;
    const hours = 60 * minutes;
    const days = 24 * hours;
    const years = 365 * days;

    if (timePassed < minutes) {
      return `${Math.floor(timePassed / milliseconds)} seconds`;
    }
    if (timePassed < hours) {
      return `${Math.floor(timePassed / minutes)} minutes`;
    }
    if (timePassed < days) {
      return `${Math.floor(timePassed / hours)} hours`;
    }
    if (timePassed < years) {
      return `${Math.floor(timePassed / days)} days`;
    }

    return `${Math.floor(timePassed / years)} years`;
  }

}
