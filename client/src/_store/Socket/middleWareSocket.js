const applySocketMiddeware = (socket, allSocketFn) => {
    return store => next => action => {
        const isFnExist = allSocketFn.hasOwnProperty(action.type);
        if (isFnExist) {
            const socketEmitter = allSocketFn[action.type];
            action.token = localStorage.getItem('token');
            socketEmitter(socket, action);
        }
        next(action);
    }
};

export {
    applySocketMiddeware
}