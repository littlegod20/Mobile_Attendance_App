import { CarouselProps } from "./types";

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

export const programme = [
  {
    label: "Telecommunication Engineering",
    value: "Telecommunication Engineering",
  },
  { label: "Computer Engineering", value: "Computer Engineering" },
  { label: "Electrical Engineering", value: "Electrical Engineering" },
  { label: "Biomedical Engineering", value: "Biomedical Engineering" },
];

export const yearOfStudy = [
  { label: "First Year", value: "1" },
  { label: "Second Year", value: "2" },
  { label: "Third Year", value: "3" },
  { label: "Fourth Year", value: "4" },
];

export const faculty = [
  {
    label: "Faculty of Computer & Electrical Engineering",
    value: "Faculty of Computer & Electrical Engineering",
  },
  { label: "Faculty of Science", value: "Faculty of Science" },
  {
    label: "Faculty of Mechanical & Automobile",
    value: "Faculty of Mechanical & Automobile",
  },
];
