import React from 'react';
import "./style.css"

const HomePage = () => {
    return (
        <div className={"bg-gray-200"}>
            <div className="flex pl-24 pr-12 justify-around">
                <div>
                    <img className="homeHeroBanner" src={require("../assets/images/heroImage.svg")}/>
                </div>
                <div className="text-center mt-12">
                    <div className="text-4xl">Organic Food For</div>
                    <div className="text-4xl">A Golden Life</div>
                    <div className="text-sm font-bold homeHeadingTextColor">Nourishing Your Health and Well-being
                        Naturally
                    </div>
                    <div className="mt-4 text-md homeHeadingTextColor">In a world where health-conscious choices are
                        paramount,<br/> embracing organic food can pave the
                        way for a golden life filled<br/> with vitality and well-being.
                    </div>
                    <button className="buttonTheme">Trending News</button>
                </div>
            </div>
            <div className="flex pl-24 pr-12 justify-around">
                <div className="mt-12">
                    <div className="text-2xl text-green-300">Nutrition from a Plant-Based Diet</div>
                    <div className="text-2xl">Harnessing the Power of Nature for Health</div>
                    <div className="text-sm font-bold homeHeadingTextColor">Nourishing Your Health and Well-being
                        Naturally
                    </div>
                    <div className="mt-4 text-md homeHeadingTextColor">In the vibrant realm of vegan cuisine, we embark
                        on a journey to explore the diverse and delectable<br/> world of plant-based nourishment. Our
                        mission
                        is twofold to share wholesome and mouthwatering<br/> vegan recipes with the global community and
                        to
                        recount the enchanting experiences<br/> of savouring plant-based dishes from around the world.
                    </div>
                </div>
                <div>
                    <img className="homeHeroBanner" src={require("../assets/images/nutrition.svg")}/>
                </div>
            </div>
            <div className="bg-gray-400 ml-12 mr-12 p-8 text-center rounded-md">
                <div>"We foster global connections among the vibrant community of vegans,<br/> uniting individuals from
                    diverse corners of the world through their shared passion for plant-based cuisine.”
                </div>
            </div>
            <div className="mt-12 displayNone">In the vibrant realm of vegan cuisine, we embark
                on a journey to explore the diverse and delectable<br/> world of plant-based nourishment. Our
                mission</div>
        </div>
    );
};

export default HomePage;
