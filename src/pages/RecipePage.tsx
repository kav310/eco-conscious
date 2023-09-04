import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";
import {RecipesResponse} from "./RecipesPage";

const RecipePage = () => {
    // @ts-ignore
    const {id} = useParams()
    const [recipeData, setRecipeData] = useState<RecipesResponse | undefined>(undefined);

    useEffect(() => {
        axios.get(`http://localhost:5000/recipe/${id}`)
            .then(response => setRecipeData(response.data)).catch(error => console.log(error))
    }, [])

    return (
        <div className="bg-gray-200 p-12 flex">
            <div>
                <img className={"recipeBannerImage"} src={recipeData?.image}/>
            </div>
            <div className="ml-8 mt-10">
                <div className="text-4xl">{recipeData?.name}</div>
                <div className="text-sm">{recipeData?.description}</div>
                <div className="text-sm">category:{recipeData?.category}</div>
                <div className="mt-4 text-xl">Ingredients</div>
                <ul>
                    {recipeData?.ingredients.map((item, index) => (
                        <li className="text-sm mt-2">{index + 1}. {item}</li>
                    ))}
                </ul>
                <div>Cooking Instructions</div>
                <div>{recipeData?.cookingInstructions}</div>
            </div>
        </div>
    );
};

export default RecipePage;
