import { Component } from '@angular/core';
import {AuthService} from "./auth.service";
import {AuthInfo} from "./types";
import {CartService} from "./cart.service";
import {ProductsService} from "./products.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simple shop';

  constructor(
    private authService: AuthService,
    private cartService:CartService,
    private productsService: ProductsService
  ) {
  }

  /**
   * Listen to changes in auth status.
   */
  ngOnInit(){
    let prevAuthInfo: AuthInfo | undefined = undefined;
    this.authService.authObs.subscribe((authInfo: AuthInfo | undefined)=>{
      if(prevAuthInfo && !authInfo){
        /**
         * when we switch from logged in to logged out we clear local storage.
         * it doesn't make sense to re-load a cart which may have been saved in LS before we logged in
          */
        this.cartService.clearLocalStorage();
      }
      this.cartService.load();
      prevAuthInfo = authInfo;
    });

    /**
     * load all products
     */
    this.productsService.load();
  }

  /**
   * Fix scrolling
   */
  onActivate() {
    window.scroll(0,0);
  }

}
