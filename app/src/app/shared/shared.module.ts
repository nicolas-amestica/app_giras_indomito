import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { FootbarComponent } from './components/footbar/footbar.component';
import { DownloadService } from './services/download.service';
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
