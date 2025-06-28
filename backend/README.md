# To-Do (FastAPI)

## Features
- GET /tasks - Get all tasks
- POST /task - Add new task
- PUT /task/:id - Update task
- DELETE /task/:id - Remove task
- Auto-generated docs at `/docs`
- Unit testing
- Dockerized setup

## Run Locally

```bash
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload
```

## Run with Docker

```bash
docker build -t to-do .
docker run -p 5000:5000 to-do
```
