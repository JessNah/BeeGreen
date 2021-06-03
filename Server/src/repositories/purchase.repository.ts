import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BeegreendbDataSource} from '../datasources';
import {Purchase, PurchaseRelations} from '../models';

export class PurchaseRepository extends DefaultCrudRepository<
  Purchase,
  typeof Purchase.prototype.id,
  PurchaseRelations
> {
  constructor(
    @inject('datasources.beegreendb') dataSource: BeegreendbDataSource,
  ) {
    super(Purchase, dataSource);
  }
}
