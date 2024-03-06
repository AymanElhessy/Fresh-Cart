import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.css'],
})
export class NavbarBlankComponent {
  numCart: number = 0;
  numFav: number = 0;
  constructor(
    private _AuthService: AuthService,
    private _cartService: CartService,
    private _WishListService: WishListService
  ) {
    this._cartService.cartNum.subscribe((res) => {
      this.numCart = res;
    });
    this._WishListService.favNum.subscribe((respo) => {
      this.numFav = respo;
    });
  }

  signOut(): void {
    this._AuthService.signOut();
  }
}
