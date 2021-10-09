/**
 * Handles loading products
 */

import { Injectable } from '@angular/core';
import {Product} from "./types";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HEADERS, API} from "./consts";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private _products = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {

  }

  /**
   * observe
   */
  get productsObs(){
    return this._products.asObservable();
  }

  /**
   * look up locally, or load a product
   * @param id
   */
  public getById(id:number): Observable<Product> {
    const product = this._products.getValue().find(product => product.id === id);
    if(product){
      return new BehaviorSubject<Product>(product).asObservable();
    }
    else{
      return this.http.get<Product>(API + '/products/' + id);
    }
  }

  /**
   * load all the products
   */
  public load(){
    return this.http.get<Product[]>(API + '/products', {
      'headers': new HttpHeaders(HEADERS)
    }).subscribe(
      (products:Product[]) => {
        this._products.next(products);
      },
    );
  }

}
