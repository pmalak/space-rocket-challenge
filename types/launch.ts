export interface Core {
  core_serial: string;
  flight: number;
  block: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  land_success: boolean;
  landing_intent: boolean;
  landing_type: string;
  landing_vehicle: string;
}

export interface FirstStage {
  cores: Core[];
}

export interface OrbitParams {
  reference_system: string;
  regime: string;
  longitude?: any;
  semi_major_axis_km?: any;
  eccentricity?: any;
  periapsis_km?: any;
  apoapsis_km?: any;
  inclination_deg?: any;
  period_min?: any;
  lifespan_years: number;
  epoch?: any;
  mean_motion?: any;
  raan?: any;
  arg_of_pericenter?: any;
  mean_anomaly?: any;
}

export interface Payload {
  payload_id: string;
  norad_id: any[];
  reused: boolean;
  customers: string[];
  nationality: string;
  manufacturer: string;
  payload_type: string;
  payload_mass_kg: number;
  payload_mass_lbs: number;
  orbit: string;
  orbit_params: OrbitParams;
}

export interface SecondStage {
  block: number;
  payloads: Payload[];
}

export interface Fairings {
  reused?: any;
  recovery_attempt?: any;
  recovered?: any;
  ship?: any;
}

export interface Rocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
  first_stage: FirstStage;
  second_stage: SecondStage;
  fairings: Fairings;
}

export interface Telemetry {
  flight_club?: any;
}

export interface LaunchSite {
  site_id: string;
  site_name: string;
  site_name_long: string;
}

export interface Links {
  mission_patch: string;
  mission_patch_small: string;
  reddit_campaign: string;
  reddit_launch: string;
  reddit_recovery?: any;
  reddit_media?: any;
  presskit?: any;
  article_link: string;
  wikipedia: string;
  video_link: string;
  youtube_id: string;
  flickr_images: any[];
}

export interface Launch {
  flight_number: number;
  mission_name: string;
  mission_id: any[];
  launch_year: string;
  launch_date_unix: number;
  launch_date_utc: Date;
  launch_date_local: Date;
  is_tentative: boolean;
  tentative_max_precision: string;
  tbd: boolean;
  launch_window?: any;
  rocket: Rocket;
  ships: string[];
  telemetry: Telemetry;
  launch_site: LaunchSite;
  launch_success: boolean;
  links: Links;
  details: string;
  upcoming: boolean;
  static_fire_date_utc: Date;
  static_fire_date_unix: number;
  timeline?: any;
  crew?: any;
  last_date_update: Date;
  last_ll_launch_date?: any;
  last_ll_update?: any;
  last_wiki_launch_date: Date;
  last_wiki_revision: string;
  last_wiki_update: Date;
  launch_date_source: string;
}



