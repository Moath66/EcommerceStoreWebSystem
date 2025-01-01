import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit {

       constructor(private router : Router) {}
  ngOnInit(): void {

  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);

  }

}
