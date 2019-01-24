import React from 'react';
import { shallow, mount } from 'enzyme';
import ConfirmationDialog from '../../components/confirmDialog';

describe('ConfirmationDialog tests', () => {
  it('should render ConfirmationDialog', () => {
    const component = shallow(<ConfirmationDialog />);
    expect(component).toMatchSnapshot();
  });

  it('should render ConfirmationDialog with props', () => {
    const component = shallow(<ConfirmationDialog open={false} onClose={() => {}} />);
    expect(component).toMatchSnapshot();
  });

  it('simulates click events', () => {
    const onButtonClick = jest.fn();
    const wrapper = mount(<ConfirmationDialog open onClose={onButtonClick} />);
    wrapper.find('button').at(0).simulate('click');
    expect(onButtonClick).toHaveBeenCalled();
  });
});
