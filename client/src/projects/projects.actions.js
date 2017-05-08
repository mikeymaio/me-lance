const requestDataFromServer = () => ({
  type: 'REQUEST_PROJECT_DATA'
})

const receiveProjectDataFromServer = projects => ({
  type: 'RECEIVE_PROJECT_DATA',
  projects
})

const receiveClientDataFromServer = clients => ({
  type: 'RECEIVE_CLIENT_DATA',
  clients
})

const receiveData = message => ({
  type: 'RECEIVE_DATA',
  message
})

export const fetchUserClients = (userId) => {
    console.log('fetching your clients')
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`/api/clients?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // mode: 'same-origin',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => dispatch(receiveClientDataFromServer(res.clients)))
    .then( () => dispatch(receiveData()) )
  }
}

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

export const filterProjects = filter => {
    const SET_PROJECT_FILTER = 'SET_PROJECT_FILTER'
    console.log('projectFilter = ', filter);
    return {
          type: SET_PROJECT_FILTER,
          filter
    }
}


export const handleAddProject = (clientName, projectName, rate, ratePer, notes, startDate, endDate, timeSpent, userId, clientId) => {
    console.log('handleAddProject fired: ', clientName, projectName, rate, ratePer, notes, startDate, endDate, timeSpent, userId, clientId)
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
        notes,
        startDate,
        endDate,
        timeSpent,
        userId,
        clientId
      }),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res =>  dispatch(receiveData(res.message)))
    .then( () => dispatch(fetchUserClients(userId))
    )
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

export const handleUpdateProject = (projectName, rate, ratePer, notes, startDate, endDate, totalTimeSpent, billingCycle, completed, userId, clientId, projectId) => {
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
    .then(response => response.json())
    .then(res =>  dispatch(receiveData(res.message)))
    .then( () => dispatch(fetchUserClients(userId))
    )
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
    .then(response => response.json())
    .then(res =>  dispatch(receiveData(res.message)))
    .then( () => dispatch(fetchUserClients(userId))
    )
  }
}

export const testLoader = () => ({
  type: 'TEST_LOADER'
})