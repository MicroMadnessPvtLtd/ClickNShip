import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@micro-madness/orders';
import { ProductsService } from '@micro-madness/products';
import { UsersService } from '@micro-madness/users';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  statistics: any[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private usersService: UsersService,
    private ordersService: OrdersService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this._getStatistics();
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getStatistics() {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productsService.getProductsCount(),
      this.usersService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).pipe(takeUntil(this.endsubs$)).subscribe((values) => {
      this.statistics = values;
    })
  }

}
