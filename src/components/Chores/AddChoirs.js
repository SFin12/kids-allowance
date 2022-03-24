import React, { useState } from "react";
import { FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";
import { createchore, deletechore } from "../../utils/firestore";

export default function Addchores() {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (title && value) {
            createchore(title, value);
        }
        setTitle("");
        setValue("");
    }

    function handleDelete() {
        if (title) {
            deletechore(title);
        }
    }

    function handleChange(e) {
        if (e.target.name === "text") {
            setTitle(e.target.value);
        } else {
            setValue(e.target.value);
        }
    }

    return (
        <FormGroup>
            <FormGroup className="mb-3" controlId="exampleForm.ControlInput1">
                <FormLabel>Title</FormLabel>
                <FormControl
                    type="text"
                    placeholder="Dishes"
                    name="text"
                    onChange={handleChange}
                    value={title}
                />
            </FormGroup>
            <FormGroup className="mb-3" controlId="exampleFormControlTextarea1">
                <FormLabel>Value</FormLabel>
                <FormControl
                    type="number"
                    placeholder="value"
                    name="value"
                    value={value}
                    onChange={handleChange}
                />
            </FormGroup>
            <Button variant="secondary" onClick={handleSubmit}>
                Submit
            </Button>
            <Button variant="warning" onClick={handleDelete}>
                Delete
            </Button>
        </FormGroup>
    );
}