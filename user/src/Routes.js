import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import {
  Dashboard as DashboardView,
  NotFound as NotFoundView, 
  Settings as SettingsView,
  Login,
  Register
} from './views';


const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/login"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />

      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
       <RouteWithLayout
        component={Login}
        exact
        layout={MinimalLayout}
        path="/login"
      />      
       <RouteWithLayout
        component={Register}
        exact
        layout={MinimalLayout}
        path="/register"
      />      
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
