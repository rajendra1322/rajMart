import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import Adminhome from './Adminhome'
import user from './assets/users.svg'
import revenue from './assets/revenue.svg'
import product from './assets/myorder.svg'
import axios from 'axios'
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import { BarChart, Bar } from "recharts";
import { PieChart, Pie } from "recharts";


function Dashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalRevenue: 0,
        totalProducts: 0
    });
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("https://backend-fgbg.onrender.com/admin/stats")
            console.log(res.data);
            setStats(res.data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchChart = async () => {
            const res = await axios.get("https://backend-fgbg.onrender.com/admin/revenue-chart");
            setChartData(res.data);
        };

        fetchChart();
    }, []);
    const pieData = [
        { name: "Electronics", value: 400 },
        { name: "Clothes", value: 300 },
        { name: "Groceries", value: 300 },
    ];

    return (
        <div className='dashboardmain'>
            <div className='dashboardadminside'>
                <Adminhome />
            </div>
            <div className='dashboardcontainer'>
                <div className='dashboardusers'>
                    <div className='dashboarduserstop'>
                        <img src={user} alt="userlogo" width={300} className='dashboarduserlogo' />
                        <p className='dashboarduserP'>Total Users</p>
                    </div>
                    <p className='dashboardtotal'>{stats?.totalUsers}</p>
                </div>
                <div className='dashboardusers'>
                    <div className='dashboarduserstop'>
                        <img src={revenue} alt="userlogo" width={300} className='dashboardrevenuelogo' />
                        <p className='dashboarduserP'>Total Revenue</p>
                    </div>
                    <p className='dashboardtotal'>₹{stats?.totalRevenue}</p>
                </div>

                <div className='dashboardusers'>
                    <div className='dashboarduserstop'>
                        <img src={product} alt="userlogo" width={300} className='dashboardproductlogo' />
                        <p className='dashboarduserP'>Total Products</p>
                    </div>
                    <p className='dashboardtotal'>{stats?.totalProducts}</p>
                </div>
            </div>

            <div className="charts">

                <div className="chart-box chart-full">
                    <h2 className='charth2'>Revenue Trend</h2>
                    <div className="chart-content">
                        <ResponsiveContainer width="600" height={200}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#0078AD" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-box">
                    <h2 className='charth2'>Monthly Orders</h2>
                    <div className="chart-content">
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#28a745" />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-box">
                    <h2 className='charth2'>Categories</h2>
                    <div className="chart-content">
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Dashboard