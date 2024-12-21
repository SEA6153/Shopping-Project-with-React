import { Container } from 'reactstrap'
import Dashboard from './dashboard'
import Navi from '../navi/navi'
import { Route, Routes } from 'react-router-dom'
import CartDetail from '../cart/CartDetail'
import AddOrUpdateProduct from '../products/AddOrUpdateProduct'
import NotFound from '../common/NotFound'

function App() {
  return (
    <Container>
      <Navi />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/product" element={<Dashboard />} />
        <Route
          path="/saveProduct/:productId?"
          element={<AddOrUpdateProduct />}
        />

        <Route path="/cart" element={<CartDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  )
}

export default App
