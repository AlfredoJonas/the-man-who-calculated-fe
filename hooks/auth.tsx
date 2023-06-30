import { useRouter } from "next/router";
import React, { ComponentType, PropsWithChildren } from "react";

const withAuthRedirect = <P extends object>(Component: ComponentType<P>): ComponentType<P> => {
  const AuthRedirectWrapper = (props: PropsWithChildren<P>): JSX.Element | null => {
    const router = useRouter();
    if (typeof localStorage !== 'undefined') {
      const loggedIn = localStorage.getItem('logged_in');
      if (loggedIn === '1') {
        console.log('Auth hook');
        router.push('/');
        return null;
      }
    }
    return <Component {...props} />;
  };
  return AuthRedirectWrapper;
};

export default withAuthRedirect;
