import { useAccordionButton } from "react-bootstrap/AccordionButton"

export default function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => console.log("totally custom!"))

  return (
    <button type="button" style={{ backgroundColor: "pink" }} onClick={decoratedOnClick}>
      {children}
    </button>
  )
}
