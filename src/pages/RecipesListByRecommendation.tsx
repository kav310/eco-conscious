import {RecipesResponse} from "./RecipesPage";
import React, {useEffect, useState} from "react";
import {useLocation, useHistory} from 'react-router-dom';

const RecipesListByRecommendation = () => {
    const [recipes, setRecipes] = useState<any>(undefined);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const dataParam = searchParams.get('data');

        if (dataParam) {
            // Parse the JSON string back to an array of objects
            const dataArray = JSON.parse(decodeURIComponent(dataParam));

            // Now you can work with dataArray in your component
            setRecipes(dataArray)
            console.log(dataArray)
        }
    }, [location.search]);

    const handleSubmit = (id: string) => {
        history.push(`/recommendedRecipe/${id}`)
    }


    return (
        <div className={"bg-gray-200"}>
            <div className="ml-8">
                <div className="mt-4 text-xl">List of Recipes</div>
                {recipes?.map((item: any) => (
                    <div className="flex">
                        <div className="mb-5">
                            <img className="recipeListImages" src={item.image}/>
                        </div>
                        <div className="mt-6 ml-10">
                            <div className="text-xl">{item?.title}</div>
                            <button className="buttonTheme" onClick={() => handleSubmit(item.id)}>Try Recipe</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipesListByRecommendation;
