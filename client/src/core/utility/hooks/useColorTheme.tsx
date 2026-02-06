import { useMantineColorScheme } from '@mantine/core';

export const useColorTheme = () => {
  const { colorScheme } = useMantineColorScheme();

  //here type is any as some components props only recieve number or  only string
  function setThemeColor(darkModeValue: any, lightModeValue: any) {
    return colorScheme === 'dark' ? darkModeValue : lightModeValue;
  }
  return { setThemeColor };
};
