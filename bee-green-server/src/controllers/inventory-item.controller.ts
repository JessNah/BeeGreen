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
import {InventoryItem} from '../models';
import {InventoryItemRepository} from '../repositories';

export class InventoryItemController {
  constructor(
    @repository(InventoryItemRepository)
    public inventoryItemRepository : InventoryItemRepository,
  ) {}

  @post('/inventory-items')
  @response(200, {
    description: 'InventoryItem model instance',
    content: {'application/json': {schema: getModelSchemaRef(InventoryItem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventoryItem, {
            title: 'NewInventoryItem',
            exclude: ['id'],
          }),
        },
      },
    })
    inventoryItem: Omit<InventoryItem, 'id'>,
  ): Promise<InventoryItem> {
    return this.inventoryItemRepository.create(inventoryItem);
  }

  @get('/inventory-items/count')
  @response(200, {
    description: 'InventoryItem model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InventoryItem) where?: Where<InventoryItem>,
  ): Promise<Count> {
    return this.inventoryItemRepository.count(where);
  }

  @get('/inventory-items')
  @response(200, {
    description: 'Array of InventoryItem model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InventoryItem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InventoryItem) filter?: Filter<InventoryItem>,
  ): Promise<InventoryItem[]> {
    return this.inventoryItemRepository.find(filter);
  }

  @patch('/inventory-items')
  @response(200, {
    description: 'InventoryItem PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventoryItem, {partial: true}),
        },
      },
    })
    inventoryItem: InventoryItem,
    @param.where(InventoryItem) where?: Where<InventoryItem>,
  ): Promise<Count> {
    return this.inventoryItemRepository.updateAll(inventoryItem, where);
  }

  @get('/inventory-items/{id}')
  @response(200, {
    description: 'InventoryItem model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InventoryItem, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InventoryItem, {exclude: 'where'}) filter?: FilterExcludingWhere<InventoryItem>
  ): Promise<InventoryItem> {
    return this.inventoryItemRepository.findById(id, filter);
  }

  @patch('/inventory-items/{id}')
  @response(204, {
    description: 'InventoryItem PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventoryItem, {partial: true}),
        },
      },
    })
    inventoryItem: InventoryItem,
  ): Promise<void> {
    await this.inventoryItemRepository.updateById(id, inventoryItem);
  }

  @put('/inventory-items/{id}')
  @response(204, {
    description: 'InventoryItem PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() inventoryItem: InventoryItem,
  ): Promise<void> {
    await this.inventoryItemRepository.replaceById(id, inventoryItem);
  }

  @del('/inventory-items/{id}')
  @response(204, {
    description: 'InventoryItem DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.inventoryItemRepository.deleteById(id);
  }
}
