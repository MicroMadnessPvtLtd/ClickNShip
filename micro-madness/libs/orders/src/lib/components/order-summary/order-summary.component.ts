import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(private cartService: CartService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
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
