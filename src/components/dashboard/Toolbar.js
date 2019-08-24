import React from 'react'

import './Toolbar.css'
import Togglebutton from './Togglebutton';

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div />
      <div> <Togglebutton click={ props.drawerClickHandler}/>
      </div>
      <div className="toolbar__logo">
        <a href="/">NINELEAPS TEST SUITE MANAGEMENT</a>
      </div>
      <div className="spacer" />
      <div className="toolbar_navigation-items">
        <ul>
          <li>
            <a href="/">UserName</a>
          </li>
          <li>
            <a href="/">Help</a>
          </li>
          <li>
            <a href="/">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
)

export default toolbar

