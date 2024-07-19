import fetchWithAuth from "./fetchWithAuth";
import { API_URL } from "@env";
import { CarouselProps } from "../utils/types";

export const fetchAttendanceData = async (): Promise<CarouselProps[]> => {
  try {
    const response = await fetchWithAuth(
      `${API_URL}/student/recent-attendance`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch recent attendance data");
    }
    const data = await response.json();
    return data.map((item: any) => ({
      courseId: item.courseId,
      courseName: item.courseName,
      attendanceFraction: item.attendanceFraction,
      attendance: item.attendance,
      week: item.week,
      timestamp: new Date(item.timestamp).toLocaleString(),
    }));
  } catch (error) {
    console.error("Failed to fetch recent attendance data:", error);
    return [];
  }
};
