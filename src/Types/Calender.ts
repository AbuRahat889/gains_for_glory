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
  addOnes: [];
}

export interface DailyServiceCount {
  date: string;
  count: number;
  bookings: Booking[];
}

export interface CalendarData {
  data: {
    filter: {
      month: number;
      year: number;
      monthName: string;
    };
    overview: {
      totalBookings: number;
      totalUsers: number;
      totalRevenue: number;
      avgRevenuePerBooking: number;
    };
    dailyServiceCounts: DailyServiceCount[];
  };
}

export interface CalendarDashboardProps {
  data: CalendarData;
  setSelectedYearProps: (year: number) => void;
  setSelectedMonth: (month: number) => void;
}
