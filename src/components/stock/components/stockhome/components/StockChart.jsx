/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"
import { createChart, ColorType, LineStyle } from 'lightweight-charts';

const StockChart = ({ data, prevClose, chartInterval }) => {
    const chartContainerRef = useRef()
    const chartRef = useRef()
    const seriesRef = useRef()

    useEffect(() => {
        const handleResize = () => {
            chartRef.current.applyOptions({
                width: chartContainerRef.current.clientWidth
            });
        }

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: {
                    type: ColorType.Solid,
                    color: 'rgba( 38, 166, 154, 0)'
                },
                textColor: 'white',
                attributionLogo: false
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
            grid: {
                horzLines: {
                    visible: false
                },
                vertLines: {
                    visible: false
                }
            },
            timeScale: {
                fixLeftEdge: true,
                fixRightEdge: true

            },
            crosshair: {
                vertLine: {
                    width: 8,
                    color: '#C3BCDB44',
                    style: LineStyle.Solid,
                    labelBackgroundColor: '#9B7DFF',
                },
                horzLine: {
                    color: '#9B7DFF',
                    labelBackgroundColor: '#9B7DFF',
                },
            },
        })

        if (chartInterval === '1D') {
            chart.applyOptions({
                timeScale: {
                    tickMarkFormatter: (time) => {
                        const date = new Date(time);
                        const hours = date.getUTCHours().toString().padStart(2, '0');
                        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                        return `${hours}:${minutes}`;

                    }
                },
                localization: ({
                    timeFormatter: (time) => {
                        const date = new Date(time);
                        const hours = date.getUTCHours().toString().padStart(2, '0');
                        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                        return `${hours}:${minutes}`;
                    }
                })
            })
        } else if (chartInterval === '1W') {
            chart.applyOptions({
                timeScale: {
                    tickMarkFormatter: (time) => {
                        const date = new Date(time);
                        const day = date.getUTCDate().toString().padStart(2, '0');
                        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
                        return `${day}/${month}`;
                    }
                },
                localization: ({
                    timeFormatter: (time) => {
                        const date = new Date(time);
                        const day = date.getUTCDate().toString().padStart(2, '0');
                        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
                        const hours = date.getUTCHours().toString().padStart(2, '0');
                        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                        return `${day}/${month} ${hours}:${minutes}`;
                    }
                })
            })
        } else if (chartInterval === '1M') {
            chart.applyOptions({
                timeScale: {
                    tickMarkFormatter: (time) => {
                        const date = new Date(time);
                        const day = date.getUTCDate().toString().padStart(2, '0');
                        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
                        return `${day}/${month}`;
                    }
                },
                localization: ({
                    timeFormatter: (time) => {
                        const date = new Date(time);
                        const day = date.getUTCDate().toString().padStart(2, '0');
                        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
                        const hours = date.getUTCHours().toString().padStart(2, '0');
                        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                        return `${day}/${month} ${hours}:${minutes}`;
                    }
                })
            })
        } else if (chartInterval === 'YTD') {
            chart.applyOptions({
                timeScale: {
                    tickMarkFormatter: (time) => {
                        const date = new Date(time);
                        const day = date.getUTCDate().toString().padStart(2, '0');
                        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
                        return `${day}/${month}`;
                    }
                },
                localization: ({
                    timeFormatter: (time) => {
                        const date = new Date(time);
                        const day = date.getUTCDate().toString().padStart(2, '0');
                        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
                        return `${day}/${month}`;
                    }
                })
            })
        }


        else if (chartInterval === '1Y') {
            const helper1 = new Date().getFullYear().toString()
            let helper2 = false
            chart.applyOptions({
                timeScale: {
                    tickMarkFormatter: (time) => {
                        const date = new Date(time);
                        const year = date.getUTCFullYear().toString()
                        if (year === helper1 && !helper2) {
                            helper2 = true
                            return `${year}`
                        } else {
                            return ''
                        }
                    }
                },
                localization: ({
                    timeFormatter: (time) => {
                        const date = new Date(time);
                        const day = date.getUTCDate().toString().padStart(2, '0');
                        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
                        const year = date.getUTCFullYear().toString().slice(-2)
                        return `${day}/${month}/${year}`;
                    }
                })
            })
        } else {
            let helper1 = ''
            chart.applyOptions({
                timeScale: {
                    tickMarkFormatter: (time) => {
                        const date = new Date(time);
                        const year = date.getUTCFullYear().toString()
                        if (year !== helper1) {
                            helper1 = year
                            return `${year}`;
                        } else {
                            return ''
                        }
                    }
                },
                localization: ({
                    timeFormatter: (time) => {
                        const date = new Date(time);
                        const day = date.getUTCDate().toString().padStart(2, '0');
                        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
                        const year = date.getUTCFullYear().toString()
                        return `${day}/${month}/${year}`;
                    }
                })
            })
        }


        chartRef.current = chart

        const mySeries = chart.addBaselineSeries({
            baseValue: { type: "price", price: prevClose },
            topLineColor: 'rgba( 0, 169, 110, 1)',
            topFillColor1: 'rgba( 0, 169, 110, 0.28)',
            topFillColor2: 'rgba( 0, 169, 110, 0.05)',
            bottomLineColor: 'rgba( 255, 88, 97, 1)',
            bottomFillColor1: 'rgba( 255, 88, 97, 0.05)',
            bottomFillColor2: 'rgba( 255, 88, 97, 0.28)',
            lastValueVisible: false,
            priceLineVisible: false,
            lineWidth: 1
        });
        seriesRef.current = mySeries

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            chart.remove();
        };
    }, [prevClose, chartInterval, data])

    useEffect(() => {
        if (chartRef.current && seriesRef.current) {
            seriesRef.current.setData(data);
            chartRef.current.timeScale().fitContent();
        }
    }, [data]);

    useEffect(() => {
        if (seriesRef.current) {
            if (data.length > 0) {
                seriesRef.current.applyOptions({
                    baseValue: { type: "price", price: chartInterval === "1D" ? prevClose : data[0].value }
                });
            } else {
                seriesRef.current.applyOptions({
                    baseValue: { type: "price", price: prevClose }
                });
            }
        }
    }, [prevClose, chartInterval, data]);


    return (
        <div ref={chartContainerRef} />
    )
}

export default StockChart