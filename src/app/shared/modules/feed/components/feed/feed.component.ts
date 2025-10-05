import { Component, Input, OnInit } from '@angular/core';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getFeedAction } from '../../store/actions/getFeed.action';
import {
    errorSelector,
    feedSelector,
    isLoadingSelector,
} from '../../store/selectors';
import { AppStateInterface } from '../../../../types/appState.interface';

@Component({
    selector: 'mc-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
    standalone: false,
})
export class FeedComponent implements OnInit {
    @Input('apiUrl') apiUrlProps!: string;

    feed$!: Observable<GetFeedResponseInterface | null>;
    error$!: Observable<string | null>;
    isLoading$!: Observable<boolean>;

    constructor(private store: Store<AppStateInterface>) {}

    ngOnInit(): void {
        this.initializeValues();
        this.fetchData();
    }

    initializeValues(): void {
        this.feed$ = this.store.pipe(select(feedSelector));
        this.error$ = this.store.pipe(select(errorSelector));
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    }

    fetchData(): void {
        this.store.dispatch(getFeedAction({ url: this.apiUrlProps }));
    }
}
