import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { CurrentUserInterface } from '../../../../types/currentUser.interface';
import { AppStateInterface } from '../../../../types/appState.interface';
import {
    currentUserSelector,
    isAnonymousSelector,
    isLoggedInSelector,
} from '../../../../../auth/store/selectors';

@Component({
    selector: 'mc-topbar',
    templateUrl: './topBar.component.html',
    styleUrls: ['./topBar.component.scss'],
    standalone: false,
})
export class TopBarComponent implements OnInit {
    isLoggedIn$!: Observable<boolean>;
    isAnonymous$!: Observable<boolean>;
    currentUser$?: Observable<CurrentUserInterface | null>;

    constructor(private store: Store<AppStateInterface>) {}

    ngOnInit(): void {
        this.isLoggedIn$ = this.store.pipe(
            select(isLoggedInSelector),
            map(value => value ?? false)
        );

        this.isAnonymous$ = this.store.pipe(
            select(isAnonymousSelector),
            map(value => value ?? false)
        );

        this.currentUser$ = this.store.pipe(select(currentUserSelector));
    }
}
