import React from 'react';
import PropTypes from 'prop-types';
import { Button, View, Item, Icon, Input } from 'native-base';
import { Formik } from 'formik';

import styles from './styles';

class SearchHeader extends React.Component {
  onSearchAction = values => {
    const { onSearch } = this.props;
    onSearch(values.query);
  };

  onClearAction = resetForm => () => {
    const { onSearch } = this.props;
    onSearch('');
    resetForm({ query: '' });
  };

  render() {
    return (
      <View style={styles.searchHeader.container}>
        <Formik
          initialValues={{ query: this.props.filterText || '' }}
          onSubmit={values => this.onSearchAction(values)}
          onReset={({ resetForm }) => this.onClearAction(resetForm)}>
          {props => (
            <Item style={styles.searchHeader.content}>
              {props.values.query !== '' && (
                <Button
                  transparent
                  onPress={this.onClearAction(props.resetForm)}
                  style={{ paddingTop: 13 }}>
                  <Icon
                    style={{
                      ...styles.searchHeader.btnIcon,
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                    name="close-circle-outline"
                  />
                </Button>
              )}
              {props.values.query === '' && (
                <Button transparent style={{ width: 38 }} />
              )}
              <Input
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                style={styles.searchHeader.input}
                placeholder="Search"
                onChangeText={props.handleChange('query')}
                value={props.values.query}
                onSubmitEditing={props.handleSubmit}
                returnKeyType="search"
                spellCheck={false}
                autoCorrect={false}
                underlineColorAndroid="transparent"
                clearTextOnFocus
                autoCapitalize="none"
              />
              <Button
                transparent
                onPress={props.handleSubmit}
                style={{ paddingTop: 13 }}>
                <Icon style={styles.searchHeader.btnIcon} name="search" />
              </Button>
            </Item>
          )}
        </Formik>
      </View>
    );
  }
}

SearchHeader.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchHeader;
