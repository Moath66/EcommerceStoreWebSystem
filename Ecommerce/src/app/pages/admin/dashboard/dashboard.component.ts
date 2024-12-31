import { Component } from '@angular/core';
import { GetUsersComponent } from '../get-users/get-users.component';
import { GetProductsComponent } from '../get-products/get-products.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GetUsersComponent , GetProductsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
