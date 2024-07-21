import { KeyboardTypeOptions } from "react-native";
import { UserRegistrationData } from "../components/UserRegistrationData";

export interface CarouselProps {
  id?: number;
  title?: string;
  time?: string;
  courseId?: string;
  courseName?: string;
  week?: string;
  attendance?: number;
  attendanceFraction?: number;
  code?: string;

  // lecturer fields
  average_attendance?: number;
  course_code?: string;
  course_name?: string;
  total_attendance?: number;
  total_sessions?: number;
  total_students?: number;
}

export interface CourseData {
  course_name: string;
  course_code: string;
}

export interface CardData {
  week: string;
  course: string;
  date: string;
  present: boolean;
}

export interface WeeksProps {
  week: string;
  attendance: string;
  code?: string;
  attendance_fraction?: number;
}

export interface Option {
  label: string;
  value: string;
}

export interface User {
  email?: string;
  faculty?: string;
  name?: string;
  programme?: string;
  role?: string;
  school_id?: string;
  year?: string;
  password?: string;
}

export interface InputConfig {
  name: string | keyof UserRegistrationData;
  placeholder: string | undefined;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  multiline?: boolean;
}
