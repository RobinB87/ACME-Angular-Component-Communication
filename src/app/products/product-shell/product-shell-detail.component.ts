import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { IProduct } from "../product";

@Component({
  selector: "pm-product-shell-detail",
  templateUrl: "./product-shell-detail.component.html",
})
export class ProductShellDetailComponent implements OnInit {
  pageTitle: string = "Product Detail";

  product: IProduct | null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Start receiving notifications as soon as the component is initialized
    this.productService.selectedProductChanges$.subscribe(
      (selectedProduct) => (this.product = selectedProduct)
    );
  }
}
