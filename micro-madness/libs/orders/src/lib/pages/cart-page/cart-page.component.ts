import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@micro-madness/orders';
import { ProductsService } from '@micro-madness/products';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit {

  constructor(private router: Router, private cartService: CartService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }


  backToShop(): void {
    this.router.navigate(['/products']);
  }

  deleteCartItem() {
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe().subscribe((resp) => {
      resp.items?.forEach(cartItem => {
        this.productsService.getProduct(cartItem.productId).subscribe((product) => {
          console.log(product);
        })
      })
    })
  }
}
