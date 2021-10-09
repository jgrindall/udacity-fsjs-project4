import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from "../auth.service";
import {AuthInfo} from "../types";
import {CartService} from "../cart.service";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  /**
   * auto fill details so you can just log in with one click
   */
  username:string = "username";
  password:string = "udac1ty";

  subcription?: Subscription;

  @Output()
  onClose: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.authService.authObs.subscribe((data: AuthInfo | undefined)=>{
      if(data) {
        this.onClose.emit();
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subcription){
      this.subcription.unsubscribe();
    }
  }

  /**
   * if you login and you have a cart, save it so we can reload it next time
   */
  onClickSubmit(){
    this.authService.login(this.username, this.password, this.cartService.getCart());
  }

  onCancel(){
    this.onClose.emit();
  }

}


