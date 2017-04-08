export function handleMenuItemSelect(menuItem) {
    const UPDATE_SELECTION = 'MENU_ITEM_SELECTED';
    return {
        type: UPDATE_SELECTION,
        payload: menuItem
    }
}
