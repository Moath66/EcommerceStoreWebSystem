import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service';
import { SpinnerService } from '../../../shared/service/spinner.service';
@Component({
  selector: 'app-registration',
  standalone: true,
 imports : [ReactiveFormsModule,RouterLink, FormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService , private spinner : SpinnerService) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isAdmin: [false]
    });
  }
  ngOnInit(): void {

  }

  get username() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.spinner.show();
      this.authService.register(this.registrationForm.value).subscribe(  {
          next: (res) =>  { console.log(res)
            this.spinner.hide();
           },
          error: (e) => {
            console.error(e)
            this.spinner.hide();
          },
          complete: () => console.info('complete')
      })


    }
  }
}
