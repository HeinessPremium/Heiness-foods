import { Category, MenuItem } from "./types";

// Fictional demo catalogue for the Heiness Foods portfolio project.
// Prices are illustrative only and not tied to any real menu.

export const CATEGORIES: Category[] = [
  "Popular",
  "Rice",
  "Chicken",
  "Sides",
  "Drinks",
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "jollof-chicken",
    name: "Jollof Rice & Chicken",
    description:
      "Smoky party-style jollof rice with a piece of seasoned fried chicken.",
    price: 4500,
    categories: ["Popular", "Rice"],
    illustration: "jollof",
    photo: "/images/food/jollof-chicken.jpg",
  },
  {
    id: "fried-rice-chicken",
    name: "Fried Rice & Chicken",
    description:
      "Lightly spiced vegetable fried rice served with fried chicken.",
    price: 4500,
    categories: ["Rice"],
    illustration: "fried-rice",
    photo: "/images/food/fried-rice-chicken.jpg",
  },
  {
    id: "jollof-grilled",
    name: "Jollof Rice & Grilled Chicken",
    description: "Our signature jollof paired with char-grilled chicken.",
    price: 5000,
    categories: ["Popular", "Rice", "Chicken"],
    illustration: "jollof-grilled",
    photo: "/images/food/jollof-grilled.jpg",
  },
  {
    id: "chicken-chips",
    name: "Chicken & Chips",
    description: "Crispy fried chicken with golden, hand-cut chips.",
    price: 4000,
    categories: ["Chicken"],
    illustration: "chicken-chips",
    photo: "/images/food/chicken-chips.jpg",
  },
  {
    id: "pasta-chicken",
    name: "Pasta & Chicken",
    description: "Creamy stir-fried pasta tossed with grilled chicken strips.",
    price: 4500,
    categories: ["Popular"],
    illustration: "pasta",
    photo: "/images/food/pasta-chicken.jpg",
  },
  {
    id: "plantain",
    name: "Plantain",
    description: "Sweet, golden-fried ripe plantain — a classic side.",
    price: 1500,
    categories: ["Sides"],
    illustration: "plantain",
    photo: "/images/food/plantain.jpg",
  },
  {
    id: "coleslaw",
    name: "Coleslaw",
    description: "Fresh, creamy house-made coleslaw.",
    price: 1000,
    categories: ["Sides"],
    illustration: "coleslaw",
    photo: "/images/food/coleslaw.jpg",
  },
  {
    id: "chapman",
    name: "Chapman",
    description: "Chilled house Chapman — the classic Nigerian mocktail.",
    price: 1500,
    categories: ["Drinks"],
    illustration: "chapman",
    photo: "/images/food/chapman.jpg",
  },
];

export const DELIVERY_FEE = 1000;

export function getMenuItem(id: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.id === id);
}
