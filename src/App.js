import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { useState } from "react";

function App() {
  const [FEI, setFEI] = useState(0);
  const [FEILabel, setFEILabel] = useState("");
  const [pressureBasis, setPressureBasis] = useState("total");
  const [cfm, setCfm] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [power, setPower] = useState(0);
  const [gasDensity, setGasDensity] = useState(0);

  function calculateFEI() {
    const FEPact = calculateFEPact(power);
    const FEPref = calculateFEPref();
    return 0;
  }

  function calculateFEPref() {
    return 0;
  }

  function calculateFEPact(hiAct) {
    const actualTransmissionLoss = 0.96 * Math.pow(hiAct / (hiAct + 2.2), 0.05);
    const actualMotorEfficiency = 0;

    return (
      hiAct *
      (1 / actualTransmissionLoss) *
      (1 / actualMotorEfficiency) *
      0.7457
    );
  }

  function generateLabel() {
    switch (pressureBasis) {
      case "total":
        return "FEIt.i";
      case "static":
        return "FEIs.i";
      default:
        return "FEI.Error";
    }
  }

  function handleSubmit() {
    setFEI(calculateFEI());
    setFEILabel(generateLabel());
  }

  function handleSelect(e) {
    setPressureBasis(e.target.value);
  }

  function handleInput(e) {
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
        break;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <Container>
        <Form>
          <Form.Group>
            <Form.Label htmlFor={"cfmInput"}>Actual Fan Flow (CFM):</Form.Label>
            <Form.Control
              type={"text"}
              name={"cfm"}
              value={cfm}
              id={"cfmInput"}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Pressure Basis</Form.Label>
            <Stack direction={"horizontal"}>
              <Form.Check
                type={"radio"}
                id={"pbTotalRadio"}
                label={"Total"}
                value={"total"}
                name={"pressureBasis"}
                onChange={handleSelect}
                checked={pressureBasis === "total"}
              />
              <Form.Check
                type={"radio"}
                id={"pbStaticRadio"}
                label={"Static"}
                value={"static"}
                name={"pressureBasis"}
                onChange={handleSelect}
                checked={pressureBasis === "static"}
              />
            </Stack>
          </Form.Group>

          <Stack>
            <Form.Group>
              <Form.Label htmlFor={"pressureInput"}>
                Actual Pressure (in. wg):
              </Form.Label>
              <Form.Control
                type={"text"}
                name={"pressure"}
                id={"pressureInput"}
                value={pressure}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor={"powerInput"}>Actual Power:</Form.Label>
              <Form.Control
                type={"text"}
                name={"power"}
                id={"powerInput"}
                value={power}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor={"gasDensityInput"}>
                Gas Density (lb/ft^3):
              </Form.Label>
              <Form.Control
                type={"text"}
                name={"gasDensity"}
                id={"gasDensityInput"}
                value={gasDensity}
                onChange={handleInput}
              />
            </Form.Group>
          </Stack>
        </Form>
        <Button
          type={"submit"}
          onClick={handleSubmit}
          name={"submit"}
          id={"submitButton"}
        >
          Submit
        </Button>

        <h3>Results:</h3>
        <h4>FEI:</h4>
        <p>{FEI}</p>
        <h4>FEI Label:</h4>
        <p>{FEILabel}</p>
      </Container>
    </div>
  );
}

export default App;
