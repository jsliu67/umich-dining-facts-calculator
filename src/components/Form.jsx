
import React, { useState, useEffect } from "react";
import { useInput } from './input-hook';
import {getMenus} from '../utils/requests'

export function MainForm(props) {
    const { value:diningHall, bind:bindDiningHall, reset:resetDiningHall } = useInput('');
    const { value:date, bind:bindDate, reset:resetDate } = useInput('');    
    const { value:meal, bind:bindMeal, reset:resetMeal } = useInput('');    
    

    // const { value:lastName, bind:bindLastName, reset:resetLastName } = useInput('');    
    const [cals, setCals] = useState(0.0)
    const [protein, setProtein] = useState(0.0)
    const [carbs, setCarbs] = useState(0.0)
    const [fats, setFats] = useState(0.0)


    const [calculate, setCalculate] = useState(false)
    const [menus, setMenus] = useState(
        [{
            category: [{
                name: "",
                menuItem: [
                    {
                        name: "",
                        itemSizes: [{
                            nutritionalInfo: [
                                {
                                    name: "",
                                    value: ""
                                }
                            ]
                        }]
                    }
                ]
            }, {}
            ]
        }]
    );
    const [foodDisplay, setFoodDisplay] = useState({
        "Soup": {
            "First Soup": [
                "Chicken", "Beef"
            ],
            "Second Soup": [
                "Veggies", "Taro"
            ]
        }
    })
    const [foodAmounts, setFoodAmounts] = useState({
        Chicken: 1, 
        Beef: 2
    })
    const [foodFacts, setFoodFacts] = useState({
        "Chicken": {
            "Calories": 300, 
            "Protein": 20,
            "Carbs": 40,
            "Fats": 10
        },
        "Beef": {
            "Calories": 250,
            "Protein": 25,
            "Carbs": 40,
            "Fats": 10
        }
    })

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // alert(`Submitting Name ${value}`);
        // resetDiningHall();
        // resetDate();
        // resetMeal();
    }

    const combineCalculate = (boolVal) => {
        setCalculate(boolVal)
        let [cals, protein, carbs, fats] = calculateTotal()
        setCals(cals)
        setProtein(protein)
        setCarbs(carbs)
        setFats(fats)
        console.log(carbs)
        return
    }

    const displayCalculate = () => {
        return (
            <ul>
                {/* <li>{names}</li> */}
                <li>Calories: {cals}</li>
                <li>Protein: {protein}</li>
                <li>Total Carbohydrate: {carbs}</li>
                <li>Total Fat: {fats}</li>
            </ul>
        )
    }
    const updateMenus = () => {
        // tempFoodDisplay = {}
        let tempFoodFacts = {}
        let tempFoodDisplay = {}
        let tempFoodAmounts = {}
        setFoodAmounts({})
        console.log(foodAmounts)
        menus[0].category.map((categoryItem, index) => {
            // foodAmounts[categoryItem.name] = 0
            let tempCategoryObject = {}
            let tempFoodFactsSingle = {}
            tempCategoryObject[categoryItem.name] = []
            categoryItem.menuItem.map((menuItem, index) => {
                const tempMenuItem = {}
                tempMenuItem[menuItem.name] = 0
                tempFoodAmounts = ({...tempFoodAmounts, ...tempMenuItem})
                tempCategoryObject[categoryItem.name].push(menuItem.name)
                let foodFactsObject = {}
                foodFactsObject[menuItem.name] = {}
                
                menuItem.itemSizes[0].nutritionalInfo.map((nutritionalItem, index) => {
                    foodFactsObject[menuItem.name]["Beef"] = "three"
                    // console.log(nutritionalItem.value)
                    // let includeItem = false
                    if (nutritionalItem.name === "Calories"){
                        // console.log(nutritionalItem.value)
                        // includeItem = true
                        foodFactsObject[menuItem.name][nutritionalItem.name] = nutritionalItem.value    
                    }
                    else if (nutritionalItem.name === "Protein"){
                        // includeItem = true
                        foodFactsObject[menuItem.name][nutritionalItem.name] = nutritionalItem.value    
                    }
                    else if (nutritionalItem.name === "Total Carbohydrate"){
                        // includeItem = true
                        foodFactsObject[menuItem.name][nutritionalItem.name] = nutritionalItem.value    
                    }
                    else if (nutritionalItem.name === "Total Fat"){
                        // includeItem = true
                        foodFactsObject[menuItem.name][nutritionalItem.name] = nutritionalItem.value    
                    }

                    // foodFacts[menuItem.name][nutritionalItem.name] = nutritionalItem.value
                    // const newFoodFacts = {
                    //     ...foodFacts,
                    //     ...(includeItem && {"three": nutritionalItem['value']})
                    // }
                    // foodFacts = newFoodFacts
                })
                tempFoodFactsSingle = {...tempFoodFactsSingle, ...foodFactsObject}
                // setFoodFacts({...foodFacts, ...foodFactsObject})
            })
            tempFoodFacts = {...tempFoodFacts, ...tempFoodFactsSingle}
            console.log(tempFoodFacts)
            // console.log(tempCategoryObject)
            tempFoodDisplay = {...tempFoodDisplay, ...tempCategoryObject}
        })
        setFoodFacts({...tempFoodFacts})
        setFoodDisplay({...tempFoodDisplay})
        setFoodAmounts({...tempFoodAmounts})
        // console.log(tempFoodAmounts)
        // console.log(foodAmounts)
        // console.log(foodFacts)
        // console.log(foodDisplay)
        // console.log(foodDisplay)
        // console.log(foodDisplay)
        // console.log(foodFacts)
    }
    const fetchMenus = async (diningHall, date, meal) => {
        diningHall = diningHall.replace(' ', '%20')
        meal = meal.toUpperCase();
        const data = await getMenus(diningHall, date, meal)
        setMenus(data)
    }

    const amountInput = (val) => {
        return (
            <label key={val}>
                {val}:
                <input type="text" onChange={num => {
                    // console.log(num.target.value)
                    let tempFoodAmounts = foodAmounts
                    tempFoodAmounts[val] = num.target.value
                    // console.log(tempFoodAmounts)
                    setFoodAmounts(tempFoodAmounts)
                }} />
            </label>
        )
    }

    const calculateTotal = () => {
        let cals = 0, protein = 0, carbs = 0, fats = 0
        // setCalculate(false)
        console.log(foodAmounts)
        function printMissing(missing, value) {
            console.log(`${missing}: ${value} missing`)
        }
        Object.entries(foodAmounts).map(([key, val]) => {
            // let object = foodFacts[key]
            // console.log(key)
            // console.log(val)
            // console.log(protein)
            // console.log(foodFacts[key]["Protein"])
            // if value missing, console.log it. else, += it
            if(val !== 0){
                if(foodFacts[key]["Calories"] !== undefined) {
                    // console.log(val)
                    // rounds number to 2 decimal places
                    // setCals(cals + Math.round((foodFacts[key]["Calories"] * val)*100)/100)
                    cals += Math.round((foodFacts[key]["Calories"] * val)*100)/100
                }
                else{
                    printMissing(key, 'Calories')
                }
                if(foodFacts[key]["Protein"] !== undefined) {
                    // setProtein(protein + Math.round((foodFacts[key]["Protein"] * val)*100)/100)
                    protein += Math.round((foodFacts[key]["Calories"] * val)*100)/100
                }
                else{
                    printMissing(key, 'Protein')
                }
                if(foodFacts[key]["Total Carbohydrate"] !== undefined) {
                    // setCarbs(carbs + Math.round((foodFacts[key]["Total Carbohydrate"] * val)*100)/100)
                    carbs += Math.round((foodFacts[key]["Total Carbohydrate"] * val)*100)/100
                }
                else{
                    printMissing(key, 'Total Carbohydrate')
                }
                if(foodFacts[key]["Total Fat"] !== undefined) {
                    // setFats(fats + Math.round((foodFacts[key]["Total Fat"] * val)*100)/100)
                    fats += Math.round((foodFacts[key]["Total Fat"] * val)*100)/100
                }
                else{
                    printMissing(key, 'Total Fat')
                }
            }
            // (foodFacts[key]["Calories"] === undefined) ? printMissing(key, 'Calories') : console.log("Hi")
            // (foodFacts[key]["Protein"] === undefined) ? printMissing(key, 'Protein') : protein += foodFacts[key]["Protein"] * val
            // (foodFacts[key]["Total Carbohydrate"] === undefined) ? printMissing(key, 'Total Carbohydrate') : carbs += foodFacts[key]["Total Carbohydrate"] * val
            // (foodFacts[key]["Total Fat"] === undefined) ? printMissing(key, 'Total Fat') : fats += foodFacts[key]["Total Fat"] * val
            // cals += foodFacts[key]["Calories"] * val
            // protein += foodFacts[key]["Protein"] * val
            // carbs += foodFacts[key]["Total Carbohydrate"] * val
            // fats += foodFacts[key]["Total Fat"] * val

            // console.log(cals)
            // names.push(key + '|')
            // console.log(foodFacts)
            // console.log(foodAmounts)
            // console.log(key)
            // console.log(object["Calories"])
            // protein += (foodFacts[key].Protein * val)
            // carbs += (foodFacts[key].Carbs * val)
            // fats += (foodFacts[key].Fats * val)
        })
        return [cals, protein, carbs, fats]
    }

    // useEffect(() => {
    //     // Update the document title using the browser API
    //     fetchMenus("Bursley", "2022-01-11", "lunch")
    // }, [menus]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Dining Hall:
                    <input type="text" {...bindDiningHall} />
                </label>
                <label>
                    Date:
                    <input type="text" {...bindDate} />
                </label>
                <label>
                    Meal:
                    <input type="text" {...bindMeal} />
                </label>
                <br></br>
                <button onClick={() => fetchMenus(diningHall, date, meal)}>Get Menus</button>
                <button onClick={() => updateMenus()}>Update Menus</button>
            </form>
            {
                // let url = 
                menus[0].category.map((categoryItem, index) => (
                    <div key={index}>
                        {categoryItem.name}
                    </div>
                ))
            }
            {
                Object.entries(foodDisplay).map(([key, value]) => (
                    Object.entries(value).map(([key2, value2]) => (
                        <div key={key2}>{value2}</div>
                    ))
                ))
            }
            <form>
                {
                    Object.entries(foodDisplay).map(([key, value]) => (
                        Object.entries(value).map(([key2, value2]) => (
                            amountInput(value2)
                        ))
                    ))
                }
            </form>
            <button onClick={() => {
                combineCalculate(true)
            } }>Calculate</button>
            {
                calculate ?
                displayCalculate() :
                null
            }
            {/* <div></div> */}
        </div>
    );
}