import { createContext } from 'react';
export const AppContext = createContext({
  theme: '',
  fill: 0,
  allBounds: [],
  boundType: 'day',
  setBoundType: () => ({})
});
