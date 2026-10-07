import { Service, signal } from '@angular/core';
import { Book } from '../book/book';

@Service()
export class BookService {
  private readonly booksSignal = signal<Book[]>([
    { id: 1, title: 'Dune', author: 'Frank Herbert', read: true },
    { id: 2, title: 'Project Hail Mary', author: 'Andy Weir', read: false },
    { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', read: true },
  ]);

  readonly books = this.booksSignal.asReadonly();

  toggleRead(id: number): void {
    this.booksSignal.update(books =>
      books.map(book =>
        book.id === id ? { ...book, read: !book.read } : book
      )
    );
  }

  addBook(newBook: Omit<Book, 'id'>): void {
    this.booksSignal.update(books => [
      ...books,
      { ...newBook, id: Math.max(0, ...books.map(b => b.id)) + 1 }
    ]);
  }
}
