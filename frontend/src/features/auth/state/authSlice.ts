import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'customer' | 'worker' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  coopMemberId?: string;
  skills?: string[];
  hourlyRate?: number;
  location?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  user: UserProfile | null;
}

const STORAGE_KEY = 'coop_gig_auth_user';

const loadSavedUser = (): UserProfile | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const savedUser = loadSavedUser();

const initialState: AuthState = {
  isAuthenticated: !!savedUser,
  userRole: savedUser ? savedUser.role : null,
  user: savedUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<UserProfile>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.userRole = action.payload.role;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
      } catch (e) {
        console.error('Failed to persist auth state', e);
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.userRole = null;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error('Failed to clear auth state', e);
      }
    },
    setUserRole(state, action: PayloadAction<UserRole | null>) {
      state.userRole = action.payload;
      if (state.user) {
        state.user.role = action.payload || 'customer';
      }
    },
  },
});

export const { loginSuccess, logout, setUserRole } = authSlice.actions;
export default authSlice.reducer;

