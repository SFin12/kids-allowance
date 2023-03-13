import { useLocation } from "react-router-dom"

export default function StoreLinkPage() {
  const location = useLocation()
  const { link } = location.state
  try {
    return <iframe title="store-link" className="w-100" src={link} />
  } catch (error) {
    return <div>There was an error loading the store item</div>
  }
}
