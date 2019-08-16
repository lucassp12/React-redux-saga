import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as FavoritesActions } from "../../store/ducks/favorites";

class Main extends Component {
  static propTypes = {
    addFavoriteRequest: PropTypes.func.isRequired,
    favorites: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          avatar: PropTypes.string,
          description: PropTypes.string,
          url: PropTypes.string
        })
      )
    }).isRequired
  };

  state = {
    repositoryInput: ""
  };
  handleAddRepository = e => {
    e.preventDefault();
    this.props.addFavoriteRequest(this.state.repositoryInput);

    this.setState({ repositoryInput: "" });
  };
  render() {
    return (
      <Fragment>
        <div className="form">
          <form onSubmit={this.handleAddRepository}>
            <input
              placeholder="Usuario/repositorio"
              value={this.state.repositoryInput}
              onChange={e => this.setState({ repositoryInput: e.target.value })}
            />
            <button type="submit">Adicionar</button>

            {this.props.favorites.loading && (
              <span className="loading">Carregando...</span>
            )}
            {!!this.props.favorites.error && (
              <span className="error">{this.props.favorites.error}</span>
            )}
          </form>
        </div>
        <div className="content-favorite">
          <ul>
            {this.props.favorites.data.map(favorite => (
              <div className="favorite">
                <li key={favorite.id}>
                  <img src={favorite.avatar} />
                  <strong>{favorite.name}</strong>
                  <p>{favorite.description}</p>
                  <a href={favorite.url}>Acessar</a>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FavoritesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
