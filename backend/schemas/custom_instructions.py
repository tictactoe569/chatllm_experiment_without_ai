from __future__ import annotations

from pydantic import BaseModel, Field


class CustomInstructionsUpdate(BaseModel):
    content: str = Field(default="", max_length=12000)


class CustomInstructionsOut(BaseModel):
    content: str
    is_custom: bool