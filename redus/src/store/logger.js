export default (state) => (next) => (action) => {
    console.log(state);
    console.log(action);
    next(action);
}