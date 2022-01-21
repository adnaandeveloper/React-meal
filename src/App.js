import Header from './components/Layout/Header'
import { useState } from 'react'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)

  const showCartHanlder = () => {
    setCartIsShown(true)
  }
  const hideCarthandler = () => {
    console.log('the hide function is called')
    setCartIsShown(false)
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCarthandler} />}
      <Header onShowCart={showCartHanlder} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App
