// Onboarding screens
export type OnboardingScreenItem = {
  key: string;
  img: any;
  title: string;
  description: string;
};

export const ONBOARDING_SCREENS: OnboardingScreenItem[] = [
  {
    key: "1",
    img: require("../assets/images/facial_recognition.png"),
    title: "Easy Attendance Checker",
    description:
      "A facial recognition feature to make attendance taking much simpler",
  },
  {
    key: "2",
    img: require("../assets/images/time_table.png"),
    title: "Check Your Time Table",
    description:
      "Time table to check any of your previous and upcoming lectures",
  },
  {
    key: "3",
    img: require("../assets/images/records.png"),
    title: "View Attendance Records",
    description: "You can view your records as a student or lecturer.",
  },
];

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#000",
    background: "transparent",
    tint: tintColorLight,
    // icon: '#'
    tabIconDefault: "#fff",
    tabIconSelected: tintColorLight,
    inputBorder: "#FF7A00",
    button: "#DC924D",
    buttonText: "#ffff",
  },
  dark: {
    text: "#000",
    background: "transparent",
    tint: tintColorLight,
    // icon: '#'
    tabIconDefault: "#fff",
    tabIconSelected: tintColorLight,
    inputBorder: "#FF7A00",
    button: "#DC924D",
    buttonText: "#ffff",
  },
};
