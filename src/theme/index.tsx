import { extendTheme } from '@chakra-ui/react';
import breakpoints from './breakpoints';
import { colors } from './colors';
import { montserrat } from '@/styles/font';

const theme = extendTheme({
  fonts: {
    heading: montserrat.style.fontFamily,
    body: montserrat.style.fontFamily,
  },
  breakpoints,
  colors,
});

export default theme;
