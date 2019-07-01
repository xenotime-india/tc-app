import { Dimensions } from 'react-native';
import theme from './../../theme/variables/myexpense';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: theme.brandPrimary,
  },
  content: {
    backgroundColor: '#ffffff',
  },
  emptyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMsg: {
    color: '#777',
    fontSize: 18,
    alignSelf: 'center',
  },
  categoryBox: {
    justifyContent: 'center',
    height: 130,
    width: deviceWidth / 2 - 10,
    backgroundColor: '#FFF',
    borderColor: '#ddd',
    borderWidth: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 2,
    marginLeft: 6,
    marginBottom: 10,
    marginTop: 10,
    padding: 0,
  },
  categoryBoxItem: {
    justifyContent: 'center',
    backgroundColor: '#ededed',
    flex: 1,
  },
  categoryIcon: {
    fontSize: 26,
    alignSelf: 'center',
    color: '#8E8E93',
  },
  categoryArrowDownIcon: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#8E8E93',
  },
  categoryTitle: {
    fontSize: 14,
    alignSelf: 'flex-end',
    color: '#8E8E93',
    paddingBottom: 15,
  },
  categorySubTitle: {
    fontSize: 12,
    alignSelf: 'center',
    color: '#8E8E93',
    marginLeft: 5,
  },
  categorySubtitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryAmount: {
    fontSize: 22,
    alignSelf: 'flex-end',
    color: '#1D1D26',
  },
  categoryLine: {
    borderTopWidth: 1,
    paddingTop: 10,
    height: 30,
    borderColor: '#8E8E93',
    alignSelf: 'center',
  },
  item: {
    container: {
      flex: 1,
      elevation: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      paddingLeft: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0.3,
      borderBottomColor: '#ddd',
      borderLeftWidth: 0,
    },
  },
};
