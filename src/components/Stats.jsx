import { Statistic, message } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './Stats.css';

export default function Stats({ month, monthText }) {
    let [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://roxiler-pvpf.onrender.com/combined-data?month=${month}`);
            setLoading(false);
            setData(res.data);
            message.success('Data loaded successfully');
        } catch (error) {
            console.log(error);
            message.error('Error loading data');
        }
    };

    useEffect(() => {
        getData();
        return () => {
            setData(null);
        };
    }, [month]);

    return (
        <>
            <h2>Stats for {monthText}</h2>

            <div className="stats-container">
                <div className="stats-section">
                    <Totals stats={data?.statsData} loading={loading} />
                    {data && <BarChart data={data?.barChartData} />}
                </div>

                {data && <PieChart data={data?.pieChartData} />}
            </div>
        </>
    );
}

function Totals({ stats, loading }) {
    return (
        <div className='stats'>
            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Sale"
                value={stats?.totalSale}
                loading={loading}
                prefix="₹"
            />

            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Sold Items"
                value={stats?.soldCount}
                loading={loading}
            />
            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Unsold Items"
                value={stats?.unsoldCount}
                loading={loading}
            />
        </div>
    );
}

function BarChart({ data }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'No of products per price range',
            },
        },
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Price Range',
                },
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Product Count',
                },
                ticks: {
                    stepSize: 4,
                },
            },
        },
    };

    let labels = Object.keys(data);
    let values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'No of products per price range',
                data: values,
                backgroundColor: 'rgba(0, 105, 100, 0.7)',
            },
        ],
    };

    return (
        <div className="chart-container">
            <Bar data={chartData} options={options} />
        </div>
    );
}

function PieChart({ data }) {
    let labels = Object.keys(data);
    let values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: '# of Products',
                data: values,
                backgroundColor: [
                    'rgba(0, 105, 100, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                ],
            },
        ],
    };

    return (
        <div className="chart-container">
            <Doughnut data={chartData} />
        </div>
    );
}
