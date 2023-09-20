import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddRecipePage = () => {
    const [categories, setCategories] = useState<any>(undefined);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors}
    } = useForm();
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:5000/categories`)
            .then(response => setCategories(response.data)).catch(error => console.log(error))
    }, [])

    const onSubmit = async (data: any) => {
        const recipeData = {
            name: data.name,
            description: data.description,
            ingredients: data.ingredients.split(" "),
            cookingInstructions: data.cookingInstructions,
            image: data.image,
            category: data.category,
        }

        console.log(recipeData);

        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await axios.post('http://localhost:5000/addRecipe', recipeData, {headers});
            toast.success("Success Notification !", {
                position: toast.POSITION.TOP_RIGHT
            });
            reset()
            console.log('Recipe added successfully:', response.data);
            // Optionally, you can redirect or perform other actions after successful addition
        } catch (error: any) {
            toast.error("Error Notification !", {
                position: toast.POSITION.TOP_RIGHT
            });
            console.error('Error adding recipe:', error.response.data);
            // Handle the error, e.g., display an error message to the user
        }
    }

    return (
        <div className={"bg-gray-200"}>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden pb-5 pt-5">
                <div
                    className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
                    <div className="text-3xl font-medium text-center text-indigo-700 uppercase decoration-wavy">
                        Add Recipe
                    </div>
                    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-2">
                            <label htmlFor={"recipeName"}>
                                <span className="text-gray-700">Recipe Name</span>
                            </label>
                            <input
                                {...register("name", {required: true, maxLength: 30})}
                                type="text"
                                name="name"
                                className="w-full block px-16 py-2 mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
                                        focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Chickpea curry"
                            />
                            {errors.name && errors.name.type === "required" && (
                                <span>Recipe name is required</span>
                            )}
                        </div>
                        <div className="mb-2">
                            <label htmlFor={"description"}>
                                <span className="text-gray-700">Description</span>
                            </label>
                            <input
                                type="text"
                                {...register("description", {required: true, maxLength: 5000})}
                                name="description"
                                className="w-full block px-16 py-2 mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
                                        focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="A flavorful and protein-packed ...."
                            />
                            {errors.description && errors.description.type === "required" && (
                                <span>Description is required</span>
                            )}
                        </div>
                        <div className="mb-2">
                            <label htmlFor={"ingredients"}>
                                <span className="text-gray-700">Ingredients</span>
                            </label>
                            <input
                                type="text"
                                {...register("ingredients", {required: true, maxLength: 5000})}
                                name="ingredients"
                                className="w-full block px-16 py-2 mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
                                        focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="chickpeas, coconut milk, ...."
                            />
                            {errors.ingredients && errors.ingredients.type === "required" && (
                                <span>Ingredients is required</span>
                            )}
                        </div>
                        <div className="mb-2">
                            <label htmlFor={"cookingInstructions"}>
                                <span className="text-gray-700">Cooking Instructions</span>
                            </label>
                            <input
                                type="text"
                                {...register("cookingInstructions", {required: true, maxLength: 5000})}
                                name="cookingInstructions"
                                className="w-full block px-16 py-2 mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
                                        focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Heat oil in a pan, sauté onions until golden...."
                            />
                            {errors.cookingInstructions && errors.cookingInstructions.type === "required" && (
                                <span>Cooking Instructions is required</span>
                            )}
                        </div>
                        <div className="mb-2">
                            <label htmlFor={"image"}>
                                <span className="text-gray-700">Image</span>
                            </label>
                            <input
                                type="text"
                                {...register("image", {required: true, maxLength: 5000})}
                                name="image"
                                className="w-full block px-16 py-2 mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
                                        focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="please give url of the image"
                            />
                            {errors.image && errors.image.type === "required" && (
                                <span>Image is required</span>
                            )}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="category"
                                   className="text-gray-700">Select an
                                option</label>
                            <select id="category" {...register("category", {required: true})}
                                    className="w-full block px-16 py-2 mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300
                                        focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                <option defaultValue={""}>Choose a Category</option>
                                {categories && categories.map((item: any) => (
                                    <option value={item.name} key={item.name}>{item.name}</option>
                                ))}
                            </select>
                            {errors.category && errors.category.type === "required" && (
                                <span>Category is required</span>
                            )}
                        </div>
                        <div className="mt-5 mb-6">
                            <input
                                type="submit"
                                className="h-10 px-5  text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150
                                        focus:shadow-outline hover:bg-indigo-800"/>

                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default AddRecipePage;
