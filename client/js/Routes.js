import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import UILoadingSpinner from "./components/sharedComponents/UILoadingSpinner";

class DynamicImport extends Component {
  state = { component: null };

  componentWillMount() {
    this.props
      .load()
      .then((mod) => this.setState(() => ({ component: mod.default })));
  }

  render() {
    return this.props.children(this.state.component);
  }
}

const LoginContainer = (props) => (
  <DynamicImport load={() => import("./containers/LoginContainer")}>
    {(Component) =>
      !Component ? <UILoadingSpinner /> : <Component {...props} />
    }
  </DynamicImport>
);

const ErrorPage = (props) => (
  <DynamicImport load={() => import("./components/ErrorPage")}>
    {(Component) =>
      !Component ? <UILoadingSpinner /> : <Component {...props} />
    }
  </DynamicImport>
);

const HomePageContainer = (props) => (
  <DynamicImport load={() => import("./containers/HomePageContainer")}>
    {(Component) =>
      !Component ? <UILoadingSpinner /> : <Component {...props} />
    }
  </DynamicImport>
);

const SignupContainer = (props) => (
  <DynamicImport load={() => import("./containers/SignupContainer")}>
    {(Component) =>
      !Component ? <UILoadingSpinner /> : <Component {...props} />
    }
  </DynamicImport>
);

const ProtectedRoute = (props) => (
  <DynamicImport load={() => import("./components/auth/ProtectedRoute")}>
    {(Component) =>
      !Component ? <UILoadingSpinner /> : <Component {...props} />
    }
  </DynamicImport>
);

const BoardContainer = (props) => (
  <DynamicImport load={() => import("./containers/BoardContainer")}>
    {(Component) =>
      !Component ? <UILoadingSpinner /> : <Component {...props} />
    }
  </DynamicImport>
);

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute key="/" exact path="/" component={HomePageContainer} />
      <ProtectedRoute
        key="boardDetail"
        path="/boards/id/:id"
        component={BoardContainer}
      />

      <Route
        path="/login"
        render={(props) => <LoginContainer key="login" {...props} />}
      />
      <Route
        path="/signup"
        render={(props) => <SignupContainer key="signup" {...props} />}
      />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
};

export default Routes;