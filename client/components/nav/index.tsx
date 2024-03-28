import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavDrawer from "./NavDrawer";
import { navRoutes } from "@/constants/NavRoutes";

export default function NavDrawerContainer() {
  return (
    <GestureHandlerRootView className="flex-1">
      <NavDrawer routes={navRoutes}></NavDrawer>
    </GestureHandlerRootView>
  );
}
