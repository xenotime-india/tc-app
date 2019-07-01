import { Dimensions } from 'react-native';
import { verticalScale } from './../../utils/scaling';
import theme from './../../theme/variables/myexpense';

const { height, width } = Dimensions.get('window');

export default {
  modalContainer: {
    alignSelf: 'center',
    width: width * 0.8,
    backgroundColor: theme.colors.whiteColor,
    borderRadius: verticalScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  modalContent: {
    width: '100%',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  titleContainer: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontFamily: 'Roboto_light',
    color: '#454545',
    fontSize: verticalScale(16),
  },
  line: {
    marginTop: '3%',
    width: '100%',
    height: verticalScale(1),
    backgroundColor: theme.colors.grayLinesColor,
  },
  dateContainer: {
    marginTop: '3%',
    width: '100%',
    height: '8%',
  },
  dateStyle: {
    color: theme.colors.darkGrayText,
    fontFamily: theme.fontFamily,
    fontSize: verticalScale(12),
    marginBottom: '3%',
  },
  fullWidth: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '45%',
    height: '100%',
    justifyContent: 'center',
  },
  halfRightWidth: {
    width: '45%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  normalStyle: {
    fontFamily: theme.fontFamily,
    fontSize: verticalScale(14),
  },
  blueFont: {
    fontFamily: theme.fontFamily,
    color: theme.colors.blueColor,
    fontSize: verticalScale(14),
  },
  btnContainer: {
    width: '100%',
    height: '13%',
    marginTop: '5%',
    backgroundColor: theme.colors.textBlueColor,
    borderRadius: verticalScale(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    marginTop: '2%',
    fontFamily: theme.fontFamily,
    fontSize: verticalScale(14),
    color: theme.colors.whiteColor,
  },
};
