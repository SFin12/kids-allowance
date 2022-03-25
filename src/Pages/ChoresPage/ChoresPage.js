import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import ChoreCard from "../../components/Chores/ChoreCard";

export default function ChoresPage() {
    const sampleChores = {
        poop: 10,
        dishes: 5,
        vacuume: 5,
        Bathrooms: 10,
        test: 7,
        voom: 5,
        mop: 10,
        wash: 7,
    };

    return (
        <div>
            <h2>Chores</h2>
            <Container className="justify-content-start">
                <Row xs={1} md={2} lg={3} xxl={4}>
                    {Object.keys(sampleChores).map((key, i) => (
                        <Col
                            key={i + key}
                            className="d-flex justify-content-center"
                        >
                            <ChoreCard chore={key} value={sampleChores[key]} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
