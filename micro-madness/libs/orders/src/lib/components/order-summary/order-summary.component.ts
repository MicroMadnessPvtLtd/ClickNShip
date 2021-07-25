import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, OrdersService } from '@micro-madness/orders';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styles: [
  ]
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  totalPrice = 0;
  endsubs$: Subject<any> = new Subject();
  isCheckout = false;

  constructor(private cartService: CartService, private ordersService: OrdersService, private router: Router) { }

  ngOnInit(): void {
    this._getOrderSummary();
    this.router.url.includes('checkout') ? this.isCheckout = true : this.isCheckout = false;
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  gotoCheckOutPage() {
    this.router.navigate(['/checkout']);
  }

  private _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endsubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.ordersService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity;
            });
        });
      }
    });
  }

}
