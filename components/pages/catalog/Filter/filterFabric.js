import React from 'react';
import DoorsFilterView from './Doors/view';
import LaminateFilterView from './Laminate/view';
import QuartzvinylFilterView from './Quartzvinyl/view';
import KeramogranitFilterView from './Keramogranit/view';
import SportFilterView from './Sport/view';

const filterFabric = (category) => {
  switch (category) {
    case 'doors':
      return DoorsFilterView;
    case KeramogranitFilterView.CATEGORY:
      return KeramogranitFilterView;
    case LaminateFilterView.CATEGORY:
      return LaminateFilterView;
    case 'sport':
      return SportFilterView;
    case 'quartzvinyl':
    case 'quartzvinyl_zamkovay':
    case 'quartzvinyl_kleevay':
      return QuartzvinylFilterView;
    default:
      return null;
  }
};
export default filterFabric;
