//in this you'll prepare formatte data of the course

import courses from "./index.json";
//function to get all courses
export const getAllCourses = () => {
  return {
    data: courses,
    //accumulator, course, index
    //it will create individual object of each course
    //its much easier to look for items in the map than in array - key will become id of course
    courseMap: courses.reduce((a, c, i) => {
      a[c.id] = c;
      a[c.id].index = i;
      return a;
    }, {}),
  };
};
