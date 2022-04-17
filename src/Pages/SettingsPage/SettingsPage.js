import React, { useEffect, useState } from "react";
import { selectUserId, setFamilyMembers } from "../../features/user/userSlice";
import {
    Accordion,
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";
import {
    createFamily,
    deleteFamily,
    getFamily,
    updateAllowance,
} from "../../utils/firestore";
import { useDispatch, useSelector } from "react-redux";
import "./SettingsPage.css";
import AddChores from "../../components/Chores/AddChoirs";
import FormInput from "../../components/Forms/FormInput";

export default function SettingsPage(props) {
    const [family, setFamily] = useState("");
    const [displayFamily, setDisplayFamily] = useState([]);
    const [update, setUpdate] = useState(false);
    const uid = useSelector(selectUserId);
    const dispatch = useDispatch();

    useEffect(() => {
        const famData = async () => {
            const famArr = await getFamily(uid);
            if (famArr) {
                // shows family members under input with option to delete
                setDisplayFamily(famArr);
                // set redux family members
                dispatch(setFamilyMembers({ familyMembers: famArr }));
                famArr.forEach((member) => {
                    updateAllowance(member);
                });
            }
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
        //splits names into an array
        const famArr = family.split(",");
        const cleanfamArr = famArr.map((member) => member.trim());
        createFamily(cleanfamArr);
        setUpdate(!update);
        setFamily("");
    }

    function handleDelete(e) {
        e.preventDefault();
        const name = e.currentTarget.name;

        deleteFamily(name);
        setUpdate(!update);
    }

    return (
        <div className="d-block w-100">
            <Accordion>
                {/* Add family members input section */}
                <Accordion.Item eventKey="0" className="">
                    <Accordion.Header>Edit Family</Accordion.Header>
                    <Accordion.Body
                        style={{ backgroundColor: "rgb(255,255,255)" }}
                    >
                        <Form onSubmit={handleSubmit} className="mx-3">
                            <FormGroup className="d-block text-start">
                                <FormLabel className="label">
                                    Add Family Member
                                </FormLabel>
                                <FormGroup className="d-flex">
                                    <FormControl
                                        type="text"
                                        className="family-input"
                                        onChange={handleChange}
                                        name="family"
                                        placeholder="Example: John, Jane"
                                        value={family}
                                        required
                                    />
                                    <Button variant="primary" type="submit">
                                        Save
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
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Edit Chores</Accordion.Header>
                    {/* Add chores section */}
                    <Accordion.Body
                        style={{ backgroundColor: "rgb(255,255,255)" }}
                    >
                        <AddChores />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
