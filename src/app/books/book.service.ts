import { inject, Service, signal } from '@angular/core';
import { Book } from '../book/book';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Service()
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/books';

  private readonly booksSignal = signal<Book[]>([]);
  readonly books = this.booksSignal.asReadonly();

  constructor() {
    this.loadBooks();
  }

  loadBooks(): void {
    this.http.get<Book[]>(this.apiUrl).subscribe(books => {
      this.booksSignal.set(books);
    });
  }

  toggleRead(id: number): void {
    const book = this.booksSignal().find(b => b.id === id);
    if (!book) return;

    this.http
      .patch<Book>(`${this.apiUrl}/${id}`, { read: !book.read })
      .subscribe(updated => {
        this.booksSignal.update(books =>
          books.map(b => (b.id === id ? updated : b))
        );
      });
  }

  addBook(newBook: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, newBook).pipe(
      tap(created => {
        this.booksSignal.update(books => [...books, created])
      })
    );
  }
}
