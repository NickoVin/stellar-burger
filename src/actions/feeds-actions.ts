import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFeeds = createAsyncThunk(
  'order/fetchFeeds',
  async () => await getFeedsApi()
);
