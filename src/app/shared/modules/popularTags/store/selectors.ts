import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PopularTagsStateInterface } from '../types/popularTagsState.interface';
import { AppStateInterface } from '../../../types/appState.interface';

export const popularTagsFeatureSelector = createFeatureSelector<
    AppStateInterface,
    PopularTagsStateInterface
>('popularTags');

export const popularTagsSelector = createSelector(
    popularTagsFeatureSelector,
    (popularTagsState: PopularTagsStateInterface) => popularTagsState.data
);

export const isLoadingSelector = createSelector(
    popularTagsFeatureSelector,
    (popularTagsState: PopularTagsStateInterface) => popularTagsState.isLoading
);

export const errorSelector = createSelector(
    popularTagsFeatureSelector,
    (popularTagsState: PopularTagsStateInterface) => popularTagsState.error
);
