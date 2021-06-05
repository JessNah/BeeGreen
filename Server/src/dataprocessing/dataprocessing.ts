
import {InventoryItem} from '../models';

export const normalizeTotalScore = (field: string, inventoryArray: InventoryItem[], uniqueTypes: string[], finalNormalized: InventoryItem[]) => {
  for(let i = 0; i < uniqueTypes.length; i++){
    let typedArr:{[key:string]:any} = inventoryArray.filter((x) =>
      x.category === uniqueTypes[i]);
    let max = -99999999999999;
    let min = 9999999999999;
    let avg = 0;
    for(let j = 0; j < typedArr.length; j++){
      if(typedArr[j][field] && (typedArr[j][field] as number < min)) {
        min = typedArr[j][field] as number;
      }          
      if(typedArr[j][field]  && (typedArr[j][field] as number > max)) {
        max = typedArr[j][field] as number;
      }
      avg += typedArr[j][field] as number;
    }
    avg = avg / typedArr.length;
    if(max !== min){
      //pretty good items... rate them on the lower side
      //TODO: REVIEW MIN
      min = 0; //if we leave min as min, then lowest value is always 0% bad
      //make the values more dynamic
      //otherwise 0.5 if it is max, the value becomes 100% bad.
      //with below, if the average is closer to the max, a value with max is less bad
      //if the average is really good but the max is very bad, then a value with max will be more bad
      let addition = avg !== 0 ? (max * 0.2)/(max - avg) : 0;
      if( addition !== 0 && addition / max > 0.5) {
        addition = 0;
      }
      max = addition !== 0 ? (max + addition) : (max * 1.2);
    }
    for(let j = 0; j < typedArr.length; j++){
      const typedObj:{[key:string]:any} = {...typedArr[j]};
      if(typedObj){
        if(min === max){
          //likely single item.
          if(typedObj[field] > 10){
            typedObj[field] = 10;
          } else if(typedObj[field] < 0) {
            typedObj[field] = 0;
          } else {
            typedObj[field] = typedObj[field];
          }
        } else if(typedObj[field]) {
          //remember, lower is good.          
          //set score out of 10.
          // if(max < 1){
          //   const equilibriumVal = ((typedObj[field] as number - min)/(max - min))*10;
          //   typedObj[field] = (equilibriumVal * 3) / 10; //give a good low score.. out of 3.
          // } else if(max < 2){
          //   const equilibriumVal = ((typedObj[field] as number - min)/(max - min))*10;
          //   typedObj[field]= (equilibriumVal * 5) / 10; //give avg score.. around 5 max
          // } else if(max < 3){
          //   const equilibriumVal = ((typedObj[field] as number - min)/(max - min))*10;
          //   typedObj[field] = (equilibriumVal * 6) / 10; //give avg score.. around 6 max
          // } else {
          //   const equilibriumVal = ((typedObj[field] as number - min)/(max - min))*10;
          //   typedObj[field] = (equilibriumVal * 10) / 10; //leave out of 10
          // }

          if(avg / max < 0.25) { //avg is small so pretty good quality average
            const equilibriumVal = ((typedObj[field] as number - min)/(max - min))*10;
            typedObj[field] = (equilibriumVal * 5) / 10; //give a good low score.. out of 5
          } else if(avg / max < 0.5) { //avg is less than midway
            const equilibriumVal = ((typedObj[field] as number - min)/(max - min))*10;
            typedObj[field] = (equilibriumVal * 8) / 10; //give avg score.. around 8 max
          } else if(avg / max < 0.75) { //avg is closerside to max
            const equilibriumVal = ((typedObj[field] as number - min)/(max - min))*10;
            typedObj[field] = (equilibriumVal * 9) / 10; //give avg score.. around 9 max
          } else { //avg is really close to max
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
    let avg = 0;
    for(let j = 0; j < typedArr.length; j++){
      if(typedArr[j].stats[field] !== undefined && (typedArr[j].stats[field] as number < min)) {
        min = typedArr[j].stats[field] as number;
      }   
      if(typedArr[j].stats[field] !== undefined && (typedArr[j].stats[field] as number > max)) {
        max = typedArr[j].stats[field] as number;  
      }
      avg += typedArr[j].stats[field] as number;
    }
    avg = avg / typedArr.length;
    let diff = 0;
    if(min < 0){ //offscale to account for negatives.
      diff = 0 - min;
      min = min + diff;
      max = max + diff;
      //reassess average
      avg = 0;
      for(let j = 0; j < typedArr.length; j++){
        avg += (typedArr[j].stats[field] + diff) as number;
      }
      avg = avg / typedArr.length;
    }
    if(max !== min){
      //TODO: REVIEW MIN
      min = 0; //if we leave min as min, then lowest value is always 0% bad
      //make the values more dynamic
      //otherwise 0.5 if it is max, the value becomes 100% bad.
      //with below, if the average is closer to the max, a value with max is less bad
      //if the average is really good but the max is very bad, then a value with max will be more bad      
      let addition = avg !== 0 ? (max * 0.2)/(max - avg) : 0;
      if( addition !== 0 && addition / max > 0.5) {
        addition = 0;
      }
      max = addition !== 0 ? (max + addition) : (max * 1.2);
    }
    for(let j = 0; j < typedArr.length; j++){
      const typedObj:{[key:string]:any} = {...typedArr[j]};
      if(typedObj){
        if(diff !== 0){ //handle offset
          typedObj.stats[field] = typedObj.stats[field] + diff;
        }
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
          //pretty good items... rate them on the lower side
          //set score out of 10.
          // if(max < 1){
          //   const equilibriumVal = ((typedObj.stats[field] as number - min)/(max - min))*10;
          //   typedObj.stats[field + "_normalized"] = (equilibriumVal * 3) / 10; //give a good low score.. out of 3.
          // } else if(max < 2){
          //   const equilibriumVal = ((typedObj.stats[field] as number - min)/(max - min))*10;
          //   typedObj.stats[field + "_normalized"]= (equilibriumVal * 5) / 10; //give avg score.. around 5 max
          // } else if(max < 3){
          //   const equilibriumVal = ((typedObj.stats[field] as number - min)/(max - min))*10;
          //   typedObj.stats[field + "_normalized"] = (equilibriumVal * 6) / 10; //give avg score.. around 6 max
          // } else {
          //   const equilibriumVal = ((typedObj.stats[field] as number - min)/(max - min))*10;
          //   typedObj.stats[field + "_normalized"] = (equilibriumVal * 10) / 10; //leave out of 10
          // }
          if(avg / max < 0.25) { //avg is small so pretty good quality average
            const equilibriumVal = ((typedObj.stats[field] as number - min)/(max - min))*10;
            typedObj.stats[field + "_normalized"] = (equilibriumVal * 5) / 10; //give a good low score.. out of 5
          } else if(avg / max < 0.5) { //avg is less than midway
            const equilibriumVal = ((typedObj.stats[field] as number - min)/(max - min))*10;
            typedObj.stats[field + "_normalized"]= (equilibriumVal * 8) / 10; //give avg score.. around 8 max
          } else if(avg / max < 0.75) { //avg is closerside to max
            const equilibriumVal = ((typedObj.stats[field] as number - min)/(max - min))*10;
            typedObj.stats[field + "_normalized"] = (equilibriumVal * 9) / 10; //give avg score.. around 9 max
          } else { //avg is really close to max
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