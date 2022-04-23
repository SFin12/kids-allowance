import React, { useEffect, useState } from "react";
import {
    Form,
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setChores } from "../../features/chores/choresSlice";
import { createChore, deleteChore, getChores } from "../../utils/firestore";

export default function AddChores() {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [displayChores, setDisplayChores] = useState([]);
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        getChores()
            .then((chores) => {
                setDisplayChores(Object.keys(chores));
                console.log("chores", chores);
                dispatch(setChores(chores));
            })
            .catch((err) => console.error(err));
    }, [update]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (title && value) {
            createChore(title, value);
            setUpdate(!update);
        }
        // reset input values
        setTitle("");
        setValue("");
    }

    function handleDelete(e) {
        e.preventDefault();
        const name = e.currentTarget.name;

        if (name) {
            deleteChore(name).then(() => setUpdate(!update));
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
                        {/* div to match dollar sign spacing below*/}
                        <div className="d-flex">
                            <span style={{ paddingRight: 15.5 }}></span>
                            <FormControl
                                type="text"
                                placeholder="Example: Wash Dishes"
                                name="text"
                                onChange={handleChange}
                                value={title}
                                maxLength={18}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup
                        className="mb-3"
                        controlId="exampleFormControlTextarea1"
                    >
                        <FormLabel>Value</FormLabel>
                        {/* div to allow dollar sign in front of input */}
                        <div className="d-flex align-items-center">
                            <span
                                style={{
                                    fontSize: "1.rem",
                                    paddingRight: 3.91,
                                }}
                            >
                                $
                            </span>
                            <FormControl
                                type="number"
                                max={10000}
                                maxLength={5}
                                placeholder=".50"
                                name="value"
                                value={value}
                                onChange={handleChange}
                            />
                        </div>
                    </FormGroup>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
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
