export const objectKeyExists = (object, key) => {
    if (typeof object !== 'object' || !object)
        return false;
    return key in object;
};
