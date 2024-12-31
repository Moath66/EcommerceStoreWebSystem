import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/service/auth.service';
import { SpinnerService } from '../../../shared/service/spinner.service';
import { AlertService } from '../../../shared/service/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
   imports : [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService : AuthService, private alertService: AlertService,private spinner :SpinnerService, private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {

      this.spinner.show();
           if(this.loginForm.value.email == "Eadmin@gmail.com" && this.loginForm.value.password == "Admin12345"){
             localStorage.setItem("token", "admin123");
             if(localStorage.getItem("token")){
              this.router.navigate(['admin/dashboard']);
             }

           }

      this.authService.login(this.loginForm.value).subscribe({
        next: (response)=>{
          console.log(response , 'login res');
          localStorage.setItem('name',response.username);
          localStorage.setItem('token', 'token123');
          this.router.navigate(['/home']);
          this.alertService.success('Login successful',5000);
          this.spinner.hide();

        }, error :()=>{
          this.spinner.hide();
          this.alertService.error('Invalid username or password',5000);

        }}

      );
    }
  }

}
