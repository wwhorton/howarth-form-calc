import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("Form App", () => {
  const user = userEvent.setup();

  function renderComponent() {
    render(<App />);
  }

  it("should calculate the FEI and label correctly when the pressure basis is 'Total'", async () => {
    renderComponent();
    await user.type(screen.getByLabelText("Actual Fan Flow (CFM):"), "10000");
    await user.click(screen.getByText("Total"));
    await user.type(screen.getByLabelText("Actual Pressure (in. wg):"), "3.0");
    await user.type(screen.getByLabelText("Actual Power:"), "6.48");
    await user.type(screen.getByLabelText("Gas Density (lb/ft^3):"), ".080713");
    await user.click(screen.getByText("Calculate FEI"));

    expect(screen.getByText("1.29")).toBeInTheDocument();
    expect(screen.getByText("FEIt.i")).toBeInTheDocument();
  });
  it("should calculate the FEI and label correctly when the pressure basis is 'Static'", async () => {
    renderComponent();
    await user.type(screen.getByLabelText("Actual Fan Flow (CFM):"), "10000");
    await user.click(screen.getByText("Static"));
    await user.type(screen.getByLabelText("Actual Pressure (in. wg):"), "3.0");
    await user.type(screen.getByLabelText("Actual Power:"), "6.48");
    await user.type(screen.getByLabelText("Gas Density (lb/ft^3):"), ".080713");
    await user.click(screen.getByText("Calculate FEI"));

    expect(screen.getByText("1.41")).toBeInTheDocument();
    expect(screen.getByText("FEIs.i")).toBeInTheDocument();
  });
  it("should calculate the FEI correctly when the power is greater than 250", async () => {
    renderComponent();
    await user.type(screen.getByLabelText("Actual Fan Flow (CFM):"), "10000");
    await user.click(screen.getByText("Static"));
    await user.type(screen.getByLabelText("Actual Pressure (in. wg):"), "3.0");
    await user.type(screen.getByLabelText("Actual Power:"), "250");
    await user.type(screen.getByLabelText("Gas Density (lb/ft^3):"), ".080713");
    await user.click(screen.getByText("Calculate FEI"));

    expect(screen.getByText("0.04")).toBeInTheDocument();
    expect(screen.getByText("FEIs.i")).toBeInTheDocument();
  });
  it("should calculate the FEI correctly when the reference power is greater than 250", async () => {
    renderComponent();
    await user.type(screen.getByLabelText("Actual Fan Flow (CFM):"), "10000");
    await user.click(screen.getByText("Static"));
    await user.type(
      screen.getByLabelText("Actual Pressure (in. wg):"),
      "300.0"
    );
    await user.type(screen.getByLabelText("Actual Power:"), "250");
    await user.type(screen.getByLabelText("Gas Density (lb/ft^3):"), ".080713");
    await user.click(screen.getByText("Calculate FEI"));

    expect(screen.getByText("3.24")).toBeInTheDocument();
    expect(screen.getByText("FEIs.i")).toBeInTheDocument();
  });
});
