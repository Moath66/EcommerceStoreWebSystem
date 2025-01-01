import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpinnerService } from '../../shared/service/spinner.service';
import { ProductService } from '../../shared/service/product.service';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchFilterPipe } from '../../shared/Pipes/search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../shared/service/category.service';
import { error } from 'console';
import { CartService } from '../../shared/service/cart.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink ,FormsModule, CommonModule ,NgxPaginationModule,SearchFilterPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
          p:number = 1 ;
          searchText = '';
  constructor(private categoryService:CategoryService, private cartService: CartService ,private productService : ProductService,private spinner :SpinnerService ) { }
  products : any;
  categories:any ;
  ngOnInit(): void {
    this.loadCategories();
    this.getProducts();
  }

  getProducts(): void {
         this.spinner.show();
         this.productService.getProducts().subscribe(
          (res:any)=>{
            this.products = res;
            this.spinner.hide();
            console.log(this.products , 'products');
          });
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  getProductByCat(item:any){
    this.spinner.show();
    this.productService.getProductsByCat(item._id).subscribe({
      next:(res)=>{
        this.products = res;
        this.spinner.hide();
              console.log(res);
      },
      error:(err)=>{
          console.log(err);
      }
    })
  }


  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next:(res:any)=>{
        this.categories = res ;
       },
      error:(err:any)=>{
         console.log(err);
      }
    });
  }
}
