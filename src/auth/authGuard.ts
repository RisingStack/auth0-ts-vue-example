import { getInstance } from './auth'
import { NavigationGuard } from 'vue-router'

export const authGuard: NavigationGuard = (to, from, next) => {
  const authService = getInstance()

  const fn = () => {
    // Unwatch loading
    unwatch && unwatch()
    
    // If the user is authenticated, continue with the route
    if (authService.isAuthenticated) {
      return next()
    }

    // Otherwise, log in
    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } })
  }

  // If loading has already finished, check our auth state using `fn()`
  if (!authService.loading) {
    return fn()
  }

  // Watch for the loading property to change before we check isAuthenticated
  const unwatch = authService.$watch('loading', (loading: boolean) => {
    if (loading === false) {
      return fn()
    }
  })
}
