import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavDrawer from "./NavDrawer";
import { navRoutes } from "@/constants/NavRoutes";
import { Slot } from "expo-router";

export default function NavDrawerContainer() {
  return (
    <GestureHandlerRootView className="flex-1">
      <NavDrawer routes={navRoutes}></NavDrawer>
    </GestureHandlerRootView>
  );
}
