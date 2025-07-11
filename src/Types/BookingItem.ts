export interface BookingInfo {
  service: string;
  timeslot: string;
  addOnes: string[];
  date: string;
  total: number;
  user: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };

  status: "COMPLETED" | "PENDING" | "CANCELLED" | "OTHER";
  totalAmount: number;
}

export interface Booking {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
  };
  service: string;
  status: string;
  timeslot: string;
  totalAmount?: number;
  model?: string;
  category?: string;
  addOnes: {
    name: string;
    price: number;
  }[];
}
