import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { useState } from "react";

function App() {
  useState();

  return (
    <div className="App">
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Actual Fan Flow (CFM):</Form.Label>
            <Form.Control type={"text"} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Pressure Basis</Form.Label>
            <Stack direction={"horizontal"}>
              <Form.Check type={"radio"} id={"pbTotalRadio"} label={"Total"} />
              <Form.Check
                type={"radio"}
                id={"pbStaticRadio"}
                label={"Static"}
              />
            </Stack>
          </Form.Group>

          <Stack>
            <Form.Group>
              <Form.Label>Actual Pressure (in. wg):</Form.Label>
              <Form.Control type={"text"} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Actual Power:</Form.Label>
              <Form.Control type={"text"} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gas Density (lb/ft^3):</Form.Label>
              <Form.Control type={"text"} />
            </Form.Group>
          </Stack>
        </Form>
        <Button type={"submit"}>Submit</Button>
      </Container>
    </div>
  );
}

export default App;
