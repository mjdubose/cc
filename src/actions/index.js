import axios from'axios';
export const FETCH_MOVIES = 'FETCH_MOVIES';
export const CREATE_MOVIE = 'CREATE_MOVIE';
export const FETCH_MOVIE= 'FETCH_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';

const ROOT_URL = 'http://localhost:3000/movies';

export function movieSearch(term){
 const request = axios.get(`${ROOT_URL}/search?term=${term}`); 
 return {
     type: FETCH_MOVIES,
     payload:request
 }

}

export function createMovie(props){
let buildString = `?genre=${props.genre}&actors=${props.actors}&year=${props.year}&rating=${props.rating}&title=${props.title}`;
const request = axios.post(`${ROOT_URL}/add${buildString}`);
return {
    type: CREATE_MOVIE,
    payload:request
}

}


export function fetchMovie(id){
  
    const request =axios.get(`${ROOT_URL}?id=${id}`);
    return {
        type: FETCH_MOVIE,
        payload: request
    };
}

export function deleteMovie(id){
    const request = axios.delete(`${ROOT_URL}/delete?id=${id}`);
    return {
        type: DELETE_MOVIE,
        payload: request
    };
}