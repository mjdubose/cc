import React, {Component} from 'react';
import {connect} from 'react-redux';
import {movieSearch} from '../actions/index'; 
import {Link } from 'react-router';
class MovieIndex extends Component {
    componentWillMount() {
        this.props.movieSearch('');
    }
    renderMovies() {
        
       return this.props.posts.map((post)=>{
           return <li className="list-group-item" key = {post.movie_id}>
           <Link to={"movies/"+post.movie_id}> 
           <span className="pull-xs-right">{post.genre}</span>
           <strong>{post.title}</strong>
           </Link>
           </li>
       }) 
    }
    render() {
         
        return (           
            <div>
            <div className = "text-xs-left"> <div className = "search-bar"> <input 
            
            onChange={(event) => this.props.movieSearch( event.target.value ) } />
        </div> </div>
            <div className ="text-xs-right"> <Link to ="/movies/new" className="btn btn-primary">Add a Post </Link> </div>
            <h3> Movies</h3>
            <ul className="list-group">
            {this.renderMovies()}
            </ul>
             </div>
        )
    }
}
function mapStateToProps(state) {
    return {posts: state.posts.all};
}
export default connect(mapStateToProps,{movieSearch})(MovieIndex);