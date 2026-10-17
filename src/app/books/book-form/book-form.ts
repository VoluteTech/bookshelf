import { Component, computed, effect, inject, input, signal } from '@angular/core';
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
  id = input<string>();

  private readonly fb = inject(FormBuilder);
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);

  protected readonly saving = signal(false);
  protected readonly submitError = signal<string | null>(null);
  protected readonly loading = this.bookService.loading;

  protected readonly isEdit = computed(() => this.id() !== undefined);

  protected readonly book = computed(() => {
    const id = this.id();
    return id === undefined
      ? undefined
      : this.bookService.books().find(b => b.id === Number(id));
  });

  protected readonly submitLabel = computed(() => {
    if (this.saving()) return 'Saving...';
    return this.isEdit() ? 'Save changes' : 'Add book';
  });

  protected readonly bookForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    author: ['', [Validators.required]],
  });

  constructor() {
    effect(() => {
      const book = this.book();
      if (book && this.bookForm.pristine) {
        this.bookForm.patchValue({ title: book.title, author: book.author });
      }
    });
  }

  protected onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.submitError.set(null);

    const { title, author } = this.bookForm.getRawValue();
    const id = this.id();

    const request$ = id !== undefined
      ? this.bookService.updateBook(Number(id), { title, author })
      : this.bookService.addBook({ title, author, read: false });

    request$.subscribe({
      next: () => this.router.navigate(id !== undefined ? ['/books', id] : ['/']),
      error: () => {
        this.saving.set(false);
        this.submitError.set("Could not save the book. Please try again.");
      },
    });
  }
}
