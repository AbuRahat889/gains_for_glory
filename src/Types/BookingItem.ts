export interface BookingInfo {
  id: string;
  service: string;
  user: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  timeslot: string;
  addOnes: Array<any>;
  status: "COMPLETED" | "PENDING" | "CANCELLED" | "OTHER";
  totalAmount: number;
}

export interface AllBookingTableProps {
  bookingInfo: BookingInfo[];
  isLoading: boolean;
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
