import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history';

/**
 *
 * @class Search
 * @extends {Component}
 *
 * @returns {void}
 */
class SearchForm extends Component {
  /**
   *
   * @param { props } props
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      limit: 6,
      offset: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  /**
 * @param { event } event
 *
 * @returns { state } state
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param { event } event
   *
   * @returns { state } state
   */
  onSubmit(event) {
    event.preventDefault();
    const { name, offset, limit } = this.state;
    history.push({
      pathname: '/searchresults',
      state: {
        name,
        offset,
        limit
      }
    });
  }
  /**
  * @description this function handles enter key
  * @param {any} event
  * @param {any} callback
  * @memberof Dashboard
  * @returns { void }
  */
  handleEnterKey(event, callback) {
    if (event.key === 'Enter') {
      event.preventDefault();
      callback(event);
    }
  }
  /**
   *
   * @memberof Search
   *
   * @returns { undefined }
   */
  render() {
    return (
      <form className="form-inline my-2 my-lg-0 float-menuitem-right">
        <input
          className="form-control mr-sm-2 search"
          type="search"
          name="name"
          value = {this.state.name}
          onChange={this.onChange}
          placeholder="Search"
          aria-label="Search"
          onKeyPress={(event) => { this.handleEnterKey(event, this.onSubmit); }}
        />
      </form>
    );
  }
}
const mapStateToProps = state => ({
  recipes: state.search.recipe.rows || [],
  pagination: state.search.responsedata || {}
});
export default connect(mapStateToProps)(SearchForm);
