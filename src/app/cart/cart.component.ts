import {
  Component,
  Input,
  EventEmitter,
  Output,
  SimpleChange,
  OnChanges,
} from "@angular/core";
import { Product } from "../interfaces/product";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnChanges {
  @Input() cartList: Array<Product> = [];
  @Input() totalElement = 0;
  @Output() cartListUpdated = new EventEmitter<Array<Product>>();
  @Output() totalCount = new EventEmitter<number>();

  productsList;

  ngOnChanges(): void {
    const mapped = Object?.keys(this.cartList).map((key) => ({
      elemNumbers: this.cartList[key].length,
      value: this.cartList[key],
    }));
    this.productsList = mapped;
  }

  removeElement(productId: number, count: number): void {
    this.productsList = this.productsList.filter((elem) => {
      return elem.value[0].id !== productId;
    });

    this.cartListUpdated.emit(this.productsList);
  }

  changeTotal(count: number): void {
    this.totalCount.emit(this.totalElement - count);
  }
}
