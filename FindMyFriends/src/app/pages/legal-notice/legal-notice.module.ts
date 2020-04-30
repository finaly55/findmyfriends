import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {LegalNoticePage} from './legal-notice.page';

const routes: Routes = [
    {
        path: '',
        component: LegalNoticePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
    ],
    declarations: [LegalNoticePage]
})
export class LegalNoticePageModule {
}
