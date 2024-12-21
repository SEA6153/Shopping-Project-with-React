import React from 'react'
import TextInput from '../toolbox/TextInput'
import SelectInput from '../toolbox/SelectInput'

const ProductDetails = ({
  categories,
  product = {},
  onSave,
  onChange,
  errors,
}) => {
  return (
    <form onSubmit={onSave}>
      <h3>{product.id ? 'Update' : 'Add'}</h3>
      <TextInput
        name="productName"
        label="Product Name"
        value={product.productName || ''}
        onChange={onChange}
        error={errors.productName}
      />
      <SelectInput
        name="categoryId"
        label="Category"
        value={product.categoryId || ''}
        onChange={onChange}
        defaultOption="Select"
        options={categories.map((category) => ({
          value: category.id,
          text: category.categoryName,
        }))}
        error={errors.categoryName}
      />
      <TextInput
        name="unitPrice"
        label="Price"
        value={product.unitPrice || ''}
        onChange={onChange}
        error={errors.unitPrice}
      />
      <TextInput
        name="quantityPerUnit"
        label="Quantity"
        value={product.quantityPerUnit || ''}
        onChange={onChange}
        error={errors.quantityPerUnit}
      />
      <TextInput
        name="unitsInStock"
        label="Stock"
        value={product.unitsInStock || ''}
        onChange={onChange}
        error={errors.unitsInStock}
      />
      <button type="submit" className="btn btn-success">
        Save
      </button>
    </form>
  )
}

export default ProductDetails
