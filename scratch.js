
/*
Follow instructions, gatsby to make static pages with ID and name in the URLs
but ... might suggest making the table more 
rich , more rows, or compound cells
  benefit: easier comparison
  assumption: audience is geek
  assumption: audience is at work, on monitor, mobile not supported

expandable row instead of page ... seo

https://codesandbox.io/s/3x51yzollq
[].slice.call
sparkline to show height, weight, spawn chance
represent state in the URL, share links
  useDocumentTitle - 
evol - other - sub row
*/
flexbox.md - links
{
  "pokemon": [{
  id: 99,
  num: '099',
  name: 'Kingler',
  img: 'http://www.serebii.net/pokemongo/pokemon/099.png',
  type: [Array],
  height: '1.30 m',
  weight: '60.0 kg',
  candy: 'Krabby Candy',
  egg: 'Not in Eggs',
  spawn_chance: 0.062,
  avg_spawns: 6.2,
  spawn_time: '03:44',
  multipliers: null,
  weaknesses: [Array],
  prev_evolution: [Array]
},
data = require('./pokedex.json')
p = data.pokemon
uniqueTypes = p.reduce((tally,p)=>{ // filter, indexOf, or maybe for loop
  //console.log(p.type)
  return [...new Set( [...tally, ...p.type] )]
},[]) // 
uniqueWeaknesses = p.reduce((tally,p)=>{ // filter, indexOf, or maybe for loop
  //console.log(p.type)
  return [...new Set( [...tally, ...p.weaknesses] )]
},[]) // 