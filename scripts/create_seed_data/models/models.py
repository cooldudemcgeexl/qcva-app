from datetime import date, datetime
from decimal import Decimal
from typing import Sequence
from pydantic import BaseModel, ConfigDict, Field, field_serializer
from cuid2 import cuid_wrapper
from pydantic.alias_generators import to_camel
import pandas as pd


cuid_generator = cuid_wrapper()


class BaseSchema(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)


def serialize_model_list(models: Sequence[BaseSchema]):
    return [model.model_dump(by_alias=True) for model in models]


class PoleRate(BaseSchema):
    id: str = Field(default_factory=cuid_generator)
    length: str
    new_rate: Decimal | None
    club_new_rate: Decimal | None
    used_rate: Decimal | None
    club_used_rate: Decimal | None
    rent_season: Decimal | None = None
    rent_month: Decimal | None = None
    rent_meet: Decimal | None = None

    @staticmethod
    def from_series(series: pd.Series) -> "PoleRate":
        return PoleRate(
            length=series["Length"],
            new_rate=series["New"],
            club_new_rate=series["Club New"],
            used_rate=series["Used"],
            club_used_rate=series["Club Used"],
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

    @field_serializer("dop", when_used="unless-none")
    def format_date_as_str(date: datetime):  # type: ignore
        # pylint: disable=no-self-argument
        return date.strftime("%Y-%m-%d %H:%M:%S")


class PoleHistory(BaseSchema):
    id: str = Field(default_factory=cuid_generator)
    pole_id: int
    date: datetime = Field(default_factory=datetime.utcnow)
    comment: str

    @field_serializer("date", when_used="unless-none")
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

    @staticmethod
    def from_series(series: pd.Series):
        return Customer(
            first_name=series["First"],
            last_name=series["Last/ School"],
            address=series["Address"],
            city=series["City"],
            state=series["State"],
            zip=series["Zip"],
            phone=series["Phone"],
            email=series["Email"],
        )

    @field_serializer("first_name", "last_name", "address", "city", when_used="unless-none")
    def normalize_case(string: str):  # type: ignore
        # pylint: disable=no-self-argument
        return string.title()

    @field_serializer("state", when_used="unless-none")
    def normalize_states(string: str):  # type: ignore
        # pylint: disable=no-self-argument
        match strupper := string.upper():
            case "OH" | "OHIO" | "OH-OHIO":
                return "OH"
            case "KY" | "KENTUCKY":
                return "KY"
            case "TN":
                return "TN"
            case "IN":
                return "IN"
            case "CA":
                return "CA"
            case _:
                return strupper


class Order(BaseSchema):
    id: str = Field(default_factory=cuid_generator)
    customer_id: str
    order_date: date
    order_total: Decimal
    closed: bool

    @field_serializer("order_date", when_used="unless-none")
    def format_date_as_str(date: datetime):  # type: ignore
        # pylint: disable=no-self-argument
        return date.strftime("%Y-%m-%d %H:%M:%S")

    @staticmethod
    def from_series(series: pd.Series, customer_id: str):
        return Order(
            customer_id=customer_id,
            order_date=series["Order Date"],
            order_total=series["Order Total"],
            closed=series["Closed"],
        )


class OrderItem(BaseSchema):
    id: str = Field(default_factory=cuid_generator)
    order_type: str
    pole_id: int
    order_id: str
    price: Decimal

    @staticmethod
    def from_series(series: pd.Series, order_id: str):
        return OrderItem(
            order_type=series["Order Type"],
            pole_id=series["Pole #"],
            order_id=order_id,
            price=series["Price"],
        )
