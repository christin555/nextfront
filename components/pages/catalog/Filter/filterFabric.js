import React from 'react';
import FilterViewHOC from './Base/StoreContainer';

const filterFabric = (category) => {
  let addFields = [];
  let storeName = '';

  let useFilter = false;

  switch (category) {
    case 'doors':
      storeName = 'DoorsStore';
      addFields = ['isPopular', 'price'];
      useFilter = true;
      break;
    case 'keramogranit':
      storeName = 'KeramogranitStore';
      addFields = ['price', 'isPopular'];
      useFilter = true;
      break;
    case 'quartzvinyl':
    case 'quartzvinyl_kleevay':
      storeName = 'FloorStore';
      addFields = ['price', 'isPopular', 'isSale'];
      useFilter = true;
      break;
    case 'quartzvinyl_zamkovay':
      storeName = 'FloorStore';
      addFields = ['price', 'isPopular', 'isSale', 'substrateThickness'];
      useFilter = true;
      break;
    case 'laminate':
    case 'probkovoe_pokrytie':
      storeName = 'FloorStore';
      addFields = ['price', 'isPopular'];
      useFilter = true;
      break;
    case 'sport':
      storeName = 'SportStore';
      addFields = ['isPopular', 'price'];
      useFilter = true;
      break;
    case 'kley':
      storeName = 'DefaultStore';
      addFields = ['isPopular', 'price'];
      useFilter = true;
      break;
  }

  if (!useFilter) {
    return null;
  }

  return <FilterViewHOC storeName={storeName} addFields={addFields} />;
};

export default filterFabric;
