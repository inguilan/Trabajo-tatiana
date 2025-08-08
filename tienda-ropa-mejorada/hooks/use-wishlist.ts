"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id)

        if (!existingItem) {
          set({ items: [...items, item] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id)
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
    },
  ),
)
