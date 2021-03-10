import React from "react";
import { Badge, Button, Col, Form, Jumbotron, Row } from "react-bootstrap";

import { TableData } from "../Table/Table.component";

interface HeroProps {
  data?: TableData;
  addEntry?: Function;
}

const Hero = ({ data, addEntry }: HeroProps) => {
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const input = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    };

    if (addEntry) {
      // Pass input to addEntry mutation.
      addEntry(input);
    }
  };

  return (
    <Jumbotron>
      <h1>
        Entries <Badge>{data?.rows?.length || 0}</Badge>
      </h1>
      <p>
        Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel
        scelerisque nisl consectetur et. Donec sed odio dui.
      </p>

      <Form onSubmit={handleFormSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="heroFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                placeholder="First Name"
                required
                type="text"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="heroLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                placeholder="Last Name"
                required
                type="text"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button disabled={!addEntry} type="submit">
          Add Entry
        </Button>
      </Form>
    </Jumbotron>
  );
};

export default Hero;
