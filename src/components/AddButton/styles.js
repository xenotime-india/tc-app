import { Easing } from 'react-native';
import theme from './../../theme/variables/myexpense';

// Layout constants
export const center = {
  top: 0,
  left: 10,
};

export const topCenter = {
  top: -90,
  left: 10,
};

export const topLeft = {
  top: -60,
  left: -40,
};

export const topRight = {
  top: -60,
  left: 60,
};

// Style constants
export const bigBubbleSize = 60;
export const smallBubbleSize = 40;
export const bubbleColor = theme.brandPrimary;

// Animate Constants
export const animateTime = 800;
export const easingType = Easing.out(Easing.exp);
export const delay = 200;
