export function withAuth(Component: any) {
  return function ProtectedComponent(props: any) {
    // This will be enhanced in the component itself using useProtectedRoute hook
    return <Component {...props} />
  }
}
