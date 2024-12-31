import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();
  private timeout: any;
  getAlert() {
    return this.subject.asObservable();
  }
  success(message: string, duration: number = 5000) {
    this.clearTimeout();
    this.subject.next({ type: 'success', text: message });
    this.setTimeout(duration);
  }

  error(message: string, duration: number = 5000) {
    this.clearTimeout();
    this.subject.next({ type: 'error', text: message });
    this.setTimeout(duration);
  }

  clear() {
    this.subject.next(null);
  }

  private setTimeout(duration: number) {
    this.timeout = setTimeout(() => {
      this.clear();
    }, duration);
  }

  private clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

}
