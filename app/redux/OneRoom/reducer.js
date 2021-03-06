import { initialState } from './state';
import * as ActionTypes from './constants'

export default RoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ROOM_BY_ID: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.LOAD_OLD_MESSAGE_SUCCESS: {
      state.room.message = state.room.message.concat(action.payload.message)
      state.room.nbMessage = action.payload.nbMessage
      return {
        ...state,
        isLoading: false,
      }
    }
    case ActionTypes.GET_ROOM_BY_ID_SUCCESS: {
      return {
        ...state,
        room: action.payload,
        isLoading: false,
        page: 1,
        error: null,
      }
    }
    case ActionTypes.GET_ROOM_BY_ID_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.SEND_MESSAGE: {
      state.room.message = state.room.message.concat(action.payload)
      return {
        ...state
      }
    }
    case ActionTypes.SEND_MESSAGE_SUCCESS: {
      const found = state.room.message.map(x => x._id).indexOf(action.payload._id)
      state.room.message[found].response_server = true
      return {
        ...state
      }
    }
    case ActionTypes.UPDATE_OPEN_ROOM: { 
      const today = new Date(Date.now())
      const newMessage = {
        _id: Math.floor(Math.random() * 100),
        text: action.notification.text,
        owner: action.notification.ownerProfileId,
        createdAt: today.toISOString()
      }
      state.room.message.push(newMessage)
      return {
        ...state,
        isLoading: false
      }
    }
    case ActionTypes.LOAD_MORE_MESSAGE_BY_ID: {
      return {
        ...state,
        isLoadingMore: true
      }
    }
    case ActionTypes.LOAD_MORE_MESSAGE_BY_ID_SUCCESS: {
      return {
        ...state,
        room: {
          ...state.room,
          message: state.room.message.concat(action.payload.message)
        },
        isLoadingMore: false,
        page: state.page + 1,
        error: null,
      }
    }
    case ActionTypes.LOAD_MORE_MESSAGE_BY_ID_FAIL: {
      return {
        ...state,
        isLoadingMore: false,
        error: action.payload
      }
    }
    
    case ActionTypes.RESET_ROOM: return { ...initialState }
    default: return { ...state }
  }
}