import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/** Resets the viewport after React Router changes to a different pathname. */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [pathname])

  return null
}
