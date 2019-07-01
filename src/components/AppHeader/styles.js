import { Platform } from 'react-native';
import theme from './../../theme/variables/myexpense';

export default {
  background: {
    flex: 1,
    width: null,
    height: null,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  navigation: {
    opacity: 0.8,
    fontSize: 24,
    color: '#FFF',
  },
  titles: {
    container: {
      paddingTop: 10,
      paddingLeft: 0,
      paddingBottom: 10,
      borderWidth: 0,
    },
    content: {
      flexDirection: 'row',
    },
    text: {
      fontSize: 18,
      fontWeight: '800',
      color: '#FFF',
    },
    suffix: {
      fontFamily: 'Roboto_light',
      fontSize: 26,
      opacity: 0.8,
      fontWeight: '100',
      color: '#FFF',
    },
    subTitle: {
      fontFamily: 'Roboto_light',
      paddingTop: 10,
      fontSize: 24,
      opacity: Platform.OS === 'android' ? 0.6 : 0.9,
      fontWeight: '100',
      color: '#FFF',
    },
  },
  searchHeader: {
    container: {
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderRightWidth: 0,
      marginTop: 0,
      marginBottom: 10,
      height: 50,
    },
    content: {
      backgroundColor: theme.brandPrimaryTransparent,
      marginLeft: 0,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: '#db6234',
    },
    input: {
      color: '#FFFFFF',
      paddingLeft: 0,
      paddingRight: 0,
    },
    btnIcon: {
      color: 'rgba(255,255, 255, 0.6)',
    },
  },
};
