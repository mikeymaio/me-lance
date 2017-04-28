import update from 'immutability-helper';

const projectState = {
        isLoading: false,
        projectView: 'projectList',
        projectEdit: false,
        projects: [],
    }


const projectReducer = (state=projectState, action) => {
    state = state || projectState
    switch(action.type) {
        case 'REQUEST_PROJECT_DATA':
            return {
                ...state,
                isLoading: true
            }
        case 'RECEIVE_PROJECT_DATA':
            return {
                ...state,
                isLoading: false,
                // projects: action.projects,
                projectView: 'projectList',
            }
        case 'RECEIVE_CLIENT_DATA':
            return {
                ...state,
                isLoading: false,
                // projects: action.projects,
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
        // case 'TEST_LOADER':
        //     return {
        //         ...state,
        //         isLoading: !state.isLoading
        //     }
        default:
            return state;
        }
        // return state;
    }

export default projectReducer;

