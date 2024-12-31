import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/product';  // Update with your API URL
  private productSource = new BehaviorSubject<any>(null);
  currentProduct = this.productSource.asObservable();

  constructor(private http: HttpClient) { }

  changeProduct(product: any) {
    this.productSource.next(product);
  }

  addProduct(data:any){
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/create`,data , {headers});
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getProductsByCat(categoryId:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/category/${categoryId}`);
  }
  getProductsByUserid(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  updateProduct(id: string, formData: FormData): Observable<any> {

    return this.http.put(`${this.apiUrl}/update/${id}`,formData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Add other methods for editing products as needed
}
