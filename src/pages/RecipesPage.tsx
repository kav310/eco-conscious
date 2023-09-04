import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";

export interface RecipesResponse {
    _id: string
    name: string
    description: string
    ingredients: string[]
    cookingInstructions: string
    image: string
    category: string
}

const RecipesPage = () => {
    const [recipesData, setRecipesData] = useState<RecipesResponse[] | undefined>(undefined);
    const history = useHistory()

    useEffect(() => {
        axios.get(`http://localhost:5000/recipes`)
            .then(response => setRecipesData(response.data)).catch(error => console.log(error))
    }, [])

    const handleSubmit = (id: string) => {
        history.push(`/recipe/${id}`)
    }

    return (
        <div className={"bg-gray-200"}>
            <div className={"flex flex-row-reverse mr-6"}>
                <button className="buttonTheme">Post Recipe</button>
            </div>
            <div className="ml-8">
                <div className="mt-4 text-xl">List of Recipes</div>
                {recipesData?.map((item: RecipesResponse) => (
                    <div className="flex">
                        <div className="mb-5">
                            <img className="recipeListImages" src={item.image}/>
                        </div>
                        <div className="mt-6 ml-10">
                            <div className="text-xl">{item.name}</div>
                            <div>Category: {item.category}</div>
                            <div>{item.description}</div>
                            <button className="buttonTheme" onClick={() => handleSubmit(item._id)}>Try Recipe</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipesPage;
