
export const getRatingOutOf5 = (item) => {
  //inverse score first 10 - score.. cause small number is good here.
  //but for stars we need bigger is better. then normalize to out of 5.
  const rating = ((10 - item.score) / 10) * 5;
  const ratingRounded = Math.round(rating*2)/2; //keep decimal values for 0.5
  return ratingRounded
}