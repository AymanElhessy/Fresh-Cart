import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  cartDetails: Cart = {} as Cart;
  displayCart() {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartDetails = response;
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(id: string): void {
    this._CartService.removeProduct(id).subscribe({
      next: (response) => {
        this.cartDetails = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  changeCount(id: string, count: number): void {
    if (count > 0) {
      this._CartService.updateCartProduct(id, count).subscribe({
        next: (response) => {
          this.cartDetails = response;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this._ToastrService.error("Can't decrease any more...", 'Ooooops');
    }
  }

  removeItems(): void {
    this._CartService.removerAllProduct().subscribe({
      next: (response) => {
        this._ToastrService.success(
          'All products are removed',
          response.message
        );
        this.cartDetails = response;
      },
    });
  }
  ngOnInit(): void {
    this.displayCart();
  }
}
