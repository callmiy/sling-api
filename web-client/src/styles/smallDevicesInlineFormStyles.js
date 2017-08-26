// @flow
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  Input: {
    display: 'flex',
    '@media(max-width: 500px)': {
      flexDirection: 'column',
    },
  },

  buttons: {
    '@media(max-width: 500px)': {
      marginTop: '10px',
    },
  },
});

export default styles;
