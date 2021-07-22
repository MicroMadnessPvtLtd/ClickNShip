import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsService } from '@micro-madness/products';

@Component({
  selector: 'products-product-details',
  templateUrl: './product-details.component.html',
  styles: [
  ]
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  rating = 5;
  disabled = true;
  isCancel = false;
  quantity = 1;

  constructor(
    private productsService: ProductsService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._getProduct();
  }

  addProductToCart() {

  }

  private _getProduct() {
    this.route.params.subscribe((params) => {
      if (params.productid) {
        this.productsService.getProduct(params.productid).subscribe((product) => {
          console.log(product);
          this.product = product;
        }, (err) => {
          console.log(err);
        })
      }
    })
  }

}
