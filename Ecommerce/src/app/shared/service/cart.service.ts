import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any>([]);
  cartItems$ = this.cartItems.asObservable();

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  addToCart(product: any) {
    const currentItems = this.cartItems.value;
    const itemExist = currentItems.find((item: any) => item.id === product.id);
    if(itemExist) {
      itemExist.quantity += 1;
      } else {
        currentItems.push({ ...product, quantity: 1 });
    this.cartItems.next(currentItems);
    this.cartCount.next(currentItems.length);
  }
}
updateCartItems(items: any) {
  this.cartItems = items;
  this.cartItems.next(this.cartItems);
  this.cartCount.next(items.length);
}

  getCartItems() {
    return this.cartItems.value;
  }
  getCartCount() {
    return this.cartCount.value;
  }
}
