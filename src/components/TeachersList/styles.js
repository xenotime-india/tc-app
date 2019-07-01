import { Platform } from 'react-native';
export default {
  avatar: {
    height: 40,
    width: 40,
    borderRadius: Platform.OS === 'android' ? 40 : 20,
  },

  social: {
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
  },
};
