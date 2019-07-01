import { Platform } from 'react-native';

import theme from './../../theme/variables/myexpense';

const IS_IPHONE_X = true;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

export default {
  header: {
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      marginTop: 20,
      marginBottom: 30,
    },
    navigation: {
      opacity: 0.8,
      fontSize: 24,
      color: '#FFF',
    },
    title: {
      fontFamily: 'Roboto_light',
      fontSize: 32,
      color: '#FFF',
      paddingLeft: 20,
    },
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: Platform.OS === 'android' ? 40 : 20,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontFamily: 'Roboto_medium',
    fontSize: 18,
  },
  content: {
    backgroundColor: '#FFF',
  },
  separator: {
    borderColor: '#EDEDED',
    borderWidth: 0,
    borderTopWidth: 0.8,
  },
  profile: {
    container: {
      alignSelf: 'center',
      paddingTop: 10,
      marginBottom: 15,
    },
    avatar: {
      alignSelf: 'center',
      marginTop: 20,
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    title: {
      fontFamily: 'Roboto_light',
      alignSelf: 'center',
      fontSize: 28,
      color: '#FFF',
    },
    subTitle: {
      fontFamily: 'Roboto_light',
      alignSelf: 'center',
      paddingTop: 10,
      fontSize: 24,
      opacity: Platform.OS === 'android' ? 0.6 : 0.95,
      fontWeight: '100',
      color: '#FFF',
    },
  },
  overview: {
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 10,
      backgroundColor: '#FAFAFB',
    },
    column: {
      alignSelf: 'center',
      justifyContent: 'center',
    },
    title: {
      alignSelf: 'center',
      fontSize: 24,
      marginBottom: 5,
    },
    subtitle: {
      color: 'gray',
      fontSize: 14,
      fontWeight: '200',
      alignSelf: 'center',
      paddingBottom: 0,
    },
    marker: {
      alignSelf: 'center',
      borderWidth: 2,
      paddingTop: 0,
      marginTop: 10,
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
  contact: {
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 15,
      marginBottom: 15,
      paddingLeft: 10,
      backgroundColor: '#FFF',
    },
    icon: {
      color: theme.brandSuccess,
      fontSize: 30,
    },
    nameColumn: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    nameText: {
      color: 'gray',
      fontSize: 14,
      fontWeight: '200',
    },
    valueColumn: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: 5,
    },
    valueText: {
      fontSize: 16,
    },
  },
  social: {
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 30,
      paddingRight: 30,
    },
    icon: {
      alignSelf: 'center',
      fontSize: 24,
      marginBottom: 5,
      color: '#777',
    },
  },
};
