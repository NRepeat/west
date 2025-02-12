import { IUser } from '@/shared/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'


interface StoreSessionState {
  user: IUser | null
  refreshToken: string | null
  userSession: { uid: string, cartId: string } | null
  setUser: (user: IUser, refreshToken?: string) => void
  logout: () => void
  cart: { id: string, items: any[] } | null
  setCart: (cart: { id: string, items: any[] }) => void
  createSession: (userSession: { uid: string, cartId: string }) => void
}

export const useSessionStore = create<StoreSessionState>()(
  immer(
    persist(
      (set) => ({
        user: null,
        userSession: null,
        refreshToken: null,
        setUser: (user, refreshToken) =>
          set({ user, refreshToken: refreshToken }),
        logout: () => set({ user: null, refreshToken: null, userSession: null, }),
        createSession: (userSession) => set((state) => ({ userSession: userSession, cart: { id: userSession.cartId, items: state.cart?.items } })),
        cart: null,
        setCart: (cart) => set((state) => ({ cart: { id: state.cart?.id, items: cart.items } })),
      }),
      {
        name: 'session-store',
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          user: state.user,
          refreshToken: state.refreshToken,
          userSession: state.userSession,
          cart: state.cart,
        }),
      }
    )
  )
)
