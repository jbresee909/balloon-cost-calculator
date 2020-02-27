import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Design from "./components/Design";

function App() {
  // set up states for properties
  const [designs, setDesigns] = useState([
    { cost: 0, hasAddButton: true, hasRemoveButton: false }
  ]);
  const [travelCost, setTravelCost] = useState(0);
  const [margin, setMargin] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    // add cost of each design
    var runningTotal = 0;
    for (let i = 0; i < designs.length; i++) {
      runningTotal += designs[i].cost;
    }

    // add cost of travel
    runningTotal += parseFloat(travelCost);

    // if a margin has been set, add in margin
    if (margin > 0.0) {
      runningTotal *= parseFloat(margin);
    }
    setTotal(runningTotal.toFixed(2));
  }, [setTotal, designs, margin, travelCost]);

  // set up event handlers
  const handleAddDesign = () => {
    const newDesigns = [
      ...designs,
      { cost: 0, hasAddButton: false, hasRemoveButton: true }
    ];
    setDesigns(newDesigns);
  };

  const handleRemoveDesign = index => {
    const newDesigns = [...designs];
    newDesigns.splice(index, 1);
    setDesigns(newDesigns);
  };

  const handleUpdateDesignCost = (index, value) => {
    const newDesigns = [...designs];
    newDesigns[index].cost = parseFloat(value);
    setDesigns(newDesigns);
  };

  return (
    <div className="App">
      <Table bordered style={{ width: "90%" }} className="mx-auto my-5">
        <tbody>
          <tr>
            <td>
              <h2 className="ml-3 my-2">Cost Estimator</h2>
            </td>
          </tr>
          {/* Add a row to the tabel for each design */}
          {designs.map((design, index) => (
            <Design
              key={index}
              index={index}
              design={design}
              handleAddDesign={handleAddDesign}
              handleRemoveDesign={handleRemoveDesign}
              handleUpdateDesignCost={handleUpdateDesignCost}
            />
          ))}
          <tr>
            <td>
              <select
                className="w-75"
                onChange={e => setTravelCost(e.target.value)}
              >
                <option value={0}>Select Your Location</option>
                <option value={10}>Logan</option>
                <option value={15}>Smithfield</option>
                <option value={15}>Hyde Park</option>
                <option value={50}>Salt Lake City</option>
                <option value={35}>Ogden</option>
                <option value={25}>Brigham</option>
              </select>
            </td>
            <td>${travelCost}</td>
          </tr>
          <tr>
            <td>
              <select
                className="w-75"
                onChange={e =>
                  setMargin(parseFloat(e.target.value - 1.0).toFixed(2))
                }
              >
                <option value={1.0}>Select a Margin</option>
                <option value={1.15}>15%</option>
                <option value={1.2}>20%</option>
                <option value={1.25}>25%</option>
                <option value={1.3}>30%</option>
                <option value={1.35}>35%</option>
                <option value={1.4}>40%</option>
                <option value={1.45}>45%</option>
              </select>
            </td>
            <td>{margin}</td>
          </tr>
          <tr>
            <td style={{ visibility: "hidden" }}></td>
            <td>${total}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default App;
