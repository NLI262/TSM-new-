import React from "react";
import "./Sidedrawer.css";
const Sidedrawer = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <div>
      <nav className={drawerClasses}>
        <br></br>
        <ul type="none">
          <li>
            <a href="/">Dashboard Overview</a>
            &nbsp; <i class="fas fa-tachometer-alt fa-1x"></i>
          </li>
          <br></br>
          <li>
            <a href="/pp">Customizations</a>{" "}
            <i class="fa fa-gear fa-spin fa-1x"></i>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidedrawer;
