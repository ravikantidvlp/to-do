from fastapi import FastAPI, Depends
from app import crud, schemas
from app.database import get_db
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Task API", description="Manage your tasks", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/tasks", response_model=list[schemas.Task])
def get_tasks(db=Depends(get_db)):
    return crud.get_all_tasks()

@app.post("/task", response_model=schemas.Task, status_code=201)
def add_task(task: schemas.TaskCreate, db=Depends(get_db)):
    return crud.create_task(task)

@app.put("/task/{task_id}", response_model=schemas.Task)
def update(task_id: str, task: schemas.TaskUpdate, db=Depends(get_db)):
    return crud.update_task(task_id, task)

@app.delete("/task/{task_id}", status_code=204)
def remove(task_id: str, db=Depends(get_db)):
    crud.delete_task(task_id)
    return
