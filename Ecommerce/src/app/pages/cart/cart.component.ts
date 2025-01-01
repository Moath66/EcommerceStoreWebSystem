import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../shared/service/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink , CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  totalAmount: any = 0;

  constructor(private cartService: CartService , private router: Router) {}

    ngOnInit(): void {
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;

        this.calculateTotal();
      });
    }
    calculateTotal() {
      this.totalAmount = this.cartItems.reduce((acc, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return acc + (price * quantity);
      }, 0);
    }
    removeFromCart(index: number) {
      this.cartItems.splice(index, 1);
      this.cartService.updateCartItems(this.cartItems);
    }
    increaseQuantity(item: any) {
      item.quantity++;
      this.calculateTotal();
    }


    decreaseQuantity(item: any) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.removeFromCart(this.cartItems.indexOf(item));
      }
      this.calculateTotal();
    }

  checkoutPage(){
    this.router.navigate(['/checkout'])
  }
}
