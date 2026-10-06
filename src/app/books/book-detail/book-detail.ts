import { Component, computed, inject, input } from '@angular/core';
import { BookService } from '../book.service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-book-detail',
  styleUrl: './book-detail.css',
  templateUrl: './book-detail.html',
})
export class BookDetail {
  id = input.required<string>();
  private readonly bookService = inject(BookService);

  protected readonly book = computed(() =>
    this.bookService.books().find(b => b.id === Number(this.id()))
  );
}
