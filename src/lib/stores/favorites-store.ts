import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoriteStock {
  symbol: string
  name: string
  type: string
  region: string
  currency: string
  addedAt: string
}

interface FavoritesStore {
  favorites: FavoriteStock[]
  addFavorite: (stock: Omit<FavoriteStock, 'addedAt'>) => void
  removeFavorite: (symbol: string) => void
  isFavorite: (symbol: string) => boolean
  toggleFavorite: (stock: Omit<FavoriteStock, 'addedAt'>) => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (stock) => {
        const { favorites } = get()
        const favoriteStock: FavoriteStock = {
          ...stock,
          addedAt: new Date().toISOString(),
        }

        // Check if already exists
        if (!favorites.find((fav) => fav.symbol === stock.symbol)) {
          set({ favorites: [...favorites, favoriteStock] })
        }
      },

      removeFavorite: (symbol) => {
        const { favorites } = get()
        set({
          favorites: favorites.filter((fav) => fav.symbol !== symbol),
        })
      },

      isFavorite: (symbol) => {
        const { favorites } = get()
        return favorites.some((fav) => fav.symbol === symbol)
      },

      toggleFavorite: (stock) => {
        const { isFavorite, addFavorite, removeFavorite } = get()

        if (isFavorite(stock.symbol)) {
          removeFavorite(stock.symbol)
        } else {
          addFavorite(stock)
        }
      },
    }),
    {
      name: 'favorites-storage', // for localStorage key
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          return JSON.parse(str)
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          localStorage.removeItem(name)
        },
      },
    },
  ),
)
