import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Col, Select, Typography, Row } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCryptoDetailsQuery ,useGetCryptoHistoryQuery } from "../Services/cryptoApi";
import Loader from "./Loader";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const cryptoDetails = data?.data?.coin;
  const { Title, Text } = Typography;
  const { Option } = Select;

  if(isFetching) return <Loader />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `${
        cryptoDetails?.["24hVolume"] && millify(cryptoDetails["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name}({cryptoDetails?.symbol}) Price
        </Title>
        <p>
          {cryptoDetails?.name} live price in dollars, View value statitics,
          merket cup and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}> {date} </Option>
        ))}
      </Select>
      <Col className="stats-container">
        <Col className="coin-value-statics">
          <Col className="coin-value-statics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} value statics
              {console.log(cryptoDetails)}
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails?.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ title, icon, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text> {icon} </Text>
                <Text> {title} </Text>
              </Col>
              <Text className="stats"> {value} </Text>
            </Col>
          ))}
        </Col>

        <Col className="other-statics">
          <Col className="coin-value-statics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statics
              {console.log(cryptoDetails)}
            </Title>
            <p>An overview showing the stats of all Cryptocurrencies</p>
          </Col>
          {genericStats.map(({ title, icon, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text> {icon} </Text>
                <Text> {} </Text>
              </Col>
              <Text className="stats"> {value} </Text>
            </Col>
          ))}
        </Col>
      </Col>
      {/* <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              What is {cryptoDetails?.name}?
              <br></br>
              {HTMLReactParser(cryptoDetails?.description)}
            </Title>
          </Row>
        </Col> */}
    </Col>
  );
};

export default CryptoDetails;
