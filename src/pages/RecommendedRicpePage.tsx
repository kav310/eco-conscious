import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import {RecipesResponse} from "./RecipesPage";

const RecommendedRecipePage = () => {
    // @ts-ignore
    const {id} = useParams()
    const [recipeData, setRecipeData] = useState<any>(undefined);

    useEffect(() => {
        const apiKey = 'c6accb5a813340ac86692503c2f9e80d';
        const recipeId = id;

        const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

        axios
            .get(apiUrl)
            .then((response) => {
                // Handle the response data here
                const recipeData = response.data;
                setRecipeData(response.data)
                console.log(recipeData);
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error('Error:', error);
            });
    }, [])

    return (
        <div className="bg-gray-200 p-12 flex">
            <div>
                <img className={"recipeBannerImage"} src={recipeData?.image}/>
            </div>
            <div className="ml-8 mt-10">
                <div className="text-4xl">{recipeData?.title}</div>
                <div className="text-sm">{recipeData?.description}</div>
                <div className="text-sm">category:{recipeData?.category}</div>
                <div className="mt-4 text-xl">Ingredients</div>
                <ul>
                    {recipeData?.diets.map((item:any, index: number) => (
                        <li className="text-sm mt-2">{index + 1}. {item}</li>
                    ))}
                </ul>
                <div>Cooking Instructions</div>
                <div>{recipeData?.instructions}</div>
            </div>
        </div>
    );
};

export default RecommendedRecipePage;
