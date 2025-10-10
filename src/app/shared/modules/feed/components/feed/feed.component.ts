import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getFeedAction } from '../../store/actions/getFeed.action';
import {
    errorSelector,
    feedSelector,
    isLoadingSelector,
} from '../../store/selectors';
import { AppStateInterface } from '../../../../types/appState.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import queryString from 'query-string';

@Component({
    selector: 'mc-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
    standalone: false,
})
export class FeedComponent implements OnInit, OnDestroy {
    @Input('apiUrl') apiUrlProps!: string;

    feed$!: Observable<GetFeedResponseInterface | null>;
    error$!: Observable<string | null>;
    isLoading$!: Observable<boolean>;
    limit = environment.limit;
    baseUrl!: string;
    queryParamsSubscription!: Subscription;
    currentPage!: number;

    constructor(
        private store: Store<AppStateInterface>,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.initializeValues();
        this.initializeListeners();
    }

    ngOnDestroy(): void {
        this.queryParamsSubscription.unsubscribe();
    }

    initializeListeners(): void {
        this.queryParamsSubscription = this.route.queryParams.subscribe(
            (params: Params) => {
                this.currentPage = Number(params['page'] || '1');
                this.fetchFeed();
            }
        );
    }

    initializeValues(): void {
        this.feed$ = this.store.pipe(select(feedSelector));
        this.error$ = this.store.pipe(select(errorSelector));
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
        this.baseUrl = this.router.url.split('?')[0];
    }

    fetchFeed(): void {
        const offset = this.currentPage * this.limit - this.limit;

        const [baseUrl, qs] = this.apiUrlProps.split('?');

        const parsedQuery = qs ? queryString.parse(qs) : {};

        const stringifiedParams = queryString.stringify({
            limit: this.limit,
            offset,
            ...parsedQuery,
        });

        const apiUrlWithParams = `${baseUrl}?${stringifiedParams}`;

        this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
    }
}
