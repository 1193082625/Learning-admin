import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface UserInfo {
  userName: string;
  userId: string;
  token: string;
}

interface UserState {
  isLogin: boolean;
  userName: string;
  userId: string;
  token: string;
  login: (params: UserInfo) => void;
  logout: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        isLogin: get()?.isLogin || false,
        userName: get()?.userName || '',
        userId: get()?.userId || '',
        token: get()?.token || '',
        login: (params) => set((state) => ({
          userId: params.userId,
          userName: params.userName,
          token: params.token,
          isLogin: true,
        })),
        logout: () => set({isLogin: false, userName: '', token: ''})
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
)