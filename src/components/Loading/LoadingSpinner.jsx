import { Spinner } from "react-bootstrap"

export default function LoadingSpinner() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Spinner animation="border" variant="info" />
    </div>
  )
}
