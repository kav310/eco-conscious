import * as React from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm();
    const history = useHistory()

    const onSubmit = (data: any) => {
        console.log(data)
        axios.post('http://localhost:5000/login', data)
            .then((response) => {
                // Handle a successful registration response, e.g., redirect to a login page
                console.log('Registration successful:', response.data);
            })
            .catch((error) => {
                // Handle registration errors, e.g., display error messages
                console.error('Registration failed:', error.response.data);
            });
    }

    const handleRedirect = () => {
        history.push("/signUp")
    }


    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div
                className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
                <div className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
                    Sign in
                </div>
                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            {...register("email", {required: true, maxLength: 30})}
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.email && errors.email.type === "required" && (
                            <span>Email is required</span>
                        )}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            {...register("password", {required: true, maxLength: 30})}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.password && errors.password.type === "required" && (
                            <span>password is required</span>
                        )}
                    </div>
                    <a
                        href="#"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <input type="submit"
                               className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"/>

                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700" onClick={handleRedirect}>
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="#"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
