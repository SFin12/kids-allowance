import React from "react";
import {
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";

export default function FormInput({
    titles = ["Title"],
    handleSubmit,
    placeholder,
}) {
    return (
        <Form onSubmit={handleSubmit} id="form">
            <FormGroup>
                {titles.map((title, i) => (
                    <div key={i + title} style={{ marginBottom: 20 }}>
                        <FormLabel>{title}</FormLabel>
                        <div className="d-flex align-items-center">
                            {title === "Cost" ||
                            title === "Value" ||
                            title === "Amount" ? (
                                <span
                                    style={{
                                        fontSize: "1.2rem",
                                        paddingRight: 3.91,
                                    }}
                                >
                                    $
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
                            <FormControl
                                name={title}
                                type={
                                    title === "Cost" ||
                                    title === "Value" ||
                                    title === "Amount"
                                        ? "number"
                                        : "text"
                                }
                                min={0}
                                presicion={2}
                                step={0.25}
                                defaultValue=""
                                placeholder={placeholder}
                                required
                                maxLength={20}
                            ></FormControl>
                        </div>
                    </div>
                ))}
                <Button type="submit">Save</Button>
            </FormGroup>
        </Form>
    );
}
