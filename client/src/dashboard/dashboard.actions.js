export function handleDashboardSlides(value) {
    const UPDATE_DASHBOARD_SLIDE = "UPDATE_DASHBOARD_SLIDE";
    return{
        type: UPDATE_DASHBOARD_SLIDE,
        payload: value
    }
  };