import { ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import generatePDF from "src/app/shared/libs/pdf-maker";
import { ModalComponent } from "../modal/modal.component";
import { DESTINATIONS, TRAVELS } from "../../constants/program.contant";
import { DownloadService } from "src/app/shared/services/download.service";
import { Activity, Destination, File } from "../../interfaces/content.interface";

@Component({
	selector: "app-about-content",
	templateUrl: "./content.component.html",
	styleUrl: "./content.component.css",
})
export class ContentProgramsComponent implements OnInit {
  destinations = DESTINATIONS;
  travels = TRAVELS;
	activitiesSelected: Activity[] = [];
  destinationSelected: Destination[] = [];
  zoneSelected = "";

  destinationsOptionSelected: any[] = [];
  files: File[] = [];

	constructor(
		private downloadService: DownloadService,
		private modalCtrl: ModalController,
	) {}

	ngOnInit(): void { }

	downloadDefaultProgram(defaultProgram: File) {
		this.downloadService
			.downloadPdf(defaultProgram.link)
			.subscribe((blob: Blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = defaultProgram.name;
				a.click();
				window.URL.revokeObjectURL(url);
			});
	}

	downloadCustomProgram() {
		generatePDF({ activities: this.activitiesSelected, destination: this.destinationSelected, zone: this.zoneSelected });
	}

	async openModalDestination(destinations: Destination[], zone: string) {
		const modal = await this.modalCtrl.create({
			component: ModalComponent,
			componentProps: {
				destinations,
				zone,
			},
			presentingElement: await this.modalCtrl.getTop(),
			mode: "md",
		});

		await modal.present();

		const { data } = await modal.onWillDismiss();

		if (data) {
			this.activitiesSelected = data.activities;
      this.destinationSelected = data.destination;
      this.zoneSelected = data.zone;
		}
	}

  removeActivity(activity: Activity) {
    this.activitiesSelected = this.activitiesSelected.filter((act) => act.name !== activity.name);
  }

  selectTravel(event: Event) {
	  const { detail } = event as CustomEvent;
    const { value } = detail;
    this.destinationsOptionSelected = value;
    this.files = [];
  }

  selectZone(event: Event) {
    const { detail } = event as CustomEvent;
    const { value } = detail;
    this.files = value.files;
  }
}
