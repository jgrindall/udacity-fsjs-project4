/**
 * Well done message
 */

import { Component, OnInit } from '@angular/core';
import {CartService} from "../cart.service";

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})
export class CheckoutDialogComponent implements OnInit {

  success: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // spin for a while and then say "thanks"
    setTimeout(()=>{
      this.success = true;
      this.cartService.clear();
    },2500);
  }

}
