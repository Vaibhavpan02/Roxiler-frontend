import './App.css';
import React, { useState } from 'react';
import { Layout, Menu, Select } from 'antd';
import Transactions from './components/Transactions';
import Stats from './components/Stats';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const navItems = [
  {
    key: 1,
    label: (<NavLink to="/">Transactions</NavLink>),
  },
  {
    key: 2,
    label: (<NavLink to="/stats">Stats</NavLink>),
  },
];

const options = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const App = () => {
  let [month, setMonth] = useState(3);

  const handleMonthChange = (value) => {
    setMonth(parseInt(value));
  };

  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <h1 className='dash'>Dashboard</h1>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={navItems}
            style={{ flex: 1 }}
          />
          <Select
            size="large"
            defaultValue={options[month]}
            onChange={handleMonthChange}
            style={{ width: 200 }}
            options={options.map((text, i) => ({
              value: i,
              label: text,
            }))}
          />
        </Header>
        <Content>
          <Routes>
            <Route
              path="/"
              element={<Transactions month={month} monthText={options[month]} />}
            />
            <Route
              path="/stats"
              element={<Stats month={month} monthText={options[month]} />}
            />
          </Routes>
        </Content>
        <Footer>
          Created by <strong>Vaibhav Pandey</strong>
        </Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
