import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useState } from "react";

function App() {
  const [FEI, setFEI] = useState(0.0);
  const [FEILabel, setFEILabel] = useState("");
  const [pressureBasis, setPressureBasis] = useState("Total");
  const [cfm, setCfm] = useState(0.0);
  const [pressure, setPressure] = useState(0.0);
  const [power, setPower] = useState(0.0);
  const [gasDensity, setGasDensity] = useState(0.0);

  function calculateFEI() {
    // Get user input values
    const Qi = parseFloat(cfm);
    const pBasis = pressureBasis;
    const Pi = parseFloat(pressure);
    const HiAct = parseFloat(power);
    const rho = parseFloat(gasDensity);
    // Calculate actual transmission loss
    const etaTransAct = 0.96 * Math.pow(HiAct / (HiAct + 2.2), 0.05);
    // Calculate actual motor efficiency
    let etaMtrAct;
    if (HiAct >= 250) {
      etaMtrAct = 0.962;
    } else {
      etaMtrAct =
        -0.003812 * Math.pow(Math.log(HiAct / (etaTransAct * 0.7457)), 4) +
        0.025834 * Math.pow(Math.log(HiAct / (etaTransAct * 0.7457)), 3) -
        0.072577 * Math.pow(Math.log(HiAct / (etaTransAct * 0.7457)), 2) +
        0.125559 * Math.log(HiAct / (etaTransAct * 0.7457)) +
        0.850274;
    }

    // Calculate actual Fan Electrical Power
    const FEPAct = HiAct * (1 / etaTransAct) * (1 / etaMtrAct) * 0.7457;

    // Determine constants to use based on pressure basis
    let Q0, P0, eta0;
    if (pBasis === "Total") {
      Q0 = 250;
      P0 = 0.4;
      eta0 = 0.66;
      setFEILabel("FEIt.i");
    } else {
      Q0 = 250;
      P0 = 0.4;
      eta0 = 0.6;
      setFEILabel("FEIs.i");
    }

    // Calculate reference fan shaft power
    const HiRef = ((Qi + Q0) * (Pi + (P0 * rho) / 0.075)) / (6343 * eta0);

    // Calculate reference fan transmission efficiency
    const etaTransRef = 0.96 * Math.pow(HiRef / (HiRef + 2.2), 0.05);

    // Calculate reference motor efficiency
    let etaMtrRef;
    if (HiRef >= 250) {
      etaMtrRef = 0.962;
    } else {
      etaMtrRef =
        -0.003812 * Math.pow(Math.log(HiRef / (etaTransRef * 0.7457)), 4) +
        0.025834 * Math.pow(Math.log(HiRef / (etaTransRef * 0.7457)), 3) -
        0.072577 * Math.pow(Math.log(HiRef / (etaTransRef * 0.7457)), 2) +
        0.125559 * Math.log(HiRef / (etaTransRef * 0.7457)) +
        0.850274;
    }

    // Calculate Refual Fan Electrical Power
    const FEPRef = HiRef * (1 / etaTransRef) * (1 / etaMtrRef) * 0.7457;
    const FEI = FEPRef / FEPAct;
    return Math.round((FEI + Number.EPSILON) * 100) / 100;
  }

  function handleSubmit() {
    setFEI(calculateFEI());
  }

  function handleSelect(e) {
    setPressureBasis(e.target.value);
  }

  function handleInput(e) {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case "cfm":
        setCfm(e.target.value);
        break;
      case "pressure":
        setPressure(e.target.value);
        break;
      case "power":
        setPower(e.target.value);
        break;
      case "gasDensity":
        setGasDensity(e.target.value);
    }
  }

  return (
    <div className="App">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={2}>
            <Stack>
              <Form>
                <Form.Group>
                  <Form.Label htmlFor={"cfmInput"}>
                    Actual Fan Flow (CFM):
                    <Form.Control
                      type={"text"}
                      name={"cfm"}
                      value={cfm}
                      id={"cfmInput"}
                      onChange={handleInput}
                    />
                  </Form.Label>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Pressure Basis
                    <Stack direction={"horizontal"} gap={5}>
                      <Form.Check
                        type={"radio"}
                        id={"pbTotalRadio"}
                        label={"Total"}
                        value={"Total"}
                        name={"pressureBasis"}
                        onChange={handleSelect}
                        checked={pressureBasis === "Total"}
                      />
                      <Form.Check
                        type={"radio"}
                        id={"pbStaticRadio"}
                        label={"Static"}
                        value={"Static"}
                        name={"pressureBasis"}
                        onChange={handleSelect}
                        checked={pressureBasis === "Static"}
                      />
                    </Stack>
                  </Form.Label>
                </Form.Group>

                <Stack>
                  <Form.Group>
                    <Form.Label htmlFor={"pressureInput"}>
                      Actual Pressure (in. wg):
                      <Form.Control
                        type={"text"}
                        name={"pressure"}
                        id={"pressureInput"}
                        value={pressure}
                        onChange={handleInput}
                      />
                    </Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor={"powerInput"}>
                      Actual Power:
                      <Form.Control
                        type={"text"}
                        name={"power"}
                        id={"powerInput"}
                        value={power}
                        onChange={handleInput}
                      />
                    </Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor={"gasDensityInput"}>
                      Gas Density (lb/ft^3):
                      <Form.Control
                        type={"text"}
                        name={"gasDensity"}
                        id={"gasDensityInput"}
                        value={gasDensity}
                        onChange={handleInput}
                      />
                    </Form.Label>
                  </Form.Group>
                </Stack>

                <Button
                  type={"submit"}
                  onClick={handleSubmit}
                  name={"submit"}
                  id={"submitButton"}
                  variant={"primary"}
                  size={"lg"}
                >
                  Submit
                </Button>
              </Form>
            </Stack>
          </Col>
          <Col md={2}>
            <h3>Results:</h3>
            <Stack direction={"horizontal"} gap={1}>
              <h4>FEI:</h4>
              <p>{FEI}</p>
            </Stack>
            <Stack direction={"horizontal"} gap={1}>
              <h4>FEI Label:</h4>
              <p>{FEILabel}</p>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
