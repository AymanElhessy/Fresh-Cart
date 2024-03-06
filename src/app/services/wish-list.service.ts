import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  favNum: BehaviorSubject<number> = new BehaviorSubject(0);

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';
  constructor(private _httpClient: HttpClient) {
    this.getUserWishList().subscribe({
      next: (res) => {
        this.favNum.next(res.count);
      },
    });
  }

  addToWishList(productId: string): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}wishlist`, {
      productId: productId,
    });
  }

  getUserWishList(): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}wishlist`);
  }

  removeWishList(productId: string): Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}wishlist/${productId}`);
  }
}
