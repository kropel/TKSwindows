import React, { FC, PropsWithChildren, useState } from 'react';

export interface IThemeInit {
  menuColor?: string;
  menuBackgroundColor?: string;
  menuBackgroundGradient?: string;
  titleColor?: string;
  titleMenuBackgroundColor?: string;
  titleMenuBackgroundGradient?: string;
  stress?: string;
}

const themeInit = {
  menuColor: '#ffffff',
  menuBackgroundColor: '#0f4336',
  menuBackgroundGradient:
    'linear-gradient(45deg, rgba(15,67,54,0.88) 0%, rgba(15,67,54,1) 8%, rgba(13,57,46,1) 11%, rgba(15,67,54,1) 19%, rgba(12,51,41,1) 34%, rgba(14,63,51,0.97) 82%, rgba(15,66,53,1) 92%,rgba(15,67,54,0.95) 100%)',
  titleColor: '#ffffff',
  titleMenuBackgroundColor: '#0f4336',
  titleMenuBackgroundGradient:
    'linear-gradient(45deg, rgba(15,67,54,0.87) 0%, rgba(15,67,54,1) 8%, rgba(13,57,46,1) 11%, rgba(15,67,54,1) 19%, rgba(12,51,41,1) 60%, transparent 65%)',
  stress: '#ffffff', //'#f50057'
};

interface TThemeProp {
  menuColor?: string;
  titleColor?: string;
  menuBackgroundColor?: string;
  titleMenuBackgroundColor?: string;
  stress?: string;
}

export const ThemeContext = React.createContext({
  theme: themeInit,
  setTheme: (themeProp: TThemeProp) => {},
  reset: () => {},
});

const hexToRGB = (h: string) => {
  let r = '',
    g = '',
    b = '';

  // 3 digits
  if (h.length === 4) {
    r = '0x' + h[1] + h[1];
    g = '0x' + h[2] + h[2];
    b = '0x' + h[3] + h[3];

    // 6 digits
  } else if (h.length === 7) {
    r = '0x' + h[1] + h[2];
    g = '0x' + h[3] + h[4];
    b = '0x' + h[5] + h[6];
  }

  return +r + ',' + +g + ',' + +b;
};

const getGradient = (hex: string, half = false): string => {
  const color = hexToRGB(hex);
  return half
    ? `linear-gradient(45deg, rgba(${color},0.85) 0%, rgba(${color},1) 8%, rgba(${color},0.95) 11%, rgba(${color},1) 19%, rgba(${color},0.95) 60%, transparent 65%)`
    : `linear-gradient(45deg, rgba(${color},0.85) 0%, rgba(${color},1) 8%, rgba(${color},0.95) 11%, rgba(${color},1) 19%, rgba(${color},0.95) 34%, rgba(${color},0.98) 82%, rgba(${color},1) 92%, rgba(${color},0.85) 100%)`;
};

export const ThemeContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [theme, setTheme] = useState(themeInit);

  const setCurrentTheme = (themeProp: TThemeProp) => {
    const key: keyof TThemeProp = Object.keys(themeProp)[0] as keyof TThemeProp;
    let themeCurrent: { [key: string]: string } = {};

    if (key === 'menuBackgroundColor') {
      themeCurrent[key] = `${themeProp[key]}`;
      themeCurrent['menuBackgroundGradient'] = getGradient(themeProp[key]!);
    } else if (key === 'titleMenuBackgroundColor') {
      themeCurrent[key] = `${themeProp[key]}`;
      themeCurrent['titleMenuBackgroundGradient'] = getGradient(themeProp[key]!, true);
    } else {
      themeCurrent[key] = `${themeProp[key]}`;
    }
    console.log(themeCurrent);
    console.log(theme);
    setTheme({ ...theme, ...themeCurrent });
  };

  const resetValues = () => {
    setTheme(themeInit);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setCurrentTheme, reset: resetValues }}>
      {children}
    </ThemeContext.Provider>
  );
};
