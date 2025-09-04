// Sistema de autenticación simple para el panel administrativo
export interface User {
  id: string
  username: string
  isAdmin: boolean
}

export const ADMIN_USERNAME = 'admin'
export const ADMIN_PASSWORD = 'admin123' // En producción, esto debería ser más seguro

export const login = async (username: string, password: string): Promise<User | null> => {
  // Simulación de autenticación - en producción esto debería conectarse al backend
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const user: User = {
      id: '1',
      username: ADMIN_USERNAME,
      isAdmin: true
    }
    
    // Guardar en localStorage
    localStorage.setItem('user', JSON.stringify(user))
    return user
  }
  
  return null
}

export const logout = (): void => {
  localStorage.removeItem('user')
}

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null
  
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export const isAdmin = (): boolean => {
  const user = getCurrentUser()
  return user?.isAdmin || false
}
