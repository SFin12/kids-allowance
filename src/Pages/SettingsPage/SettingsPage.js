import React, { useEffect, useState } from "react";
import {
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";
import { createFamily, getFamily } from "../../utils/firestore";

export default function SettingsPage(props) {
    const [family, setFamily] = useState("");
    const [displayFamily, setDisplayFamily] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const famData = async () => {
            const data = await getFamily();
            setDisplayFamily(data);
        };
        if (family) {
            famData();
        }
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
            <section className="d-flex">
                {displayFamily.map((name, i) => (
                    <div key={i + name}>
                        <Button className="m-1" variant="secondary">
                            {name}
                        </Button>
                    </div>
                ))}
            </section>
        </>
    );
}
