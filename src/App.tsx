/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useCallback, useState, useMemo } from "react";
import { List, Spin } from "antd";
import axios from "axios";
import styled from "styled-components";
import useHandleScroll from "./utils/useHandleScroll";

type Props = {
  id: number;
  size: number;
  price: number;
  face: string;
  date: Date;
};

function App() {
  const [data, setData] = useState<Array<Props>>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);

  const isBottom = useHandleScroll();

  const fetchData = () => {
    axios
      .get(`http://localhost:3000/products?_page=${page}&_limit=100`)
      .then((res) => {
        setLoading(false);
        if (res.data.length === 0) {
          setHasMorePages(false);
        }
        setData([...data, ...res.data]);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isBottom && hasMorePages) {
      setPage((prevPage) => prevPage + 1);
      setLoading(true);
      fetchData();
    }
  }, [isBottom]);

  const formatDate = useCallback((date: string | number | Date) => {
    const createdAt: any = new Date(date);

    const userVisited: any = new Date();

    const diff = userVisited - createdAt;

    // convert the milliseconds to seconds
    const toSec = diff / 1000;

    // convert the seconds to minutes
    const toMin = toSec / 60;

    // convert the minutes to hours
    const toHour = toMin / 60;

    // convert the hours to days
    const toDays = toHour / 24;

    // now we'll round the days up/down
    const rounded = Math.round(toDays);

    const relativeTime: any = new Intl.RelativeTimeFormat("en").format(
      -rounded,
      "day"
    );

    if (relativeTime[0] + relativeTime[1] >= 7) {
      return (
        createdAt.getDate() +
        "/" +
        (createdAt.getMonth() + 1) +
        "/" +
        createdAt.getFullYear()
      );
    } else {
      return relativeTime;
    }
  }, []);

  const convertCentToDollar = useCallback((cent: number) => {
    const dollars = cent / 100;
    return dollars.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, []);

  if (data.length === 0) {
    return (
      <SpinContainer>
        <Spin tip="loading..." size="large" />
      </SpinContainer>
    );
  }

  return (
    <Container>
      <Head>welcome to our website!</Head>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={data}
        renderItem={(item: Props) => (
          <List.Item>
            <Card>
              <CardBody size={item.size}>{item.face}</CardBody>
              <CardFooter>
                <CardList>Price: {convertCentToDollar(item.price)}</CardList>
                <CardList>CreatedAt: {formatDate(item.date)}</CardList>
              </CardFooter>
            </Card>
          </List.Item>
        )}
      />
      {loading && (
        <SpinContainer>
          <Spin tip="loading..." size="large" />
        </SpinContainer>
      )}
      {!hasMorePages && <h1>~ end of catalogue ~</h1>}
    </Container>
  );
}

export default App;

export const Container = styled.div`
  padding: 50px;
`;

export const Head = styled.h1`
  font-size: 25px;
  color: black;
  text-align: left;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 35px;
`;

export const Card = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum", "tnum";
  position: relative;
  background: #fff;
  border-radius: 2px;
  border: 1px solid #ececec;
  padding: 24px;
  min-height: 430px;
`;

export const CardBody = styled.div`
  font-size: ${(props: { size: number }) => `${props.size}px`};
  text-align: center;
  min-height: 267px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CardFooter = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
`;

export const CardList = styled.li`
  float: left;
  margin: 12px 0;
  color: #00000073;
  text-align: center;
`;

export const SpinContainer = styled.div`
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  border-radius: 4px;
`;
