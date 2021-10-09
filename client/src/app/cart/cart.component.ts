import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../cart.service";
import {Product, CartItemWithProduct, CartItem, Cart} from "../types";
import {ProductsService} from "../products.service";
import {combineLatest, Subscription} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartCombinedWithProducts: CartItemWithProduct[] = [];

  total: number = 0;

  subscription?:Subscription;

  constructor(private cartService: CartService, private productService: ProductsService) {
  }

  /**
   * join the cart and products together to make 'cartCombinedWithProducts' and 'total'
   */
  ngOnInit(): void {
    this.subscription = combineLatest([
      this.cartService.cartObs,
      this.productService.productsObs
    ])
      .subscribe(results => {
        this.update(results[0], results[1]);
      });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  update(cart: Cart, products: Product[]) {
    const getProductById = (id: number): (Product | undefined) => {
      return products.find((product: Product) => product.id === id);
    };

    const matchingProducts: Cart = cart.filter((cartItem: CartItem) => {
      return !!getProductById(cartItem.product_id);
    });

    const cartCombinedWithProducts = matchingProducts.map((cartItem: CartItem) => {
      const product = getProductById(cartItem.product_id) as Product;
      return {
        ...cartItem,
        product: product
      };
    });

    /**
     * clone it to make sure we don't do any updates until we press the Update button
     */

    this.cartCombinedWithProducts = JSON.parse(JSON.stringify(cartCombinedWithProducts));

    this.total = this.cartCombinedWithProducts.reduce((memo: number, current: CartItemWithProduct) => {
      return memo + current.count * current.product.price;
    }, 0);

  }

  onClickRemove(id: number) {
    this.cartService.remove(id);
  }

  onClickUpdate(id: number, count: number) {
    this.cartService.update(id, count);
  }

}
