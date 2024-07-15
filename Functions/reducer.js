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
                items: [...clearUnexist],
                ...sumItems(action.payload)
            }))
            return {
                ...state,
                items: action.payload,
                ...sumItems(action.payload)
            }
        case "ADD_ITEM":
            if (!state.items.find(item => item.idp === action.payload.idp)) {
                state.items.push({
                    ...action.payload,
                    quantity: 1
                })
            }
            localStorage.setItem('cart', JSON.stringify({
                ...state,
                items: [...state.items],
                ...sumItems(state.items)
            }))
            return {
                ...state,
                items: [...state.items],
                ...sumItems(state.items)
            }
        case "REMOVE_ITEM":
            const newitems = state.items.filter(i => i.idp !== action.payload.idp)
            localStorage.setItem('cart', JSON.stringify({
                ...state,
                items: [...newitems],
                ...sumItems(newitems)
            }))
            return {
                ...state,
                items: [...newitems],
                ...sumItems(newitems)
            }
        case "INCREASE":
            const Index = state.items.findIndex(i => i.idp === action.payload.idp)
            let num = state.items[Index]
            if (!(num.sizes.stock > num.quantity)) {
                return {
                    ...state,
                    ...sumItems(state.items)
                }
            } else {
                num.quantity++
                localStorage.setItem('cart', JSON.stringify({
                    ...state,
                    ...sumItems(state.items)
                }))
                return {
                    ...state,
                    ...sumItems(state.items)
                }
            }
        case "DECREASE":
            const Index2 = state.items.findIndex(i => i.idp === action.payload.idp)
            state.items[Index2].quantity--
            localStorage.setItem('cart', JSON.stringify({
                ...state,
                ...sumItems(state.items)
            }))
            return {
                ...state,
                ...sumItems(state.items)
            }
        case "ADD_ADDRESS":
            return { ...state, address_id: action.payload.id }
        case "CHECKOUT":
            localStorage.setItem('cart', JSON.stringify({
                items: [],
                itemsCounter: 0,
                total: 0,
                total_after_off: 0,
                checkout: true
            }))
            return {
                items: [],
                itemsCounter: 0,
                total: 0,
                total_after_off: 0,
                checkout: true
            }
        case "CLEAR":
            localStorage.setItem('cart', JSON.stringify({
                items: [],
                itemsCounter: 0,
                total: 0,
                total_after_off: 0,
                checkout: false
            }))
            return {
                items: [],
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