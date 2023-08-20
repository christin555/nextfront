import CatalogView from '../../components/pages/catalog';
import {inject, observer} from 'mobx-react';
import {Component} from 'react';
import api from '../../src/api';

@inject('RootStore')
@observer
class index extends Component {
  constructor(props) {
    super(props);
    const {RootStore, RootStoreUp} = props;

    //RootStore.mergeStores(RootStoreUp);
  }

  static async getInitialProps({MobxStore, query, pathname, asPath}) {
    MobxStore.RootStore.setCategory(query?.category);

    const [headers] = await Promise.all([
      api.post('/seo/getHeaders', {query, pathname, asPath}),
      MobxStore.RootStore.CatalogStore.getHierarchy(),
      MobxStore.RootStore.CatalogStore.getCatalog(),
      MobxStore.RootStore.CatalogStore.getCountProducts()
    ]);

    return {headers};
  }

  render() {
    const {RootStore, RootStoreUp, headers} = this.props;
    //RootStore.mergeStores(RootStoreUp);

    return <CatalogView headers={headers} />;
  }
}

export default index;

