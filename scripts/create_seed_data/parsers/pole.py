import pandas as pd

from models.models import Pole, PoleHistory


def build_history(history: str, pole_id: int) -> list[PoleHistory]:
    return [PoleHistory(pole_id=pole_id, comment=hist_entry) for hist_entry in history.split(";")]


def get_poles(poles: pd.DataFrame):

    pole_list = []
    history_dict = []

    for _, row in poles.iterrows():
        pole = Pole.from_series(row)
        pole_list.append(pole)
        if history := row["History"]:
            history_dict.extend(build_history(history, pole.id))

    return pole_list, history_dict
