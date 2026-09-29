import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookList } from './books/book-list/book-list';

@Component({
  imports: [RouterOutlet, BookList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('bookshelf');
}
