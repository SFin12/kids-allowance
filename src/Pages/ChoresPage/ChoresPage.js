import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import ChoreCard from "../../components/Chores/ChoreCard";
import { selectChores } from "../../features/chores/choresSlice";
import { getChores } from "../../utils/firestore";

export default function ChoresPage() {
    const [sortedChores, setSortedChores] = useState([]);
    const chores = useSelector(selectChores);

    useEffect(() => {
        // Creates sorted array of keys to look up chore info and display alphabetically
        setSortedChores(
            Object.keys(chores)
                .map((chore, i) => chore)
                .sort()
        );
    }, [chores]);

    return (
        <div className="w-100">
            <Container className="d-flex justify-content-center pt-3">
                <Row xs={1} md={2} lg={3} xl={3} xxl={4} className={"w-100"}>
                    {/* Creates a card for each chore with value used for front and back of card */}
                    {sortedChores.map((key, i) => {
                        return (
                            <Col
                                key={i + key}
                                className="d-flex justify-content-center"
                            >
                                <ChoreCard
                                    chore={key}
                                    value={chores[key].value}
                                    completedBy={chores[key].completedBy}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}
