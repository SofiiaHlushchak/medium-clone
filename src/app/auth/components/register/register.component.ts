import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { registerAction } from '../../store/actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { isSubmittingSelector } from '../../store/selectors';
import { AppStateInterface } from '../../../shared/types/appState.interface';

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
        console.log('initializeForm');
        this.form = this.fb.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit(): void {
        console.log('submit', this.form.value, this.form.valid);
        this.store.dispatch(registerAction(this.form.value));
    }
}
