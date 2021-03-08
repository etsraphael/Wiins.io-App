import * as ActionTypes from './constants'

export function putPublicationInModal(publication) {
    return {
        type: ActionTypes.PUT_PUBLICATION_IN_MODAL,
        payload: publication
    }
}

export function resetPublicationInModal() {
    return { type: ActionTypes.RESET_PUBLICATIONS_IN_MODAL }
}

export function putPublicationInModalActions(publication) {
    return (dispatch) => dispatch(putPublicationInModal(publication))
}

export function resetPublicationInModalActions() {
    return (dispatch) => dispatch(resetPublicationInModal())
}