import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from "../../services/contact.service";
import { Contact } from "../../interfaces/contact.interface";
import {Subject, Observable, takeUntil} from "rxjs";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contact-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentContactComponent implements OnInit, OnDestroy {

  contactForm: FormGroup = this.formBuilder.group({});
  destroy = new Subject();
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy.next('next');
    this.destroy.complete();
  }

  sendForm() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      const formValues: Contact = this.contactForm.value;

      this.contactService.sendEmail(formValues).pipe(
        takeUntil(this.destroy)
      ).subscribe(async (contact) => {
        this.isLoading = false;
        const alert = await this.alertController.create({
          subHeader: contact.message,
          message: 'Responderemos tan pronto como sea posible.',
          buttons: ['OK'],
        });

        await alert.present();
        this.contactForm.reset();
      })
    }
  }

  buildForm() {
    this.contactForm = this.formBuilder.group({
        name: [ '', [Validators.required] ],
        email: [ '', [Validators.required, Validators.email] ],
        phone: [ '', [Validators.required] ],
        message: [ '', [Validators.required] ],
    });
  }
}
