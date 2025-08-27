import { Document } from 'mongoose';

export interface GymAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

export interface GymLocation {
  lat: string;
  lon: string;
  name: string;
}

export interface Gym extends Document {
  ownerId: string;
  name: string;
  address: GymAddress;
  location: GymLocation;
  isActive: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}
