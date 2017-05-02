import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HtmlModule} from '../html';
import {JsonLdComponent} from './components';
import {LinkedDataService, MetaTagsService} from './services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HtmlModule,
    ],
    declarations: [
        JsonLdComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        JsonLdComponent,
    ],
    providers: [
        LinkedDataService,
        MetaTagsService,
    ],
})
export class SeoModule {
}
