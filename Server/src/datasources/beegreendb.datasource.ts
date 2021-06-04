import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'beegreendb',
  connector: 'cloudant',
  url: 'xxx',
  database: 'beegreendb',
  username: 'xxx',
  password: '',
  modelIndex: 'loopback__model__beegreendb',
  globalLimit: 1000
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class BeegreendbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'beegreendb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.beegreendb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
