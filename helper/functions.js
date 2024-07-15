function IsInCart(state, id) {
    return !!state.items.find(i => i.idp === id)
}

function quantityItem(state, id) {
    const Index = state.items.findIndex(i => i.idp === id)
    if (Index === -1) return false
    else return state.items[Index].quantity
}


export { IsInCart, quantityItem }

