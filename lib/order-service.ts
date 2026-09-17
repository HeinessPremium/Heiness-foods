import { CustomerDetails, Order, OrderItemSnapshot, OrderStatus } from "./types";

/**
 * Mock persistence layer for orders.
 *
 * This stands in for a real database (e.g. Supabase/Postgres). Every
 * function here is written so the rest of the app only depends on the
 * exported functions below, not on localStorage directly — swapping this
 * file for one backed by a real API is the only change a production
 * migration would need.
 */

const ORDERS_KEY = "heiness_orders_v1";
const COUNTER_KEY = "heiness_order_counter_v1";
const EVENT_NAME = "heiness:orders-updated";
const STARTING_ORDER_NUMBER = 1042;

function isBrowser() {
  return typeof window !== "undefined";
}

function readAll(): Order[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

function writeAll(orders: Order[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {
    // Storage unavailable (private mode, quota, etc.) — the order simply
    // won't persist across a reload for this demo.
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

function nextOrderNumber(): string {
  if (!isBrowser()) return `HF-${STARTING_ORDER_NUMBER}`;
  try {
    const raw = window.localStorage.getItem(COUNTER_KEY);
    const current = raw ? parseInt(raw, 10) : STARTING_ORDER_NUMBER;
    const next = current + 1;
    window.localStorage.setItem(COUNTER_KEY, String(next));
    return `HF-${current}`;
  } catch {
    return `HF-${STARTING_ORDER_NUMBER}`;
  }
}

export interface CreateOrderInput {
  items: OrderItemSnapshot[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: CustomerDetails;
}

export function createOrder(input: CreateOrderInput): Order {
  const now = Date.now();
  const order: Order = {
    id: `ord_${now}_${Math.random().toString(36).slice(2, 8)}`,
    number: nextOrderNumber(),
    items: input.items,
    subtotal: input.subtotal,
    deliveryFee: input.deliveryFee,
    total: input.total,
    customer: input.customer,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  const orders = readAll();
  orders.unshift(order);
  writeAll(orders);
  return order;
}

export function getOrder(id: string): Order | undefined {
  return readAll().find((order) => order.id === id);
}

export function getAllOrders(): Order[] {
  return readAll().sort((a, b) => b.createdAt - a.createdAt);
}

export function updateOrder(id: string, patch: Partial<Order>): Order | undefined {
  const orders = readAll();
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return undefined;
  const updated: Order = { ...orders[index], ...patch, updatedAt: Date.now() };
  orders[index] = updated;
  writeAll(orders);
  return updated;
}

export function updateOrderStatus(id: string, status: OrderStatus): Order | undefined {
  return updateOrder(id, { status });
}

export function subscribeToOrders(callback: () => void): () => void {
  if (!isBrowser()) return () => {};
  const handler = () => callback();
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", handler);
  };
}

/** Ordered progression used by both the auto-advance simulation and the UI timeline. */
export const STATUS_SEQUENCE: OrderStatus[] = [
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "delivered",
];

export function nextStatus(status: OrderStatus): OrderStatus | undefined {
  const index = STATUS_SEQUENCE.indexOf(status);
  if (index === -1 || index === STATUS_SEQUENCE.length - 1) return undefined;
  return STATUS_SEQUENCE[index + 1];
}
