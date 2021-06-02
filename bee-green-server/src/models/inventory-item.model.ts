import {Entity, model, property} from '@loopback/repository';

@model()
export class InventoryItem extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  stats?: object[];

  @property({
    type: 'number',
  })
  totalScore?: number;

  @property({
    type: 'string',
  })
  category?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  associatedStores?: string[];


  constructor(data?: Partial<InventoryItem>) {
    super(data);
  }
}

export interface InventoryItemRelations {
  // describe navigational properties here
}

export type InventoryItemWithRelations = InventoryItem & InventoryItemRelations;
