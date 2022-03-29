import React, { useEffect, useState } from "react";
import { selectUserId } from "../../features/user/userSlice";
import {
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";
import { createFamily, deleteFamily, getFamily } from "../../utils/firestore";
import { useSelector } from "react-redux";
import "./SettingsPage.css";

export default function SettingsPage(props) {
    const [family, setFamily] = useState("");
    const [displayFamily, setDisplayFamily] = useState([]);
    const [update, setUpdate] = useState(false);
    const uid = useSelector(selectUserId);

    useEffect(() => {
        const famData = async () => {
            const data = await getFamily(uid);
            setDisplayFamily(data);
        };

        famData();
    }, [update]);

    function handleChange(e) {
        if (e.currentTarget.name === "family") {
            setFamily(e.currentTarget.value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const famArr = family.split(",");
        createFamily(famArr);
        setUpdate(!update);
        setFamily("");
    }

    function handleDelete(e) {
        e.preventDefault();
        const name = e.currentTarget.name;
        console.log(name);
        deleteFamily(name);
        setUpdate(!update);
    }

    return (
        <>
            <h2 className="mt-3">Settings</h2>
            <Form onSubmit={handleSubmit} className="mx-3">
                <FormGroup className="d-block text-start">
                    <FormLabel>
                        Add Family Members (seperate names with commas)
                    </FormLabel>
                    <FormGroup className="d-flex">
                        <FormControl
                            type="text"
                            className="w-25"
                            onChange={handleChange}
                            name="family"
                            value={family}
                            required
                        />
                        <Button variant="primary" type="submit">
                            submit
                        </Button>
                    </FormGroup>
                </FormGroup>
            </Form>
            <section className="d-flex family-members">
                {displayFamily.map((name, i) => (
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
