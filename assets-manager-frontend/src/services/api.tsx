import type Asset from '../types/Asset';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080'
});

export const getAssets = () => api.get<Asset[]>('/assets');

export const createAsset = (data: Asset) =>
  api.post<Asset>('/assets', data);

export const updateAsset = (id: number, data: Asset) =>
  api.put<Asset>(`/assets/${id}`, data);

export const deleteAsset = (id: number) =>
  api.delete<void>(`/assets/${id}`);