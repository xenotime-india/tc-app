import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  List,
  FlatList,
} from 'react-native';
import { Popover, PopoverController } from 'react-native-modal-popover/lib';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import _ from 'lodash';

const initialState = {
  selectedValue: null,
  showAddressEditOption: false,
  loading: true,
  options: [],
  error: null,
};

export default class Dropdown extends React.Component {
  state = initialState;
  mounted = true;
  componentWillUnmount() {
    this.mounted = false;
  }

  getSelectedValue = (formValues = {}) => {
    const { defaultValue, fieldName } = this.props;
    return formValues[fieldName]
      ? formValues[fieldName] || formValues[fieldName].value
      : defaultValue;
  };

  renderRow = closePopover => ({ item }, key) => {
    const rowData = item;
    const { shouldShowModal, fieldName, nestedFlatlist } = this.props;
    return (
      <TouchableHighlight
        underlayColor="cornflowerblue"
        key={key || rowData.value}
        onPress={this.onDropDownValueSelect(
          rowData,
          shouldShowModal,
          closePopover
        )}>
        {fieldName === 'filterPresets' ? (
          <View style={[styles.dropdownRowDelete]}>
            <View style={{ flex: 5 }}>
              <Text style={[styles.dropdownRowTextWithDelete]}>
                {rowData.label}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this.deleteFilterOption(rowData)}>
                <MaterialCommunityIcons
                  name="delete"
                  size={24}
                  color="#2B72CC"
                />
              </TouchableOpacity>
              ;
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.dropdownRow,
              nestedFlatlist ? styles.dropdownRowBorder : {},
            ]}>
            <Text style={[styles.dropdownRowText]}>{rowData.label}</Text>
          </View>
        )}
      </TouchableHighlight>
    );
  };

  deleteFilterOption = rowData => () => {
    const { deleteFilter } = this.props;
    deleteFilter(rowData);
  };

  onDropDownValueSelect = (item, shouldShowModal, closePopover) => () => {
    const { onValueChange, fieldName } = this.props;
    this.setState({ selectedValue: item.label });
    if (onValueChange) {
      onValueChange(fieldName, true)(item);
    }
    closePopover();
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };
  openPickerAndSetFocusValue = openPopover => () => {
    const { focusedElement } = this.props;
    if (focusedElement && focusedElement.blur) focusedElement.blur();
    openPopover();
  };

  render() {
    const {
      defaultValue,
      placeholderText,
      value,
      placement,
      inputStyle,
      fieldName,
      nestedFlatlist,
      disbleBtnTouch,
      dropdownModifiedStyle,
      popoverStyle,
      placeholderTextStyle,
      disablePlaceholderTextStyle,
    } = this.props;

    const placeholderStyle = placeholderTextStyle || styles.placeholderText;
    const disablePlacholderStyle =
      disablePlaceholderTextStyle || styles.disableText;

    const { options, selectedValue } = this.state;
    let selectedTextStyle;

    let selectedText =
      selectedValue && selectedValue !== ''
        ? selectedValue
        : defaultValue || placeholderText || 'Please Select';
    selectedTextStyle = selectedValue ? styles.selectedText : placeholderStyle;

    let finalValue = selectedText || '';
    finalValue = typeof finalValue === 'object' ? finalValue.label : finalValue;

    return (
      <View style={[styles.popoverController]}>
        <PopoverController>
          {({
            openPopover,
            closePopover,
            popoverVisible,
            setPopoverAnchor,
            popoverAnchorRect,
          }) => (
            <React.Fragment>
              <TouchableOpacity
                style={[
                  dropdownModifiedStyle
                    ? [dropdownModifiedStyle, styles.dropdownModified]
                    : styles.pickerView,
                  !isFormEditable ? styles.disableInput : inputStyle || {},
                ]}
                onPress={this.openPickerAndSetFocusValue(openPopover)}
                disabled={!isFormEditable}>
                <Text
                  numberOfLines={1}
                  style={[
                    !isFormEditable
                      ? disablePlacholderStyle
                      : selectedTextStyle,
                  ]}
                  ref={setPopoverAnchor}>
                  {finalValue}
                </Text>
              </TouchableOpacity>

              <Popover
                contentStyle={[styles.content, popoverStyle]}
                arrowStyle={styles.arrow}
                backgroundStyle={styles.background}
                visible={popoverVisible}
                onClose={closePopover}
                fromRect={popoverAnchorRect}
                supportedOrientations={['portrait', 'landscape']}
                placement={placement ? placement : 'bottom'}>
                {!this.state.loading && options.length !== 0 && (
                  <View style={styles.container}>
                    {nestedFlatlist &&
                      options.map((item, key) =>
                        this.renderRow(closePopover)({ item }, key)
                      )}
                    {!nestedFlatlist && (
                      <FlatList
                        data={options}
                        ItemSeparatorComponent={this.renderSeparator}
                        renderItem={this.renderRow(closePopover)}
                        style={styles.flatList}
                        keyExtractor={(item, index) => `${index}`}
                      />
                    )}
                  </View>
                )}
                {!this.state.loading && options.length === 0 && (
                  <View
                    style={[
                      styles.container,
                      {
                        flex: 1,
                        width: 250,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}>
                    <Text style={styles.noResultsTextStyle}>
                      No results found
                    </Text>
                  </View>
                )}
                {this.state.loading && (
                  <View
                    style={[
                      styles.container,
                      {
                        flex: 1,
                        width: 250,
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}>
                    <ActivityIndicator size="small" />
                  </View>
                )}
              </Popover>
            </React.Fragment>
          )}
        </PopoverController>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popoverController: {
    flex: 1,
    maxHeight: 36,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 0,
  },
  flatList: {},
  arrow: {
    borderTopColor: 'white',
  },
  background: {
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    width: 280,
    maxHeight: 320,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  pickerView: {
    flexDirection: 'row',
    height: 36,
    borderColor: '#B2B4AE',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 2,
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 35,
    alignItems: 'center',
  },
  dropdownModified: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 2,
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 35,
    alignItems: 'center',
  },
  pickerLblText: {
    color: '#BFBFBF',
    fontSize: 16,
  },
  pickerActiveLblText: {
    color: '#000000',
    fontSize: 16,
  },
  pickerIcon: { position: 'absolute', right: 0, margin: 15 },
  disableText: {
    color: '#ADADAD',
  },
  disableInput: {
    borderColor: '#E2E2E2',
    backgroundColor: '#FAFAFA',
  },
  dropdownRow: {
    flexDirection: 'row',
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  dropdownRowBorder: {
    borderBottomWidth: 1,
    borderColor: '#CED0CE',
  },
  dropdownRowDelete: {
    flexDirection: 'row',
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  dropdownRowText: {
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
  },
  dropdownRowTextWithDelete: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'left',
  },
  selectedText: {
    fontSize: 14,
    color: '#000000',
  },
  placeholderText: {
    fontSize: 14,
    color: '#000000',
  },
  eyeIcon: {
    position: 'absolute',
    right: 28,
    margin: 5,
  },
  noResultsTextStyle: {
    fontSize: 17,
  },
});
