import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';


export default function About() {
  return (
    <>
      
      <Container className="my-5">
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <Image src="https://sowmya-app-backnd.onrender.com/images/product10.png" roundedCircle fluid style={{ width: '200px', height: '200px', objectFit: 'cover' }} className="mb-4" />
            <h1 className="mb-4">About SOM-DMART</h1>
            <p className="lead">
              SOM-DMART is your one-stop shop for all your daily needs. We offer a wide range of high-quality products at affordable prices. Our mission is to provide our customers with a convenient and enjoyable shopping experience.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Director Information</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> KATKOJWAL SOWMYA
                  <br />
                  <strong>Qualification:</strong> MCA
                  <br />
                  <strong>Phone:</strong> 7386078298
                  <br />
                  <strong>Email:</strong> somwya0410.k@gmail.com
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
