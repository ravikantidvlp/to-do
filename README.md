# to-do

### Frontend

### Run with Docker Frontend

```bash

docker build -t frontend .
docker run -d -p 3000:3000 frontend

```
### Run with without Docker Frontend

```bash

npm start

```
### Run test

```bash

npm test


```

### Run build

```bash

npm build


```

### Frontend url (Reactjs)

```bash

http://x.x.x.x:3000

```
### Backend

### Run with Docker Backend

```bash

FROM python:3.12

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ./app ./app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

```

### Run without Docker Backend

```bash

pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload

```

### SWagger Docs

```bash

http://x.x.x.x:5000/docs#/

```

### Backend API Endpoint

```bash

GET    http://x.x.x.x:5000/tasks # To get task
POST   http://x.x.x.x:5000/task  # To add task
PUT    http://x.x.x.x:5000/task/{task_id}  # To update task
DELETE http://x.x.x.x:5000/task/{task_id} # To Delete task

```

### To Run Full Stack (Frontend and Backend)

```bash

docker-compose up --build

```

## Run test

```bash

pytest

```
