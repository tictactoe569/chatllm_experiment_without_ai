from __future__ import annotations

from pathlib import Path
import sqlalchemy as db
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker 

from backend.config import SQLALCHEMY_DATABASE_URL, SQLITE_PATH
from backend.schemas.chat import *
from backend.schemas.sessions import *

Path(SQLITE_PATH).parent.mkdir(parents=True, exist_ok=True)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
metadata = db.MetaData()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Sessao = db.Table('Sessao',metadata,
                  (db.Column('Titulo',db.String(),nullable=False),
                   db.Column('id_sessao',db.String(), primary_key =True)))
Usuario = db.Table ('Usuario',metadata,
                    db.Column('id', db.String(), primary_key=True),
                    db.Column('Nome', db.String(255)))