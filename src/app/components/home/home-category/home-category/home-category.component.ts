import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/product';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-home-category',
  templateUrl: './home-category.component.html',
  styleUrls: ['./home-category.component.css'],
})
export class HomeCategoryComponent implements OnInit, OnDestroy {
  constructor(private _ApiDataService: ApiDataService) {}
  subId!: Subscription;
  allCategory!: Category[];

  getCategories(): void {
    this.subId = this._ApiDataService.getAllCategories().subscribe({
      next: (response) => {
        this.allCategory = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.getCategories();
  }
  ngOnDestroy(): void {
    this.subId.unsubscribe();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 2000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
    margin: 10,
  };
}
