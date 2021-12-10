import React, { useEffect, useState } from "react";
import { List, Spin } from "antd";
import axios from "axios";
import styled from "styled-components";

type Props = {
  id: number;
  size: number;
  price: number;
  face: string;
  date: Date;
};

function App() {
  const [data, setData] = useState<Array<Props>>([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:3000/products?_page=10&_limit=15")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log({ err });
        });
    };
    fetchData();
  }, []);

  if (data.length === 0) {
    return (
      <Spin
        tip="loading..."
        size="large"
        style={{ display: "flex", alignSelf: "center" }}
      />
    );
  }

  console.log(data.length, ">>>");

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
                <CardList>{item.price}</CardList>
                <CardList>{item.date}</CardList>
              </CardFooter>
            </Card>
          </List.Item>
        )}
      />
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
  min-height: 564px;
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
// export const CardHead = styled.div`
// min-height: 48px;
//     margin-bottom: -1px;
//     padding: 0 24px;
//     color: rgba(0, 0, 0, 0.85);
//     font-weight: 500;
//     font-size: 16px;
//     background: transparent;
//     border-bottom: 1px solid #f0f0f0;
//     border-radius: 2px 2px 0 0;
// `
