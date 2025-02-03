import { IUser } from '@/shared/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'



interface StoreSessionState {
  user: IUser | null
  refreshToken: string | null
  setUser: (user: IUser, refreshToken?: string) => void
  logout: () => void
}

export const useSessionStore = create<StoreSessionState>()(
  immer(
    persist(
      (set) => ({
        user: null,
        refreshToken: null,
        setUser: (user, refreshToken) =>
          set({ user, refreshToken: refreshToken }),
        logout: () => set({ user: null, refreshToken: null }),
      }),
      {
        name: 'session-store',
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          user: state.user,
          refreshToken: state.refreshToken,
        }),
      }
    )
  )
)
