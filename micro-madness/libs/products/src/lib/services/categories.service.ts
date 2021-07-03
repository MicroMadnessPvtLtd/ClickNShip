import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiUrlPrefix = environment.apiURL;

  constructor(private http: HttpClient) { }

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrlPrefix}categories/`);
  }

  getCategory(categoryId: string) : Observable<Category> {
    return this.http.get<Category>(`${this.apiUrlPrefix}categories/${categoryId}`);
  }

  createCategory(category: Category) : Observable<Category> {
    return this.http.post<Category>(`${this.apiUrlPrefix}categories/`, category);
  }

  updateCategory(category: Category) : Observable<Category> {
    return this.http.put<Category>(`${this.apiUrlPrefix}categories/${category.id}`, category);
  }

  deleteCategory(categoryId: string) : Observable<unknown> {
    return this.http.delete<unknown>(`${this.apiUrlPrefix}categories/${categoryId}`);
  }
}
