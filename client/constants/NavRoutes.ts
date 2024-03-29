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
    name: 'inventory',
    routeOptions: { drawerLabel: "Inventory", title: "Inventory" }
  }
]