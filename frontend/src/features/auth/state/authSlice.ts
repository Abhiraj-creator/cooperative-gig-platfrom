import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserRole = 'customer' | 'worker' | 'admin';

interface AuthState {
  userRole: UserRole | null;
}

const initialState: AuthState = {
  userRole: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserRole(state, action: PayloadAction<UserRole | null>) {
      state.userRole = action.payload;
    },
  },
});

export const { setUserRole } = authSlice.actions;
export default authSlice.reducer;
