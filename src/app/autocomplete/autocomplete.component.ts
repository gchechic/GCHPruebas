import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

export class User {
  constructor(public simbolo: string, public name: string) {}
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl();

  options = [
    new User('M', 'Mary'),
    new User('S', 'Shelley'),
    new User('X', 'Igor')
  ];

  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      // startWith<string | User>(''),
      tap(value => console.log(value)),
      // map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this.filter(name) : this.options.slice()))
    );
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
