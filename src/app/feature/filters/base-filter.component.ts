import { Component, OnDestroy } from '@angular/core';

@Component({template: '<ng-container></ng-container>'})
export class BaseFilterComponent {
    name: string;
    criteria: any = null;
}
