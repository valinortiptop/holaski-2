// src/types/index.ts
export interface Resort {
  id: string;
  name: string;
  country: string;
  region: string;
  description_es: string;
  description_en: string;
  difficulty: string;
  altitude_base_m: number;
  altitude_peak_m: number;
  total_runs: number;
  total_lifts: number;
  season_start: string;
  season_end: string;
  avg_snowfall_cm: number;
  image_url: string;
  latitude: number;
  longitude: number;
  avg_daily_cost_usd: number;
  highlights: string[];
}

export interface FlightInfo {
  airline: string;
  departure_city: string;
  arrival_city: string;
  outbound_date: string;
  outbound_time: string;
  return_date: string;
  return_time: string;
  price_usd: number;
  cabin_class: string;
  stops: number;
  duration_hours: number;
}

export interface HotelInfo {
  name: string;
  stars: number;
  check_in: string;
  check_out: string;
  room_type: string;
  price_per_night: number;
  total_price: number;
  distance_to_slopes: string;
  amenities: string[];
}

export interface SkiPassInfo {
  type: string;
  duration_days: number;
  includes_insurance: boolean;
  price_usd: number;
  coverage: string;
}

export interface EquipmentItem {
  type: string;
  category: string;
  price_per_day: number;
}

export interface EquipmentInfo {
  items: EquipmentItem[];
  total_per_day: number;
  total_price: number;
  rental_days: number;
}

export interface TransferInfo {
  type: string;
  airport_to_resort: number;
  resort_to_airport: number;
  total_price: number;
}

export interface LessonsInfo {
  available: boolean;
  type: string;
  hours_per_day: number;
  days: number;
  price_usd: number;
}

export interface CostBreakdown {
  flights: number;
  hotel: number;
  ski_pass: number;
  equipment: number;
  transfers: number;
  lessons: number;
  meals_estimate: number;
  insurance: number;
  subtotal: number;
  taxes_and_fees: number;
  total_per_person_usd: number;
}

export interface TripPackage {
  resort_name: string;
  resort_country: string;
  resort_region: string;
  resort_description: string;
  resort_image_keyword: string;
  difficulty_match: string;
  trip_duration_days: number;
  flight: FlightInfo;
  hotel: HotelInfo;
  ski_pass: SkiPassInfo;
  equipment: EquipmentInfo;
  transfers: TransferInfo;
  lessons: LessonsInfo;
  cost_breakdown: CostBreakdown;
  highlights: string[];
  best_for: string;
  weather_forecast: string;
}

export interface WizardData {
  experience: string;
  groupSize: number;
  groupType: string;
  budget: string;
  region: string;
  departureCity: string;
  travelDates: string;
  currency: string;
}

export interface CurrencyRate {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

export type Language = 'es' | 'en';