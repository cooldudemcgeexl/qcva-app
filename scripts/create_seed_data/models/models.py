from datetime import date, datetime
from decimal import Decimal
from re import L
from typing import Self
from pydantic import BaseModel, ConfigDict, Field, field_serializer
from cuid2 import cuid_wrapper
from pydantic.alias_generators import to_camel
import pandas as pd


cuid_generator = cuid_wrapper()


class BaseSchema(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)


def serialize_model_list(models: list[BaseSchema]):
    return [model.model_dump(by_alias=True) for model in models]


class PoleRate(BaseSchema):
    id: str = Field(default_factory=cuid_generator)
    length: str
    new: Decimal | None
    club_new: Decimal | None
    used: Decimal | None
    club_used: Decimal | None
    rent_season: Decimal | None = None
    rent_month: Decimal | None = None
    rent_meet: Decimal | None = None

    @staticmethod
    def from_series(series: pd.Series) -> "PoleRate":
        return PoleRate(
            length=series["Length"],
            new=series["New"],
            club_new=series["Club New"],
            used=series["Used"],
            club_used=series["Club Used"],
        )


class Pole(BaseSchema):
    id: int
    length: str
    cm: int
    weight: int
    flex: Decimal | None
    serial_number: str
    status: str
    dop: date
    note: str | None
    nfc: str | None = None
    cost: Decimal
    sold_at: Decimal | None
    revenue: Decimal | None

    @staticmethod
    def from_series(series: pd.Series) -> "Pole":
        return Pole(
            id=series["Pole ID"],
            length=series["L"],
            cm=series["CM"],
            weight=series["W"],
            flex=series["F"],
            serial_number=str(series["SN"]),
            status=series["Status"],
            dop=series["DOP"],
            note=series["Notes"],
            cost=series["Cost"],
            sold_at=series["Sold"],
            revenue=series["Rev"],
        )

    @field_serializer("dop")
    def format_date_as_str(date: datetime):  # type: ignore
        # pylint: disable=no-self-argument
        return date.strftime("%Y-%m-%d %H:%M:%S")


class PoleHistory(BaseSchema):
    id: str = Field(default_factory=cuid_generator)
    pole_id: int
    date: datetime = Field(default_factory=datetime.utcnow)
    comment: str

    @field_serializer("date")
    def format_date_as_str(date: datetime):  # type: ignore
        # pylint: disable=no-self-argument
        return date.strftime("%Y-%m-%d %H:%M:%S")


class Customer(BaseSchema):
    id: str = Field(default_factory=cuid_generator)
    first_name: str
    last_name: str
    address: str | None
    city: str | None
    state: str | None
    zip: str | None
    phone: str | None
    email: str | None


class Order(BaseSchema):
    id: str = Field(default_factory=cuid_generator)
    customer_id: str
    order_total: Decimal


class OrderItem(BaseSchema):
    id: str = Field(default_factory=cuid_generator)
    order_type: str
    order_id: str
    price: Decimal
