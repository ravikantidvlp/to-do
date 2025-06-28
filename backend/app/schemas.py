from pydantic import BaseModel
from typing import Literal
from datetime import datetime

class TaskCreate(BaseModel):
    title: str
    description: str
    status: Literal["pending", "completed"]

class TaskUpdate(TaskCreate):
    pass

class Task(TaskCreate):
    id: str
    created_at: datetime
