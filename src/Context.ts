import { createContext, useContext } from 'react';
import { IPhoto } from './App';

export type GlobalContent = {
  photos: IPhoto[],
  setPhotos:(photos: IPhoto[]) => void
}

export const GlobalContext = createContext<GlobalContent>({
  photos: [],
  setPhotos: () => {}
});
export const useGlobalContext = () => useContext(GlobalContext);
