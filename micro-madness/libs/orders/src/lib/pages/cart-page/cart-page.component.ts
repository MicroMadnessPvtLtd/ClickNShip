import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetails, CartService, OrdersService } from '@micro-madness/orders';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItemDetails: CartItemDetails[] = [];
  cartCount = 0;
  endsubs$: Subject<any> = new Subject();

  constructor(private router: Router, private cartService: CartService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }


  backToShop(): void {
    this.router.navigate(['/products']);
  }

  deleteCartItem(item: CartItemDetails) {
    this.cartService.deleteCartItem(item.product.id);
  }

  updateCartItemQuantity(event: any, item: CartItemDetails) {
    this.cartService.setCartItem({
      productId: item.product.id,
      quantity: event.value
    }, true);
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endsubs$)).subscribe((resp) => {
      this.cartItemDetails = [];
      this.cartCount = resp.items?.length ?? 0;
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
