/**
 * Handles auth
 * We store the JWT in local storage
 *
 * Inspired by https://blog.angular-university.io/angular-jwt-authentication/
 */

import { Injectable } from '@angular/core';
import {AuthInfo, Cart} from "./types";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from "moment";
import {HEADERS, API} from "./consts";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth = new BehaviorSubject<AuthInfo | undefined>(undefined);

  /**
   * check if we are logged in, if so inform subscribers
   * @param http
   * @param snackBar
   */
  constructor(private http:HttpClient, private snackBar: MatSnackBar) {
    if(this.isLoggedIn()){
      this._auth.next(this.loadAuthInfo());
    }
  }

  /**
   * observe
   */
  get authObs(){
    return this._auth.asObservable();
  }

  /**
   * get info from Local Storage
   */
  private loadAuthInfo(): AuthInfo | undefined{
    const authInfo = localStorage.getItem("authInfo");
    if(authInfo){
      return JSON.parse(authInfo) as AuthInfo;
    }
    return undefined;
  }

  /**
   * Check if logged in. We are logged in if our token is valid
   */
  public isLoggedIn() : boolean{
    const authInfo = this.loadAuthInfo();
    if(!authInfo){
      return false;
    }
    const expiration:number = authInfo.expires;
    if(expiration){
      const now = moment();
      const expires = moment.unix(expiration);
      return now.isBefore(expires);
    }
    return false;
  }

  /**
   * Get token for API
   */
  getJWT(): (string | null) {
    const authInfo = this.loadAuthInfo();
    return authInfo ? authInfo.access_token : null;
  }

  /**
   * try to login. If we also have a cart, set it
   * @param username
   * @param password
   * @param cart
   */
  login(username: string, password: string, cart?: Cart): void {
    this.http.post(API + '/users/auth', {
        username,
        password,
        cart: cart && cart.length >= 1 ? cart : null
      },
      {
        'headers': new HttpHeaders(HEADERS)
      }).subscribe(
      data => {
        const authInfo = data as AuthInfo;
        localStorage.setItem('authInfo', JSON.stringify(authInfo));
        this.snackBar.open('You are now logged in', 'Ok', {
          duration: 1500
        });
        this._auth.next(authInfo);
      }
    )
  }

  /**
   * logout. Clear LS and publish.
   */
  logout():void{
    localStorage.removeItem("authInfo");
    this.snackBar.open('You are now logged out', 'Ok', {
      duration: 1500
    });
    this._auth.next(undefined);
  }

}






