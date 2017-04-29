import update from 'immutability-helper';

const initialState = {
        isLoading: false,
        projectView: 'projectList',
        projectEdit: false,
        projects: [{
			"clientName" : "John Doe",
			"projectName" : "TEST",
			"rate" : 33,
			"ratePer" : "hr",
			"budget" : null,
			"startDate" : new Date("2017-04-08T00:00:00Z"),
			"endDate" : new Date("2017-04-19T00:00:00Z"),
			"invoices" : [
				{
					"tasks" : [
						{
							"date" : new Date("2017-04-26T07:00:00Z"),
							"hoursSpent" : 2,
							"description" : "design wireframes",
							"_id" : "5900e14328896c44c6420c06",
						},
						{
							"date" : new Date("2017-04-26T07:00:00Z"),
							"hoursSpent" : 2,
							"description" : "build landing page",
							"_id" : "5900e14328896c44c6420c05",
						}
					],
					"tax" : 0,
					"invoiceNo" : 1,
					"billingPeriodStart" : new Date("2017-04-26T00:00:00Z"),
					"billingPeriodEnd" : new Date("2017-05-10T00:00:00Z"),
					"_id" : "5900e12228896c44c6420c03",
				},
				{
					"tasks" : [ ],
					"invoiceNo" : 2,
					"billingPeriodStart" : new Date("2017-04-06T00:00:00Z"),
					"billingPeriodEnd" : new Date("2017-04-20T00:00:00Z"),
					"_id" : "590245ed6d33d3053368eedf",
				}
			],
			"dateModified" : new Date("2017-04-28T23:13:22.348Z"),
			"completed" : true,
			"totalTimeSpent" : 0,
			"_id" : "58ff8a2a7e7adc7090fe17a7",
			"clientId" : "58f7c6707f95240655e343c1",
			"userId" : "58ea7b64ea78b48306947759",
			"template" : null,
			"billingCycle" : "hr",
			"notes" : "some notes about the project...yada yada yada, blah blah blah"
		},
        {
			"clientName" : "John Doe",
			"projectName" : "John's Website",
			"rate" : 33,
			"ratePer" : "hr",
			"budget" : null,
			"startDate" : new Date("2017-04-08T00:00:00Z"),
			"endDate" : new Date("2017-04-19T00:00:00Z"),
			"invoices" : [
				{
					"tasks" : [
						{
							"date" : new Date("2017-04-26T07:00:00Z"),
							"hoursSpent" : 2,
							"description" : "design wireframes",
							"_id" : "5900e14328896c44c6420c06",
						},
						{
							"date" : new Date("2017-04-26T07:00:00Z"),
							"hoursSpent" : 2,
							"description" : "build landing page",
							"_id" : "5900e14328896c44c6420c05",
						}
					],
					"tax" : 0,
					"invoiceNo" : 1,
					"billingPeriodStart" : new Date("2017-04-26T00:00:00Z"),
					"billingPeriodEnd" : new Date("2017-05-10T00:00:00Z"),
					"_id" : "5900e12228896c44c6420c03",
				},
				{
					"tasks" : [ ],
					"invoiceNo" : 2,
					"billingPeriodStart" : new Date("2017-04-06T00:00:00Z"),
					"billingPeriodEnd" : new Date("2017-04-20T00:00:00Z"),
					"_id" : "590245ed6d33d3053368eedf",
				}
			],
			"dateModified" : new Date("2017-04-28T23:13:22.348Z"),
			"completed" : null,
			"totalTimeSpent" : 0,
			"_id" : "58ff8a2a7e7adc7090fe17a7",
			"clientId" : "58f7c6707f95240655e343c1",
			"userId" : "58ea7b64ea78b48306947759",
			"template" : null,
			"billingCycle" : "hr",
			"notes" : "some notes about the project...yada yada yada, blah blah blah"
		}
],
    }


const projectReducer = (state=initialState, action) => {
    state = state || initialState
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

