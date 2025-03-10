import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FootbarComponent } from './components/footbar/footbar.component';
import { FrmSectionTitleComponent } from './components/frm-section-title/frm-section-title.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent,
    FootbarComponent,
    FrmSectionTitleComponent
  ],
  declarations: [
    ToolbarComponent,
    FootbarComponent,
    FrmSectionTitleComponent
  ]
})
export class SharedModule { }
