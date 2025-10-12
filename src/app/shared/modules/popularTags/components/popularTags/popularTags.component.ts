import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { PopularTagType } from '../../../../types/popularTag.type';
import { getPopularTagsAction } from '../../store/actions/getPopularTags.action';
import { AppStateInterface } from '../../../../types/appState.interface';
import {
    errorSelector,
    isLoadingSelector,
    popularTagsSelector,
} from '../../store/selectors';

@Component({
    selector: 'mc-popular-tags',
    templateUrl: './popularTags.component.html',
    standalone: false,
})
export class PopularTagsComponent implements OnInit {
    popularTags$!: Observable<PopularTagType[] | null>;
    isLoading$!: Observable<boolean>;
    error$!: Observable<string | null>;

    constructor(private store: Store<AppStateInterface>) {}

    ngOnInit(): void {
        this.initializeValues();
        this.fetchData();
    }

    initializeValues(): void {
        this.popularTags$ = this.store.pipe(select(popularTagsSelector));
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
        this.error$ = this.store.pipe(select(errorSelector));
    }

    fetchData(): void {
        this.store.dispatch(getPopularTagsAction());
    }
}
