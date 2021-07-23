import { Component } from '@angular/core';
import { Product } from './interfaces/product';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "test-abbd";
  cartList: Array<Product>;
  showProductsPage = true;
  showCartPage = false;
  totalElement = 0;
  newProductList: Array<Product>;

  setCartList(products: Array<Product>): void {
    this.cartList = products;
  }

  setTotalElement(total: number): void {
    this.totalElement = total;
  }

  setProductsPage(state: boolean): void {
    this.showProductsPage = state;
  }

  setCartPage(state: boolean): void {
    this.showCartPage = state;
  }

  setNewCartList(product: { elemNumbers: number; array: Array<Product> }): void {

    const newArray: Array<Product> = [];

    product.array?.forEach((product, index) => {
      newArray.push(product[index].value);
    });

    this.totalElement -= product.elemNumbers;

    this.newProductList = newArray;
  }
}
