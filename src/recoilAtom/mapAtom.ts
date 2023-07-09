import { atom } from 'recoil';

export const latState = atom<number | null>({
  key: 'latState',
  default: null,
});

export const lngState = atom<number | null>({
  key: 'lngState',
  default: null,
});