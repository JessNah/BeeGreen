import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BeegreendbDataSource} from '../datasources';
import {InventoryItem, InventoryItemRelations} from '../models';

export class InventoryItemRepository extends DefaultCrudRepository<
  InventoryItem,
  typeof InventoryItem.prototype.id,
  InventoryItemRelations
> {
  constructor(
    @inject('datasources.beegreendb') dataSource: BeegreendbDataSource,
  ) {
    super(InventoryItem, dataSource);
  }
}
