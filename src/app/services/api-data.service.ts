import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {
  baseUrl = 'https://ecommerce.routemisr.com';
  constructor(private _HttpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products`);
  }

  getProductDetails(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${id}`);
  }

  getAllCategories(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`);
  }

  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands`);
  }

  getSpecificCategory(categoryId: string): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/api/v1/categories/${categoryId}/subcategories`
    );
  }
  getSpecificBrand(brandId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands/${brandId}`);
  }
}
