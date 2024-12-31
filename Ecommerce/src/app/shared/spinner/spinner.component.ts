import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../service/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit, OnDestroy {
  showSpinner = false;
  public subscription!: Subscription;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.subscription = this.spinnerService.spinnerState.subscribe((state: boolean) => {
      this.showSpinner = state;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
