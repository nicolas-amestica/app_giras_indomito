import { Component, Input, type OnInit } from '@angular/core';

@Component({
  standalone : false,
  selector   : 'app-frm-section-title',
  templateUrl: './frm-section-title.component.html',
  styleUrls  : ['./frm-section-title.component.css'],
})
export class FrmSectionTitleComponent implements OnInit {
  @Input() title!: string;
  @Input() icon!: string;

  ngOnInit() {
  }
}
