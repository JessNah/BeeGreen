import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Purchase} from '../models';
import {PurchaseRepository} from '../repositories';

export class PurchaseController {
  constructor(
    @repository(PurchaseRepository)
    public purchaseRepository : PurchaseRepository,
  ) {}

  @post('/purchases')
  @response(200, {
    description: 'Purchase model instance',
    content: {'application/json': {schema: getModelSchemaRef(Purchase)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Purchase, {
            title: 'NewPurchase',
            exclude: ['id'],
          }),
        },
      },
    })
    purchase: Omit<Purchase, 'id'>,
  ): Promise<Purchase> {
    return this.purchaseRepository.create(purchase);
  }

  @get('/purchases/count')
  @response(200, {
    description: 'Purchase model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Purchase) where?: Where<Purchase>,
  ): Promise<Count> {
    return this.purchaseRepository.count(where);
  }

  @get('/purchases')
  @response(200, {
    description: 'Array of Purchase model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Purchase, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Purchase) filter?: Filter<Purchase>,
  ): Promise<Purchase[]> {
    return this.purchaseRepository.find(filter);
  }

  @patch('/purchases')
  @response(200, {
    description: 'Purchase PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Purchase, {partial: true}),
        },
      },
    })
    purchase: Purchase,
    @param.where(Purchase) where?: Where<Purchase>,
  ): Promise<Count> {
    return this.purchaseRepository.updateAll(purchase, where);
  }

  @get('/purchases/{id}')
  @response(200, {
    description: 'Purchase model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Purchase, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Purchase, {exclude: 'where'}) filter?: FilterExcludingWhere<Purchase>
  ): Promise<Purchase> {
    return this.purchaseRepository.findById(id, filter);
  }

  @patch('/purchases/{id}')
  @response(204, {
    description: 'Purchase PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Purchase, {partial: true}),
        },
      },
    })
    purchase: Purchase,
  ): Promise<void> {
    await this.purchaseRepository.updateById(id, purchase);
  }

  @put('/purchases/{id}')
  @response(204, {
    description: 'Purchase PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() purchase: Purchase,
  ): Promise<void> {
    await this.purchaseRepository.replaceById(id, purchase);
  }

  @del('/purchases/{id}')
  @response(204, {
    description: 'Purchase DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.purchaseRepository.deleteById(id);
  }
}
