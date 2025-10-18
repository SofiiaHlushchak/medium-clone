import { createReducer, on, Action } from '@ngrx/store';
import { EditArticleStateInterface } from '../types/editArticleState.interface';
import {
    updateArticleAction,
    updateArticleFailureAction,
    updateArticleSuccessAction,
} from './actions/updateArticle.action';
import {
    getArticleAction,
    getArticleFailureAction,
    getArticleSuccessAction,
} from './actions/getArticle.action';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: EditArticleStateInterface = {
    isLoading: false,
    article: null,
    isSubmitting: false,
    validationErrors: null,
};

const editArticleReducer = createReducer(
    initialState,
    on(
        updateArticleAction,
        (state): EditArticleStateInterface => ({
            ...state,
            isSubmitting: true,
        })
    ),
    on(
        updateArticleSuccessAction,
        (state): EditArticleStateInterface => ({
            ...state,
            isSubmitting: false,
        })
    ),
    on(
        updateArticleFailureAction,
        (state, action): EditArticleStateInterface => ({
            ...state,
            isSubmitting: false,
            validationErrors: action.errors,
        })
    ),
    on(
        getArticleAction,
        (state): EditArticleStateInterface => ({
            ...state,
            isLoading: true,
        })
    ),
    on(
        getArticleSuccessAction,
        (state, action): EditArticleStateInterface => ({
            ...state,
            isLoading: false,
            article: action.article,
        })
    ),
    on(
        getArticleFailureAction,
        (state): EditArticleStateInterface => ({
            ...state,
            isLoading: false,
        })
    ),
    on(routerNavigatedAction, () => initialState)
);

export function reducers(state: EditArticleStateInterface, action: Action) {
    return editArticleReducer(state, action);
}
