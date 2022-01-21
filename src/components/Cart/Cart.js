import React, { useContext } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'

const Cart = (props) => {
  const cartCon = useContext(CartContext)

  const totalAmount = `$${cartCon.totalAmount.toFixed(2)}`
  const hasItems = cartCon.items.length > 0
  const carItemRemoveHandler = (id) => {}
  const carItemAddHandler = (item) => {}

  const carItems = (
    <ul className={classes['cart-items']}>
      {cartCon.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={carItemRemoveHandler.bind(null, item.id)}
          onAdd={carItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  )

  return (
    <Modal onClose={props.onClose}>
      {carItems}
      <div className={classes.total}>
        <span> Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          {' '}
          Close
        </button>

        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart
