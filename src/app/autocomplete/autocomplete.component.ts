import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, merge } from 'rxjs';
import {
  map,
  startWith,
  tap,
  debounceTime,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';
import * as Immutable from 'immutable';

export class User {
  constructor(public simbolo: string, public name: string) {}
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  myControlxNamex = new FormControl();
  myControlSimbolo = new FormControl();

  options = [
    new User('M', 'Mary'),
    new User('S', 'Shelley'),
    new User('X', 'Igor')
  ];

  filteredOptions: Observable<User[]>;

  ngOnInit() {
    const obs1 = this.myControlxNamex.valueChanges.pipe(
      // startWith<string | User>(''),
      // tap(value => console.log(value)),
      filter(text => text.length > 0),
      debounceTime(500),
      distinctUntilChanged(),
      map(name => (name ? this.filter(name) : this.options.slice())),
      tap(
        // map(value => (typeof value === 'string' ? value : value.name)),
        value => console.log(value)
      )
    );
    const obs2 = this.myControlSimbolo.valueChanges.pipe(
      // startWith<string | User>(''),
      // tap(value => console.log(value)),
      filter(text => text.length > 0),
      debounceTime(500),
      distinctUntilChanged(),
      map(name => (name ? this.filter(name) : this.options.slice())),
      tap(
        // map(value => (typeof value === 'string' ? value : value.name)),
        value => console.log(value)
      )
    );
    const obs = merge(obs1, obs2);

    this.filteredOptions = obs;
  }

  // ngOnInit() {
  //   this.filteredOptions = this.myControl.valueChanges.pipe(
  //     tap(value => console.log(value)),
  //     map(user => (user ? this.filter(user.name) : this.options.slice()))
  //   );
  // }

  filter(key: string): User[] {
    return this.options.filter(
      option =>
        option.name.toLowerCase().indexOf(key.toLowerCase()) >= 0 ||
        option.simbolo.toLowerCase().indexOf(key.toLowerCase()) >= 0
    );
  }

  displayFn(user?: User): string | undefined {
    return user ? user.simbolo : undefined;
  }
}
