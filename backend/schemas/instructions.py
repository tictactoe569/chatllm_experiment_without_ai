from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel



class InstructionsUpdate(BaseModel):
    instructions: str | None = None


class InstructionsOut(BaseModel):
    
    instructions: str | None = None

    model_config = {"from_attributes": True}


