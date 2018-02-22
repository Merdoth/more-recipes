import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history';

/**
 *
 * @class Search
 *
 * @extends { Component }
 *
 * @returns {void}
 */
export class SearchForm extends Component {
  /**
   *
   * @param { Object } props
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
 * @param { Object } event
 *
 * @returns { undefined }
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param { Object } event
   *
   * @returns { undefined }
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
  *
  * @param { Object } event
  * @param { Object } callback
  *
  * @returns { undefined }
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
