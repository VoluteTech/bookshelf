import { Component } from '@angular/core';
import { Book } from '../../book/book';
import { BookCard } from '../book-card/book-card';

@Component({
  imports: [BookCard],
  selector: 'app-book-list',
  styleUrl: './book-list.css',
  templateUrl: './book-list.html',
})
export class BookList {
  protected books: Book[] = [
    { id: 1, title: 'Dune', author: 'Frank Herbert', read: true },
    { id: 2, title: 'Project Hail Mary', author: 'Andy Weir', read: false },
    { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', read: true },
  ];

  protected onToggleRead(bookId: number) {
    const book = this.books.find(b => b.id === bookId);
    if (book) {
      book.read = !book.read;
    }
  }
}
