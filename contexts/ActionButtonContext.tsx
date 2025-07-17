'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ActionButtonContextType = {
  isLoadingId: string | null
  setLoadingId: (id: string | null) => void
}

const ActionButtonContext = createContext<ActionButtonContextType | undefined>(undefined)

export const ActionButtonProvider = ({ children }: { children: ReactNode }) => {
  const [isLoadingId, setLoadingId] = useState<string | null>(null)

  return (
    <ActionButtonContext.Provider value={{ isLoadingId, setLoadingId }}>
      {children}
    </ActionButtonContext.Provider>
  )
}

export const useActionButton = () => {
  const context = useContext(ActionButtonContext)
  if (!context) {
    throw new Error('useActionButton must be used within an ActionButtonProvider')
  }
  return context
}
