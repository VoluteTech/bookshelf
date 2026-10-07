import { Component, inject } from '@angular/core';
import { BookCard } from '../book-card/book-card';
import { BookService } from '../book.service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [BookCard, RouterLink],
  selector: 'app-book-list',
  styleUrl: './book-list.css',
  templateUrl: './book-list.html',
})
export class BookList {
  private readonly bookService = inject(BookService);
  protected readonly books = this.bookService.books;

  protected onToggleRead(bookId: number): void {
    this.bookService.toggleRead(bookId);
  }
}
