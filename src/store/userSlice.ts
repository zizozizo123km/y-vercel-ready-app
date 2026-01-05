import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api'; // Assuming you have an API service configured

// Define the shape of the user state
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  profilePictureUrl: string;
  bio: string;
  coverPhotoUrl: string;
  friendsCount: number;
  postsCount: number;
}

export interface UserState {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// --- Async Thunks ---

// Thunk to fetch current user data (e.g., after login or on app load)
export const fetchCurrentUser = createAsyncThunk<
  UserProfile, // Return type
  void, // Argument type
  { rejectValue: string } // ThunkAPI configuration
>('user/fetchCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<UserProfile>('/users/me');
    return response.data;
  } catch (err: any) {
    let errorMessage = 'Failed to fetch user data.';
    if (err.response && err.response.data && err.response.data.message) {
      errorMessage = err.response.data.message;
    }
    return rejectWithValue(errorMessage);
  }
});

// Thunk to update user profile information
export const updateProfile = createAsyncThunk<
  UserProfile, // Return type
  Partial<UserProfile>, // Argument type (data to update)
  { rejectValue: string }
>('user/updateProfile', async (updateData, { rejectWithValue }) => {
  try {
    const response = await api.put<UserProfile>('/users/me', updateData);
    return response.data;
  } catch (err: any) {
    let errorMessage = 'Failed to update profile.';
    if (err.response && err.response.data && err.response.data.message) {
      errorMessage = err.response.data.message;
    }
    return rejectWithValue(errorMessage);
  }
});

// --- Slice Definition ---

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reducer for successful login/auth (can be used if auth isn't handled via thunks)
    setAuthenticatedUser: (state, action: PayloadAction<UserProfile>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    // Reducer for logout
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      // Note: API call for logout should ideally happen outside this reducer
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // --- fetchCurrentUser ---
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.currentUser = null;
        state.isAuthenticated = false;
        state.error = action.payload || 'Failed to authenticate user.';
      })

    // --- updateProfile ---
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        // Merge the updated data into the current user profile
        if (state.currentUser) {
            state.currentUser = { ...state.currentUser, ...action.payload };
        } else {
            // Should not happen if authenticated, but for safety
            state.currentUser = action.payload;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Could not save profile changes.';
      });
  },
});

export const { setAuthenticatedUser, logout, clearError } = userSlice.actions;

export default userSlice.reducer;

// Selectors (optional, but good practice)
// export const selectCurrentUser = (state: { user: UserState }) => state.user.currentUser;
// export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
// export const selectUserLoading = (state: { user: UserState }) => state.user.isLoading;
// export const selectUserError = (state: { user: UserState }) => state.user.error;