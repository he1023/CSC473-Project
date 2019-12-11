import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './Navbar';



describe('<navbar /> component testing', () => {
    test('navbar render testing', () => {
  
      const nav= shallow(<Navbar  />);

      expect(nav.text()).toEqual('Sign in<DrawerToggleButton /><Authenticator />');
      //expect(nav.find('div.navbar').length).toBe(1)
  
});

test('navbar render testing', () => {
  
    const nav= shallow(<Navbar  />);
    expect(nav.find('Navbar.navigation').length).toBe(1)

})


})