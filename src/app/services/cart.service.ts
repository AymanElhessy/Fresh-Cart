import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Checkout } from '../interfaces/checkout';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartNum: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private _HttpClient: HttpClient) {
    this.getUserCart().subscribe({
      next: (res) => {
        this.cartNum.next(res.numOfCartItems);
      },
    });
  }
  apiUrl: string = 'https://ecommerce.routemisr.com';

  addProductToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}/api/v1/cart`, {
      productId: productId,
    });
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}/api/v1/cart`);
  }

  removeProduct(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}/api/v1/cart/${productId}`);
  }

  updateCartProduct(productId: string, newCount: number): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}/api/v1/cart/${productId}`, {
      count: `${newCount}`,
    });
  }

  removerAllProduct(): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}/api/v1/cart`);
  }

  checkOut(cartId: string | null, userData: Checkout): Observable<any> {
    return this._HttpClient.post(
      `${this.apiUrl}/api/v1/orders/checkout-session/${cartId}?url=https://kawther987.github.io/freshCart`,
      {
        shippingAddress: userData,
      }
    );
  }
  cashPay(cartId: string | null, userData: Checkout): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}/api/v1/orders/${cartId}`, {
      shippingAddress: userData,
    });
  }

  getAllOrder(userId: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}/api/v1/orders/user/${userId}`);
  }
}
