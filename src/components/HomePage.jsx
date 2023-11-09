import { Col, Row, Statistic, Typography } from 'antd';
import React from 'react';
import { useGetCryptosQuery } from '../Services/cryptoApi';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Cryptocurrencies , News } from '../components'
import Loader from './Loader';

const HomePage = () => {
  const { data , isFetching } = useGetCryptosQuery(10);

  const globalData = data?.data?.stats;
  
  if( isFetching ) return <Loader/>;
 
  const { Title } = Typography ;
  return (
   <>
   <Title level={2} className="heading">
     Global Crypto Stats
   </Title>
   <Row>
    <Col span={12}> <Statistic title="Total Cryptocurrencies" value={millify(globalData.total)} /></Col>
    <Col span={12}> <Statistic title="Total Exchanges" value={ millify(globalData.totalExchanges)} /></Col>
    <Col span={12}> <Statistic title="Total Market cap" value={millify(globalData.totalMarketCap)} /></Col>
    <Col span={12}> <Statistic title="Total 24h Volume" value={millify(globalData.total24hVolume)} /></Col>
    <Col span={12}> <Statistic title="Total Markets" value={millify(globalData.totalMarkets)} /></Col>
   </Row>
   <div className='home-heading-container'>
    <Title level={2} className='home-title'> Top 10 Cryptocurrencies in the World</Title>
    <Title level={3} className="show-more"> <Link to='/cryptocurrencies'> Show More</Link> </Title>
   </div>
   <Cryptocurrencies simplified />
   <div className='home-heading-container'>
    <Title level={2} className='home-title'> Lates crypto News</Title>
    <Title level={3} className="show-more"> <Link to='/news'> Show More </Link> </Title>
   </div>
   <News simplified />
   </>
  )
}

export default HomePage
