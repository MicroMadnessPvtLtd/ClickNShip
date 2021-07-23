import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { }

  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (!cart) {
      const initialCart = {
        items: []
      };
      const stringifiedInitialCart = JSON.stringify(initialCart)
      localStorage.setItem(CART_KEY, stringifiedInitialCart);
    } else {
      this.cart$.next(cart);
    }
  }

  getCart() : Cart {
    const localCart = localStorage.getItem(CART_KEY);
    const cart: Cart = JSON.parse(localCart);
    return cart;
  }

  setCartItem(cartItem: CartItem) : Cart {
    const cart: Cart = this.getCart();
    const cartItemExists = cart.items?.find((item) => item.productId === cartItem.productId);
    if (cartItemExists) {
      cart?.items?.map((item) => {
        if (item.productId === cartItem.productId) {
          item.quantity = item?.quantity + cartItem?.quantity;
        }
      });
    } else {
      cart.items?.push(cartItem);
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
    return cart;
  }
}
