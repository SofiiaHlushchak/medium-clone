import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsStateInterface } from '../types/settingsState.interface';
import { AppStateInterface } from '../../shared/types/appState.interface';

export const settingsFeatureSelector = createFeatureSelector<
    AppStateInterface,
    SettingsStateInterface
>('settings');

export const isSubmittingSelector = createSelector(
    settingsFeatureSelector,
    (settingsState: SettingsStateInterface) => settingsState.isSubmitting
);

export const validationErrorsSelector = createSelector(
    settingsFeatureSelector,
    (settingsState: SettingsStateInterface) => settingsState.validationErrors
);
