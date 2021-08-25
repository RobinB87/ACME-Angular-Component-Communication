import { Injectable } from "@angular/core";

@Injectable()
export class ProductParameterService {
  // This service is only retained as long as it's component is loaded.
  // When you register a service in for example the product list component,
  // it is destroyed when for example opening the details component

  // In this case it is registered the product module and thus registered in the application's root
  // Now it is available to ALL components, for the lifetime of the application

  // When module is lazy loaded, this is different
  // Services registered in a lazy loaded module are only available to
  // components declared in that module
  // When the module is loaded, the service is available for the lifetime of the application
  showImage: boolean;
  filterBy: string;

  constructor() {}
}
