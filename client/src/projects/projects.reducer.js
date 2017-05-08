import update from 'immutability-helper';

const initialState = {
        projectView: 'projectList',
        projectEdit: false,
		projectFilter: 'SHOW_ALL',
    }


const projectReducer = (state=initialState, action) => {
    state = state || initialState
    switch(action.type) {
        case 'RECEIVE_PROJECT_DATA':
            return {
                ...state,
                projectView: 'projectList',
            }
        case 'RECEIVE_CLIENT_DATA':
            return {
                ...state,
                projectView: 'projectList',
                projectEdit: false,
                projectFilter: 'SHOW_ALL',
            }
        case 'UPDATE_PROJECT_DATA':
        return update(state, {
               projects: {
                  $push: [action.projects]
               },
               isLoading: { $set: false },
               projectView: { $set: 'projectList' }
           })
        case 'SET_PROJECT_FILTER':
            return {
                ...state,
                projectFilter: action.filter
            }
        case 'UPDATE_PROJECT_DETAIL_MODAL':
            return {
                ...state,
                isDetailModalOpen: !state.isDetailModalOpen
            }
        case 'UPDATE_PROJECT_VIEW':
            return {
                ...state,
                projectView: action.payload,
            }
        case 'UPDATE_PROJECT_EDIT':
            return {
                ...state,
                projectEdit: !state.projectEdit,
            }
        default:
            return state;
        }
    }

export default projectReducer;

