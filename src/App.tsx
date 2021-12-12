/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, List, Menu, Spin, Dropdown, Card, notification } from "antd";
import axios from "axios";
import useHandleScroll from "./utils/useHandleScroll";
import { formatDate } from "./utils/handleDateFormat";
import { convertCentToDollar } from "./utils/handleCurrencyFormat";
import {
  SpinContainer,
  Container,
  Head,
  CardBody,
  CardFooter,
  CardList,
} from "./styles";

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
  const [isFetching, setIsFetching] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [sortKey, setSortKey] = useState("");
  const [loading, setLoading] = useState(false);

  const isBottom = useHandleScroll();

  const fetchData = () => {
    setLoading(true);
    axios
      .get(
        `http://localhost:3000/products?_page=${page}&_limit=15&_sort=${sortKey}`
      )
      .then((res) => {
        if (sortKey.length > 0) {
          setData(res.data);
        } else {
          setData([...data, ...res.data]);
        }
        setIsFetching(false);
        setLoading(false);
        if (res.data.length === 0) {
          setHasMorePages(false);
        }
      })
      .catch((err) => {
        notification.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isBottom && hasMorePages) {
      setPage((prevPage) => prevPage + 1);
      setIsFetching(true);
      fetchData();
    }
    if (sortKey.length > 0) {
      setLoading(true);
      fetchData();
    }
  }, [isBottom, sortKey]);

  if (loading && !isFetching) {
    return (
      <SpinContainer>
        <Spin tip="loading..." size="large" />
      </SpinContainer>
    );
  }

  const menu = (
    <Menu onClick={(e) => setSortKey(e.key)}>
      <Menu.Item key="id">id</Menu.Item>
      <Menu.Item key="size"> size</Menu.Item>
      <Menu.Item key="price">price</Menu.Item>
    </Menu>
  );

  return (
    <Container>
      <Head>welcome to our website!</Head>
      <Dropdown overlay={menu} placement="bottomLeft" arrow>
        <Button>Sort By</Button>
      </Dropdown>

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
        style={{ marginTop: "20px" }}
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
      {isFetching && (
        <SpinContainer>
          <Spin tip="loading..." size="large" />
        </SpinContainer>
      )}
      {!hasMorePages && <h1>~ end of catalogue ~</h1>}
    </Container>
  );
}

export default App;
