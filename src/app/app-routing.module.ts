import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DatepickerViewsSelectionExample } from './datepicker-views-selection-example/datepicker-views-selection-example.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'autocomplete',
    component: AutocompleteComponent
  },
  {
    path: 'datepicker',
    component: DatepickerViewsSelectionExample
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
