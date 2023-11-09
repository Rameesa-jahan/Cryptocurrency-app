import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../Services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return <Loader />;


  return (
    <>
     { !simplified && (
       <div className="search-crypto">
       <Input
         placeholder="Search Cryptocurrency"
         onChange={(e) => setSearchTerm(e.target.value)}
       />
     </div>
     )}
     
      <Row gutters={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.rank}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank},${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
              >
                <p> Price : {millify(currency.price)} </p>
                <p> Market Cap : {millify(currency.marketCap)} </p>
                <p> Daily Change : {millify(currency.change)} </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
