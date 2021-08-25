import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { IProduct } from "../product";
import { Subscription } from "rxjs";

@Component({
  selector: "pm-product-shell-detail",
  templateUrl: "./product-shell-detail.component.html",
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = "Product Detail";

  product: IProduct | null;
  sub: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Start receiving notifications as soon as the component is initialized
    this.sub = this.productService.selectedProductChanges$.subscribe(
      (selectedProduct) => (this.product = selectedProduct)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
