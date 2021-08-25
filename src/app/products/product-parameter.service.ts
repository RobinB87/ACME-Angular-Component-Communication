import { Injectable } from "@angular/core";

@Injectable()
export class ProductParameterService {
  // This service is only retained as long as it's component is loaded.
  // When you register a service in for example the product list component,
  // it is destroyed when for example opening the details component

  // In this case it is registered the product module and its component's
  showImage: boolean;
  filterBy: string;

  constructor() {}
}
