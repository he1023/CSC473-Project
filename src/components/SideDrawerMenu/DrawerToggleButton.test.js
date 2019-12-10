import React from 'react';
import { shallow } from 'enzyme';
import DrawerToggleButton from './DrawerToggleButton'


describe('<DrawerToggleButton/> component testing', () => {
    let wrapper;
    it("check button click", () => {
        wrapper = shallow(<DrawerToggleButton/ >);
        expect(wrapper.find('button.toggle-button').length).toBe(1)
    
            

    })
})