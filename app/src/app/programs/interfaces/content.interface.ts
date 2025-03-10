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

export interface Zone {
  name: string[];
}

export interface File {
  name: string;
  link: string;
  transport: string;
}

export interface dest {
  name: string;
  files: File[];
}
