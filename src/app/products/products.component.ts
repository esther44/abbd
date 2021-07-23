import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from "@angular/core";
import { Product } from "../interfaces/product";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit, OnChanges {
  productsList: Array<Product>;
  @Output() cartList = new EventEmitter<Array<Product>>();
  @Output() totalCount = new EventEmitter<number>();
  @Input() newProductList: Array<Product> = [];

  productCartList: Array<Product> = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
    this.addToCart();
  }

  ngOnChanges(): void {
    this.newProductList?.forEach((product) => this.addToCart(product));
  }

  getProducts(): void {
    this.productService
      .getProductList()
      .subscribe((products: Array<Product>) => {
        this.productsList = products;
      });
  }

  addToCart(product?: Product) {
    if (product) {
      this.productCartList.push(product);
    }
    this.totalCount.emit(this.productCartList.length);

    // Group products if they have already been added to the cart
    const groupBy = (array, key) => {
      return array.reduce((result, currentValue) => {
        // If an product already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, {});
    };

    const productsGroupById = groupBy(this.productCartList, "id");
    this.cartList.emit(productsGroupById);
  }
}
