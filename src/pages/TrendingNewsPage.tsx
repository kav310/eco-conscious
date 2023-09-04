import React, {useEffect, useState} from 'react';
import axios from "axios";
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from "moment";

interface NewsDataResponse {
    source: {
        id: any,
        name: string
    },
    author: string,
    title: string,
    url: string,
    urlToImage: string,
}

const API_KEY = "050b238ba906410d87323096dd1234ce"
const SEARCH_KEYWORD = 'vegan'
const TrendingNewsPage = () => {
    const [newsData, setNewsData] = useState<NewsDataResponse[] | undefined>(undefined)
    let currentDate = new Date()
    let yesterday = new Date(currentDate)
    yesterday.setDate(yesterday.getDate() - 1)
    const [startDate, setStartDate] = useState<any>(yesterday);

    const handleClick = (url: string) => {
        window.open(url, "_blank", "noreferrer");
    }

    useEffect(() => {
        const date = moment(startDate).format("YYYY-MM-DD")
        axios.get(`https://newsapi.org/v2/everything?q=${SEARCH_KEYWORD}&from=${date}&to=${date}&apiKey=${API_KEY}`)
            .then(response => setNewsData(response.data.articles)).catch(error => console.log(error))
    }, [startDate])

    return (
        <div className={"bg-gray-200"}>
            <div className="flex justify-center pt-6">
                <div className="mr-4">Select Date:</div>
                <DatePicker
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                />
            </div>
            <div className="grid grid-cols-3 gap-0">
                {newsData && newsData.map((item: NewsDataResponse) => (
                    <div key={item.url}
                         className="m-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-5">
                            <div
                                className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</div>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">BY: {item.author}</p>
                            <button onClick={() => handleClick(item.url)}
                                    className="inline-flex items-center px-8 py-2 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingNewsPage;
