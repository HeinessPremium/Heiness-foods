"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { CartLine, MenuItem, OrderItemSnapshot } from "./types";
import { DELIVERY_FEE } from "./mock-data";

const STORAGE_KEY = "heiness_cart_v1";

type StoredLine = { itemId: string; quantity: number };

interface CartState {
  lines: Record<string, CartLine>;
  hydrated: boolean;
}

type CartAction =
  | { type: "HYDRATE"; lines: Record<string, CartLine> }
  | { type: "ADD"; item: MenuItem; quantity: number }
  | { type: "INCREMENT"; itemId: string }
  | { type: "DECREMENT"; itemId: string }
  | { type: "REMOVE"; itemId: string }
  | { type: "CLEAR" };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { lines: action.lines, hydrated: true };
    case "ADD": {
      const existing = state.lines[action.item.id];
      const quantity = (existing?.quantity ?? 0) + action.quantity;
      return {
        ...state,
        lines: {
          ...state.lines,
          [action.item.id]: { item: action.item, quantity },
        },
      };
    }
    case "INCREMENT": {
      const existing = state.lines[action.itemId];
      if (!existing) return state;
      return {
        ...state,
        lines: {
          ...state.lines,
          [action.itemId]: { ...existing, quantity: existing.quantity + 1 },
        },
      };
    }
    case "DECREMENT": {
      const existing = state.lines[action.itemId];
      if (!existing) return state;
      const quantity = existing.quantity - 1;
      const lines = { ...state.lines };
      if (quantity <= 0) {
        delete lines[action.itemId];
      } else {
        lines[action.itemId] = { ...existing, quantity };
      }
      return { ...state, lines };
    }
    case "REMOVE": {
      const lines = { ...state.lines };
      delete lines[action.itemId];
      return { ...state, lines };
    }
    case "CLEAR":
      return { ...state, lines: {} };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  hydrated: boolean;
  addItem: (item: MenuItem, quantity?: number) => void;
  increment: (itemId: string) => void;
  decrement: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  quantityOf: (itemId: string) => number;
  toSnapshot: () => OrderItemSnapshot[];
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: {}, hydrated: false });

  // Hydrate from sessionStorage on mount. We only store item ids + quantity;
  // the MenuItem data itself always comes from the mock catalogue, so a
  // schema change to MenuItem never breaks an old persisted cart.
  useEffect(() => {
    (async () => {
      try {
        const raw = window.sessionStorage.getItem(STORAGE_KEY);
        const stored: StoredLine[] = raw ? JSON.parse(raw) : [];
        const { MENU_ITEMS } = await import("./mock-data");
        const lines: Record<string, CartLine> = {};
        stored.forEach(({ itemId, quantity }) => {
          const item = MENU_ITEMS.find((menuItem) => menuItem.id === itemId);
          if (item && quantity > 0) {
            lines[itemId] = { item, quantity };
          }
        });
        dispatch({ type: "HYDRATE", lines });
      } catch {
        dispatch({ type: "HYDRATE", lines: {} });
      }
    })();
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    const stored: StoredLine[] = Object.values(state.lines).map((line) => ({
      itemId: line.item.id,
      quantity: line.quantity,
    }));
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // Ignore storage failures — cart just won't persist this session.
    }
  }, [state.lines, state.hydrated]);

  const addItem = useCallback((item: MenuItem, quantity = 1) => {
    dispatch({ type: "ADD", item, quantity });
  }, []);
  const increment = useCallback((itemId: string) => dispatch({ type: "INCREMENT", itemId }), []);
  const decrement = useCallback((itemId: string) => dispatch({ type: "DECREMENT", itemId }), []);
  const removeItem = useCallback((itemId: string) => dispatch({ type: "REMOVE", itemId }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const lines = useMemo(() => Object.values(state.lines), [state.lines]);
  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines]
  );
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity * line.item.price, 0),
    [lines]
  );
  const deliveryFee = lines.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const quantityOf = useCallback(
    (itemId: string) => state.lines[itemId]?.quantity ?? 0,
    [state.lines]
  );

  const toSnapshot = useCallback(
    (): OrderItemSnapshot[] =>
      lines.map((line) => ({
        itemId: line.item.id,
        name: line.item.name,
        price: line.item.price,
        quantity: line.quantity,
        illustration: line.item.illustration,
        photo: line.item.photo,
      })),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    hydrated: state.hydrated,
    addItem,
    increment,
    decrement,
    removeItem,
    clearCart,
    quantityOf,
    toSnapshot,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
