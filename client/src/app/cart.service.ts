/**
 * Load/save shopping cart.
 * We store the cart in local storage if they are not logged in, otherwise we store it on the server.
 */

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Cart, CartItem, Product} from "./types";
import {AuthService} from "./auth.service";
import {HEADERS, API} from "./consts";

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private _cart = new BehaviorSubject<Cart>([]);

  constructor(private http: HttpClient, private authService:AuthService) {

  }

  /**
   * these API calls require a token
   */
  private getHeaders(){
    return new HttpHeaders({
      ...HEADERS,
      'Authorization': 'JWT ' + this.authService.getJWT()
    });
  }

  /**
   * get current cart
   */
  public getCart():Cart{
    return this._cart.getValue();
  }

  /**
   * observe the cart
   */
  get cartObs(): Observable<Cart>{
    return this._cart.asObservable();
  }

  /**
   * wipe local storage when we logout
   */
  public clearLocalStorage(){
    this.saveToLocalStorage([]);
  }

  /**
   * wipe the cart
   */
  public clear(){
    this.saveCart([]);
  }

  /**
   * load (from LS or server)
   */
  public load(){
    if(this.authService.isLoggedIn()){
      this.loadFromDatabase();
    }
    else{
      this.loadFromLocalStorage();
    }
  }

  /**
   * remove a product from the cart
   * @param productId
   */
  public remove(productId:number){
    let cart:Cart = this._cart.getValue();
    cart = cart.filter(item => item.product_id != productId);
    this.saveCart(cart);
  }

  /**
   * update cart quantity
   * @param id
   * @param count
   */
  public update(id:number, count:number){
    let cart:Cart = this._cart.getValue();
    const cartItem = cart.find(item => item.product_id === id);
    if(cartItem) {
      cartItem.count = count;
    }
    this.saveCart(cart);
  }

  /**
   * add product to the cart
   * @param product
   * @param count
   */
  public addProduct(product:Product, count: number){
    let cart:Cart = this._cart.getValue();
    const currentItem:CartItem | undefined = cart.find(item => item.product_id === product.id);
    if(currentItem){
      // already exists - just increment
      currentItem.count ++;
    }
    else{
      cart = [
        ...cart,
        {
          product_id: product.id,
          count
      }];
    }
    this.saveCart(cart);
  }

  private saveCart(cart: Cart){
    if(this.authService.isLoggedIn()){
      this.saveToDatabase(cart);
    }
    else{
      this.saveToLocalStorage(cart);
    }
  }

  private saveToDatabase(cart: Cart){
    this.http.post(API + '/cart/user/1', cart,{
      'headers': this.getHeaders()
    }).subscribe(
      () => {
        this._cart.next(cart);
      },
    );
  }

  private saveToLocalStorage(cart: Cart){
    localStorage.setItem("cart", JSON.stringify(cart));
    this._cart.next(cart);
  }

  private loadFromLocalStorage(){
    const item: string | null = localStorage.getItem("cart");
    const cart = item ? JSON.parse(item) as Cart : null;
    if(cart){
      this._cart.next(cart);
    }
  }

  private loadFromDatabase() : void{
    this.http.get(API + '/cart/user/1', {
      'headers': this.getHeaders()
    }).subscribe(
      data => {
        localStorage.removeItem("cart");
        this._cart.next(data as Cart);
      },
    );
  }
}


