import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-book-form',
  styleUrl: './book-form.css',
  templateUrl: './book-form.html',
})
export class BookForm {
  private readonly fb = inject(FormBuilder);
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);

  protected readonly bookForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    author: ['', [Validators.required]],
  });

  protected onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }
    const { title, author } = this.bookForm.getRawValue();
    this.bookService.addBook({ title, author, read: false }).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
