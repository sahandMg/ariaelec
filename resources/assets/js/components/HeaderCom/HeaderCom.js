import React from 'react';
import DesktopHeader from './DesktopHeader/DesktopHeader';
import ResponsiveHeader from './ResponsiveHeader/ResponsiveHeader';

const HeaderCom = (props) => (
    <header>
      <DesktopHeader/>
      <ResponsiveHeader/>
    </header>
);

export default HeaderCom;

