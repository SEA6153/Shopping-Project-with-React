import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import CategoryList from '../categories/categoryList'
import ProductList from '../products/productList'

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="3">
            <CategoryList />
          </Col>
          <Col xs="9">
            <ProductList />
          </Col>
        </Row>
      </div>
    )
  }
}
