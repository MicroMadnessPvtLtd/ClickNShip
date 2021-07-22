import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@micro-madness/products';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit {

  count = 4;
  featuredProducts: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  private _getFeaturedProducts(): void {
    this.productsService.getFeaturedProductsCount(this.count).subscribe((products) => {
      this.featuredProducts = products;
    }, (err) => {
      console.log(err);
    });
  }

}
