import React from 'react';
import {
  Redirect, RouteProps, Route as ReactRouter,
} from 'react-router-dom';
import { getUser } from '@/utils/storageUtils';
import routerPath from '@/router/router-path';
import BasicLayout from '@/Layouts/basic-layout';
import NoAuth from '@/pages/NoAuth';

interface RouteDesignProps extends RouteProps {
  needLoginFlag?: boolean
}

export const
  MainControllerRoute: React.FC<RouteDesignProps> = (props) => {
    const { component: Component, needLoginFlag = false, ...rest } = props;
    if (!Component) return null;

    return (
      <BasicLayout>
        <ReactRouter
          {...rest}
          render={() => {
            if (!getUser() && needLoginFlag) {
              return (
                <ReactRouter>
                  <Redirect to={routerPath.NoAuth} />
                  <NoAuth />
                </ReactRouter>
              );
            }
            return <ReactRouter {...props} />;
          }}
        />
      </BasicLayout>
    );
  };
