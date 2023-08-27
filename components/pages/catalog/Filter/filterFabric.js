import React from 'react';
import FilterViewHOC from './Base/StoreContainer';

const filterFabric = (category) => {
  let addFields = [];
  let storeName = '';

  let useFilter = false;
  const addFieldsBase = ['price', 'isPopular', 'isSale'];

  switch (category) {
    case 'doors':
      storeName = 'DoorsStore';
      addFields = addFieldsBase;
      useFilter = true;
      break;
    case 'keramogranit':
      storeName = 'KeramogranitStore';
      addFields = addFieldsBase;
      useFilter = true;
      break;
    case 'quartzvinyl':
    case 'quartzvinyl_kleevay':
    case 'laminate':
    case 'probkovoe_pokrytie':
    case 'linoleum':
      storeName = 'FloorStore';
      addFields = addFieldsBase;
      useFilter = true;
      break;
    case 'quartzvinyl_zamkovay':
      storeName = 'FloorStore';
      addFields = [...addFieldsBase, 'substrateThickness'];
      useFilter = true;
      break;
    case 'sport':
      storeName = 'SportStore';
      addFields = addFieldsBase;
      useFilter = true;
      break;
    case 'kley':
      storeName = 'DefaultStore';
      addFields = addFieldsBase;
      useFilter = true;
      break;
    case 'napolnyy_plintus':
      storeName = 'DefaultStore';
      addFields = [...addFieldsBase, 'forPainting'];
      useFilter = true;
      break;
  }

  if (!useFilter) {
    return null;
  }

  return <FilterViewHOC storeName={storeName} addFields={addFields} />;
};

export default filterFabric;
