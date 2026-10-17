import { inject, Service, signal } from '@angular/core';
import { Book } from '../book/book';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Service()
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/books';

  private readonly booksSignal = signal<Book[]>([]);
  private readonly loadingSignal = signal(true);
  private readonly errorSignal = signal<string | null>(null);

  readonly books = this.booksSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  constructor() {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<Book[]>(this.apiUrl).subscribe({
      next: books => {
        this.booksSignal.set(books);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set("Could not load your books. Is the API running on port 3000 ?");
        this.loadingSignal.set(false);
      },
    });
  }

  toggleRead(id: number): void {
    const book = this.booksSignal().find(b => b.id === id);
    if (!book) return;

    this.errorSignal.set(null);
    this.http
      .patch<Book>(`${this.apiUrl}/${id}`, { read: !book.read })
      .subscribe({
        next: updated => {
          this.booksSignal.update(books =>
            books.map(b => (b.id === id ? updated : b))
          );
        },
        error: () => {
          this.errorSignal.set("Could not update the book. Please try again.");
        },
      });
  }

  addBook(newBook: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, newBook).pipe(
      tap(created => {
        this.booksSignal.update(books => [...books, created])
      })
    );
  }

  updateBook(id: number, changes: Partial<Pick<Book, 'title' | 'author'>>): Observable<Book> {
    return this.http.patch<Book>(`${this.apiUrl}/${id}`, changes).pipe(
      tap(updated => {
        this.booksSignal.update(books =>
          books.map(b => (b.id === id ? updated : b))
        );
      })
    );
  }

  deleteBook(id: number): void {
    this.errorSignal.set(null);
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.booksSignal.update(books => books.filter(b => b.id !== id));
      },
      error: () => {
        this.errorSignal.set("Could not delete the book. Please try again.");
      },
    })
  }
}
