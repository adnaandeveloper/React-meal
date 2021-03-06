import { useContext } from 'react'

import Modal from '../UI/Modal'
import CartItem from './CartItem'
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context'
import Chechout from './Chechout'
import { useState } from 'react'

const Cart = (props) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const cartCtx = useContext(CartContext)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item)
  }

  const orderHandler = () => {
    setIsCheckingOut(true)
  }

  const submitOrderHandler = (userData) => {
    //orders.js is a new node of my choice
    // Those are the data we are sending to the backend
    fetch('https://mealapp-2c580-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    })

    console.log(userData, cartCtx.items)
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  )

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Chechout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}

      {!isCheckingOut && (
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  )
}

export default Cart
