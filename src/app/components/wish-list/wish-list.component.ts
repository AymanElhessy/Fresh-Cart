import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  constructor(
    private _WishListService: WishListService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  products!: Product[];
  wishListData: string[] = [];

  displayUserWishList(): void {
    this._WishListService.getUserWishList().subscribe({
      next: (response) => {
        console.log(response);
        this.products = response.data;
        const newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
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
  addToWishList(id: string): void {
    this._WishListService.addToWishList(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message, response.status);
        this._WishListService.favNum.next(response.count);
        this.wishListData = response.data;
      },
    });
  }

  removeFav(id: string) {
    this._WishListService.removeWishList(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.error(response.message, response.status);
        this.wishListData = response.data;
        this._WishListService.favNum.next(response.data.length);

        const newProductData = this.products.filter((item) =>
          this.wishListData.includes(item._id)
        );
        this.products = newProductData;
      },
    });
  }

  ngOnInit(): void {
    this.displayUserWishList();
  }
}
