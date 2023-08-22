import { useRouter, useSegments } from "expo-router";
import React from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import { Auth } from "aws-amplify";


const AuthContext = React.createContext(null);

export function useAuth() {
  return React.useContext(AuthContext);
}

function useProtectedRoute(user) {
  
  const rootSegment = useSegments()[0];
  const router = useRouter();

  React.useEffect(() => {
    if (user === undefined) {
      return;
    }

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      rootSegment !== "(auth)"
    ) {
      // nav.dispatch(
      //   StackActions.replace("(auth)/sign-in", {
      //     // user: 'jane',
      //   })
      // );
      // Redirect to the sign-in page.
      
      router.replace("/login");
    } else if (user && rootSegment !== "(onboarding)") {
      // Redirect away from the sign-in page.
      router.replace("/");
      // router.replace("/compose");
      // nav.dispatch(
      //   StackActions.replace("(app)", {
      //     // user: 'jane',
      //   })
      // );
    }
  }, [user, rootSegment]);
}

export function Provider(props) {
  const { getItem, setItem, removeItem } = useAsyncStorage("USER");
  const [user, setUser] = React.useState(undefined);

  React.useEffect(() => {
    async function checkAuth() {
      try {
        console.log("checkAuth");
        const authUser = await Auth.currentAuthenticatedUser();
        console.log("authUser");
        console.log(authUser);
        setUser(authUser);
      } catch (error) {
        console.log("error");
        console.log(error);
        setUser(null);
      }
    }

    checkAuth();
  }, []);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          setUser({});
          setItem(JSON.stringify({}));
        },
        signOut: () => {
          setUser(null);
          removeItem();
        },
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
