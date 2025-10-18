import { Component, OnInit } from '@angular/core';
import { ArticleInputInterface } from '../../../shared/types/articleInput.interface';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { select, Store } from '@ngrx/store';
import {
    isSubmittingSelector,
    validationErrorsSelector,
} from '../../../auth/store/selectors';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { createArticleAction } from '../../store/actions/createArticle.action';

@Component({
    selector: 'mc-create-article',
    templateUrl: './createArticle.component.html',
    styleUrls: ['./createArticle.component.scss'],
    standalone: false,
})
export class CreateArticleComponent implements OnInit {
    initialValues: ArticleInputInterface = {
        title: '',
        description: '',
        body: '',
        tagList: [],
    };
    isSubmitting$!: Observable<boolean>;
    backendErrors$!: Observable<BackendErrorsInterface | null>;

    constructor(private store: Store<AppStateInterface>) {}

    ngOnInit(): void {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    }

    onSubmit(articleInput: ArticleInputInterface): void {
        console.log('hi');
        this.store.dispatch(createArticleAction({ articleInput }));
    }
}
