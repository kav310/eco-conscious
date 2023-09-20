import React, {useEffect, useState} from 'react';
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCow} from "@fortawesome/free-solid-svg-icons/faCow";
import {faWheatAwnCircleExclamation} from "@fortawesome/free-solid-svg-icons/faWheatAwnCircleExclamation";
import {faWheatAwn} from "@fortawesome/free-solid-svg-icons/faWheatAwn";
import {faSeedling} from "@fortawesome/free-solid-svg-icons/faSeedling";
import {faMugSaucer} from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import {faBreadSlice} from "@fortawesome/free-solid-svg-icons/faBreadSlice";
import {useHistory} from "react-router-dom";


const RecommendedPage = () => {
    const [selectedAllergensOptions, setAllergensSelectedOptions] = useState<string[]>([]);
    const [isDairySelected, setIsDairySelected] = useState<boolean>(false);
    const [isGlutenSelected, setIsGlutenSelected] = useState<boolean>(false);
    const [isSoySelected, setIsSoySelected] = useState<boolean>(false);
    const [isGrainsSelected, setIsGrainsSelected] = useState<boolean>(false);
    const [isPeanutsSelected, setIsPeanutsSelected] = useState<boolean>(false);
    const [isSesameSelected, setIsSesameSelected] = useState<boolean>(false);
    const [ingredients, setIngredients] = useState<any>(undefined)
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const history = useHistory()

    const handleSelectedAllergens = (value: string, setIsValue: any, isValue: boolean) => {
        setIsValue(!isValue)
        if (selectedAllergensOptions.includes(value)) {
            setAllergensSelectedOptions((prevSelectedOptions: any) =>
                prevSelectedOptions.filter((item: any) => item !== value)
            );
        } else {
            setAllergensSelectedOptions((prevSelectedOptions: any) => [
                ...prevSelectedOptions,
                value
            ]);
        }
    }

    const handleSelectedIngredients = (ingredient: string) => {
        // Check if the label is already in the selectedLabels array
        if (selectedIngredients.includes(ingredient)) {
            // If it is, remove it by filtering the array
            setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient));
        } else {
            // If it isn't, add it to the array
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };


    useEffect(() => {
        axios.get(`http://localhost:5000/ingredientsByCategories`)
            .then(response => {
                // Handle the API response here
                setIngredients(response.data)
                console.log('Response:', response.data);
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error:', error);
            });
    }, [])


    function capitalizeWords(str: any) {
        if (!str || typeof str !== 'string') {
            // Handle the case where str is undefined or not a string
            return '';
        }

        return str
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    const handleRecipes = () => {
        const apiKey = 'c6accb5a813340ac86692503c2f9e80d';
        const intolerances = selectedAllergensOptions.join(', ');
        const ingredients = selectedIngredients.join(', ')

        const headers = {
            'x-api-key': apiKey,
        };

        const params = {
            'diet': 'vegan',
            'intolerances': intolerances,
            'ingredients': ingredients
        };


        const apiUrl = `https://api.spoonacular.com/recipes/complexSearch`

        console.log(ingredients, intolerances)

        axios.get(apiUrl, {headers, params})
            .then(response => {
                // Handle the API response here
                const arrayString = JSON.stringify(response.data.results);
                history.push(`/recommendList?data=${encodeURIComponent(arrayString)}`)
                console.log('Response:', response.data);
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error:', error);
            });
    }


    return (
        <div className="bg-gray-200 mt-5">
            <div className="text-xl text-center">Recommendations</div>
            <div className={"flex flex-row-reverse mr-6"}>
                <button className="buttonTheme" onClick={handleRecipes}>Generate</button>
            </div>
            <div className="mt-3 ml-5 text-lg">Select Allergens</div>
            <div className="grid grid-rows-1 grid-flow-col gap-4 m-5">
                <div className="text-center cursor-pointer"
                     onClick={() => handleSelectedAllergens("dairy", setIsDairySelected, isDairySelected)}>
                    <div className={"text-lg mt-2"}>Dairy</div>
                    <FontAwesomeIcon icon={faCow} size="3x"
                                     className={isDairySelected ? "text-green-700" : "text-black"}/>
                </div>
                <div className="text-center cursor-pointer"
                     onClick={() => handleSelectedAllergens("gluten", setIsGlutenSelected, isGlutenSelected)}>
                    <div className={"text-lg mt-2"}>Gluten</div>
                    <FontAwesomeIcon icon={faBreadSlice} size="3x"
                                     className={isGlutenSelected ? "text-green-700" : "text-black"}/>
                </div>
                <div className="text-center cursor-pointer"
                     onClick={() => handleSelectedAllergens("grains", setIsGrainsSelected, isGrainsSelected)}>
                    <div className={"text-lg mt-2"}>Grains</div>
                    <FontAwesomeIcon icon={faWheatAwn} size="3x"
                                     className={isGrainsSelected ? "text-green-700" : "text-black"}/>
                </div>
                <div className="text-center cursor-pointer"
                     onClick={() => handleSelectedAllergens("peanuts", setIsPeanutsSelected, isPeanutsSelected)}>
                    <div className={"text-lg mt-2"}>Peanuts</div>
                    <FontAwesomeIcon icon={faSeedling} size="3x"
                                     className={isPeanutsSelected ? "text-green-700" : "text-black"}/>
                </div>
                <div className="text-center cursor-pointer"
                     onClick={() => handleSelectedAllergens("soy", setIsSoySelected, isSoySelected)}>
                    <div className={"text-lg mt-2"}>Soy</div>
                    <FontAwesomeIcon icon={faMugSaucer} size="3x"
                                     className={isSoySelected ? "text-green-700" : "text-black"}/>
                </div>
                <div className="text-center cursor-pointer"
                     onClick={() => handleSelectedAllergens("sesame", setIsSesameSelected, isSesameSelected)}>
                    <div className={"text-lg mt-2"}>Sesame</div>
                    <FontAwesomeIcon icon={faWheatAwnCircleExclamation} size="3x"
                                     className={isSesameSelected ? "text-green-700" : "text-black"}/>
                </div>
            </div>
            <div className="ml-5 mt-8">
                <div className="text-lg">Select Ingredients</div>
                {ingredients && ingredients.map((item: any) => (
                    <>
                        <div className="text-md mt-5">{capitalizeWords(item._id)}</div>
                        {item.ingredients.map((ingredient: any) => (
                            <div className="flex items-center mb-4">
                                <input id={ingredient} type="checkbox" value={ingredient}
                                       onChange={() => handleSelectedIngredients(ingredient)}
                                       checked={selectedIngredients.includes(ingredient)}
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor={ingredient}
                                       className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{ingredient}</label>
                            </div>
                        ))}
                    </>
                ))}
            </div>
        </div>
    );
};

export default RecommendedPage;
