import fetchWithAuth from "./fetchWithAuth";
import { API_URL } from "@env";
import { CarouselProps } from "../utils/types";

export const fetchAttendanceData = async (
  courses: { value: string; label: string }[]
) => {
  const attendanceData: CarouselProps[] = [];

  for (const course of courses) {
    try {
      const response = await fetchWithAuth(
        `${API_URL}/student/attendance?course_code=${course.value}&course_name=${course.label}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch attendance data");
      }
      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        // console.warn(`No attendance data for course: ${course.label}`);
        continue; // Skip to the next course
      }

      // Assuming we want to use the latest week's data
      const latestWeek = data[data.length - 1];

      if (
        !latestWeek ||
        typeof latestWeek !== "object" ||
        !("week" in latestWeek)
      ) {
        console.warn(`Invalid data structure for course: ${course.label}`);
        continue; // Skip to the next course
      }

      attendanceData.push({
        courseId: course.value,
        courseName: course.label,
        week: latestWeek.week,
        attendance: latestWeek.attendance,
        attendanceFraction: latestWeek.attendance_fraction,
        code: latestWeek.code,
      });
    } catch (error) {
      console.error(
        `Failed to fetch attendance data for ${course.label}:`,
        error
      );
    }
  }

  return attendanceData;
};
