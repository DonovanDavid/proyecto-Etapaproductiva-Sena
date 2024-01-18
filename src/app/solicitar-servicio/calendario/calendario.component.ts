import { Component, EventEmitter, Output } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent {
  @Output() messageEvent = new EventEmitter<string>();
  selected = "";

  sendMessage(){
    this.messageEvent.emit(this.selected);
  }
}
