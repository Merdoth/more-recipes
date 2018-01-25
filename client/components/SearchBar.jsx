import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputLine from './common/InputLine.jsx';
import Button from './common/Button.jsx';
import { getTopRecipes } from '../actions/recipeActions/';

/**
 * @description this class return an SearchBar component
 * @class  SearchBar
 * @extends {Component}
 */
class SearchBar extends Component {
  /**
   * Creates an instance of SearchBar.
   * @param {any} props
   * @memberof SearchBar
   */
  constructor(props) {
    super(props);

    this.getRecipes = this.getRecipes.bind(this);
  }
  /**
   * @param {any} props
   * @memberof SearchBar
   * @returns { void }
   */
  getRecipes() {
    this.props.getTopRecipes();
  }
  /**
   * @returns { void }
   * @memberof SearchBar
  */
  render() {
    return (
      <div className="search-bar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <form>
                <div className="form-row text-center">
                  <InputLine
                    type="text"
                    className="form-control Enter"
                    placeholder="Enter search input"
                  />
                  <span className="input-group-button">
                    <Button
                      onClick={this.getRecipes}
                      className="btn hit"
                      type="button"
                      name="Search"
                    />
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ topRecipes: state.topRecipes });

export default connect(mapStateToProps, { getTopRecipes })(SearchBar);
