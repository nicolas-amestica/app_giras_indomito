import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../shared/shared.module";
import { IntroductionLoginComponent } from "./components/introduction/introduction.component";
import { LoginPage } from "./pages/login/login.page";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
  ],
  declarations: [
    LoginPage,
    IntroductionLoginComponent
  ]
})
export class LoginPageModule {}
