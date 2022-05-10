import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwDate } from '@sw/common/date';

@Component({
  selector: 'full-stack-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<any>('/api/hello');
  ccc = new SwDate().DATE_FORMAT;
  constructor(private http: HttpClient) {}
}
