import pandas as pd

from models.models import Order, OrderItem


def get_orders(orders: pd.DataFrame, order_items: pd.DataFrame, customer_ids: dict[str, str]):
    order_list = []
    order_id_dict = {}
    order_item_list = []

    for _, row in orders.iterrows():
        cust_name = row["Customer"]
        cust_id = customer_ids[cust_name]
        order = Order.from_series(row, customer_id=cust_id)
        order_list.append(order)
        order_id_dict[row["Order #"]] = order.id

    for _, row in order_items.iterrows():
        order_id = order_id_dict[row["Order ID"]]
        order_item = OrderItem.from_series(row, order_id=order_id)
        order_item_list.append(order_item)

    return order_list, order_item_list
