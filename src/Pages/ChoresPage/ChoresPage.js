import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import ChoreCard from "../../components/Chores/ChoreCard";
import { selectChores } from "../../features/chores/choresSlice";

export default function ChoresPage() {
    const chores = useSelector(selectChores);

    return (
        <div>
            <Container className="justify-content-start mt-5">
                <Row xs={1} md={2} lg={3} xxl={4}>
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
