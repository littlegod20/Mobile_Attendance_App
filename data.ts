export interface CarouselProps {
  id?: number;
  title?: string;
  time?: string;
  courseId?: string;
  courseName?: string;
  percentage?: number;
}
[];
export const carousel: CarouselProps[] = [
  {
    id: 1,
    title: "Upcoming Events",
    time: new Date().toLocaleTimeString(),
  },
  {
    courseId: "CSE 101",
    courseName: "Computer Science",
    percentage: 85,
  },
  { courseId: "MAT 201", courseName: "Mathematics", percentage: 90 },
];

export interface CourseData {
  course_name: string;
  course_code: string;
  start_time: string;
  finish_time: string;
}

export const courses: CourseData[] = [
  {
    course_name: "Applied Elecricity",
    course_code: "TE 472",
    start_time: "8:15",
    finish_time: "10-15",
  },
  {
    course_name: "Applied Elecricity",
    course_code: "TE 472",
    start_time: "8:15",
    finish_time: "10-15",
  },
  {
    course_name: "Applied Elecricity",
    course_code: "TE 472",
    start_time: "8:15",
    finish_time: "10-15",
  },
  {
    course_name: "Applied Elecricity",
    course_code: "TE 472",
    start_time: "8:15",
    finish_time: "10-15",
  },
  {
    course_name: "Applied Elecricity",
    course_code: "TE 472",
    start_time: "8:15",
    finish_time: "10-15",
  },
  {
    course_name: "Applied Elecricity",
    course_code: "TE 472",
    start_time: "8:15",
    finish_time: "10-15",
  },
  {
    course_name: "Applied Elecricity",
    course_code: "TE 472",
    start_time: "8:15",
    finish_time: "10-15",
  },
];

export interface CardData {
  week: string;
  course: string;
  date: string;
  present: boolean;
}

export const cards: CardData[] = [
  {
    week: "Week 1",
    course: "Basic Mechanics",
    date: "June 11",
    present: true,
  },
  {
    week: "Week 2",
    course: "Applied Electricity",
    date: "June 11",
    present: false,
  },
  {
    week: "Week 3",
    course: "EMC",
    date: "June 11",
    present: true,
  },
  {
    week: "Week 4",
    course: "Linear Electronics",
    date: "June 11",
    present: false,
  },
];
