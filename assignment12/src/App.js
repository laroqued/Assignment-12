import React, { Component } from "react";
import { render } from "react-dom";
// import "./App.css";

let PRODUCTS = {
  1: { id: 1, category: "Music", price: "$459.99", name: "Clarinet" },
  2: { id: 2, category: "Music", price: "$5,000", name: "Cello" },
  3: { id: 3, category: "Music", price: "$4,500", name: "Tuba" },
  4: { id: 4, category: "Furniture", price: "$799", name: "Chaise Lounge" },
  5: { id: 5, category: "Furniture", price: "$1,300", name: "Dining Table" },
  6: { id: 6, category: "Furniture", price: "$100", name: "Bean Bag" },
};

// =============================================================
// Filters (Renders a form and a text box inside the form for search and filtering out our product list)
// =============================================================

class Filters extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    value: "",
  };

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.props.onFilter({
      [name]: value,
    });
  }

  render() {
    return (
      <>
        <form>
          <label>
            <input
              type="text"
              placeholder="Search..."
              name="filterText"
              onChange={this.handleChange}
            />
            <br />
          </label>
        </form>
      </>
    );
  }
}

// =============================================================
// Product (Imports Filters, ProductTable, and ProductForm )
// =============================================================
class Product extends Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
  }

  state = {
    filterText: "",
    products: PRODUCTS,
    rows: [],
  };
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
      <>
        <h1>My Inventory</h1>
        <Filters onFilter={this.handleFilter} />
        <ProductTable
          headers={["Name", "Price"]}
          filterText={this.state.filterText}
          products={this.state.products}
          rows={this.state.rows}
        />
        <ProductForm onDestroy={this.handleDestroy} onSave={this.handleSave} />
      </>
    );
  }
}

// =============================================================
// ProductTable (Imports ProductRow)
// =============================================================
class ProductTable extends Component {
  constructor(props) {
    super(props);
    this.handleDestroy = this.handleDestroy.bind(this);
  }

  //------------------------------------
  // NOT SURE WHERE THIS GOES
  //------------------------------------
  // this.rows.push(
  //   <ProductRow
  //     product={this.product}
  //     key={this.product.id}
  //     onDestroy={this.handleDestroy}
  //   />
  // );

  handleDestroy(id) {
    this.props.onDestroy(id);
  }

  render() {
    return (
      <>
        <table>
          <thead>
            <tr key="">
              <th>name</th>
              <th>price</th>
            </tr>
          </thead>

          <ProductRow products={PRODUCTS} />
        </table>
      </>
    );
  }
}

// =============================================================
// ProductForm (Renders a form that displays text boxes for name, category, and price. Submit button for ‘Save’.)
// =============================================================
class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
  }

  handleSave(e) {
    const RESET_VALUES = { id: "", category: "", price: "", name: "" };
    this.props.onSave(this.state.product);
    this.setState({
      product: Object.assign({}, RESET_VALUES),
      errors: {},
    });
    e.preventDefault(); //Prevent form from triggering HTTP POST
  }
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState((prevState) => {
      prevState.product[name] = value;
      return { product: prevState.product };
    });
  }
  handleDestroy(id) {
    this.props.onDestroy(id);
  }

  render() {
    return (
      <>
        <h3>Enter a new product</h3>
        {/* ------------------------------------------- */}
        <label>Name</label> <br />
        <input type="text" onChange={this.handleChange} /> <br /> <br />
        {/* ------------------------------------------- */}
        <label>Category</label> <br />
        <input type="text" onChange={this.handleChange} /> <br /> <br />
        {/* ------------------------------------------- */}
        <label>Price</label> <br />
        <input type="text" onChange={this.handleChange} /> <br /> <br />
        {/* ------------------------------------------- */}
        <input type="Submit" value="Save" onClick={this.handleSave} />
      </>
    );
  }
}

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
      <>
        <tbody>
          {Object.keys(PRODUCTS).map((key, index) => (
            <tr key={index}>
              <td>{this.props.products[key].name}</td>
              <td>{this.props.products[key].price}</td>
              <td>
                {<input type="submit" value="Delete" onClick={this.destroy} />}
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Product />
    </div>
  );
}
export default App;
