import { Component, Input } from '@angular/core';
import { BackendErrorsInterface } from '../../../../types/backendErrors.interface';
import { ArticleInputInterface } from '../../../../types/articleInput.interface';

@Component({
    selector: 'mc-article-form',
    templateUrl: './articleForm.component.html',
    styleUrls: ['./articleForm.component.scss'],
    standalone: false,
})
export class ArticleFormComponent {
    @Input('initialValues') initialValuesProps!: ArticleInputInterface;
    @Input('isSubmitting') isSubmittingProps!: boolean;
    @Input('errors') errorsProps!: BackendErrorsInterface | null;
}
