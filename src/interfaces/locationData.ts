export interface LocationData {
  city: string;
  state: string;
  lon: number;
  lat: number;
  preciseLocationSet: boolean;
}

export interface LocationHoursFields {
  monday_hours: string[];
  tuesday_hours: string[];
  wednesday_hours: string[];
  thursday_hours: string[];
  friday_hours: string[];
  saturday_hours: string[];
  sunday_hours: string[];
  time_zone: string[];
}
export interface ResultWithLocationHours {
  _source: LocationHoursFields;
}

export interface Coordinates {
  lat: number[];
  lon: number[];
}
