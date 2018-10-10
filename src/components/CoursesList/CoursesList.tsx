import * as React from "react";
import styled from "../../theme/styled-components";
import Course from "./Course/Course";

import germanVerbs from "../../containers/data/ge";
import englishVerbs from "../../containers/data/en";

import englishPhrasalVerbs from "../../containers/data/phrasalVerbsEn";
// import germanPhrasalVerbs from "../../containers/data/phrasalVerbsDe";

const StyledCourseList = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  div {
    margin: 5px;
  }
`;

class CourseList extends React.Component<{}> {
  public render() {
    return (
      <StyledCourseList>
        <Course
          courseName="Irregular verbs"
          language="German"
          itemsNumber={germanVerbs.data.length}
          link="/verbs/de/learn"
        />
        <Course
          courseName="Irregular verbs"
          language="English"
          itemsNumber={englishVerbs.data.length}
          link="/verbs/en/learn"
        />
        <Course
          courseName="Phrasal verbs"
          itemsNumber={englishPhrasalVerbs.data.length}
          language="English"
          link="/phrasals/learn"
        />
        {/* <Course
          courseName="Phrasal verbs"
          itemsNumber={germanPhrasalVerbs.data.length}
          language="German"
          link="/verbs/learn"
        /> */}
      </StyledCourseList>
    );
  }
}

export default CourseList;
