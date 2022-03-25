from dotenv import load_dotenv
import os
from os.path import join, dirname
from sqlalchemy import create_engine



def init():
    dotenv_path = join(dirname(__file__), '../.env')
    load_dotenv(dotenv_path)
    print('dotenv path:' + dotenv_path)

    DB_URL = os.getenv('DATABASE_URL')

    db = create_engine(DB_URL)
    conn = db.connect()
    return conn