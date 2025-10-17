import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subscription, pipe, Observable, combineLatest, map } from 'rxjs';
import { ArticleInterface } from '../../../shared/types/article.interface';
import {
    articleSelector,
    errorSelector,
    isLoadingSelector,
} from '../../store/selectors';
import { currentUserSelector } from '../../../auth/store/selectors';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { getArticleAction } from '../../store/actions/getArticle.action';
import { AppStateInterface } from '../../../shared/types/appState.interface';

@Component({
    selector: 'mc-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
    standalone: false,
})
export class ArticleComponent implements OnInit, OnDestroy {
    slug!: string;
    article!: ArticleInterface | null;
    articleSubscription!: Subscription;
    isLoading$!: Observable<boolean>;
    error$!: Observable<string | null>;
    isAuthor$!: Observable<boolean>;

    constructor(
        private store: Store<AppStateInterface>,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.initializeValues();
        this.initializeListeners();
        this.fetchData();
    }

    ngOnDestroy(): void {
        this.articleSubscription.unsubscribe();
    }

    initializeValues(): void {
        this.slug = this.route.snapshot.paramMap.get('slug')!;
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
        this.error$ = this.store.pipe(select(errorSelector));
        this.isAuthor$ = combineLatest([
            this.store.pipe(select(articleSelector)),
            this.store.pipe(select(currentUserSelector)),
        ]).pipe(
            map(
                ([article, currentUser]: [
                    ArticleInterface | null,
                    CurrentUserInterface | null
                ]) => {
                    if (!article || !currentUser) {
                        return false;
                    }
                    return currentUser.username === article.author.username;
                }
            )
        );
    }

    initializeListeners(): void {
        this.articleSubscription = this.store
            .pipe(select(articleSelector))
            .subscribe((article: ArticleInterface | null) => {
                this.article = article;
            });
    }

    fetchData(): void {
        this.store.dispatch(getArticleAction({ slug: this.slug }));
    }
}
