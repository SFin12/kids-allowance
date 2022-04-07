import React, { useState } from "react";
import {
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";

export default function FormInput({ titles = ["Title"], handleSubmit }) {
    return (
        <Form onSubmit={handleSubmit} id="form">
            <FormGroup>
                {titles.map((title, i) => (
                    <div key={i + title} style={{ marginBottom: 20 }}>
                        <FormLabel>{title}</FormLabel>
                        <FormControl
                            name={title}
                            type={
                                title === "Cost" || title === "Value"
                                    ? "number"
                                    : "text"
                            }
                            defaultValue=""
                            required
                        ></FormControl>
                    </div>
                ))}
                <Button type="submit">Save</Button>
            </FormGroup>
        </Form>
    );
}
