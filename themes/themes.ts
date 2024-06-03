// theme.ts
export type Theme = {
  colors: {
    bg: string;
    primary: string;
    secondary: string;
  };
};

export const lightTheme: Theme = {
  colors: {
    bg: "#ffffff",
    primary: "#FFC107",
    secondary: "#FF7A00",
  },
};

export const darkTheme: Theme = {
  colors: {
    bg: "#000",
    primary: "gray",
    secondary: "blue",
  },
};
