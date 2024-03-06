import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiDataService } from './../../services/api-data.service';
import { Category, subCategory } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  constructor(private _ApiDataService: ApiDataService) {}
  allCategries!: Category[];
  specificCategory!: subCategory;
  categoryName!: string;
  subscribeId!: Subscription;

  displayCategries(): void {
    this.subscribeId = this._ApiDataService.getAllCategories().subscribe({
      next: (response) => {
        this.allCategries = response.data;
      },
    });
  }
  displaySpecificCategry(id: string, name: string): void {
    this._ApiDataService.getSpecificCategory(id).subscribe({
      next: (response) => {
        this.specificCategory = response;
        this.categoryName = name;
        console.log(response);
      },
    });
  }
  ngOnInit(): void {
    this.displayCategries();
  }
  ngOnDestroy(): void {
    this.subscribeId.unsubscribe();
  }
}
