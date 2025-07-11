// import { CalendarDashboard } from "./CalenderDashboard"

// // Sample data matching your format
// const sampleData = {
//   success: true,
//   statusCode: 200,
//   message: "Dashboard data fetched successfully",
//   data: {
//     filter: {
//       month: 1,
//       year: 2025,
//       monthName: "January",
//     },
//     overview: {
//       totalBookings: 24,
//       totalUsers: 18,
//       totalRevenue: 1775,
//       avgRevenuePerBooking: 73.95833333333333,
//     },
//     dailyServiceCounts: [
//       {
//         date: "2025-01-11",
//         count: 2,
//         bookings: [
//           {
//             id: "6820535f1fbdba63152467ed",
//             addOnes: [
//               {
//                 name: "Dog hair removal",
//                 price: 75,
//               },
//             ],
//             user: {
//               id: "6820341631a15aafabba6052",
//               firstName: "John",
//               lastName: "Doe",
//               email: "john@gmail.com",
//               phoneNumber: "+1234567890",
//             },
//             model: "Toyota Camry 2022",
//             category: "Sedan",
//             service: "Interior and Exterior",
//             totalAmount: 550,
//             serviceAmount: 400,
//             status: "CONFIRMED",
//             timeslot: "2025-01-11T11:00:00.000Z",
//           },
//           {
//             id: "682058122be036f03f9750b9",
//             addOnes: [],
//             user: {
//               id: "6820341631a15aafabba6052",
//               firstName: "Jane",
//               lastName: "Smith",
//               email: "jane@gmail.com",
//               phoneNumber: "+1234567891",
//             },
//             model: "Honda Civic 2023",
//             category: "Sedan",
//             service: "Exterior Only",
//             totalAmount: 200,
//             serviceAmount: 200,
//             status: "PENDING",
//             timeslot: "2025-01-11T13:00:00.000Z",
//           },
//         ],
//       },
//       {
//         date: "2025-01-15",
//         count: 1,
//         bookings: [
//           {
//             id: "6822e670ece567dc98d942c5",
//             addOnes: [],
//             user: {
//               id: "68206aa605774691f25090d9",
//               firstName: "Mike",
//               lastName: "Johnson",
//               email: "mike@gmail.com",
//               phoneNumber: "123456789",
//             },
//             model: "BMW X5 2022",
//             category: "SUV",
//             service: "Full Service",
//             totalAmount: 350,
//             serviceAmount: 350,
//             status: "COMPLETED",
//             timeslot: "2025-01-15T10:00:00.000Z",
//           },
//         ],
//       },
//       {
//         date: "2025-01-20",
//         count: 3,
//         bookings: [
//           {
//             id: "booking1",
//             user: {
//               firstName: "Alice",
//               lastName: "Brown",
//             },
//             service: "Interior Only",
//             status: "CONFIRMED",
//             timeslot: "2025-01-20T09:00:00.000Z",
//           },
//           {
//             id: "booking2",
//             user: {
//               firstName: "Bob",
//               lastName: "Wilson",
//             },
//             service: "Exterior Only",
//             status: "PENDING",
//             timeslot: "2025-01-20T14:00:00.000Z",
//           },
//           {
//             id: "booking3",
//             user: {
//               firstName: "Carol",
//               lastName: "Davis",
//             },
//             service: "Full Service",
//             status: "CANCELLED",
//             timeslot: "2025-01-20T16:00:00.000Z",
//           },
//         ],
//       },
//       {
//         date: "2025-01-25",
//         count: 2,
//         bookings: [
//           {
//             id: "booking4",
//             user: {
//               firstName: "David",
//               lastName: "Miller",
//             },
//             service: "Interior and Exterior",
//             status: "CONFIRMED",
//             timeslot: "2025-01-25T11:00:00.000Z",
//           },
//           {
//             id: "booking5",
//             user: {
//               firstName: "Eva",
//               lastName: "Garcia",
//             },
//             service: "Full Service",
//             status: "CONFIRMED",
//             timeslot: "2025-01-25T15:00:00.000Z",
//           },
//         ],
//       },
//     ],
//   },
// }

// export default function Calender() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <CalendarDashboard data={sampleData.data} />
//     </div>
//   )
// }

import React from "react";

export default function Calender() {
  return <div>Calender</div>;
}
