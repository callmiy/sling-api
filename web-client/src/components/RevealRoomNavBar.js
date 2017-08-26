// @flow
import React from 'react';
import Media from 'react-media';
import { Icon } from 'semantic-ui-react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  toggle: {
    cursor: 'pointer',
  },

  red: {
    color: 'red',
  },

  white: {
    color: 'white',
  },
});

type Props = {
  shouldRevealNavBar: boolean,
  onRevealNavBarClick: () => void,
  styles: Object,
}

const RevealRoomNavBar = (props: Props) => {
  const {
    shouldRevealNavBar,
    onRevealNavBarClick,
    styles: componentStyles,
  } = props;
  return (
    <Media
      query="(max-width: 576px)"
      render={() => (
        <div style={componentStyles}>
          {shouldRevealNavBar
             ? <Icon
               name="toggle off"
               className={css(styles.toggle, styles.white)}
               onClick={onRevealNavBarClick}
             />
              : <Icon
                name="toggle on"
                className={css(styles.toggle, styles.red)}
                onClick={onRevealNavBarClick}
              />}
        </div>
      )}
    />
  );
};

export default RevealRoomNavBar;
