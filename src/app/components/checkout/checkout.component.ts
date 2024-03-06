import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
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
    this._CartService.checkOut(this.cartId, this.checkOut.value).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          open(response.session.url, '_self');
        }
      },
    });
  }
}
