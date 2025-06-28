from datetime import datetime
from typing import Literal
from pydantic import BaseModel

class Task(BaseModel):
    id: str
    title: str
    description: str
    status: Literal["pending", "completed"]
