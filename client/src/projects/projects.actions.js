
const requestDataFromServer = () => ({
  type: 'REQUEST_PROJECT_DATA'
})

const receiveProjectDataFromServer = (projects) => ({
  type: 'RECEIVE_PROJECT_DATA',
  projects
})

const receiveClientDataFromServer = (clients) => ({
  type: 'RECEIVE_CLIENT_DATA',
  clients
})

// const addClientSuccess = () => ({
//   type: 'RECEIVE_PROJECT_DATA',
// })

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


export const handleAddProject = (clientName, projectName, rate, ratePer, budget, notes, startDate, endDate, timeSpent, billingCycle, template, userId, clientId) => {
    console.log('handleAddProject fired: ', clientName, projectName, rate, ratePer, budget, notes, startDate, endDate, timeSpent, billingCycle, template, userId, clientId)
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`/api/clients/${clientId}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientName,
        projectName,
        rate,
        ratePer,
        budget,
        notes,
        startDate,
        endDate,
        timeSpent,
        billingCycle,
        template,
        userId,
        clientId
      }),
      credentials: 'include'
    })
    // .then(response => response.json())
    // .then(() =>  dispatch(addClientSuccess()))
    .then(fetch(`/api/clients?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => dispatch(receiveClientDataFromServer(res.clients))))
  }
}

export const fetchUserProjects = (userId) => {
    console.log('fetching your projects')
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`/api/clients?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
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

export const handleUpdateProject = (projectName, rate, ratePer, budget, notes, startDate, endDate, totalTimeSpent, billingCycle, completed, userId, clientId, projectId) => {
    console.log('handleUpdateProject fired with project name:', projectName)
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`/api/clients/${clientId}/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectName,
        rate,
        ratePer,
        budget,
        notes,
        startDate,
        endDate,
        totalTimeSpent,
        billingCycle,
        completed,
        userId,
        clientId,
        projectId
      }),
      credentials: 'include'
    })
    // .then(response => response.json())
    // .then(res => {console.log(res); dispatch(updateProjectData(res))})
    .then(fetch(`/api/clients?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => dispatch(receiveClientDataFromServer(res.clients))))
  }
}



export const handleDeleteProject = (clientId, projectId, userId) => {
    console.log('deleting project: ', projectId)
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`/api/clients/${clientId}/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientId,
        projectId
      }),
      credentials: 'include'
    })
    // .then(response => response.text())
    .then(fetch(`/api/clients?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => dispatch(receiveClientDataFromServer(res.clients))))
  }
}

export const testLoader = () => ({
  type: 'TEST_LOADER'
})