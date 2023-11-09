import Layout from "antd/es/layout/layout";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  Navbar,
  Exchanges,
  Cryptocurrencies,
  CryptoDetails,
  News,
  HomePage,
} from "./components";
import "./App.css";
import Typography from "antd/es/typography/Typography";
import { Space } from "antd";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/exchange" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{ color: "white", textAlign: "center" }}>
          Cryptoverse <br />
          All rights reserved.
        </Typography.Title>
        <Space>
         <Link to='/'> Home</Link>
         <Link to='/exchange'> Exchanges</Link>
         <Link to='/news'> News </Link>
        </Space>
      </div>
      </div>
    </div>
  );
}

export default App;
