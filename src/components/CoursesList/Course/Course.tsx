import * as React from "react";
import styled from "../../../theme/styled-components";
import { NavLink } from "react-router-dom";

const StyledCourse = styled.div`
  height: 200px;
  width: 200px;
  padding: 5px;
  background: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  a {
    margin-top: 25px;
    width: 100px;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    padding: 10px;
    color: #999;
    border: 1.5px solid #f0f0f0;
    border-radius: 20px;
    transition: all 0.3s;
    &:hover {
      background: #56ccf2;
      border: 1.5px solid white;
      color: white;
      transition: all 0.3s;
    }
  }
  &:hover {
    box-shadow: 1px 0 16px rgba(33, 33, 33, 0.2);
  }
`;

const CourseName = styled.div`
  font-weight: 500;
`;
const Language = styled.div`
  font-weight: 400;
  opacity: 0.8;
`;

const ItemsNumber = styled.div`
  border-radius: 50%;
  margin: 5px auto 0 auto;
  width: 26px;
  height: 26px;
  padding: 8px;
  background: #fff;
  border: 2px solid #10aded;
  color: #666;
  text-align: center;
`;

interface IProps {
  courseName: string;
  itemsNumber: number;
  languageIcon?: any;
  language: string;
  link: string;
}

class CourseList extends React.Component<IProps, {}> {
  public render() {
    return (
      <StyledCourse>
        <CourseName>{this.props.courseName}</CourseName>
        <Language>{this.props.language}</Language>
        <ItemsNumber>{this.props.itemsNumber}</ItemsNumber>

        <NavLink to={this.props.link}>Start</NavLink>
      </StyledCourse>
    );
  }
}

export default CourseList;
