"use client"

import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { LoginForm } from '@/components/admin/login-form'
import { useAuth } from '@/context/AuthContext'

export default function AdminPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-600"></div>
      </div>
    )
  }

  if (!user || !user.isAdmin) {
    return <LoginForm />
  }

  return <AdminDashboard />
}
