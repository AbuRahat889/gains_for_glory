export interface PaymentFormData {
  serviceLocation: string;
  description: string;
  squareFeet: number | string;
  photos: File[];
  paymentMethod: "paypal" | "stripe";
  expirationDate: string;
  currency?: string;
  phone?: string;
  type?: string;
}
export interface Payment {
  paymentMethod: "paypal" | "stripe";
  cardNumber: string;
  expirationDate: string;
  cvc: string;
}
export interface AgenciesMOdal {
  photos: File[];
}
