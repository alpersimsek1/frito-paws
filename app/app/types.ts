export interface DogProfile {
  id: string;
  name: string;
  breed: string;
  age: number;
  ageUnit: 'months' | 'years';
  weight?: number;
  weightUnit?: 'kg' | 'lbs';
  vetName?: string;
  vetPhone?: string;
  vetAddress?: string;
  allergies: string[];
  healthIssues: string[];
  medications: string[];
  additionalNotes?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceRequest {
  id: string;
  dogId: string;
  serviceType: 'walk' | 'onboarding' | 'sitting';
  urgent: boolean;
  walkType?: 'group' | 'private' | 'no-preference';
  preferredDate: Date;
  preferredTime: string;
  duration: number; // in minutes
  additionalRequirements?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface CalendarEvent {
  id: string;
  dogId: string;
  serviceRequestId?: string;
  title: string;
  type: 'walk' | 'onboarding' | 'sitting' | 'vet';
  date: Date;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}
