import { Component, Input } from '@angular/core';

@Component({
    selector: 'mc-error-message',
    template: '<div>{{messageProps}}</div>',
    standalone: false,
})
export class ErrorMessageComponent {
    @Input('message') messageProps: string = 'Something went wrong';
}
