import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  ip?: string;

  @property({
    type: 'date',
  })
  creationDate?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  purchaseIds?: string[];

  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'string',
  })
  region?: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
