import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";

import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = "Product List";

  showImage: boolean;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  filteredProducts: IProduct[];
  products: IProduct[];

  @ViewChild("filterElement") filterElementRef: ElementRef;
  // Can also use ViewChildren. This returns a QueryList
  // Eg: use @ViewChild(NgModel) and it references all NgModel in the template

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.performFilter(this.listFilter);
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log("onInit");
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.performFilter(this.listFilter);
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  // Considerations:
  // This directly accesses the DOM (tightly coupled to the browser)
  // Can pose a security threat (eg when accessing innerHtml)
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    this.filterElementRef.nativeElement.focus();
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
