export const isObjectEqual = (obj1, obj2) => {
    for (const key in obj1) {
        const isObjOneHasProp = Object.prototype.hasOwnProperty.call(obj1, key);
        const isObjTwoHasProp = Object.prototype.hasOwnProperty.call(obj2, key);

        if (isObjOneHasProp !== isObjTwoHasProp) {
            return false;
        }

        switch (typeof obj1[key]) {
            //Deep compare objects
            case 'object':
                if (!isObjectEqual(obj1[key], obj2[key])) {
                    return false;
                }
                break;
            //Compare function code
            case 'function':
                if (
                    typeof obj2[key] === 'undefined' ||
                    obj1[key].toString() !== obj2[key].toString()
                ) {
                    return false;
                }
                break;
            //Compare values
            default:
                if (obj1[key] !== obj2[key]) {
                    return false;
                }
        }
    }

    for (const key in obj2) {
        if (typeof obj1[key] === 'undefined') {
            return false;
        }
    }

    return true;
};
