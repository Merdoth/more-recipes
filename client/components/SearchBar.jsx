import React from 'react';
import { connect } from 'react-redux';
import InputLine from './common/InputLine.jsx';
import Button from './common/Button.jsx';
import { getTopRecipes } from '../actions/recipeActions/recipeActions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.getRecipes = this.getRecipes.bind(this);
  }
  getRecipes() {
    this.props.getTopRecipes();
  }

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
