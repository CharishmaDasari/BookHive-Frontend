import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/models/Cart';
import { BookDTO } from 'src/app/models/BookDTO';
import { CartService } from 'src/app/services/cart.service';
import { UserAccount } from '../../models/UserAccount';
import { AdminRoutingService } from '../../services/admin-routing.service';
import { AuthenticationService } from '../../services/authentication.service';
import { RoutingService } from '../../services/routing.service';
import { UserRoutingService } from '../../services/user-routing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authentication: AuthenticationService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private admin: AdminRoutingService,
    private user: UserRoutingService,
    private cart: CartService){}

  ngOnInit(): void {}

  error?: string;
  usercartId: number;
  newCart: Cart = new Cart();
  books: BookDTO[] = [];

  loginForm: FormGroup = this.formBuilder.group({
    username: this.formBuilder.control('',[Validators.required]),
    password: this.formBuilder.control('', [Validators.required])
  })

  login(){
    this.authentication.authenticateUser({username: this.loginForm.value['username'], password: this.loginForm.value['password']}).subscribe({

      //if username and password combo is found, set token and check for role
      next: success=>{

        this.error = '';
        this.authentication.setToken(success.token);

        this.authentication.authenticateToken(success.token).subscribe({
          next: authenticTokenResp=>{
            this.usercartId = authenticTokenResp['userId'];
            // console.log(this.usercartId);
            this.httpClient.get<UserAccount>(`http://localhost:9000/api/v1/accounts/${this.usercartId}`).subscribe({
              next: user=>{
                // console.log(user.role);
                if(user.role == 'admin'){
                  this.authentication.setUserRole('admin');
                  this.admin.adminLandingRouting();
                } else {
                  this.newCart.userId = this.usercartId;
                  this.newCart.cartId = this.usercartId;
                  this.newCart.books = this.books;
                  // console.log(this.newCart)
                  this.cart.createNewCart(this.newCart).subscribe({
                    // next:success=>console.log(success),
                    // error:fail=>console.log(fail)
                  })
                  this.user.userLandingRouting();
                }
                // user.role == 'admin' ? this.admin.adminLandingRouting() : this.user.userLandingRouting()
              },
              error: fail=>console.log(fail)
            });
          }
        });
      },

      error: failure=> {
        console.log(failure.error.message);
        this.error = failure.error.message;
      }

    });
  }

}
