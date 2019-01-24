import { getWeapons } from '../../../model/utils/buildWeaponsList';

const mockedConfig = [
  {
    _id: '5c4386ade09f248cabaad41d',
    __v: 0,
    moves: [{ _id: '5c48f7873a04024788962776', move: 'piedra', kills: 'tijera' },
      { _id: '5c48f7873a04024788962775', move: 'papel', kills: 'piedra' },
      { _id: '5c48f7873a04024788962774', move: 'tijera', kills: 'papel' }],
  },
];

const mockedWeaponList = [
  { name: 'piedra', value: 'piedra' },
  { name: 'tijera', value: 'tijera' },
  { name: 'papel', value: 'papel' },
];

it('Should get the weapons list out of the movements list', () => {
  const weaponsList = getWeapons(mockedConfig[0].moves);
  expect(weaponsList).toEqual(mockedWeaponList);
});
