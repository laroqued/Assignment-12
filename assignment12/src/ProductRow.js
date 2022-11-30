import React, { Component } from "react";

// =============================================================
// ProductRow (Each <td> tag will display name and price (retrieved from props), and a button to delete )
// =============================================================
class ProductRow extends Component {
  constructor(props) {
    super(props);
    this.destroy = this.destroy.bind(this);
  }

  destroy() {
    this.props.onDestroy(this.props.product.id);
  }

  render() {
    return (
      <tr>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.category}</td>
        <td>{this.props.product.price}</td>
        <td class="text-right">
          <button onClick={this.destroy} class="btn btn-sm btn-info text-light">
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default ProductRow;
