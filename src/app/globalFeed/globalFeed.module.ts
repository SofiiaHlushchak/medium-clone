import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFeedComponent } from './components/globalFeed.component';
import { RouterModule } from '@angular/router';
import { FeedComponent } from '../shared/modules/feed/components/feed/feed.component';

const routes = [
    {
        path: '',
        component: GlobalFeedComponent,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [GlobalFeedComponent, FeedComponent],
    providers: [],
})
export class GlobalFeedModule {}
