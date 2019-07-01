import theme from './../../theme/variables/myexpense';

export default {
  item: {
    content: {
      flex: 1,
      elevation: 0,
      flexDirection: 'column',
      paddingTop: 20,
      paddingBottom: 20,
      paddingRight: 10,
      paddingLeft: 10,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderRadius: 0,
      backgroundColor: '#fff',
    },
    icon: {
      color: '#BBBBBE',
      fontSize: 17,
      margin: 0,
    },
    title: {
      fontSize: 17,
      color: '#444',
      marginLeft: 15,
    },
    iconContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    subtitleContainer: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 10,
    },
    subtitle: {
      paddingLeft: 5,
      fontSize: 11,
      color: '#777',
    },
    subtitleWithIcon: {
      fontSize: 10,
      color: '#777',
      margin: 5,
    },
    expenseAmount: {
      fontSize: 14,
      color: theme.brandPrimary,
      alignSelf: 'flex-end',
    },
    incomeAmount: {
      fontSize: 14,
      color: theme.brandSuccess,
      alignSelf: 'flex-end',
    },
    swipeBtn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
};
