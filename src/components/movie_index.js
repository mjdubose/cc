import React, {Component} from 'react';
import {connect} from 'react-redux';
import {movieSearch} from '../actions/index';
import {Link } from 'react-router';

class MovieIndex extends Component {

  componentWillMount() {
    this.props.movieSearch('');
  }

  renderMovies() {

    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key = {post.movie_id}>
          <Link to={"movies/" + post.movie_id}>
            <strong className="movie-name-two">{post.title}</strong>
            <span className="movie-genre-two">{post.genre}</span>
          </Link>
        </li>
      )
    })
  }

  render() {

    return (
      <div>
        <div className="index-header">
          <div className="search-bar text-xs-left">
            <input placeholder="search by name" onChange={(event) => this.props.movieSearch(event.target.value) } />
          </div>
          <div className ="add-movie-button">
            <Link to ="/movies/new" className="btn btn-primary">Add a Post </Link>
          </div>
        </div>
        <div className="movies-list">
          <div className="movie-info">
            <h1>Movies</h1>
            <div className="movie-name-genre">
              <h2 className="movie-name">Movie Name</h2>
              <h2 className="movie-genre">Movie Genre</h2>
            </div>
          </div>
          <ul className="list-group">
            {this.renderMovies() }
          </ul>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return { posts: state.posts.all };
}
export default connect(mapStateToProps, { movieSearch })(MovieIndex);