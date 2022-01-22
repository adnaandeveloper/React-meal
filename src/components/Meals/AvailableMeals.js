import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'
import { useEffect, useState } from 'react'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState('')
  /** useState[false] or useState[null] or useState[]  = undefined*/
  //remmember to add.json its firebase !!
  // .sjon is somethin Firebase-specific,
  // which we have to add.
  /** 
  useEffect( async () => {
    await fetch('https://mealapp-2c580-default-rtdb.firebaseio.com/Meals.json')
  }, [])

  The function you pass to useEffect should not return a promise. put see what you can doo down her
  */

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://mealapp-2c580-default-rtdb.firebaseio.com/Meals.json'
      )

      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const responseData = await response.json()
      const loededMeals = []

      for (const key in responseData) {
        loededMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loededMeals)
      setIsLoading(false)
    }
    fetchMeals().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
    })
    /** 
 * inside of a promise we cant do that this way, put another way meget nemmer se neden under my bro
    try {
      await fetchMeals()
    } catch (error) {
      setIsLoading(false)
      setHttpError(error.message)
    }
    */
  }, [])

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  if (httpError) {
    return <section className={classes.errorMessage}>{httpError}</section>
  }

  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading && <ul>{mealsList}</ul>}
        {isLoading && <ul>Loading..</ul>}
      </Card>
    </section>
  )
}

export default AvailableMeals
