/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { getYahooNews } from "../../../../services/stock";

import StockNewsSkeleton from "./components/StockNewsSkeleton"

const StockNews = ({ ticker }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [news, setNews] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooNews(ticker, 1000)

                if (data) {
                    setNews(data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log("Error getting news", error)
                setIsLoading(false)
            }
        }
        fetchData()
    }, [ticker])

    if (isLoading) {
        return (
            <div className="bg-base-950 border border-border rounded p-4 mt-4">
                <h2 className="text-text text-lg font-bold mb-3">Recent News: {ticker}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StockNewsSkeleton />
                    <StockNewsSkeleton />
                    <StockNewsSkeleton />
                    <StockNewsSkeleton />
                    <StockNewsSkeleton />
                    <StockNewsSkeleton />
                    <StockNewsSkeleton />
                    <StockNewsSkeleton />
                    <StockNewsSkeleton />
                    <StockNewsSkeleton />
                </div>
            </div>
        )
    }

    return (
        <div className="bg-base-950 border border-border rounded p-4 mt-7">
            <h2 className="text-text text-lg font-bold mb-3">Recent News: {ticker}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                {
                    news.news.sort((a, b) => new Date(b.providerPublishTime) - new Date(a.providerPublishTime)).map(n => (
                        <div key={n.uuid} className="flex rounded border border-border p-3">
                            <div className="w-full flex flex-col pr-2">
                                <a href={n.link} target="_blank" className="text-text font-semibold text-sm mb-1 hover:text-blue-500 transition duration-300">{n.title}</a>
                                <p className="text-sm mb-1">{n.publisher} - {moment(n.providerPublishTime).format('MMM Do, YYYY')}</p>
                                <div>
                                    {n.relatedTickers &&
                                        n.relatedTickers.map((rela, idx) => (
                                            <Link key={idx} className="badge badge-outline border-neutral-500 mr-1.5 mt-1.5 text-blue-500 font-semibold" to={`/stock/${rela}`}>{rela}</Link>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="">
                                {n.thumbnail && n.thumbnail.resolutions
                                    ? n.thumbnail.resolutions[1]
                                        ? <img src={n.thumbnail.resolutions[1].url} className="rounded drop-shadow max-w-28 w-28 min-w-28" />
                                        : <img src={n.thumbnail.resolutions[0].url} className="rounded drop-shadow max-w-28 w-28 min-w-28" />
                                    : <div className="rounded drop-shadow border border-border w-28 h-28 flex justify-center items-center text-2xl"><FontAwesomeIcon icon="fa-regular fa-image" /></div>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default StockNews