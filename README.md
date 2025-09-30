# Vote Service MonoRepository

KoaJS + MySQL + React + Vite + Docker Compose

### Структура проекта:
```python
vote_service_mono/
 ├── api/          # backend (Node.js / KoaJS)
 ├── web/          # frontend (React)
 ├── mysql/        # seed.sql для запуска (в связке с docker-compose)
 ├── docker-compose.yml
 └── README.md
```

###  Создание env файлов:
 - в директории api создать .env файл и заполнить:

```
PORT=4000
DB_PORT=3306
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=my_db
```

- в директории web создать .env файл и заполнить
```
API_URL=http://localhost:4000/api/
```


## 🚀 Запуск через Docker Compose
1. `git clone https://github.com/KseniaKras/vote.git`
2. `cd vote_service_mono`
3. `docker compose up --build` из корня проекта

Backend: http://localhost:4000

Frontend: http://localhost:3000

MySQL: порт 3306 (логин: user, пароль: password, название: my_db)

При первом запуске MySQL автоматически создаст базу и заполнит таблицы.

Чтобы удалить том:
```
docker compose down -v
```

## ⚡ Запуск без Docker Compose
Backend
```python
1. cd api
2. npm i
3. npm run dev
```
http://localhost:4000/api/health -> OK

Frontend
```python
1. cd web
2. npm i
3. npm run dev
```
http://localhost:5173/

MySQL (запуск и заполнение вручную)
```python
1. mysql -u root -p
(пароль, если нужен)

Создание юзера с правами доступа и базы:
CREATE DATABASE my_db;
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON my_db.* TO 'user'@'localhost';
FLUSH PRIVILEGES;

для выхода: 
EXIT
```

```
2. mysql -u user -p my_db < ./api/seed.sql
password: password
```

База с заполненными таблицами должна быть успешно создана
