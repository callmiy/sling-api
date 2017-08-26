import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    overflowY: 'auto',
  },

  hideNavBarSmallDevice: {
    '@media(max-width: 576px)': {
      display: 'none',
    },
  },

  showNavBarSmallDevice: {
    '@media(max-width: 576px)': {
      display: 'flex',
    },
  },
});
