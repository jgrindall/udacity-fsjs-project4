/**
 * show products
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../types";
import {CartService} from "../cart.service";
import {Router} from "@angular/router";
import {ProductsService} from "../products.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  /**
   * list of products
   */
  products: Product[] = [];

  subscription?: Subscription;

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

  }

  onHide(product:Product):void{
    product.show = false;
  }

  ngOnInit(): void {
    this.subscription = this.productService.productsObs.subscribe((products:Product[])=>{
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  onClickView(postId:number){
    this.router.navigate(['/product/' + postId]);
  }

  onClickAddToCart(product:Product){
    this.cartService.addProduct(product, 1);
    this.snackBar.open('Added to cart', 'Ok', {
      duration: 1500
    });
  }
}
