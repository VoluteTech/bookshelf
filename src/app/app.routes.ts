import { Routes } from '@angular/router';
import { BookList } from './books/book-list/book-list';
import { BookDetail } from './books/book-detail/book-detail';
import { BookForm } from './books/book-form/book-form';

export const routes: Routes = [
  { path: '', component: BookList },
  { path: 'books/new', component: BookForm },
  { path: 'books/:id', component: BookDetail },
];
