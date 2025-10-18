import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './components/settings/settings.component';
import { reducers } from './store/reducers';
import { BackendErrorMessagesModule } from '../shared/modules/backendErrorMessages/backendErrorMessages.module';

const routes = [
    {
        path: 'settings',
        component: SettingsComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('settings', reducers),
        BackendErrorMessagesModule,
        ReactiveFormsModule,
    ],
    declarations: [SettingsComponent],
})
export class SettingsModule {}
