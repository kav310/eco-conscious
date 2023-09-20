import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import React from "react";

export default function Navbar() {
    const [toggle, setToggle] = useState(false);
    const [navLinks, setNavLinks] = useState<any>(undefined);

    const showNav = () => {
        setToggle(!toggle);
    };


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const navbarData = [
            {
                title: "Home",
                href: "/",
            },
            {
                title: "Recommended Recipes",
                href: "/recommended",
            },
            {
                title: "Recipe Community",
                href: "/recipes",
            },
            {
                title: "Trending News",
                href: "/trending",
            },
        ];

        if (storedToken) {
            const link = {
                title: "Profile",
                href: "/profile",
            }
            navbarData.push(link)
            setNavLinks(navbarData)
        } else {
            const link = {
                title: "Login",
                href: "/login",
            }
            navbarData.push(link)
            setNavLinks(navbarData)
        }
    }, [], )



    // start mobile first plus facile
    return (
        <nav className="top-0 w-full items-center flex p-4">
            <div className="flex justify-between items-center w-full flex-wrap md:flex-nowrap">
                <img src={require('../../assets/images/brandName.svg')}/>

                <button
                    className="flex justify-end md:hidden ring-1 ring-black rounded"
                    onClick={showNav}
                >
                    <i className="fas fa-bars text-white w-9 h-9 flex justify-center items-center hover:text-black"></i>
                </button>

                <ul
                    className={`${
                        toggle ? " flex" : " hidden"
                    } flex-col justify-center items-center w-full first:mt-2 md:flex-row md:w-auto md:space-x-10 md:flex`}
                >
                    {navLinks && navLinks.map((link: any, index: any) => {
                        return (
                            <li key={index}>
                                <Link
                                    className="hover:text-green-300"
                                    to={link.href}
                                    onClick={showNav}
                                >
                                    {link.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
