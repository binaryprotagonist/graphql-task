export interface Route {
  path: string;
  element: React.FunctionComponent;
  isPrivate: Boolean;
}

export interface Core {
  flight: number;
  core: { reuse_count: number; status: string };
}

export interface FirstStage {
  core: Core[];
}

export interface Payloads {
  payload_type: string;
  payload_mass_kg: number;
}

export interface SecondStage {
  payloads: Payloads[];
}

export interface Rocket {
  rocket_name: string;
  first_stage: FirstStage;
  second_stage: SecondStage;
  rocket_type: string;
}

export interface SiteName {
  site_name_long: string;
}

export interface Link {
  wikipedia: URL;
}

export interface Launch {
  id: string;
  mission_name: string;
  launch_date_local: Date;
  launch_site: SiteName;
  launch_success: boolean;
  links: Link;
  rocket: Rocket;
}

export interface Filter {
  missionName: string;
  rocketName: string;
}
