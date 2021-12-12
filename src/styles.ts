import styled from "styled-components";

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
