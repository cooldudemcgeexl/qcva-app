import pandas as pd

from models.models import PoleRate
from decimal import Decimal


def get_pole_rates(rates: pd.DataFrame, pole_info: pd.DataFrame):

    pole_rates = [PoleRate.from_series(row) for _, row in rates.iterrows()]

    pole_rate_dict = {pole_rate.length: pole_rate for pole_rate in pole_rates}

    prices_per_length = pole_info.groupby(
        ["L"]
    ).first()  # Please never add per-pole rates, currently unique per length

    for idx, row in prices_per_length.iterrows():
        if pole_rate := pole_rate_dict.get(str(idx)):
            pole_rate.rent_season = Decimal(row["Seas."].item())  # Shennanigans to make np.int64 parse to Decimal
            pole_rate.rent_month = Decimal(row["Mont."].item())  # np.int64 -> python int -> Decimal

    return list(pole_rate_dict.values())
