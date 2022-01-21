import React from 'react'
import classes from './Input.module.css'
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.Input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  )
})

export default Input

/**
 * {...props.input}/> or id={props.input.id}
 * 
 * In addition, I will now use a nice little trick

to pass all other configuration data

I might've gotten for this input

to this input element here as props.

I add curly braces here, just like this,

and then use the spread operator to spread props.input.

This ensures that all the key value pairs

in this input object,

which we receive on props input are added as props to input.

So if input object here is an object

that for example has

type="text"

So if that is what we get on props input, for example,

then this code here would make sure

that type equals text is being added.

This is how that works

when you use the spread operator on an element like this.

It's simply a convenient way

of making this input highly configurable

from outside this component, through this input prop here.

And of course, therefore we can even get rid of this id
 */
