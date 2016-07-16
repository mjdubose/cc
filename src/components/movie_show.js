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
        return (<div>
            <Link to="/">Back To Index </Link>
            <button className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this) }>
                Delete Post
            </button>
            <h3>{post.title}</h3>
            <h6>Genre: {post.genre}</h6>
            <h6>Year: {post.year}</h6>
            <h6>Rating: {post.rating}</h6>
            <h6>Actors: {post.actors}</h6>
        </div>);
    }
}
function mapStateToProps(state) {
    return {post: state.posts.post};
}

export default connect(mapStateToProps, {fetchMovie, deleteMovie})(MovieShow);