import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../shared/service/category.service';
import { SpinnerService } from '../../../shared/service/spinner.service';
import { AlertService } from '../../../shared/service/alert.service';
import {NgxPaginationModule} from 'ngx-pagination';
@Component({
  selector: 'app-add-categories',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule ,NgxPaginationModule],
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css'
})
export class AddCategoriesComponent  implements OnInit {
  categories: any[] = [];
  p:number = 1;
  categoryId:any ;
  public title = "Add Category"
  category = {
    name: '',
    description: ''
  };

  constructor(private categoryService: CategoryService ,private spinner : SpinnerService , private alert : AlertService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.spinner.show();
    this.categoryService.getCategories().subscribe(
      (      data: any[]) => {
        this.categories = data;
        this.spinner.hide();
        this.alert.success("Categories get Successfully!",3000)
      },
      (      error: any) => {
        this.spinner.hide();
        this.alert.error("Something went wrong!", 3000)
        console.error('Error fetching categories', error);
      }
    );
  }

  addCategory(): void {
    this.spinner.show();

    if(this.categoryId != null && this.categoryId !== ""){
      this.title = "Update Category"
      this.categoryService.updateCategory(this.categoryId, this.category).subscribe(
        {
         next:(res:any)=>{
          this.category = { name: '', description: '' }; // Reset the form
          this.categoryId = '';
           this.getCategories(); // Refresh the list
           this.alert.success("Categories update Successfully!",3000);
           this.title = "Add Category"
         },
         error:(error:any)=>{
           this.alert.error("something went wrong!",3000)
           console.error('Error updating category', error);
         }
        }
       );
    }else{
      this.categoryService.addCategory(this.category).subscribe({
        next:(res)=>{
          this.getCategories(); // Refresh the list
          this.category = { name: '', description: '' }; // Reset the form
          this.spinner.hide();
          this.alert.success("Categories add Successfully!",3000)
        },
        error:(error)=>{
          this.spinner.hide();
          console.error('Error adding category', error);
          this.alert.error("Something went wrong!", 3000)
        }
      }

      );
    }

  }

  updateCategory(id: string,category:any): void {
    this.title = "update category";
       this.categoryId = id ;
       this.category = category;


  }

  deleteCategory(id: string): void {
    this.spinner.show();
    this.categoryService.deleteCategory(id).subscribe(
      (      response: any) => {
        this.getCategories(); // Refresh the list
        this.spinner.hide();
      },
      (      error: any) => {
        console.error('Error deleting category', error);
        this.spinner.hide();
      }
    );
  }
}
