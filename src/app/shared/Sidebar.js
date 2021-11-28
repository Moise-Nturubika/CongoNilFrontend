import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  } 
  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="index.html"><img src={require("../../assets/images/logo.svg")} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="index.html"><img src={require("../../assets/images/logo-mini.svg" )} alt="logo" /></a>
        </div>
        <ul className="nav">
          <li className={ this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/dashboard">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><Trans>Accueil</Trans></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/client') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/client">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><Trans>Client</Trans></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/product') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/product">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><Trans>Produit</Trans></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/command') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/command">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><Trans>Command</Trans></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/fournisseur') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/fournisseur">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><Trans>Fournisseur</Trans></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/approvissionnement') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/approvissionnement">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><Trans>Approvisionnement</Trans></span>
            </Link>
          </li>
          {/* <li className={ this.isPathActive('/form-elements/basic-elements') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/form-Elements/basic-elements">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><Trans>Utilisateur</Trans></span>
            </Link>
          </li> */}
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);