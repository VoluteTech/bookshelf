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
  protected readonly loading = this.bookService.loading;
  protected readonly error = this.bookService.error;

  protected onToggleRead(bookId: number): void {
    this.bookService.toggleRead(bookId);
  }

  protected onRemove(bookId: number): void {
    if (confirm("Delete this book ?")) {
      this.bookService.deleteBook(bookId);
    }
  }

  protected onReload(): void {
    this.bookService.loadBooks();
  }
}
