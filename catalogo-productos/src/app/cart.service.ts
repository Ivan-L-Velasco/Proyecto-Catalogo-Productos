import { Injectable } from '@angular/core';
import { Product } from './product.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(product: Product): void {
    this.cart.push(product);
    this.cartItemCount.next(this.cart.length);
  }

  getCart(): Product[] {
    return this.cart;
  }

  getCartItemCount(): number {
    return this.cart.length;
  }

  getCartItemCountObservable() {
    return this.cartItemCount.asObservable();
  }
}
