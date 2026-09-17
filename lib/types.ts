export type Category = "Popular" | "Rice" | "Chicken" | "Sides" | "Drinks";

export type Illustration =
  | "jollof"
  | "jollof-grilled"
  | "fried-rice"
  | "chicken-chips"
  | "pasta"
  | "plantain"
  | "coleslaw"
  | "chapman";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categories: Category[];
  illustration: Illustration;
  /** Path under /public to a real photo. Falls back to the illustration when absent. */
  photo?: string;
}

export interface CartLine {
  item: MenuItem;
  quantity: number;
}

export interface OrderItemSnapshot {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  illustration: Illustration;
  photo?: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  address: string;
  landmark?: string;
  instructions?: string;
}

export type OrderStatus =
  | "pending"
  | "payment_processing"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "payment_failed";

export interface Order {
  id: string;
  number: string;
  items: OrderItemSnapshot[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: CustomerDetails;
  status: OrderStatus;
  paymentReference?: string;
  createdAt: number;
  updatedAt: number;
}

export interface PaymentResult {
  success: boolean;
  reference: string;
  message: string;
}

export interface ChargeParams {
  orderId: string;
  orderNumber: string;
  amount: number;
  customerName: string;
}

export interface PaymentProvider {
  name: string;
  charge(params: ChargeParams): Promise<PaymentResult>;
}
