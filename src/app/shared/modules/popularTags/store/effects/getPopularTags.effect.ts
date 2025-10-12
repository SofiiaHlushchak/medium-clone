import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
    getPopularTagsAction,
    getPopularTagsFailure,
    getPopularTagsSuccessAction,
} from '../actions/getPopularTags.action';
import { PopularTagType } from '../../../../types/popularTag.type';
import { PopularTagsService } from '../../services/popularTags.service';

@Injectable()
export class GetPopularTagsEffect {
    getPopularTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getPopularTagsAction),
            switchMap(() => {
                return this.popularTagsService.getPopularTags().pipe(
                    map((popularTags: PopularTagType[]) => {
                        return getPopularTagsSuccessAction({ popularTags });
                    }),

                    catchError(() => {
                        return of(getPopularTagsFailure());
                    })
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private popularTagsService: PopularTagsService
    ) {}
}
