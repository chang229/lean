const initState = {
    show: false
}

export default function modalReducer(state = initState, action){
    switch(action.type){
        case 'show': return {
            ...state,
            show:action.payload
        }
        default: return state
    }
}