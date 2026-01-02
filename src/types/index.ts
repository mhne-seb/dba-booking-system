export interface Customer {
  id: string;
  fullName: string;
  contactNumber: string;
  email?: string;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  plateNumber: string;
  createdAt: Date;
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  customer?: Customer;
  preferredDate: Date;
  preferredTime: string;
  serviceType: string;
  concern: string;
  status: 'pending' | 'confirmed' | 'in-queue' | 'cancelled';
  createdAt: Date;
}

export interface Booking {
  id: string;
  serviceRequestId: string;
  serviceRequest?: ServiceRequest;
  shopId: string;
  shop?: Shop;
  scheduledDate: Date;
  scheduledTime: string;
  assignedEmployees: string[];
  status: 'not-started' | 'in-progress' | 'stuck' | 'done';
  createdAt: Date;
  completedAt?: Date;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  contactNumber: string;
  shopId: string;
  shop?: Shop;
  isActive: boolean;
}

export interface Shop {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  isActive: boolean;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'employee';
  name: string;
}
