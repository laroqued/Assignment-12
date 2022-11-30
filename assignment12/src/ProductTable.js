import React, { Component } from "react";
import ProductRow from "./ProductRow";
// =============================================================
// ProductTable (Imports ProductRow)
// =============================================================
class ProductTable extends Component {
  constructor(props) {
    super(props);
    this.handleDestroy = this.handleDestroy.bind(this);
  }

  handleDestroy(id) {
    this.props.onDestroy(id);
  }

  render() {
    let rows = [];

    let productCollection = Object.keys(this.props.products).map(
      (id) => this.props.products[id]
    );

    productCollection.forEach((product) => {
      if (product.name.indexOf(this.props.filterText) === -1) {
        return;
      }
      /* Instead of passing the handler to an input's event handler hook, we pass again to a second child component: */
      rows.push(
        <ProductRow
          product={product}
          key={product.id}
          onDestroy={this.handleDestroy}
        ></ProductRow>
      );
    });

    return (
      <div>
        <table class="table table-striped table-lg w-50">
          <thead class="table-dark">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}
export default ProductTable;
