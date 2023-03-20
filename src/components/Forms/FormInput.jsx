import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { useSelector } from "react-redux"
import { selectPointsType } from "../../features/user/userSlice"

export default function FormInput({ titles = ["Title"], handleSubmit, placeholders = [""] }) {
  const pointsType = useSelector(selectPointsType)

  return (
    <Form onSubmit={handleSubmit} id="form">
      <FormGroup>
        {titles.map((title, i) => (
          <div key={i + title} style={{ marginBottom: 20 }}>
            <FormLabel>{title}</FormLabel>
            <div className="d-flex align-items-center">
              {title === "Cost" || title === "Value" || title === "Amount" ? (
                <span
                  style={{
                    fontSize: "1.2rem",
                    paddingRight: 3.91,
                  }}
                >
                  {pointsType.icon}
                </span>
              ) : (
                <span
                  style={{
                    fontSize: "1.2rem",
                    paddingRight: 3.91,
                  }}
                >
                  &nbsp;&nbsp;
                </span>
              )}
              <FormControl name={title} type={title === "Cost" || title === "Value" || title === "Amount" ? "number" : "text"} min={0} precision={2} step={pointsType.type === "money" ? 0.05 : 1} defaultValue="" placeholder={placeholders[i]} required maxLength={20}></FormControl>
            </div>
          </div>
        ))}
        <Button type="submit">Save</Button>
      </FormGroup>
    </Form>
  )
}
