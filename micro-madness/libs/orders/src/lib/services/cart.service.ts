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

  emptyCart() {
    const initialCart = {
      items: []
    };
    const stringifiedInitialCart = JSON.stringify(initialCart)
    localStorage.setItem(CART_KEY, stringifiedInitialCart);
    this.cart$.next(initialCart);
  }

  getCart() : Cart {
    const localCart = localStorage.getItem(CART_KEY);
    const cart: Cart = JSON.parse(localCart);
    return cart;
  }

  setCartItem(cartItem: CartItem, updateCartItem?:boolean) : Cart {
    const cart: Cart = this.getCart();
    const cartItemExists = cart.items?.find((item) => item.productId === cartItem.productId);
    if (cartItemExists) {
      cart?.items?.map((item) => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item?.quantity + cartItem?.quantity;
          }
        }
      });
    } else {
      cart.items?.push(cartItem);
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId: string) {
    const cart: Cart = this.getCart();
    console.log(cart);
    console.log(productId);
    const newCart = cart.items.filter((item) => item.productId !== productId);
    console.log(newCart);
    cart.items = newCart;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
  }
}
