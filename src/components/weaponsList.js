import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { uuid } from '../model/system/string';

export default function WeaponsList({ player, handleSelectWeapon, weapons }) {
  const { name, weapon: playerWeapon, label } = player;
  const MenuProps = { PaperProps: { style: { maxHeight: 200 } } };

  return (
    <FormControl className="select-weapon__from-control">
      <InputLabel htmlFor={`${label}-weapons`}>{`${name}´s weapon:`}</InputLabel>
      <Select
        MenuProps={MenuProps}
        value={playerWeapon}
        onChange={e => handleSelectWeapon(e, label)}
        inputProps={{
          name: `${label}-weapons`,
          id: `${label}-weapons`,
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {weapons.map(weapon => (
          <MenuItem value={weapon.value} key={`weapon-${uuid()}`}>
            {weapon.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

WeaponsList.propTypes = {
  handleSelectWeapon: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  weapons: PropTypes.array.isRequired,
};
