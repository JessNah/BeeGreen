import {Entity, model, property} from '@loopback/repository';

@model()
export class Purchase extends Entity {
  @property({
    type: 'string',
  })
  buyerId?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  buyerUsername?: string;

  @property({
    type: 'date',
  })
  purchaseDate?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  items?: object[];

  @property({
    type: 'number',
  })
  score?: number;

  @property({
    type: 'string',
  })
  store?: string;

  @property({
    type: 'number',
  })
  totalCost?: number;

  @property({
    type: 'string',
  })
  buyerIp?: string;


  constructor(data?: Partial<Purchase>) {
    super(data);
  }
}

export interface PurchaseRelations {
  // describe navigational properties here
}

export type PurchaseWithRelations = Purchase & PurchaseRelations;
