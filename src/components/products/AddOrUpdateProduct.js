import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories } from '../../redux/actions/categoryActions'
import { saveProduct } from '../../redux/actions/productActions'
import ProductDetails from './ProductDetails'

function AddOrUpdateProduct({
  products,
  categories,
  getCategories,
  saveProduct,
  ...props
}) {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [product, setProduct] = useState(() =>
    productId && products.length > 0
      ? getProductById(products, parseInt(productId, 10))
      : { productName: '', categoryId: '' }
  )

  useEffect(() => {
    if (categories.length === 0) {
      getCategories()
    }
    setProduct(() =>
      productId && products.length > 0
        ? getProductById(products, parseInt(productId, 10))
        : { productName: '', categoryId: '' }
    )
  }, [categories, productId, products, getCategories])

  function handleChange(event) {
    const { name, value } = event.target
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'categoryId' ? parseInt(value, 10) : value,
    }))
    validate(name, value)
  }

  function validate(name, value) {
    if (name === 'productName' && value === '') {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: 'Entering a product name is required! ',
      }))
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: '',
      }))
    }
  }

  function handleSave(event) {
    event.preventDefault()
    saveProduct(product).then(() => {
      navigate('/')
    })
  }

  return (
    <ProductDetails
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  )
}

function getProductById(products, productId) {
  return (
    products.find((product) => product.id == productId) || {
      productName: '',
      categoryId: '',
    }
  )
}

function mapStateToProps(state) {
  return {
    products: state.productListReducer,
    categories: state.categoryListReducer,
  }
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct)
