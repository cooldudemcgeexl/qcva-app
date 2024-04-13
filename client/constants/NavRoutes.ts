import { NavRoute } from "@/components/nav/NavDrawer"

export const navRoutes: NavRoute[] = [
  {
    name: "index",
    routeOptions: { drawerLabel: "Home", title: "Home" }
  },
  {
    name: 'customers',
    routeOptions: { drawerLabel: "Customers", title: "Customers" }
  },
  {
    name: 'inventory/index',
    routeOptions: { drawerLabel: "Inventory", title: "Inventory" }
  },
  {
    name: 'history',
    routeOptions: { drawerLabel: "Order History", title: "Order History" }
  }
]