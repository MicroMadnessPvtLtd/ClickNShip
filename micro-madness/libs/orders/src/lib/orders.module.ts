import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { BadgeModule } from 'primeng/badge';

import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';

export const ordersRoutes: Route[] = [];

@NgModule({
    imports: [
      CommonModule, 
      RouterModule,
      BadgeModule
    ],
    declarations: [
      CartIconComponent
    ],
    exports: [
      CartIconComponent
    ]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
