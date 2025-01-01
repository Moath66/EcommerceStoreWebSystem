import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
   public name:any = '';
  cartCount: any = 0;
         constructor(private router : Router ,private cartService: CartService){}
  ngOnInit(): void {
   this.name =  localStorage.getItem('name');
   this.cartService.cartCount$.subscribe(count => {
    this.cartCount = count;
  });
  }
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownOpen = false;
    }
  }


  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
      this.router.navigate(['/login']);
  }
}
