from fastapi import APIRouter, Depends, HTTPException, status
from backend.auth import get_current_user
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import ChatMessage, ChatSession, User
from backend.schemas.instructions import (
    InstructionsOut,
    InstructionsUpdate,
)


router = APIRouter(prefix="/api/me", tags=["me"])

@router.get("/instructions", response_model=InstructionsOut)
def get_my_instructions(
    current_user = Depends(get_current_user),
):
    return {
        "instructions": current_user.instructions or ""
    }


@router.put("/instructions", response_model=InstructionsOut)
def update_my_instructions(
    payload: InstructionsUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
   ):
       value= payload.instructions.strip()
       current_user.instructions= value or None
       db.add(current_user)
       db.commit()
       db.refresh(current_user)
       return {
            "instructions" : current_user.instructions or ""
       }




