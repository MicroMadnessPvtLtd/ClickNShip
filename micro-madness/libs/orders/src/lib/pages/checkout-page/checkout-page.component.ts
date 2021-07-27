import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, CartService, Order, OrderItem, OrdersService, ORDER_STATUS } from '@micro-madness/orders';
import * as countriesLib from 'i18n-iso-countries';

declare const require : any;

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}
  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId = '609d65943373711346c5e950';
  countries: any[] = [];

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCartItems() {
    const cart: Cart= this.cartService.getCart();
    this.orderItems = cart.items?.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
  }

  backToCartPage() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      state: 'TN',
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    }
    
    this.ordersService.createOrder(order).subscribe(() => {
      // redirect to thank you page
      console.log('Saved Successfully');
      this.cartService.emptyCart();
      this.router.navigate(['/success']);
    }, (err) => {
      console.log(err);
    })
  }

  private _getCountries() {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry => {
      return {
        id: entry[0],
        name: entry[1]
      }
    })
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

}
