'use client'
import React, { useContext, useRef, type ReactNode } from "react"
import { useStore } from "zustand"
import { createGlobalStore, GlobalStore } from "../stores/global-store.store"

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>

const GlobalStoreContext = React.createContext<GlobalStoreApi | undefined>(undefined)

export interface GlobalStoreProviderProps {
  children: ReactNode
}

export const GlobalStoreProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  const storeRef = useRef<GlobalStoreApi | null>(null);

  if(!storeRef.current){
    storeRef.current = createGlobalStore()
  }

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
}

export const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
  const globalStoreContext = useContext(GlobalStoreContext);

  if(!globalStoreContext){
    throw new Error('useGlobalContext must be used within globalStorePovider')
  }

  return useStore(globalStoreContext, selector);
}