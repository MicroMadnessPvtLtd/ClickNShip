import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetails, CartService, OrdersService } from '@micro-madness/orders';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit {

  cartItemDetails: CartItemDetails[] = [];

  constructor(private router: Router, private cartService: CartService, private ordersService: OrdersService) { }

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
        this.ordersService.getProduct(cartItem.productId).subscribe((product) => {
          console.log(product);
          this.cartItemDetails.push({
            product: product,
            quantity: cartItem.quantity
          })
        })
      })
    })
  }
}
