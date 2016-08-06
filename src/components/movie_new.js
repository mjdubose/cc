import React, {Component , PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createMovie} from '../actions/index';
import {Link} from 'react-router';

class MovieNew extends Component {
 static contextTypes = {
         router: PropTypes.object
    };
    onSubmit(props){
        this.props.createMovie(props)
        .then(()=>{
         this.context.router.push('/');
        })      
    }

    render() {
        const {fields: {title,actors, genre, year, rating},handleSubmit} = this.props;

        return (
            <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}><h3> Create A New Movie</h3>
                <div className = {`form-group ${title.touched && title.invalid ? 'has-danger' : ''} `}>
                    <label>Title</label>
                    <input type = "text" className="form-control" {...title}/>
                    <div className='text-help'>
                    {title.touched ? title.error : ''}
                    </div>
                </div>
                <div className ={`form-group ${genre.touched && genre.invalid ? 'has-danger' : ''} `}>
                    <label>Genre</label>
                    <input type = "text" className="form-control" {...genre}/>
                      <div className='text-help'>
                    {genre.touched ? genre.error : ''}
                    </div>
                </div>
                <div className ={`form-group ${actors.touched && actors.invalid ? 'has-danger' : ''} `}>
                    <label>Actors</label>
                    <textarea  className="form-control" {...actors} />
                      <div className='text-help'>
                    {actors.touched ? actors.error : ''}
                    </div>
                </div>
                 <div className ={`form-group ${year.touched && year.invalid ? 'has-danger' : ''} `}>
                    <label>The Year The Movie Was Made</label>
                    <input type = "text" className="form-control" {...year}/>
                      <div className='text-help'>
                    {year.touched ? year.error : ''}
                    </div>
                </div>
                <div className ={`form-group ${rating.touched && rating.invalid ? 'has-danger' : ''} `}>
                    <label>The Movie Rating</label>
                    <input type = "text" className="form-control" {...rating}/>
                      <div className='text-help'>
                    {rating.touched ? rating.error : ''}
                    </div>
                </div>
                <div className="button-box">
                  <button type="submit" className = "btn btn-primary">Submit </button>
                  <Link to="/" className="btn btn-danger"> Cancel </Link>
                </div>
            </form>
        )
    }
}

function validate(values){
    const errors ={};
  if(!values.title){
      errors.title = 'Enter a title';
  }
  if(!values.genre){
      errors.genre = 'Enter a genre';
  }
  if (!values.year){
      errors.year = 'Enter some year';
  }
    if(!values.actors   ){
        errors.actors = 'Enter an actor';
    }
    if (!values.rating){
        errors.rating = 'Enter a rating';
    }

    return errors;
}
// connect first argument is mapstatetoprops, second is mapdispatchtoprops
//reduxform is form config, second is mapstatetoprops, third is mapdispatchtoprops
export default reduxForm({
    form: 'PostsNew',
    fields: ['title', 'genre', 'actors','year','rating'],validate
},null,{createMovie})(MovieNew);