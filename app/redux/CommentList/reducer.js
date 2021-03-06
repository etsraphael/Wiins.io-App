import { initialState } from './state';
import * as ActionTypes from './constants';

export default CommentListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_COMMENT_LIST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.GET_COMMENT_LIST_SUCCESS: {
      return {
        ...state,
        commentList: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_COMMENT_LIST_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.SEND_COMMENT_SUCCESS: {
      return {
        ...state,
        commentList: state.commentList.concat(action.payload)
      }
    }
    case ActionTypes.SEND_ANSWER_SUCCESS: {
      const found = state.commentList.map(x => x._id).indexOf(action.payload.baseComment)

      if (!state.commentList[found].responseList) {
        state.commentList[found].responseList = [action.payload]
      } else {
        state.commentList[found].responseList = [ ...state.commentList[found].responseList, action.payload]
      }
      return {
        ...state
      }
    }
    case ActionTypes.LIKE_COMMENT_SUCCESS: {
      const found = state.commentList.map(x => x._id).indexOf(action.id)
      state.commentList[found].liked = true
      ++state.commentList[found].like
      return {
        ...state
      }
    }
    case ActionTypes.UNLIKE_COMMENT_SUCCESS: {
      const found = state.commentList.map(x => x._id).indexOf(action.id)
      state.commentList[found].liked = false
      --state.commentList[found].like
      return {
        ...state
      }
    }
    case ActionTypes.GET_REPONSE_LIST_SUCCESS: {
      const found = state.commentList.map(x => x._id).indexOf(action.id)
      if (!state.commentList[found].responseList) {
        state.commentList[found].responseList = action.results
      } else {
        state.commentList[found].responseList.concat(action.results)
      }
      return {
        ...state
      }
    }
    case ActionTypes.LIKE_RESPONSE_SUCCESS: {
      for (let [i, comment] of state.commentList.entries()) {
        if (!!comment.responseList) {
          responsefound = state.commentList[i].responseList.map(x => x._id).indexOf(action.id)
          if (responsefound !== -1) {
            state.commentList[i].responseList[responsefound].liked = true
            ++state.commentList[i].responseList[responsefound].like
            return {
              ...state
            }
          }
        }
      }
      return {
        ...state
      }
    }
    case ActionTypes.UNLIKE_RESPONSE_SUCCESS: {
      for (let [i, comment] of state.commentList.entries()) {
        if (!!comment.responseList) {
          responsefound = state.commentList[i].responseList.map(x => x._id).indexOf(action.id)
          if (responsefound !== -1) {
            state.commentList[i].responseList[responsefound].liked = false
            --state.commentList[i].responseList[responsefound].like
            return {
              ...state
            }
          }
        }
      }
      return {
        ...state
      }
    }
    case ActionTypes.RESET_COMMENT_LIST: return initialState
    default: return { ...state }
  }
}
