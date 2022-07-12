import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges
    .pipe(
      debounceTime(200)
    )
    .subscribe(value => this.searchEmitter.emit(value))
  }

  search = new FormControl('')

  @Output('search') searchEmitter = new EventEmitter<string>();

}
