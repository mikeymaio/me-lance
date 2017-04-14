
const requestDataFromServer = () => ({
  type: 'REQUEST_DATA'
})

const receiveProjectDataFromServer = (projects) => ({
  type: 'RECEIVE_PROJECT_DATA',
  projects
})

const updateProjectData = (projects) => ({
  type: 'UPDATE_PROJECT_DATA',
  projects
})

export function handleProjectDetailModal() {
    const UPDATE_PROJECT_DETAIL_MODAL = 'UPDATE_PROJECT_DETAIL_MODAL';
    return {
        type: UPDATE_PROJECT_DETAIL_MODAL,
    }
}

export function handleAddProjectModal() {
    const UPDATE_ADD_PROJECT_MODAL = 'UPDATE_ADD_PROJECT_MODAL';
    return {
        type: UPDATE_ADD_PROJECT_MODAL,
    }
}

export const handleAddProject = (clientName, projectName, rate, ratePer, budget, startDate, endDate, timeSpent, billingCycle, template, userId) => {
    console.log('handleAddProject fired with client name:', clientName, projectName, rate, ratePer, budget, startDate, endDate, timeSpent, billingCycle, template, userId)

}

// export const handleAddProject = (clientName, projectName, rate, ratePer, budget, startDate, endDate, timeSpent, billingCycle, template, userId) => {
//     console.log('handleAddProject fired: ', clientName, projectName, rate, ratePer, budget, startDate, endDate, timeSpent, billingCycle, template, userId)
//   return dispatch => {
//     dispatch(requestDataFromServer())

//     fetch('http://localhost:8080/api/clients', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         clientName,
//         projectName,
//         rate,
//         ratePer,
//         budget,
//         startDate,
//         endDate,
//         timeSpent,
//         billingCycle,
//         template,
//         userId
//       })
//     })
//     .then(response => response.json())
//     .then(res => {console.log(res); dispatch(updateProjectData(res))})
//   }
// }

export const fetchUserProjects = (userId) => {
    console.log('fetching your projects')
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`http://localhost:8080/api/clients?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(res => dispatch(receiveProjectDataFromServer(res.clients.projects)))
  }
}


export function handleProjectView(view) {
    const UPDATE_PROJECT_VIEW = 'UPDATE_PROJECT_VIEW';
    return {
        type: UPDATE_PROJECT_VIEW,
        payload: view
    }
}

export function handleProjectEdit() {
    const UPDATE_PROJECT_EDIT = 'UPDATE_PROJECT_EDIT';
    return {
        type: UPDATE_PROJECT_EDIT
    }
}

export const handleUpdateProject = (projectName, company, phone, email, address, clientId) => {
    console.log('handleUpdateProject fired with project name:', projectName)
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`http://localhost:8080/api/clients/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectName,
        company,
        phone,
        email,
        address,
        clientId
      })
    })
    .then(response => response.json())
    .then(res => {console.log(res); dispatch(updateProjectData(res))})
  }
}

export const handleDeleteProject = (clientId, userId) => {
    console.log('deleting project: ', clientId)
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`http://localhost:8080/api/clients/${clientId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientId
      })
    })
    .then(response => response.json())
    .then(fetch(`http://localhost:8080/api/clients?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(res => dispatch(receiveProjectDataFromServer(res.clients.projects))))
  }
}

export const testLoader = () => ({
  type: 'REQUEST_DATA'
})