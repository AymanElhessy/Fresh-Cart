import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';
import { Subscription } from 'rxjs';
import { Barnd } from 'src/app/interfaces/barnd';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit, OnDestroy {
  constructor(private _ApiDataService: ApiDataService) {}
  subscribeId!: Subscription;
  allBrands!: Barnd[];
  specificBrand!: Barnd;
  dispalyBrands(): void {
    this.subscribeId = this._ApiDataService.getAllBrands().subscribe({
      next: (response) => {
        console.log(response.data);
        this.allBrands = response.data;
      },
    });
  }

  displaySpceficBrand(id: string): void {
    this._ApiDataService.getSpecificBrand(id).subscribe({
      next: (response) => {
        console.log(response);
        this.specificBrand = response.data;
      },
    });
  }

  ngOnInit(): void {
    this.dispalyBrands();
  }
  ngOnDestroy(): void {
    this.subscribeId.unsubscribe();
  }
}
