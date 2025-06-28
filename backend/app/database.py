from typing import Dict
from app.schemas import Task

db: Dict[str, Task] = {}

def get_db():
    return db
