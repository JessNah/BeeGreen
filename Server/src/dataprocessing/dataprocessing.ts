
import {InventoryItem} from '../models';

export const normalizeTotalScore = (field: string, inventoryArray: InventoryItem[], uniqueTypes: string[], finalNormalized: InventoryItem[]) => {
  for(let i = 0; i < uniqueTypes.length; i++){
    let typedArr:{[key:string]:any} = inventoryArray.filter((x) =>
      x.category === uniqueTypes[i]);
    let max = -99999999999999;
    let min = 9999999999999;
    for(let j = 0; j < typedArr.length; j++){
      if(typedArr[j][field] && (typedArr[j][field] as number < min)) {
        min = typedArr[j][field] as number;
      }          
      if(typedArr[j][field]  && (typedArr[j][field] as number > max)) {
        max = typedArr[j][field] as number;
      }
    }
    for(let j = 0; j < typedArr.length; j++){
      const typedObj:{[key:string]:any} = {...typedArr[j]};
      if(typedObj){
        if(min === max){
          continue;
        } else if(typedObj[field]) {
          //remember, lower is good.
          //pretty good items... rate them on the lower side
          if(max < 1){
            const equilibriumVal = ((typedObj[field] as number - min)/(max - min))*10;
            typedObj[field] = (equilibriumVal * 3) / 10; //give a good low score.. out of 3.
          } else if(max < 2){
            const equilibriumVal = ((typedObj[field] as number - min)/(max - min))*10;
            typedObj[field]= (equilibriumVal * 5) / 10; //give avg score.. around 5 max
          } else if(max < 3){
            const equilibriumVal = ((typedObj[field] as number - min)/(max - min))*10;
            typedObj[field] = (equilibriumVal * 6) / 10; //give avg score.. around 6 max
          } else {
            const equilibriumVal = ((typedObj[field] as number - min)/(max - min))*10;
            typedObj[field] = (equilibriumVal * 10) / 10; //leave out of 10
          }
        }
      }
      finalNormalized = [...finalNormalized, typedObj as InventoryItem];
    }
  }
  return finalNormalized;
}

export const normalizeField = (field: string, inventoryArray: InventoryItem[], uniqueTypes: string[], finalNormalized: InventoryItem[]) => {
  for(let i = 0; i < uniqueTypes.length; i++){
    let typedArr:{[key:string]:any} = inventoryArray.filter((x) =>
      x.category === uniqueTypes[i]);
    let max = -99999999999999;
    let min = 9999999999999;
    for(let j = 0; j < typedArr.length; j++){
      if(typedArr[j].stats[field] && (typedArr[j].stats[field] as number < min)) {
        min = typedArr[j].stats[field] as number;
      }          
      if(typedArr[j].stats[field]  && (typedArr[j].stats[field] as number > max)) {
        max = typedArr[j].stats[field] as number;
      }
    }        
    for(let j = 0; j < typedArr.length; j++){
      const typedObj:{[key:string]:any} = {...typedArr[j]};
      if(typedObj){
        if(min === max){
          //likely single item.
          if(typedObj.stats[field] > 10){
            typedObj.stats[field + "_normalized"] = 10;
          } else if(typedObj.stats[field] < 0) {
            typedObj.stats[field + "_normalized"] = 0;
          } else {
            typedObj.stats[field + "_normalized"] = typedObj.stats[field];
          }
        } else if(typedObj.stats[field]) {
          //remember, lower is good.
          if(max < 1){
            const equilibriumVal = ((typedObj.stats[field] as number - min)/(max - min))*10;
            typedObj.stats[field + "_normalized"] = (equilibriumVal * 3) / 10; //give a good low score.. out of 3.
          } else if(max < 2){
            const equilibriumVal = ((typedObj.stats[field] as number - min)/(max - min))*10;
            typedObj.stats[field + "_normalized"]= (equilibriumVal * 5) / 10; //give avg score.. around 5 max
          } else if(max < 3){
            const equilibriumVal = ((typedObj.stats[field] as number - min)/(max - min))*10;
            typedObj.stats[field + "_normalized"] = (equilibriumVal * 6) / 10; //give avg score.. around 6 max
          } else {
            const equilibriumVal = ((typedObj.stats[field] as number - min)/(max - min))*10;
            typedObj.stats[field + "_normalized"] = (equilibriumVal * 10) / 10; //leave out of 10
          }
        }
      }
      finalNormalized = [...finalNormalized, typedObj as InventoryItem];
    }
  }
  return finalNormalized;
}