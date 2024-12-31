import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProductService } from '../../../shared/service/product.service';
import { SpinnerService } from '../../../shared/service/spinner.service';
import { CategoryService } from '../../../shared/service/category.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  selectedFile: any;
  categories: any;
  updatedproduct:any;
  title:string = 'Add Product';
  existingImageUrl: any;

  constructor(private fb: FormBuilder ,private categoryService: CategoryService,
    private router : Router ,
    private productService : ProductService,private spinner: SpinnerService) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      img: [''],
      categories: ['', [Validators.required]] ,
      contactno: ['', [Validators.required]] ,
      size: [''],
      color: [''],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }
  ngOnInit(): void {
    this.loadCategories();
    this.productService.currentProduct.subscribe(product => {
      if (product) {
        this.title = 'update product';
        console.log(product , 'set product value');
        this.updatedproduct = product;
        this.existingImageUrl = product.img;
        this.productForm.patchValue({

          title: product.title,
          description: product.description,
          img :  '' ,
          categories : product.categories[0].name ,
          size : product.size,
          color : product.color,
          price: product.price,
          contactno : product.contactno
        });
      }else{
        this.title = 'add product';
      }
    });
  }


  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }



  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
        this.spinner.show();
        if(this.updatedproduct && this.updatedproduct._id != null){

          const userId:any = localStorage.getItem('userId');
          const formData = new FormData();
          formData.append('title', this.productForm.get('title')?.value);
          formData.append('description', this.productForm.get('description')?.value);
          formData.append('categories', this.productForm.get('categories')?.value);
          formData.append('size', this.productForm.get('size')?.value);
          formData.append('color', this.productForm.get('color')?.value);
          formData.append('price', this.productForm.get('price')?.value);
          formData.append('contactno', this.productForm.get('contactno')?.value);
          formData.append('userId', userId);
          if(this.selectedFile){
            formData.append('image', this.selectedFile);
          }else{
            formData.append('image', this.existingImageUrl);
          }


          this.productService.updateProduct(this.updatedproduct._id,formData).subscribe( {
            next: (res) => {
               this.spinner.hide();
               this.productForm.reset();
               this.router.navigate(['/myproduct']);
               alert("product updated successfully");
              console.log(res)
            },
            error: (e) => {
              this.spinner.hide();
              console.error(e)
            }
    });

        }else{
          const userId:any = localStorage.getItem('userId');
          const formData = new FormData();
          formData.append('title', this.productForm.get('title')?.value);
          formData.append('description', this.productForm.get('description')?.value);
          formData.append('categories', this.productForm.get('categories')?.value);
          formData.append('size', this.productForm.get('size')?.value);
          formData.append('color', this.productForm.get('color')?.value);
          formData.append('price', this.productForm.get('price')?.value);
          formData.append('contactno', this.productForm.get('contactno')?.value);
          formData.append('userId', userId);
          formData.append('image', this.selectedFile);
        this.productService.addProduct(formData).subscribe( {
         next: (res) => {
            this.spinner.hide();
            this.productForm.reset();
            this.router.navigate(['/myproduct']);
            alert("product add successfully");
           console.log(res)
         },
         error: (e) => {
           this.spinner.hide();
           console.error(e)
         }
 });
        }

    }
  }



}
