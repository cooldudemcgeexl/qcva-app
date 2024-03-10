import argparse
from pathlib import Path
import numpy as np
import pandas as pd
from typing import NamedTuple

from parsers.pole_rate import get_pole_rates


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

    print(poles_df)

    pole_rates_dict = get_pole_rates(rates=rates_df, pole_info=poles_df[["L", "Seas.", "Mont."]])
    for rate in pole_rates_dict.values():
        print(rate.model_dump_json(by_alias=True))
