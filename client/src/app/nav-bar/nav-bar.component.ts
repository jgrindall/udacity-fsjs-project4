import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../auth.service";
import {AuthInfo, Cart} from "../types";
import {CartService} from "../cart.service";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  /**
   * show login or log out button?
   */
  public userLoggedIn = false;


  /**
   * show small badge on cart icon
   */
  cartSize:number = 0;

  subscriptions?:Subscription[];

  constructor(public dialog: MatDialog, private authService: AuthService, private cartService: CartService) {

  }

  ngOnInit(): void {

    /**
     * listen to changes in logged in status and cart.
     */
    this.subscriptions = [

      this.authService.authObs.subscribe((data: AuthInfo | undefined)=>{
        this.userLoggedIn = !!data;
      }),

      this.cartService.cartObs.subscribe(cart=>{
        this.cartSize = cart.length;
      })

    ];
  }

  ngOnDestroy(): void {
    if(this.subscriptions){
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

  /**
   * items in your cart (not 0)
   */
  getBadge():string{
    return this.cartSize >= 1 ? "" + this.cartSize : "";
  }

  logout(){
    this.authService.logout();
  }

  /**
   * open login dialog
   */
  login(){
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '600px',
      data: 'Login'
    });
    let subscription:Subscription = dialogRef.componentInstance.onClose.subscribe(()=>{
      dialogRef.close();
      if(subscription){
        subscription.unsubscribe();
      }
    });
  }

}
