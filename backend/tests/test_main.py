from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_task():
    res = client.post("/task", json={
        "title": "Test",
        "description": "Testing task",
        "status": "pending"
    })
    assert res.status_code == 201
    assert res.json()["title"] == "Test"

def test_get_tasks():
    res = client.get("/tasks")
    assert res.status_code == 200
    assert isinstance(res.json(), list)
