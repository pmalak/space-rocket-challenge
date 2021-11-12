export interface Location {
  name: string;
  region: string;
  latitude: number;
  longitude: number;
}

export interface LaunchPad {
  id: number;
  name: string;
  status: string;
  location: Location;
  vehicles_launched: string[];
  attempted_launches: number;
  successful_launches: number;
  wikipedia: string;
  details: string;
  site_id: string;
  site_name_long: string;
}



