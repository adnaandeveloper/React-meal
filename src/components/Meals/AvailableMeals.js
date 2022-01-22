import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'
import { useEffect, useState } from 'react'

const DUMMY_MEALS = [{}]

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
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
    }

    fetchMeals()
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

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
