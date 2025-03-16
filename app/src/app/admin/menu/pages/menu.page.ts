import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    templateUrl: './menu.page.html',
    styleUrl: './menu.page.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage implements OnInit {

    ngOnInit(): void { }

}
