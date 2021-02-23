import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import Octicon, { Home, TriangleRight } from "@githubprimer/octicons-react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { toggleSidebar } from "../reducers";
import "./layout.css";

class Layout extends Component {
  render() {
    var sideBarClassNames = classNames({
      active: !this.props.showSidebar
    });

    var sideBarCollapseClassNames = classNames(
      { active: !this.props.showSidebar },
      "navbar-btn"
    );

    return (
      <div>
        <div className="wrapper">
          <nav id="sidebar" className={sideBarClassNames}>
            <div className="sidebar-header">
              <img
                src="http://morrisgcc.com/assets/site/images/logo-white.png"
                alt="Morris Elevators"
              />
            </div>

            <ul className="list-unstyled components">
              <h3 className="sidebar-h3">Menu</h3>
              <NavItem>
                <NavLink
                  exact={true}
                  to={`${process.env.PUBLIC_URL}/`}
                  activeClassName="active"
                  className="nav-link"
                >
                  <Octicon icon={Home} /> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to={`${process.env.PUBLIC_URL}/defaultPlayground`}
                  activeClassName="active"
                  className="nav-link"
                >
                  <Octicon icon={TriangleRight} /> Default Playground
                </NavLink>
              </NavItem>
            </ul>
          </nav>
          <div id="content">
            <div style={{ marginTop: "35px" }}>{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  sidebarCollapsed: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleSidebar: () => {
      dispatch(toggleSidebar());
    }
  };
};

const mapStateToProps = state => {
  return state.layout;
};

const LayoutConnected = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Layout)
);

export default LayoutConnected;
