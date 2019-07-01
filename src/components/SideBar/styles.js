import { Platform } from 'react-native';
import theme from './../../theme/variables/myexpense';

export default {
  header: {
    container: {
      marginTop: 23,
      backgroundColor: theme.brandPrimary,
    },
    icon: {
      color: '#D8D8D8',
      fontSize: 26,
    },
    avatar: {
      height: 40,
      width: 40,
      borderRadius: Platform.OS === 'android' ? 40 : 20,
    },
  },
  content: {
    paddingTop: Platform.OS === 'android' ? 20 : 30,
    backgroundColor: theme.brandPrimary,
  },
  menuItem: {
    container: {
      borderColor: 'rgba(29, 29, 38, 0.1)',
      marginLeft: 0,
    },
    selected: {
      backgroundColor: '#F8F8F8',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      padding: 15,
    },
    title: {
      fontFamily: 'Roboto_light',
      color: '#FFF',
    },
    icon: {
      textAlign: 'center',
      width: 30,
      marginRight: 10,
      color: '#FFF',
      fontSize: Platform.OS === 'android' ? 25 : 22,
    },
  },
  footerAppTitleText: {
    color: '#ffffff',
    fontSize: 12,
    marginBottom: 24,
    borderBottomWidth: 0.8,
    borderColor: 'rgba(29, 29, 38, 0.2)',
  },
};
