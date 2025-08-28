import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { Bill } from "../types/billTypes"

type Favorites = {
  favorites: Map<string, Bill>
  addFavorite: (bill: Bill) => void
  removeFavorite: (bill: Bill) => void
  toggleFavorite: (bill: Bill) => void
}

// For persisting new Map() in storage
type SerializedMap<K, V> = { __type: "Map"; value: [K, V][] }

const mapReplacer = <K, V>(_key: string, value: unknown): unknown =>
  value instanceof Map
    ? ({ __type: "Map", value: Array.from(value.entries()) } as SerializedMap<
        K,
        V
      >)
    : value

const mapReviver = <K, V>(_key: string, value: unknown): unknown =>
  value && typeof value === "object" && (value as any).__type === "Map"
    ? new Map<K, V>((value as SerializedMap<K, V>).value)
    : value

export const useFavoritesStore = create<Favorites>()(
  persist(
    (set) => ({
      favorites: new Map<string, Bill>(),

      addFavorite: (bill) =>
        set((state) => {
          const next = new Map(state.favorites)
          next.set(bill.uri, bill)
          return { favorites: next }
        }),

      removeFavorite: (bill) =>
        set((state) => {
          const next = new Map(state.favorites)
          next.delete(bill.uri)
          return { favorites: next }
        }),

      toggleFavorite: (bill) =>
        set((state) => {
          const newBill = new Map(state.favorites)
          if (newBill.has(bill.uri)) {
            console.log("Removing Bill from Favorite with uri...", bill.uri)
            newBill.delete(bill.uri)
          } else {
            console.log("Adding Bill to Favorite with uri...", bill.uri)
            newBill.set(bill.uri, bill)
          }
          return { favorites: newBill }
        }),
    }),
    {
      name: "favorites",
      // For persisting new Map() in storage
      storage: createJSONStorage(() => localStorage, {
        replacer: (key, value) => mapReplacer<string, Bill>(key, value),
        reviver: (key, value) => mapReviver<string, Bill>(key, value),
      }),
    },
  ),
)
