export const getWeapons = (moves) => {
  let weapons = [];
  moves.forEach(({ move, kills }) => weapons.push.apply(weapons, [move, kills]));
  return [...new Set(weapons)].map(weapon => ({ name: weapon, value: weapon }));
};
