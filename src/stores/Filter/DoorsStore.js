import {computed, makeObservable} from 'mobx';
import {BaseFilterStore} from './Base';

export class DoorsStore extends BaseFilterStore {
  constructor(RootStore) {
    const category = RootStore.RouterStore.query.category;
    super(category, RootStore);

    makeObservable(this);
  }

  fieldsLabel = {
    'collectionId': 'Коллекция',
    'finishingMaterial': 'Материал отделки'
  };

  tableFields = {
    finishingMaterial: 'finishingMaterials',
    collectionId: 'collections'
  }

  @computed get collections() {
    return this.values.collections;
  }

  @computed get finishingMaterials() {
    return this.values.finishingMaterials;
  }

  @computed get isFinishingMaterialActive() {
    return this.hasKey('finishingMaterial');
  }

  @computed get isCollectionActive() {
    return this.hasKey('collectionId');
  }
}
