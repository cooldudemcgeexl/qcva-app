import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";

const initRoute: string | undefined = "inventory";

export interface NavRoute {
  name: string;
  routeOptions: DrawerNavigationOptions;
}

export interface NavDrawerProps {
  routes: NavRoute[];
}

export default function NavDrawer(props: NavDrawerProps) {
  return (
    <Drawer initialRouteName={initRoute}>
      {props.routes.map(({ name, routeOptions }) => (
        <Drawer.Screen
          name={name}
          options={routeOptions}
          key={name}
        ></Drawer.Screen>
      ))}
    </Drawer>
  );
}
