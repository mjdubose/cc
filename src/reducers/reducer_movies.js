import {FETCH_MOVIES, FETCH_MOVIE } from '../actions/index';
const INTITIAL_STATE = { all: [], post: null };

export default function (state = INTITIAL_STATE, action) {
    var post = state.post;
    var all = state.all;

    switch (action.type) {
        case FETCH_MOVIE:
            return { post: action.payload.data, all: all };
        case FETCH_MOVIES:
      
            return { post: post, all: action.payload.data };
        default:
            return state;
    }
}