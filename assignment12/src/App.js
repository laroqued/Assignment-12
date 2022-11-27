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
  }

  state = {
    value: "",
  };

  newSearch = (e) => {
    this.setState({ value: e.target.value });
  };

  submit = (e) => {
    console.log("Search: " + this.state.value);
    e.preventDefault();
  };

  render() {
    return (
      <>
        <form onSubmit={this.submit}>
          <label>
            <input type="text" 
            placeholder="Search..."
            onChange={this.newSearch} />
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
  }

  state = {
    id: 0,
    category: "",
    price: "",
    name: "",
  };

  render() {
    return (
      <>
        <h1>My Inventory</h1>
        <Filters />
        <ProductForm/>
        <ProductTable/>
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


  }
  state = { 

   }
  render() { 
    return ( 
    <>
    <ProductRow/>
    </> );
  }
}
 


// =============================================================
// ProductForm (Renders a form that displays text boxes for name, category, and price. Submit button for ‘Save’.)
// =============================================================
class ProductForm extends Component {
  constructor(props) {
    super(props);
  }
  state = { 

   }
  render() { 
    return ( <>

    </> );
  }
}
 



// =============================================================
// ProductRow (Each <td> tag will display name and price (retrieved from props), and a button to delete )
// =============================================================

class ProductRow extends Component {
  constructor(props) {
    super(props);
  }
  state = { 

   }
  render() { 
    return ( 
    <>
    
    </> );
  }
}
 





function App() {
  return (
    <div className="App">
      <Product/>
    </div>
  );
}
export default App;
