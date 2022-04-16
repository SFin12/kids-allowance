import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import ChoreCard from "../../components/Chores/ChoreCard";
import { selectChores } from "../../features/chores/choresSlice";
import { getChores } from "../../utils/firestore";

export default function ChoresPage() {
    const chores = useSelector(selectChores);

    useEffect(() => {
        console.log("chores: ", chores);
    }, [chores]);

    return (
        <div className="w-100">
            <Container className="d-flex justify-content-center pt-3">
                <Row xs={1} md={2} lg={3} xl={3} xxl={4} className={"w-100"}>
                    {Object.keys(chores).map((key, i) => (
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
                    ))}
                </Row>
            </Container>
        </div>
    );
}
