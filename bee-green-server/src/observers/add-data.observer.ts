import {
  /* inject, Application, CoreBindings, */
  lifeCycleObserver, // The decorator
  LifeCycleObserver, // The interface
} from '@loopback/core';
//import the repository decorator
import {repository} from '@loopback/repository';

//import from LB app
import {UserRepository} from '../repositories';
import {User} from '../models';
import {PurchaseRepository} from '../repositories';
import {Purchase} from '../models';
import {InventoryItemRepository} from '../repositories';
import {InventoryItem} from '../models';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('AddDataGroup')
export class AddDataObserver implements LifeCycleObserver {
  /*
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
  ) {}
  */
  constructor(
    @repository('UserRepository') private userRepo: UserRepository,
    @repository('PurchaseRepository') private purchaseRepo: PurchaseRepository,
    @repository('InventoryItemRepository') private inventoryRepo: InventoryItemRepository,
  ) {}

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    // Add your logic for start
    //seed the repository
    let count: number = (await this.userRepo.count()).count;
    console.log(count);
    if (count !== 0) return;

    //create an instance of Requirement to be inserted into the database
    let userData = new User({
      creationDate: '2020-04-14',
      username: 'KimPeppermint',
      ip: 'xxx',
      purchaseIds: [],
      region: 'North America'
    });
    this.userRepo.create(userData);

    let inventoryItem1 = new InventoryItem({
      totalScore: 7,
      category: "meat",
      associatedStores: [
        "INSTACART"
      ]
    });
    let inventoryItem2 = new InventoryItem({
      totalScore: 1,
      category: "apple",
      associatedStores: [
        "INSTACART"
      ]
    });

    let purchaseArray = [{
      purchaseDate: '2020-04-14',
      buyerUsername: 'KimPeppermint',
      items: [ inventoryItem1, inventoryItem2 ],
      score: 4,
      store: "INSTACART",
      totalCost: 34,
      buyerIp: 'xxx'
    },
    {
      purchaseDate: '2020-04-14',
      buyerUsername: 'KimPeppermint',
      items: [ inventoryItem2 ],
      score: 4,
      store: "INSTACART",
      totalCost: 34,
      buyerIp: 'xxx'
    }]
    purchaseArray.forEach(purchase => {
      this.purchaseRepo.create(new Purchase(purchase));
    });

  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
