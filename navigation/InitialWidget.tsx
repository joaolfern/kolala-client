import { useEffect } from "react";

import Login from "../screens/Login";
import { useAppSelector } from "../store/hooks";
import { selectToken } from "../store/tokenSlice";
import Navigation from ".";

function InitialWidget() {
  const token = useAppSelector(selectToken);

  useEffect(() => {
    return () => {};
  }, [token]);

  return token ? <Navigation /> : <Login />;
}

export default InitialWidget;
