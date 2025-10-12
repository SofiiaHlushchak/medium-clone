import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { isLoggedInSelector } from '../../../../../auth/store/selectors';
import { AppStateInterface } from '../../../../types/appState.interface';

@Component({
    selector: 'mc-feed-toggler',
    templateUrl: './feedToggler.component.html',
    standalone: false,
})
export class FeedTogglerComponent implements OnInit {
    @Input('tagName') tagNameProps!: string;

    isLoggedIn$!: Observable<boolean>;

    constructor(private store: Store<AppStateInterface>) {}

    ngOnInit(): void {
        this.isLoggedIn$ = this.store.pipe(
            select(isLoggedInSelector),
            map(value => value ?? false)
        );
    }
}
