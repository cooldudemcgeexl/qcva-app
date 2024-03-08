import argparse
from decimal import Decimal
from pathlib import Path
import numpy as np
import pandas as pd
from typing import Hashable, NamedTuple

from models.models import Customer, PoleRate


class ParseArgs(NamedTuple):
    input_file: str
    output_file: str


def set_up_arg_parser():
    parser = argparse.ArgumentParser(description="Generate seed data JSON from XLSX")
    parser.add_argument("input_file", help="Input xlsx file")
    parser.add_argument("output_file", help="Output json file")
    return parser


def get_pole_rates(rates: pd.DataFrame, pole_info: pd.DataFrame) -> dict[str, PoleRate]:

    pole_rates = [parse_pole_rate(row) for _, row in rates.iterrows()]

    pole_rate_dict = {pole_rate.length: pole_rate for pole_rate in pole_rates}

    prices_per_length = pole_info.groupby(
        ["L"]
    ).first()  # Please never add per-pole rates, currently unique per length

    for idx, row in prices_per_length.iterrows():
        if pole_rate := pole_rate_dict.get(str(idx)):
            pole_rate.rent_season = Decimal(row["Seas."].item())  # Shennanigans to make np.int64 parse to Decimal
            pole_rate.rent_month = Decimal(row["Mont."].item())  # np.int64 -> python int -> Decimal

    return pole_rate_dict


def parse_pole_rate(row: pd.Series) -> PoleRate:
    return PoleRate(
        length=row["Length"],
        new=row["New"],
        club_new=row["Club New"],
        used=row["Used"],
        club_used=row["Club Used"],
    )


if __name__ == "__main__":
    args: ParseArgs = set_up_arg_parser().parse_args()
    in_file = Path(args.input_file)
    out_file = Path(args.output_file)
    with pd.ExcelFile(in_file) as xls:
        rates_df = pd.read_excel(xls, "Pole Rates", skiprows=2, usecols="B:G", na_values="-").replace({np.nan: None})
        poles_df = pd.read_excel(xls, "Poles", skiprows=2, usecols="A:P").replace({np.nan: None})

    print(poles_df)

    pole_rates_dict = get_pole_rates(rates=rates_df, pole_info=poles_df[["L", "Seas.", "Mont."]])
    for rate in pole_rates_dict.values():
        print(rate.model_dump_json(by_alias=True))
