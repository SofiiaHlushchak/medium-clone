import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'mc-tag-feed',
    templateUrl: './tagFeed.component.html',
    styleUrls: ['./tagFeed.component.scss'],
    standalone: false,
})
export class TagFeedComponent implements OnInit {
    tagName!: string;
    apiUrl!: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.tagName = params['slug'];
            this.apiUrl = `/articles?tag=${this.tagName}`;
        });
    }
}
