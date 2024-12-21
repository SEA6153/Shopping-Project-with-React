import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Badge,
} from 'reactstrap'
import { bindActionCreators } from 'redux'
import * as cartActions from '../../redux/actions/cartActions'
import { removeFromCart } from '../../redux/actions/cartActions'
import { Link } from 'react-router-dom'
import alertify from 'alertifyjs'

class CartSummary extends Component {
  removeFromCart(product) {
    this.props.actions.removeFromCart(product)
    alertify.error(product.productName + ' removed from cart')
  }
  renderEmpty() {
    return (
      <NavItem className="list-unstyled">
        <NavLink>Cart is empty</NavLink>
      </NavItem>
    )
  }

  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar className="list-unstyled">
        <DropdownToggle nav caret>
          Cart
        </DropdownToggle>
        <DropdownMenu className="list-unstyled">
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <Badge
                onClick={() => this.removeFromCart(cartItem.product)}
                color="danger"
              >
                X
              </Badge>
              {cartItem.product.productName}
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>
            <Link to={'/cart'}>Go to cart</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary)
