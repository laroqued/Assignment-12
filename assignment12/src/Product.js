import React, { Component } from "react";
import Filters from "./Filters";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

let PRODUCTS = {
  1: { id: 1, category: "Food", price: "$389.99", name: "Steak" },
  2: { id: 2, category: "Food", price: "$6,000", name: "Lobster" },
  3: { id: 3, category: "Bills", price: "$9,500", name: "Heat" },
  4: { id: 4, category: "Bills", price: "$399", name: "Cable" },
  5: { id: 5, category: "Leisure", price: "$4,300", name: "Vacation" },
  6: { id: 6, category: "Leisure", price: "$600", name: "Video Games" },
};
// =============================================================
// Product (Imports Filters, ProductTable, and ProductForm )
// =============================================================
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      products: PRODUCTS,
    };
    /* Binding the handler in the constructor function so it doesn't lose a reference to this when triggered on its child: */
    this.handleFilter = this.handleFilter.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /* Writing a handler that takes input and passes it to setState: */
  handleFilter(filterInput) {
    this.setState(filterInput);
  }

  handleSave(product) {
    if (!product.id) {
      product.id = new Date().getTime();
    }
    this.setState((prevState) => {
      let products = prevState.products;
      products[product.id] = product;
      return { products };
    });
  }

  handleDestroy(productId) {
    this.setState((prevState) => {
      let products = prevState.products;
      delete products[productId];
      return { products };
    });
  }

  render() {
    return (
      <div>
        <h1>My Inventory</h1>
        {/* Passing the handler to the child component (on <Filters> for instance): */}
        <Filters onFilter={this.handleFilter}></Filters>
        <ProductTable
          products={this.state.products}
          filterText={this.state.filterText}
          onDestroy={this.handleDestroy}
        ></ProductTable>
        <ProductForm onSave={this.handleSave}></ProductForm>
      </div>
    );
  }
}

export default Products;
