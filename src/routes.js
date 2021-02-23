import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./layout/components";
import WithModel from "./withModel";

export const routes = (
  <Layout sidebarCollapsed={false}>
    <Switch>
      <Route
        exact={true}
        path={`${process.env.PUBLIC_URL}/`}
        component={WithModel}
      />
    </Switch>
  </Layout>
);
