const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const DefaultColor = {
  main: '#008000',
  secondary: '#FFA500',
  white: '#fff',
  black: '#000',
  dark: '#707070',
  grey: '#E7E9EA',
  danger: '#FC0000',
  lightGreen: '#C5E0B4',
  bgList: '#F1EAE0',
}

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
