# HRMS Lite

A lightweight **Human Resource Management System** built with **React + Django REST Framework**.
This project allows basic employee management and attendance tracking.

The goal of this project is to demonstrate **full-stack development skills**, including API integration, CRUD operations, and clean UI design.

---

# Features

### Employee Management

* Add new employees
* Edit employee details
* Delete employees
* Auto-generated Employee IDs (EMP001, EMP002, etc.)

### Attendance Management

* Mark attendance for employees
* Select date and attendance status (Present / Absent)
* Attendance records displayed in a table

### Dashboard Summary

The dashboard shows:

* Total Employees
* Total Attendance Records
* Present Today Count

### Modal Based Attendance

Attendance is marked through a modal popup to maintain a clean UI.

---

# Tech Stack

## Frontend

* React (Vite)
* TypeScript
* Tailwind CSS

## Backend

* Django
* Django REST Framework
* SQLite (default)

---

# Project Structure

```
hrms-lite/
│
├── backend/
│   ├── hrms/
│   ├── employees/
│   ├── attendance/
│   ├── db.sqlite3
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.tsx
│   │
│   └── package.json
│
└── README.md
```

---

# Backend Setup (Django)

### 1 Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

If requirements.txt is not present:

```bash
pip install django djangorestframework django-cors-headers
```

---

### 2 Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

This will create the database schema.

---

### 3 Start backend server

```bash
python manage.py runserver
```

Backend will run on:

```
http://127.0.0.1:8000
```

---

# Frontend Setup (React)

### 1 Install dependencies

```bash
cd frontend
npm install
```

---

### 2 Start development server

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# API Endpoints

### Employee APIs

Get all employees

```
GET /api/employees
```

Add employee

```
POST /api/employees
```

Update employee

```
PUT /api/employees/{id}
```

Delete employee

```
DELETE /api/employees/{id}
```

---

### Attendance APIs

Mark attendance

```
POST /api/attendance
```

Payload example:

```
{
  "employee": 1,
  "date": "2026-03-10",
  "status": "present"
}
```

Fetch attendance records

```
GET /api/attendance/all
```

---

# Business Logic

### Employee ID Generation

Employee IDs are automatically generated in sequence:

```
EMP001
EMP002
EMP003
```

This ensures a consistent employee identifier system.

---

### Attendance Logic

Attendance records include:

* Employee
* Date
* Status

The dashboard calculates:

```
Present Today =
attendanceRecords.filter(a => a.status === "present")
```

---

# UI Features

* Responsive layout using Tailwind CSS
* Dashboard cards for statistics
* Clean employee table
* Modal popup for attendance marking
* Conditional rendering for Add Employee form

---

# Future Improvements

Possible upgrades:

* Authentication (Admin login)
* Pagination for employees
* Attendance analytics charts
* Export reports (CSV / Excel)
* Role based access

---

# Author

Shakti Raghav
Full Stack Developer

Tech Stack:
Laravel | Vue | React | Django | MySQL | Python