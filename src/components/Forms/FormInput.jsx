import React, { useState } from "react";
import {
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";

export default function FormInput({
    submitButtonTitle,
    titles = ["Title"],
    handleSubmit,
}) {
    const [goalTitle, setGoalTitle] = useState("");
    const [goalCost, setGoalCost] = useState("");

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                {titles.map((title, i) => (
                    <div key={i + title} style={{ marginBottom: 20 }}>
                        <FormLabel>{title}</FormLabel>
                        <FormControl name={title}></FormControl>
                    </div>
                ))}
                <Button type="submit">Save</Button>
            </FormGroup>
        </Form>
    );
}
