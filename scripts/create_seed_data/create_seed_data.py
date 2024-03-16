import argparse
from parsers.customer import get_customers
from parsers.order import get_orders
import ujson
from pathlib import Path
import numpy as np
import pandas as pd
from typing import NamedTuple
from parsers.pole_rate import get_pole_rates
from parsers.pole import get_poles
from models.models import serialize_model_list


class ParseArgs(NamedTuple):
    input_file: str
    output_file: str


def set_up_arg_parser():
    parser = argparse.ArgumentParser(description="Generate seed data JSON from XLSX")
    parser.add_argument("input_file", help="Input xlsx file")
    parser.add_argument("output_file", help="Output json file")
    return parser


if __name__ == "__main__":
    args: ParseArgs = set_up_arg_parser().parse_args()
    in_file = Path(args.input_file)
    out_file = Path(args.output_file)
    with pd.ExcelFile(in_file) as xls:
        rates_df = pd.read_excel(xls, "Pole Rates", skiprows=2, usecols="B:G", na_values="-").replace({np.nan: None})
        poles_df = pd.read_excel(xls, "Poles", skiprows=2, usecols="A:P").replace({np.nan: None})
        customers_df = pd.read_excel(
            xls, "Customer", skiprows=2, nrows=44, usecols="A:I", dtype={"Zip": str, "Phone": str}
        ).replace({np.nan: None})
        orders_df = pd.read_excel(xls, "Orders", skiprows=2, usecols="A:G").replace({np.nan: None})
        order_items_df = pd.read_excel(xls, "OrderItems", skiprows=2, usecols="A:E", na_values="-").replace(
            {np.nan: 0}
        )

    pole_rates = get_pole_rates(rates=rates_df, pole_info=poles_df[["L", "Seas.", "Mont."]])
    poles, pole_history = get_poles(poles_df)
    customers, cust_ids = get_customers(customers_df)
    orders, order_items = get_orders(orders_df, order_items_df, cust_ids)

    obj_dict = {
        "poles": serialize_model_list(poles),
        "poleHistory": serialize_model_list(pole_history),
        "poleRates": serialize_model_list(pole_rates),
        "customers": serialize_model_list(customers),
        "orders": serialize_model_list(orders),
        "orderItems": serialize_model_list(order_items),
    }

    with open(out_file, mode="w", encoding="utf-8") as of:
        ujson.dump(obj_dict, of, indent=2)
