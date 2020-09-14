import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import {
  Dashboard as DashboardView,
  NotFound as NotFoundView, JobsList as JobListView,
  Settings as SettingsView, UserList as UserListView,
  Login as LoginView, Register as RegisterView
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
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={JobListView}
        exact
        layout={MainLayout}
        path="/jobs"
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
        component={LoginView}
        exact
        layout={MinimalLayout}
        path="/login"
      />      
       <RouteWithLayout
        component={RegisterView}
        exact
        layout={MinimalLayout}
        path="/register"
      />      
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
