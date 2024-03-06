import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ApiDataService } from 'src/app/services/api-data.service';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css'],
})
export class HomeProductsComponent implements OnInit, OnDestroy {
  supscribeId!: Subscription;
  constructor(
    private _ApiDataService: ApiDataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishListService: WishListService
  ) {}
  products!: Product[];
  wishListData: string[] = [];
  searchTerm: string = '';

  getAllProducts(): void {
    this.supscribeId = this._ApiDataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  addCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message, 'Fresh Cart');
        this._CartService.cartNum.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  displayUserWishList(): void {
    this._WishListService.getUserWishList().subscribe({
      next: (response) => {
        const newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
      },
    });
  }

  addToWishList(id: string): void {
    this._WishListService.addToWishList(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message, response.status);
        this._WishListService.favNum.next(response.data.length);
        this.wishListData = response.data;
        console.log(response);
      },
    });
  }

  removeFav(id: string) {
    this._WishListService.removeWishList(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.error(response.message, response.status);
        this._WishListService.favNum.next(response.data.length);
        this.wishListData = response.data;
      },
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.displayUserWishList();
  }

  ngOnDestroy(): void {
    this.supscribeId.unsubscribe();
  }
}
