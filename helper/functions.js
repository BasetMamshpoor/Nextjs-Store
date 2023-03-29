function IsInCart(state, id) {
    return !!state.selectedItems.find(i => i.idp === id)
}

function quantityItem(state, id) {
    const Index = state.selectedItems.findIndex(i => i.idp === id)
    if (Index === -1) return false
    else return state.selectedItems[Index].quantity
}


export { IsInCart, quantityItem }

