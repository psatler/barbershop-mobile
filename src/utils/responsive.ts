// https://dev.to/newbiebr/how-to-make-your-react-native-apps-responsive-45d8
import { Dimensions, PixelRatio, Platform } from 'react-native';

// Retrieving initial screen's height and width
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// based on iPhone 8's scale
// const wscale: number = screenWidth / 375;
// const hscale: number = screenHeight / 667;

// // based on iphone X's scale
const wscale = screenWidth / 375;
const hscale = screenHeight / 812;

export function normalize(
  size: number,
  based: 'width' | 'height' = 'width',
): number {
  const newSize = based === 'height' ? size * hscale : size * wscale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
