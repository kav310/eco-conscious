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
    const [categories, setCategories] = useState<any>(undefined);
    const history = useHistory()
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (selectedCategory && selectedCategory !== "Categories") {
            axios.get(`http://localhost:5000/recipes/${selectedCategory}`)
                .then(response => setRecipesData(response.data)).catch(error => console.log(error))
        } else {
            axios.get(`http://localhost:5000/recipes`)
                .then(response => setRecipesData(response.data)).catch(error => console.log(error))
        }
    }, [selectedCategory])

    useEffect(() => {
        axios.get(`http://localhost:5000/categories`)
            .then(response => setCategories(response.data)).catch(error => console.log(error))
    }, [])

    const handleSubmit = (id: string) => {
        history.push(`/recipe/${id}`)
    }

    const handleChange = (e: any) => {
        setSelectedCategory(e.target.value)
    }


    return (
        <div className={"bg-gray-200"}>
            <div className="flex justify-center pt-6">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sort
                    By Categories</label>
                <select id="countries" onChange={(e) => handleChange(e)}
                        className=" max-w-md ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Categories</option>
                    {categories && categories.map((item: any) => (
                        <option value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>
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
