# Health Data Dashboard

This project provides a complete solution for analyzing and visualizing patient health data using **React** for the frontend and **machine learning** (via Jupyter Notebook) for backend model training.

---

## Project Overview

### Task 1: Parse Raw Data
- Connect using Firebase SDK to retrieve the data and make it available in the fronted

---

### Task 2: Frontend Data Visualization
- Built with React
- Visualized daily status using:
  - Line Charts (e.g., Heart Rate, Sleep Interruptions)
  - Bar Charts (Steps, Sleep Duration, Water Intake, Calories)
  - Comparison Tables (Heart rate and Temperature)
- Design is inspired by cozy games like Tsuki Adventure and Pocket Love.

---

### Task 3: Prediction of Patient's Health Categories
- A Python-based model to predict overall health status (Good, Moderate, Poor).
- Applied feature engineering and preprocessing:
  - Handled missing values
  - Winsorized outliers
  - Threshold-based rules to assign health categories
  - Used Random Forest Classifier
  - Cross-validated using GridSearchCV
- Evaluated using accuracy and confusion matrix.

---

## Setup Instructions

### Frontend (React)

```bash
cd frontend
npm install
npm start

### Backend

Open the dataclass.ipynb in Jupyter Notebook or VSCode
