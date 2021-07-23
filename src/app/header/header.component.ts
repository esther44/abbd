import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() totalElement: number;
  @Output() cartPage: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() productsPage: EventEmitter<boolean> = new EventEmitter<boolean>();

  showPage(cart: boolean, products: boolean): void{
    this.cartPage.emit(cart);
    this.productsPage.emit(products);
  }
}
