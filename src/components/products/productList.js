import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, Button, Table } from 'reactstrap'
import { bindActionCreators } from 'redux'
import * as productActions from '../../redux/actions/productActions'
import * as cartActions from '../../redux/actions/cartActions'
import alertify from 'alertifyjs'
import { Link } from 'react-router-dom'

class productList extends Component {
  componentDidMount() {
    this.props.actions.getProducts()
  }
  addToCart = (product) => {
    this.props.actions.addToCart({ quantity: 1, product })
    alertify.success(product.productName + ' added to cart!')
  }
  render() {
    return (
      <div>
        <h3>
          <Badge color="secondary">Products</Badge>
        </h3>
        <Badge color="success">{this.props.currentCategory.categoryName}</Badge>
        <Table className="table-dark" size="sm" hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>
                  <Link to={'/saveProduct/' + product.id}>
                    {' '}
                    {product.productName}
                  </Link>
                </td>
                <td>{product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  <Button
                    color="success"
                    onClick={() => this.addToCart(product)}
                  >
                    Add to cart
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(productList)
