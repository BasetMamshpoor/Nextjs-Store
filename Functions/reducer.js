const sumItems = (items) => {
    const itemsCounter = items.reduce((total, product) => total + product.quantity, 0)

    let total = items.reduce((total, product) => total + product.price * product.quantity, 0)

    let total_after_off = items.reduce((total, product) => total + product.offPrice * product.quantity, 0)

    return { itemsCounter, total, total_after_off }
}

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_CART":
            const clearUnexist = action.payload.filter(pr => {
                const deltedProduct = pr.messages.find(m => m.type === 'deleted')
                if (!deltedProduct) return pr
            });
            localStorage.setItem('cart', JSON.stringify({
                ...state,
                selectedItems: [...clearUnexist],
                ...sumItems(action.payload)
            }))
            return {
                ...state,
                selectedItems: action.payload,
                ...sumItems(action.payload)
            }
        case "ADD_ITEM":
            if (!state.selectedItems.find(item => item.idp === action.payload.idp)) {
                state.selectedItems.push({
                    ...action.payload,
                    quantity: 1
                })
            }
            localStorage.setItem('cart', JSON.stringify({
                ...state,
                selectedItems: [...state.selectedItems],
                ...sumItems(state.selectedItems)
            }))
            return {
                ...state,
                selectedItems: [...state.selectedItems],
                ...sumItems(state.selectedItems)
            }
        case "REMOVE_ITEM":
            const newSelectedItems = state.selectedItems.filter(i => i.idp !== action.payload.idp)
            localStorage.setItem('cart', JSON.stringify({
                ...state,
                selectedItems: [...newSelectedItems],
                ...sumItems(newSelectedItems)
            }))
            return {
                ...state,
                selectedItems: [...newSelectedItems],
                ...sumItems(newSelectedItems)
            }
        case "INCREASE":
            const Index = state.selectedItems.findIndex(i => i.idp === action.payload.idp)
            let num = state.selectedItems[Index]
            if (!(num.sizes.stock > num.quantity)) {
                return {
                    ...state,
                    ...sumItems(state.selectedItems)
                }
            } else {
                num.quantity++
                localStorage.setItem('cart', JSON.stringify({
                    ...state,
                    ...sumItems(state.selectedItems)
                }))
                return {
                    ...state,
                    ...sumItems(state.selectedItems)
                }
            }
        case "DECREASE":
            const Index2 = state.selectedItems.findIndex(i => i.idp === action.payload.idp)
            state.selectedItems[Index2].quantity--
            localStorage.setItem('cart', JSON.stringify({
                ...state,
                ...sumItems(state.selectedItems)
            }))
            return {
                ...state,
                ...sumItems(state.selectedItems)
            }
        case "CHECKOUT":
            localStorage.setItem('cart', JSON.stringify({
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                total_after_off: 0,
                checkout: true
            }))
            return {
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                total_after_off: 0,
                checkout: true
            }
        case "CLEAR":
            localStorage.setItem('cart', JSON.stringify({
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                total_after_off: 0,
                checkout: false
            }))
            return {
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                total_after_off: 0,
                checkout: false
            }
        case "INIT_STORED_CART":
            return action.payload

        default:
            return state
    }
}

export default reducer