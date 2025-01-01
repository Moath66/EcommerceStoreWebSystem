

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { RegistrationComponent } from './pages/Auth/registration/registration.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import {AuthGuard} from './shared/Guard/auth.guard';
import { GetUsersComponent } from './pages/admin/get-users/get-users.component';
  export const routes: Routes = [
    {
      path: '',
      component: DefaultLayoutComponent,
      children: [
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        {path: 'login' , component: LoginComponent},
        {path: 'register' , component: RegistrationComponent}
      ]
    },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
    { path: 'cart' , component : CartComponent ,canActivate: [AuthGuard]},
    {path : 'addproduct', component : AddProductComponent, canActivate: [AuthGuard]},
    {path : 'myproduct', component : MyProductsComponent, canActivate: [AuthGuard]},
    // {path: 'checkout' , component: CheckoutComponent,canActivate: [AuthGuard]},

   ]
  },{
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
      {path : 'addproducts', component : AddProductComponent,canActivate: [AuthGuard]},
      {path : 'addcategory', component : AddCategoriesComponent,canActivate: [AuthGuard]},
      {path : 'users', component : GetUsersComponent,canActivate: [AuthGuard]}
    ]

  }

];

