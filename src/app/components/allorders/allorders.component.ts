import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserData } from './../../interfaces/user-data';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  constructor(private _CartService: CartService) {}
  ngOnInit(): void {
    this.getAllOrders();
  }

  allProducts: any;
  productDetails: any;
  userId: string = '';
  decodeToken() {
    if (localStorage.getItem('token') != null) {
      let encodeToken: any = localStorage.getItem('token');
      let decodeToken = jwtDecode(encodeToken);
      let userData: any = decodeToken;
      this.userId = userData.id;
    }
  }

  getAllOrders() {
    this.decodeToken();
    this._CartService.getAllOrder(this.userId).subscribe({
      next: (response) => {
        this.allProducts = response;
        console.log(this.allProducts);
      },
    });
  }
}
