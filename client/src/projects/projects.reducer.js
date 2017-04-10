const projectState = {
        isDetailModalOpen: false,
        isLoading: false,
        projects: [
        {
            id: '12321',
            name: 'John Smith\'s Website',
            client: 'John Smith',
            company: 'John Smith Inc',
            address: '123 Main St, Los Angeles CA 90026',
            email: 'email@email.com',
            phone: '555-555-5555',
            budget: '$5,000.00',
            hoursWorked: 7,
            deadline: '5/16/17'
        },
        {
            id: '12321',
            name: 'Sally\'s Website',
            client: 'Sally Smith',
            company: 'Sally Smith Inc',
            address: '123 Main St, Los Angeles CA 90026',
            email: 'email@email.com',
            phone: '555-555-5555',
            budget: '$3,000.00',
            hoursWorked: 7,
            deadline: '6/1/17'
        },
        {
            id: '12321',
            name: 'John Doe\'s Website',
            client: 'John Doe',
            company: 'John Doe LLC',
            address: '123 Main St, Los Angeles CA 90026',
            email: 'email@email.com',
            phone: '555-555-5555',
            budget: '$10,000.00',
            hoursWorked: 9,
            deadline: '6/21/17'
        },
        ]

    }


const projectReducer = (state=projectState, action) => {
    state = state || projectState
    switch(action.type) {
        case 'REQUEST_DATA':
            return {
                ...state,
                isLoading: true
            }
        case 'RECEIVE_DATA':
            return {
                ...state,
                isLoading: false, isLoggedIn: action.payload
            }
        case 'UPDATE_PROJECT_DETAIL_MODAL':
            return {
                ...state,
                isDetailModalOpen: !state.isDetailModalOpen
            }
        default:
            return state;
        }
        // return state;
    }

export default projectReducer;

