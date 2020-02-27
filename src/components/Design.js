import React from "react";
import { Button } from "react-bootstrap";

const Design = props => {
  return (
    <tr>
      <td className="w-75">
        <select
          className="w-75"
          onChange={e =>
            props.handleUpdateDesignCost(props.index, e.target.value)
          }
        >
          <option value={0}>Select a Design Type</option>
          <option value={200}>Arch</option>
          <option value={150}>Column</option>
          <option value={50}>bouquet</option>
        </select>
        {props.design.hasAddButton ? (
          <Button className="ml-3 my-2" onClick={() => props.handleAddDesign()}>
            Add Design
          </Button>
        ) : (
          ""
        )}
        {props.design.hasRemoveButton ? (
          <Button
            variant="danger"
            className="ml-3 my-2"
            onClick={() => props.handleRemoveDesign(props.index)}
          >
            Remove Design
          </Button>
        ) : (
          ""
        )}
      </td>
      <td className="w-25">${props.design.cost}</td>
    </tr>
  );
};

export default Design;
