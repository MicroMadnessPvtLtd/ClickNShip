import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@micro-madness/orders';
import { ProductsService } from '@micro-madness/products';
import { UsersService } from '@micro-madness/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  statistics: any[] = [];

  constructor(
    private usersService: UsersService,
    private ordersService: OrdersService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this._getStatistics();
  }

  private _getStatistics() {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productsService.getProductsCount(),
      this.usersService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).subscribe((values) => {
      this.statistics = values;
    })
  }

}
