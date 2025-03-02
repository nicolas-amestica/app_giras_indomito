export interface Travel {
  zone: string;
  destinations: string;
  description: string;
}

export interface Destination {
  name: string;
  description: string;
  activities: Activity[];
}

export interface Activity {
  name: string;
  description: string;
}
