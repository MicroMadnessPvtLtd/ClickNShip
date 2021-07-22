import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrlPrefix = environment.apiURL;

  constructor(private http: HttpClient) { }

  getProducts(selectedCategories? : string[]) : Observable<Product[]> {
    let params = new HttpParams();
    if (selectedCategories) {
      params = params.append('categories', selectedCategories.join(','));
    }
    return this.http.get<Product[]>(`${this.apiUrlPrefix}products/`, {params: params});
  }

  getProduct(productId: string) : Observable<Product> {
    return this.http.get<Product>(`${this.apiUrlPrefix}products/${productId}`);
  }

  createProduct(product: FormData) : Observable<Product> {
    return this.http.post<Product>(`${this.apiUrlPrefix}products/`, product);
  }

  updateProduct(product: FormData, productId: string) : Observable<Product> {
    return this.http.put<Product>(`${this.apiUrlPrefix}products/${productId}`, product);
  }

  deleteProduct(productId: string) : Observable<unknown> {
    return this.http.delete<unknown>(`${this.apiUrlPrefix}products/${productId}`);
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlPrefix}products/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProductsCount(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrlPrefix}products/get/featured/${count}`)    
  }
}
