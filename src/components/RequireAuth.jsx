// src/components/RequireAuth.jsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth'

export default function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    // redirect to /login, preserving where they came from
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
