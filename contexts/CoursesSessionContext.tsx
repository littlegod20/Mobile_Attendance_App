import React, { createContext, useState, useContext, ReactNode } from "react";

interface Course {
  course_code: string;
  course_name: string;
  credits: string;
  action?: "open" | "close";
}

interface CourseSessionContextType {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  updateCourseAction: (course_code: string, action: "open" | "close") => void;
}

const CourseSessionContext = createContext<
  CourseSessionContextType | undefined
>(undefined);

export const CourseSessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);

  const updateCourseAction = (
    course_code: string,
    action: "open" | "close"
  ) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.course_code === course_code ? { ...course, action } : course
      )
    );
  };

  return (
    <CourseSessionContext.Provider
      value={{ courses, setCourses, updateCourseAction }}
    >
      {children}
    </CourseSessionContext.Provider>
  );
};

export const useCourseSession = () => {
  const context = useContext(CourseSessionContext);
  if (context === undefined) {
    throw new Error(
      "useCourseSession must be used within a CourseSessionProvider"
    );
  }
  return context;
};
