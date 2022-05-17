import React from 'react';
import FilterViewHOC from "./Base/StoreContainer";


const filterFabric = (category) => {
    if (!category) {
        return null
    }

    let addFields = [];
    let storeName = '';

    switch (category) {
        case 'doors':
            storeName = 'DoorsStore';
            addFields = ['isPopular']
            break;
        case 'keramogranit':
            storeName = 'KeramogranitStore';
            addFields = ['price', 'isPopular'];
            break;
        case 'quartzvinyl':
        case 'quartzvinyl_zamkovay':
        case 'quartzvinyl_kleevay':
            storeName = 'FloorStore';
            addFields = ['price', 'isPopular', 'isSale'];
            break;
        case 'laminate':
        case 'probkovoe_pokrytie':
            storeName = 'FloorStore';
            addFields = ['price', 'isPopular'];
            break;
        case 'sport':
            storeName = 'SportStore';
            addFields = ['isPopular']
            break;
    }

    return <FilterViewHOC storeName={storeName} addFields={addFields}/>;
};

export default filterFabric;
