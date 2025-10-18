import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendErrorsInterface } from '../../../../types/backendErrors.interface';
import { ArticleInputInterface } from '../../../../types/articleInput.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'mc-article-form',
    templateUrl: './articleForm.component.html',
    styleUrls: ['./articleForm.component.scss'],
    standalone: false,
})
export class ArticleFormComponent implements OnInit {
    @Input('initialValues') initialValuesProps!: ArticleInputInterface;
    @Input('isSubmitting') isSubmittingProps!: boolean;
    @Input('errors') errorsProps!: BackendErrorsInterface | null;

    @Output('articleSubmit') articleSubmitEvent =
        new EventEmitter<ArticleInputInterface>();

    form!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm(): void {
        this.form = this.fb.group({
            title: this.initialValuesProps.title,
            description: this.initialValuesProps.description,
            body: this.initialValuesProps.body,
            tagList: this.initialValuesProps.tagList.join(' '),
        });
    }

    onSubmit(): void {
        const formValue = this.form.value;
        const articleInput: ArticleInputInterface = {
            ...formValue,
            tagList: formValue.tagList
                ? formValue.tagList.split(',').map((tag: string) => tag.trim())
                : [],
        };
        this.articleSubmitEvent.emit(articleInput);
    }
}
