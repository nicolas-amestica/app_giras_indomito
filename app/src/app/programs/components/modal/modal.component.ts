import { ModalController } from "@ionic/angular";
import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Destination, Activity } from "../../interfaces/travel.interface";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  @Input() destinations: Destination[] = [];
  @Input() zone!: string;
  frmActivities!: FormGroup;
  activities: Activity[] = [];
  destination: Destination | undefined;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void { }

  closeModalWithData() {
    this.modalCtrl.dismiss({
      activities: this.frmActivities.value.activities,
      zone: this.zone,
      destination: this.destination
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  selectDestination(event: Event) {
    const { detail } = event as CustomEvent;
    const { value } = detail;
    const selectedDestination = this.destinations.find(destination => destination.name === value);
    if (selectedDestination) {
      this.destination = selectedDestination;
      this.activities = selectedDestination.activities;
    }
  }

  addActivityToForm(event: Event) {

    const { detail } = event as CustomEvent;
    const { value, checked } = detail;
    const { name } = value;

    if (value && checked) {
      const activity = this.activities.find(activity => activity.name === name);
      (this.frmActivities.get('activities') as FormArray).push(this.formBuilder.control(activity));
    }

    if (!checked) {
      const activitiesArray = this.frmActivities.get('activities') as FormArray;
      const index = activitiesArray.controls.findIndex(control => control.value.name === name);
      if (index !== -1)
        activitiesArray.removeAt(index);
    }
  }

  private buildForm() {
    this.frmActivities = this.formBuilder.group({
      activities: this.formBuilder.array([], { validators: Validators.required })
    });
  }

}
