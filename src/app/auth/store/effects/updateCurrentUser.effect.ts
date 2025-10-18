import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import {
    updateCurrentUserAction,
    updateCurrentUserFailureAction,
    updateCurrentUserSuccessAction,
} from '../actions/updateCurrentUser.action';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class UpdateCurrentUserEffect {
    updateCurrentUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCurrentUserAction),
            switchMap(({ currentUserInput }) => {
                console.log('work');
                return this.authService
                    .updateCurrentUser(currentUserInput)
                    .pipe(
                        map((currentUser: CurrentUserInterface) => {
                            return updateCurrentUserSuccessAction({
                                currentUser,
                            });
                        }),

                        catchError((errorResponse: HttpErrorResponse) => {
                            return of(
                                updateCurrentUserFailureAction({
                                    errors: errorResponse.error.errors,
                                })
                            );
                        })
                    );
            })
        )
    );

    constructor(private actions$: Actions, private authService: AuthService) {}
}
