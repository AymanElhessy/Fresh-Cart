import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cash-pay',
  templateUrl: './cash-pay.component.html',
  styleUrls: ['./cash-pay.component.css'],
})
export class CashPayComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  cartId: string | null = '';

  checkOut: FormGroup = this._FormBuilder.group({
    details: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    city: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
      },
    });
  }

  handelForm(): void {
    this._CartService.cashPay(this.cartId, this.checkOut.value).subscribe({
      next: (response) => {
        this._ToastrService.success(response.status);
        this._Router.navigate(['/home']);
        this._CartService.cartNum.next((response = 0));
      },
    });
  }
}
