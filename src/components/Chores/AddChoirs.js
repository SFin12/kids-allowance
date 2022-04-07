import React, { useEffect, useState } from "react";
import {
    Form,
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from "react-bootstrap";
import { createChore, deleteChore, getChores } from "../../utils/firestore";

export default function AddChores() {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [displayChores, setDisplayChores] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        getChores().then((chores) => {
            setDisplayChores(Object.keys(chores));
        });
    }, [update]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (title && value) {
            createChore(title, value);
        }
        setTitle("");
        setValue("");
    }

    function handleDelete(e) {
        e.preventDefault();
        const name = e.currentTarget.name;
        console.log(name);
        if (name) {
            deleteChore(name);
            setUpdate(!update);
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
        <>
            <Form>
                <FormGroup>
                    <FormGroup
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <FormLabel>Title</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Dishes"
                            name="text"
                            onChange={handleChange}
                            value={title}
                        />
                    </FormGroup>
                    <FormGroup
                        className="mb-3"
                        controlId="exampleFormControlTextarea1"
                    >
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
                </FormGroup>
            </Form>
            <section className="d-flex family-members">
                {displayChores.map((name, i) => (
                    <div key={i + name}>
                        <button
                            className="m-1 family-member-button"
                            onClick={handleDelete}
                            name={name}
                        >
                            x {name}
                        </button>
                    </div>
                ))}
            </section>
        </>
    );
}
