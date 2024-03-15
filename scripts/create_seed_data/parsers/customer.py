import pandas as pd
from models.models import Customer


def get_customers(customers: pd.DataFrame) -> tuple[list[Customer], dict[str, str]]:
    customer_list = []
    cust_id_dict = {}

    for _, row in customers.iterrows():
        customer = Customer.from_series(row)
        customer_list.append(customer)
        cust_id_dict[f"{customer.first_name} {customer.last_name}"] = customer.id

    return customer_list, cust_id_dict
