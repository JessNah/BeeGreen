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
import {normalizeTotalScore, normalizeField} from '../dataprocessing/dataprocessing';

import fs = require('fs');
const csv = require('csv-parser');

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('AddDataGroup')
export class AddDataObserver implements LifeCycleObserver {

  importCSV = () => {
    let inventoryArray: InventoryItem[] = [];
    fs.createReadStream('../Data/Food_Production.csv')
    .pipe(csv())
    .on('data', (row: any) => {
      const inventoryItem = new InventoryItem({
        name: row["Food product"],
        totalScore: parseFloat(row["Normalized"]),
        category: row["Type"],
        associatedStores: [
          "INSTACART"
        ],
        details: row["Details"],
        comments: (row["Comments"] && row["Comments"] !== "") ? JSON.parse(row["Comments"]) : undefined,
        stats: {
          Farm:  parseFloat(row["Farm"]),
          Processing:  parseFloat(row["Processing"]),
          Transport:  parseFloat(row["Transport"]),
          Packaging:  parseFloat(row["Packaging"]),
          Retail:  parseFloat(row["Retail"]),
          Total_emissions:  parseFloat(row["Total_emissions"]),
        }
      });
      inventoryArray.push(inventoryItem);;
    })
    .on('end', () => {
      let uniqueTypes: string[] = [];
      uniqueTypes = inventoryArray.filter((x) =>
        !uniqueTypes.includes(x.category as string)).map(
          (row: InventoryItem) => (row.category as string));
      let finalNormalized: InventoryItem[] = [];
      finalNormalized = normalizeTotalScore('totalScore', inventoryArray, uniqueTypes, []);
      finalNormalized = normalizeField('Farm', finalNormalized, uniqueTypes, []);
      finalNormalized = normalizeField('Processing', finalNormalized, uniqueTypes, []);
      finalNormalized = normalizeField('Transport', finalNormalized, uniqueTypes, []);
      finalNormalized = normalizeField('Packaging', finalNormalized, uniqueTypes, []);
      finalNormalized = normalizeField('Retail', finalNormalized, uniqueTypes, []);

      let purchaseArray = [{
        purchaseDate: '2020-04-14',
        buyerUsername: 'KimPeppermint',
        items: [ inventoryArray[0], inventoryArray[12], inventoryArray[16], inventoryArray[36], inventoryArray[40] ],
        score: 4,
        store: "INSTACART",
        totalCost: 34,
        buyerIp: 'xxx'
      },
      {
        purchaseDate: '2020-04-14',
        buyerUsername: 'KimPeppermint',
        items: [ inventoryArray[5], inventoryArray[7], inventoryArray[9], inventoryArray[11], inventoryArray[22], inventoryArray[29] ],
        score: 4,
        store: "INSTACART",
        totalCost: 34,
        buyerIp: 'xxx'
      }]
      purchaseArray.forEach(purchase => {
        this.purchaseRepo.create(new Purchase(purchase));
      });

      this.writeNext(0, inventoryArray);

      console.log('CSV file successfully processed');
    });
  };

  writeNext = (start: number, array: InventoryItem[]) =>
  {
      console.log("Writing iteration " + start);
      let i = start;
      for( i = start; i < array.length; i++){
        this.inventoryRepo.create(new InventoryItem(array[i]));
        if(i === array.length - 1){
          return;
        }
        if(i === start + 5){
          break;
        }
      }
      setTimeout(() => 
      {
        this.writeNext(i + 1, array);
      }, 2000);
  }

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

    this.importCSV();
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
