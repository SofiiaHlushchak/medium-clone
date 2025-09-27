import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { isSubmittingSelector } from '../../store/selectors';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { registerAction } from '../../store/actions/register.action';

@Component({
    selector: 'mc-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: false,
})
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    isSubmitting$!: Observable<boolean>;

    constructor(
        private fb: FormBuilder,
        private store: Store<AppStateInterface>
    ) {}

    ngOnInit(): void {
        this.initializeForm();
        this.initializeValues();
    }

    initializeValues(): void {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    }

    initializeForm(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit(): void {
        this.store.dispatch(registerAction(this.form.value));
        // this.authService
        //     .register({ user: this.form.value })
        //     .subscribe((currentUser: CurrentUserInterface) => {
        //         console.log('currentUser', currentUser);
        //     });

        const request: RegisterRequestInterface = {
            user: this.form.value,
        };
        this.store.dispatch(registerAction({ request }));
    }
}
