import { NgModule } from '@angular/core';

import { ThemeClassDirective } from './root/directives/theme-class.directive';
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule  // Добавьте CommonModule
    ],
    declarations: [
        ThemeClassDirective,
    ],
    exports: [
        ThemeClassDirective,
    ]
})
export class EvoModule { }
