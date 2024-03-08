from datetime import date
from decimal import Decimal
from pydantic import BaseModel, ConfigDict, Field
from cuid2 import cuid_wrapper
from pydantic.alias_generators import to_camel


cuid_generator = cuid_wrapper()


class BaseSchema(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel, populate_by_name=True, from_attributes=True
    )


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


class Pole(BaseSchema):
    id: int
    length: str
    cm: int
    weight: int
    flex: Decimal
    serial_number: str
    status: str
    dop: date
    nfc: str
    cost: Decimal
    sold_at: Decimal | None
    revenue: Decimal | None
    length_rate: str


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
