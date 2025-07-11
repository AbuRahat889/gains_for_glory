import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Car, Clock, DollarSign } from "lucide-react";
import { Booking } from "@/Types/BookingItem";
import { useUpdateBookingStatusMutation } from "@/redux/api/booking";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

interface BookingCardProps {
  booking: Booking;
}


export function BookingCard({ booking }: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800 border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-green-500 hover:text-white";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-green-500 hover:text-white";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-green-500 hover:text-white";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };



  const [updateFN] = useUpdateBookingStatusMutation();

  const handleUpdate = async (id: string, status: string) => {
    if (status === "COMPLETED") {
      return toast.error("This booking is already marked as completed.");
    }
    if (status === "CANCELLED") {
      return toast.error("This booking has already been cancelled.");
    }

    Swal.fire({
      title: "Confirm Update",
      text: "Are you sure you want to mark this booking as completed? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark as completed",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await updateFN({ id, status: "COMPLETED" });
        if (res?.data?.data?.success) {
          Swal.fire({
            title: "Booking Updated",
            text: "The booking status has been successfully updated to completed.",
            icon: "success",
          });
          toast.success("Booking marked as completed successfully.");
        } else {
          toast.error("Failed to update the booking. Please try again.");
        }
      }
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {booking.service}
          </CardTitle>
          <Badge
            onClick={() => handleUpdate(booking?.id, booking.status)}
            className={`text-xs cursor-pointer ${getStatusColor(
              booking.status
            )}`}
          >
            {booking.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className=" flex gap-10">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>
              {booking?.user?.firstName} {booking?.user?.lastName}
            </span>
          </div>

          {booking?.model && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Car className="h-4 w-4" />
              <span>{booking?.model}</span>
            </div>
          )}

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>
              {new Date(booking?.timeslot).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {booking?.totalAmount && (
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-900">
              <DollarSign className="h-4 w-4" />
              <span>${booking.totalAmount}</span>
            </div>
          )}
        </div>
        <div>
          <h1>Addons</h1>
          {booking?.addOnes?.map((addons: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between space-x-2 text-sm font-medium text-gray-900 space-y-3"
            >
              <span>{addons?.name}</span>
              <span>${addons?.price}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
