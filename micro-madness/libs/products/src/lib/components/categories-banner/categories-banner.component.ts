import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@micro-madness/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit, OnDestroy{

  categories: Category[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((categories) => {
      this.categories = categories;
    }, (err) => {
      console.log(err);
    })
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

}
