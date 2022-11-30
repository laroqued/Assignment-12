import React, { Component } from "react";

// =============================================================
// Filters (Renders a form and a text box inside the form for search and filtering out our product list)
// =============================================================

class Filters extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  /* Writing an event handler that passes user input to the handler passed in from the parent: */
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.props.onFilter({
      [name]: value,
    });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          class=" w-50 p-1"
          placeholder="Search..."
          name="filterText"
          onChange={this.handleChange}
        ></input>
        <br /> <br/>
      </form>
    );
  }
}

export default Filters;
