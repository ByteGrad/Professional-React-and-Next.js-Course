import React, { createContext, useContext, useMemo } from "react";
import { JobItemId } from "../lib/types";
import { useActiveId } from "../lib/hooks";

type ActiveIdProviderProps = {
  children: React.ReactNode;
};

type ActiveIdContext = {
  activeJobItemId: JobItemId | null;
};

export const ActiveIdContext = createContext<ActiveIdContext | null>(null);

export default function ActiveIdContextProvider({
  children,
}: ActiveIdProviderProps) {
  const activeJobItemId = useActiveId();

  const contextValue = useMemo(
    () => ({
      activeJobItemId,
    }),
    [activeJobItemId]
  );

  return (
    <ActiveIdContext.Provider value={contextValue}>
      {children}
    </ActiveIdContext.Provider>
  );
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);

  if (!context) {
    throw new Error("ActiveIdContext must be used within an ActiveIdProvider");
  }
  return context;
}
