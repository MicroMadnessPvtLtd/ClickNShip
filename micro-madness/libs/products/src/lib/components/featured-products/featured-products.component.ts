import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductsService } from '@micro-madness/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  count = 4;
  featuredProducts: Product[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getFeaturedProducts(): void {
    this.productsService.getFeaturedProductsCount(this.count).pipe(takeUntil(this.endsubs$)).subscribe((products) => {
      this.featuredProducts = products;
    }, (err) => {
      console.log(err);
    });
  }

}
