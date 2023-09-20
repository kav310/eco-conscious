import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";

const UserProfile = () => {
    const [data, setData] = useState<any>(undefined);
    const history = useHistory();

    const storedToken = localStorage.getItem('token');
    useEffect(() => {
        axios.get('http://localhost:5000/profile', {
            headers: {
                'Authorization': `Bearer ${storedToken}`
            }
        })
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(error => {
                console.log(error)
            });
    }, [storedToken])

    const handleView = (id: string) => {
        history.push(`/recipe/${id}`)
    }

    const handleEdit = (id: string) => {
        history.push(`/editRecipes/${id}`)
    }

    const handleDelete = useCallback((id: string) => {
        axios.delete(`http://localhost:5000/deleteRecipe/${id}`, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
            }
        })
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(error => {
                console.log(error)
            });
    }, [storedToken])

    return (
        <div className={"bg-gray-200 p-10"}>
            {data &&
                <>
                    <div className={"font-medium"}>Name: <span className={"font-bold"}>{data.username}</span></div>
                    <div className={"font-medium"}>Email: <span className={"font-bold"}>{data.email}</span></div>
                    <div className={"mt-4 font-medium"}>My Recipes</div>
                    {data.recipes.length > 0 ?
                        <div className={"mt-5 grid grid-cols-3"}>
                            {data.recipes.map((item: any, index: number) => (
                                <div className="max-w-sm rounded overflow-hidden shadow-lg"
                                     key={index + "." + item.name}>
                                    <img className="w-full" src={item.image} alt="Sunset in the mountains"/>
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{item.name}</div>
                                        <p className="text-gray-700 text-base">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                <span
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold
                                    text-gray-700 mr-2 mb-2 cursor-pointer"
                                    onClick={() => handleView(item._id)}>View</span>
                                        <span
                                            className="inline-block bg-gray-200 rounded-full px-3 py-1
                                         text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
                                            onClick={() => handleEdit(item._id)}>Edit</span>
                                        <span
                                            className="inline-block bg-gray-200 rounded-full px-3 py-1
                                        text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
                                            onClick={() => handleDelete(item._id)}>Delete</span>
                                    </div>
                                </div>
                            ))}
                        </div> :
                        <div className={""}>
                            <div className={"font-extrabold footerArrange"}>You didnt add any Recipes. You can share your taste with the world!</div>
                        </div>}
                </>}
        </div>
    );
};

export default UserProfile;
