export const customError = (status, message) => {

    const error = new Error(message);
    error.status = status;
    // error.stack= error.stack
    return error;
};