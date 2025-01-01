import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../shared/service/product.service';
import { SpinnerService } from '../../shared/service/spinner.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent implements  OnInit {

   public products:any ;

  public selectedProductId: any = null;

  constructor(private productService : ProductService,private spinner :SpinnerService, private router : Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
         this.spinner.show();
         const userId:any = localStorage.getItem('userId');
         this.productService.getProductsByUserid(userId).subscribe({
           next: (response) => {
              this.products = response;
              console.log(response , 'my products');
              this.spinner.hide();
              console.log(response , 'res');
          },
          error: (error) => {
            console.log(error);
            this.spinner.hide();
            }});
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
    this.router.navigate(['/addproduct']);

  }

}
