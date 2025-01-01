import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { SpinnerService } from '../../../shared/service/spinner.service';
import { ProductService } from '../../../shared/service/product.service';
import {NgxPaginationModule} from 'ngx-pagination';
@Component({
  selector: 'app-get-products',
  standalone: true,
  imports: [CommonModule ,NgxPaginationModule],
  templateUrl: './get-products.component.html',
  styleUrl: './get-products.component.css'
})
export class GetProductsComponent  implements  OnInit {

  public products:any ;
  p: number = 1;
 public selectedProductId: any = null;

 constructor(private productService : ProductService,private spinner :SpinnerService, private router : Router) { }

 ngOnInit(): void {
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

 confirmDelete(productId: string): void {
   this.selectedProductId = productId;
 }

 deleteProduct(): void {
   this.spinner.show();
   this.productService.deleteProduct(this.selectedProductId).subscribe(
    (res:any)=>{
       this.spinner.hide();
       this.selectedProductId = null;
       this.getProducts();
        console.log(res);
    })
 }

 cancelDelete(): void {
   this.selectedProductId = null;
 }

 editProduct(productData:any){
   this.productService.changeProduct(productData);
   this.router.navigate(['admin/addproducts']);

 }

}
