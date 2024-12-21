import React, { useState } from 'react'
import { Navbar, NavItem, Nav } from 'reactstrap'
import CartSummary from '../cart/CartSummary'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Navi(args) {
  return (
    <div>
      <Navbar {...args}>
        <Nav>
          <NavItem>
            <NavLink>
              <Link to="/saveProduct">Add Product</Link>
            </NavLink>
          </NavItem>
        </Nav>
        <div className="ms-auto">
          <CartSummary />
        </div>
      </Navbar>
    </div>
  )
}

export default Navi
