import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartItem, CartService } from '@micro-madness/orders';
import { Product, ProductsService } from '@micro-madness/products';
import { MessageService } from 'primeng/api';

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
  countInStock = 0;

  constructor(
    private productsService: ProductsService, 
    private route: ActivatedRoute,
    private cartService: CartService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._getProduct();
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    };
    console.log(cartItem);
    this.cartService.setCartItem(cartItem);
    this.messageService.add(
      {
        severity:'success', 
        summary:'Success', 
        detail:`Product added to cart Successfully`
      }
    );
  }

  private _getProduct() {
    this.route.params.subscribe((params) => {
      if (params.productid) {
        this.productsService.getProduct(params.productid).subscribe((product) => {
          console.log(product);
          this.product = product;
          this.countInStock = product.countInStock;
          console.log(this.countInStock);
        }, (err) => {
          console.log(err);
        })
      }
    })
  }

}
