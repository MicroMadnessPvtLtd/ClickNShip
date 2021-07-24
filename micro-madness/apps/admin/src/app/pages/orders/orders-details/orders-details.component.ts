import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService, Order } from '@micro-madness/orders';
import { ORDER_STATUS } from '../order.constants';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-orders-details',
  templateUrl: './orders-details.component.html',
  styles: [
  ]
})
export class OrdersDetailsComponent implements OnInit{
  order!: Order;
  orderId = '';
  address = '';
  orderStatuses = [];
  selectedStatus: any;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._getOrderId();
    this._mapOrderStatus();
    this._getOrder();
  }

  getMultipliedValue(price: any, quantity: any) {
    return price * quantity;
  }

  onStatusChange(event: any) {
    this.ordersService.updateOrder({status: event.value}, this.orderId).subscribe(order => {
      this.order = order;
      this.selectedStatus = order.status;
      this.messageService.add(
        {
          severity:'success', 
          summary:'Success', 
          detail:'Order Status Updated Successfully'
        }
      );
    }, (error) => {
      this.messageService.add(
        {
          severity:'error', 
          summary:'Error', 
          detail:'Something happened wrong. Please try again. If the issue remains, please contact support.'
        }
      );
    });
  }

  private _getOrder() {
    if (this.orderId !== '') {
      this.ordersService.getOrder(this.orderId).subscribe(order => {
        this.order = order;
        this.selectedStatus = order.status;
        this.address = `${order.shippingAddress1}, <br /> ${order.shippingAddress2}, <br /> ${order.city}, <br /> Zip: ${order.zip}, ${order.country}`;    
      })
    }
  }

  private _getOrderId() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.orderId = params.id;
      }
    })
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
    console.log(this.orderStatuses);
  }

}
