import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customAxios } from '../../axios';

const initialState = {
  items: [],
  status: 'loading',
};

export const fetchPets = createAsyncThunk('pets/fetchPets', async () => {
  const { data } = await customAxios.get('/pets');
  return data;
});

export const fetchDeletePet = createAsyncThunk(
  'pets/fetchDeletePet',
  async (id) => {
    await customAxios.delete(`/pets/${id}`);
  }
);

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPets.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPets.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'loaded';
    },
    [fetchPets.rejected]: (state) => {
      state.items = [];
      state.status = 'error';
    },
    [fetchDeletePet.pending]: (state, action) => {
      state.items = state.items.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const petsReducer = petsSlice.reducer;
