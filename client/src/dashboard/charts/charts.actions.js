
export const handleStatsView = view => {
    const UPDATE_STATS_VIEW = 'UPDATE_STATS_VIEW';
    return {
        type: UPDATE_STATS_VIEW,
        view,
    }
}
