import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5050/product';

  constructor(private http: HttpClient) { }

  private productAddedSource = new Subject<void>();

  productAdded$ = this.productAddedSource.asObservable();

  announceProductAdded() {
    this.productAddedSource.next();
  }

  
  postProduct(data:any):Observable<any>{
    return this.http.post<any>(this.apiUrl,data);
  }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
}

getProductById(productId: number): Observable<Product> {
  return this.http.get<Product>(`${this.apiUrl}/${productId}`);
}
}
