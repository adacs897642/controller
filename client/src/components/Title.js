import React from 'react';
import {Col, Container} from "react-bootstrap";

const Title = ({name}) => {
    return (
        <Container>
            <Col md={12} style={{display:'flex', justifyContent:'center'}}>
                <h2 className={`mt-5 mb-5`} style={{textAlign:"center"}}>{name}</h2>
            </Col>

        </Container>
    );
};

export default Title;