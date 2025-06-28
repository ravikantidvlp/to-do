from fastapi import HTTPException, status
from app.schemas import Task, TaskCreate, TaskUpdate
from app.database import db
from uuid import uuid4
from datetime import datetime

def get_all_tasks():
    return list(db.values())

def create_task(task: TaskCreate):
    task_id = str(uuid4())
    new_task = Task(
        id=task_id,
        title=task.title,
        description=task.description,
        status=task.status,
        created_at=datetime.now()
    )
    db[task_id] = new_task
    return new_task

def update_task(task_id: str, updated_task: TaskUpdate):
    if task_id not in db:
        raise HTTPException(status_code=404, detail="Task not found")
    db[task_id].title = updated_task.title
    db[task_id].description = updated_task.description
    db[task_id].status = updated_task.status
    return db[task_id]

def delete_task(task_id: str):
    if task_id not in db:
        raise HTTPException(status_code=404, detail="Task not found")
    del db[task_id]
    return {"detail": "Task deleted"}
