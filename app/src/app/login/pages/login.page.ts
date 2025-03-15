import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { IntroductionLoginComponent } from '../components/introduction/introduction.component';

@Component({
    standalone: true,
    imports: [IntroductionLoginComponent],
    templateUrl: './login.page.html',
    styleUrl: './login.page.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {

    ngOnInit(): void { }

}
