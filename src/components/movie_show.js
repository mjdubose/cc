import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {fetchMovie, deleteMovie} from "../actions/index";
import {Link} from "react-router";

class MovieShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        this.props.fetchMovie(this.props.params.id);
    }

    onDeleteClick() {
        this.props.deleteMovie(this.props.params.id)
            .then(() => {
                this.context.router.push('/');
            })
    }

    render() {

        if (!this.props.post) {
            return <div>Loading....</div>
        }
        const post = this.props.post[0];
        return (<div className="movie-show-box">
            <Link className="back-link" to="/">Back To Index</Link>
            <h3 className="show-title">{post.title}</h3>
            <h6 className="show-field">Genre: {post.genre}</h6>
            <h6 className="show-field">Year: {post.year}</h6>
            <h6 className="show-field">Rating: {post.rating}</h6>
            <h6 className="show-field">Actors: {post.actors}</h6>
            <button className="btn btn-danger"
                onClick={this.onDeleteClick.bind(this) }>
                Delete Post
            </button>
        </div>);
    }
}
function mapStateToProps(state) {
    return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchMovie, deleteMovie })(MovieShow);