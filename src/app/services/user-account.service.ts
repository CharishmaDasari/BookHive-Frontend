import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { UserAccount } from '../models/UserAccount';

@Injectable({
  providedIn: 'root'
})

export class UserAccountService {

  constructor(
    private httpClient: HttpClient,
    private snackbar: MatSnackBar){}

  create(user: UserAccount): Observable<UserAccount> {
    // console.log(user);
    return this.httpClient.post<UserAccount>(`http://localhost:9000/api/v1/accounts/signup`, user).pipe(
      tap((createdUser: UserAccount) => this.snackbar.open(`User ${createdUser.username} created successflly`, 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })),
      catchError(e => {
        this.snackbar.open(`User could not be created, due to: ${e.error.message}`, 'Close', {
          duration: 5000, horizontalPosition: 'right', verticalPosition: 'top'
        })
        return throwError(e);
      })
    )
  }


}
