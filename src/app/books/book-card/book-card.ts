import { Component, input, output } from '@angular/core';
import { Book } from '../../book/book';
import { RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  imports: [RouterLink, DatePipe, TitleCasePipe],
  selector: 'app-book-card',
  styleUrl: './book-card.css',
  templateUrl: './book-card.html',
})
export class BookCard {
  book = input.required<Book>();
  toggleRead = output<number>();
  remove = output<number>();

  protected onToggleClick() {
    this.toggleRead.emit(this.book().id);
  }

  protected onRemoveClick() {
    this.remove.emit(this.book().id);
  }
}
