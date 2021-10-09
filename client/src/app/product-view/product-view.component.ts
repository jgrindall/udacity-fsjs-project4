import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../types";
import {ProductsService} from "../products.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  product?: Product;

  /**
   * default to adding one
   */
  count:number = 1;

  /**
   * when we have added we show the "go to cart" button
   */
  addedToCart:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private snackBar: MatSnackBar,
    private cartService: CartService) {
  }

  /**
   * load the product
   */
  ngOnInit(): void {
    const id:string = this.route.snapshot.paramMap.get('id') as string;
    if(id){
      this.productService
        .getById(parseInt(id))
        .subscribe((product:Product)=>{
          this.product = product;
        });
    }
  }

  onClickAddToCart() {
    this.cartService.addProduct(this.product as Product, this.count);
    this.snackBar.open('Added to cart', 'Ok', {
      duration: 750
    });
    this.addedToCart = true;
  }
}
