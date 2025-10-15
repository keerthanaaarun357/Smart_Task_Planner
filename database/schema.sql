CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    goal TEXT NOT NULL,
    task TEXT NOT NULL,
    deadline TEXT,
    dependencies TEXT
);
