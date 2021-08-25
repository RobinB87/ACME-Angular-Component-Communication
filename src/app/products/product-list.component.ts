import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";

import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { CriteriaComponent } from "./../shared/criteria/criteria.component";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = "Product List";
  showImage: boolean;
  includeDetail: boolean = true;
  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
  parentListFilter: string;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  filteredProducts: IProduct[];
  products: IProduct[];

  // private _listFilter: string;
  // get listFilter(): string {
  //   return this._listFilter;
  // }

  // set listFilter(value: string) {
  //   this._listFilter = value;
  //   this.performFilter(this.listFilter);
  // }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log("onInit");
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.performFilter(this.parentListFilter);
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  ngAfterViewInit(): void {
    this.parentListFilter = this.filterComponent.listFilter;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(
        (product: IProduct) =>
          product.productName
            .toLocaleLowerCase()
            .indexOf(filterBy.toLocaleLowerCase()) !== -1
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
}
