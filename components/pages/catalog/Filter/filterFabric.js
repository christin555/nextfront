import React from 'react';
import FilterViewHOC from "./Base/StoreContainer";

const filterFabric = (category) => {
    switch (category) {
        case 'doors':
            return <FilterViewHOC storeName={'DoorsStore'} addFields={['isPopular']}/>;
        case 'keramogranit':
            return <FilterViewHOC storeName={'KeramogranitStore'} addFields={['price', 'isPopular']}/>;
        case 'quartzvinyl':
        case 'quartzvinyl_zamkovay':
        case 'quartzvinyl_kleevay':
        case 'laminate':
        case 'probkovoe_pokrytie':
            return <FilterViewHOC storeName={'FloorStore'} addFields={['price', 'isPopular']}/>;
        case 'sport':
            return <FilterViewHOC storeName={'SportStore'} addFields={['isPopular']}/>;
        default:
            return null;
    }
};
export default filterFabric;
