import { initialState } from './state'
import * as ActionTypes from './constants'

export default PublicationsDiscoverReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PUBLICATIONS: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.GET_PUBLICATIONS_SUCCESS: {
      return {
        ...state,
        publications: state.publication.concat(action.payload),
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_PUBLICATIONS_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.LIKE_PUBLICATIONS_DISCOVER_SUCCESS: {
      const found = state.publication.map(x => x._id).indexOf(action.id)
      state.publication[found].like.isLike = true
      ++state.publication[found].like.likeNumber
      return { 
        ...state
      }
    }
    case ActionTypes.UNLIKE_PUBLICATIONS_DISCOVER_SUCCESS: {
      const found = state.publication.map(x => x._id).indexOf(action.id)
      state.publication[found].like.isLike = false
      --state.publication[found].like.likeNumber
      return { 
        ...state
      }
    }
    case ActionTypes.RESET_PUBLICATIONS: return initialState
    default: return state
  }
}