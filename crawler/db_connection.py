from dotenv import load_dotenv
import os
# import psycopg2
from sqlalchemy import create_engine


def init():
    load_dotenv()
    DB_URI = os.getenv('DB_URI')
    # DB_NAME = os.getenv('DB_NAME')
    # DB_USER = os.getenv('DB_USER')
    # DB_PASSWORD = os.getenv('DB_PASSWORD')
    # DB_HOST = os.getenv('DB_HOST')

    db = create_engine(DB_URI)
    conn = db.connect()
    return conn
