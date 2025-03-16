import { Component, OnDestroy, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {
	IonCardContent,
	IonCard,
	IonItem,
	IonInput,
	IonButton,
	IonSpinner,
	IonText,
	IonCardHeader,
	IonImg,
} from "@ionic/angular/standalone";
import { Login } from "../../interfaces/login.interface";
import { Subject, takeUntil } from "rxjs";
import { LoginService } from "../../services/login.service";
import { CommonModule } from "@angular/common";

@Component({
	standalone: true,
	imports: [
		IonImg,
		IonCardHeader,
		IonText,
		IonSpinner,
		IonButton,
		IonInput,
		IonItem,
		IonCard,
		IonCardContent,
		ReactiveFormsModule,
		CommonModule,
	],
	selector: "app-login-introduction",
	templateUrl: "./introduction.component.html",
	styleUrl: "./introduction.component.css",
})
export class IntroductionLoginComponent implements OnInit, OnDestroy {
	loginForm: FormGroup = new FormGroup({});
	destroy = new Subject();
	isLoading = false;
	public message = "";

	constructor(
		private formBuilder: FormBuilder,
		private loginService: LoginService,
	) {
		this.isLoading = false;
	}

	ngOnDestroy(): void {
		this.destroy.next("next");
		this.destroy.complete();
	}

	ngOnInit(): void {
		this.buildForm();
	}

  // ionViewWillEnter() {
  //   this.loginService.logout();
  // }

	sendForm() {
		if (this.loginForm.valid) {
			this.isLoading = true;
			const formValues: Login = this.loginForm.value;

			this.loginService
				.login(formValues)
				.pipe(takeUntil(this.destroy))
				.subscribe((response) => {
					this.isLoading = false;
					if (response.message === "Credenciales inválidas")
						this.message = response.message;
				});
		}
	}

	buildForm() {
		this.loginForm = this.formBuilder.group({
			correo: ["", [Validators.required, Validators.email]],
			clave: ["", [Validators.required, Validators.minLength(8)]],
		});
	}
}
