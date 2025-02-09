import { useTranslation } from 'react-i18next';
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfiniteScroll from 'react-infinite-scroll-component';

/* eslint-disable react/prop-types */
const convertAction = (action) => {
    switch (action) {
        case 'main':
            return "Maintain"
        case 'reit':
            return "Reiterate"
        case 'down':
            return "Downgrade"
        case 'init':
            return "Initiated"
        case 'up':
            return "Upgrade"
        default:
            return action
    }
}

const gradeNumber = (action) => {
    switch (action) {
        case 'main':
        case 'reit':
            return 0
        case 'down':
            return -1
        case 'up':
            return 1
        default:
            return 0
    }
}

const AnalystUpgradesDowngrades = ({ stockSummary }) => {
    const { t, i18n } = useTranslation();
    const [loadMore, setLoadMore] = useState(false)
    const [loadMoreData, setLoadMoreData] = useState([])

    if (!stockSummary) {
        return (
            <div>...Loading</div>
        )
    }

    let helper1 = 0
    let helper2 = []

    while (helper2.length < 10 && helper2.length < stockSummary.upgradeDowngradeHistory.history.length) {
        const grade = stockSummary.upgradeDowngradeHistory.history[helper1]
        helper2.push(grade)
        helper1++
    }

    const fetchMoreData = () => {

        setTimeout(() => {
            const moreItems = stockSummary.upgradeDowngradeHistory.history.slice(loadMoreData.length, loadMoreData.length + 10)

            setLoadMoreData(loadMoreData.concat(moreItems));
        }, 500);
    }


    return (
        <div className="my-analysis bg-base-950 border border-border rounded p-4">
            <h3 className="font-semibold text-text mb-3">{t('Stock.Analyst-Ratings.Upgrades-Downgrades.Upgrades & Downgrades')}</h3>
            <div className="w-full flex flex-col justify-center">
                {
                    !loadMore
                        ?
                        <table className="table table-sm sm:table-md border border-border rounded-lg mb-5">
                            <thead>
                                <tr>
                                    <th>{t('Stock.Analyst-Ratings.Upgrades-Downgrades.Date')}</th>
                                    <th>{t('Stock.Analyst-Ratings.Upgrades-Downgrades.Firm')}</th>
                                    <th>{t('Stock.Analyst-Ratings.Upgrades-Downgrades.Action')}</th>
                                    <th>{t('Stock.Analyst-Ratings.Upgrades-Downgrades.Rating')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    helper2.map((grade, i) => {
                                        return (
                                            <tr key={i} style={

                                                gradeNumber(grade.action) !== 0
                                                    ? gradeNumber(grade.action) === -1
                                                        ? { backgroundColor: "rgba(255, 88, 97, 0.5)",
                                                            color: "white"
                                                         }
                                                        : { backgroundColor: "rgba(0, 169, 110, 0.5)",
                                                            color: "white"
                                                         }
                                                    : {}
                                            }>
                                                <td>{grade.epochGradeDate.split('T')[0]}</td>
                                                <td>{grade.firm}</td>
                                                <td>{convertAction(grade.action)}</td>
                                                <td>{grade.fromGrade} {`->`} {grade.toGrade}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        :
                        <InfiniteScroll
                            dataLength={loadMoreData.length}
                            next={fetchMoreData}
                            hasMore={loadMoreData.length < stockSummary.upgradeDowngradeHistory.history.length}
                            loader={
                                <div className="w-full flex justify-center py-5">
                                    <span className="loading loading-spinner loading-md"></span>
                                </div>
                            }
                        >
                            <table className="table table-sm sm:table-md border border-border rounded-lg mb-5">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Firm</th>
                                        <th>Action</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loadMoreData.map((grade, i) => {
                                            return (
                                                <tr key={i} style={

                                                    gradeNumber(grade.action) !== 0
                                                        ? gradeNumber(grade.action) === -1
                                                            ? { backgroundColor: "rgba(214, 10, 34, 0.5)" }
                                                            : { backgroundColor: "rgba(3, 123, 102, 0.5)" }
                                                        : {}
                                                }>
                                                    <td>{grade.epochGradeDate.split('T')[0]}</td>
                                                    <td>{grade.firm}</td>
                                                    <td>{convertAction(grade.action)}</td>
                                                    <td>{grade.fromGrade} {`->`} {grade.toGrade}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </InfiniteScroll>

                }
                {
                    !loadMore && <button className="btn" onClick={() => { setLoadMore(true) }}><FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-2" />{t('Stock.Analyst-Ratings.Upgrades-Downgrades.More Upgrades & Downgrades')}</button>
                }
            </div>
        </div>
    )
}

export default AnalystUpgradesDowngrades