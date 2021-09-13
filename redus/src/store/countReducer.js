const initState = {
    count: 0,
}

export default function countReducer(state = initState, action){
    switch(action.type){
        case 'add': return {
            ...state,
            count:state.count + action.payload
        }
        case 'cut': return {
            ...state,
            count:state.count - action.payload
        }
        default: return state
    }
}