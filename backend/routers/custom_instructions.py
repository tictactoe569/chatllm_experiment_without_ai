from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.auth import get_current_user
from backend.database import get_db
from backend.models import User, UserCustomInstructions
from backend.schemas.custom_instructions import (
    CustomInstructionsOut,
    CustomInstructionsUpdate,
)
from backend.services.openrouter import DEFAULT_SYSTEM_PROMPT

router = APIRouter(
    prefix="/api/custom-instructions",
    tags=["custom-instructions"],
    dependencies=[Depends(get_current_user)],
)


def _get_record(db: Session, user_id: int) -> UserCustomInstructions | None:
    return (
        db.query(UserCustomInstructions)
        .filter(UserCustomInstructions.user_id == user_id)
        .first()
    )


@router.get("", response_model=CustomInstructionsOut)
def get_custom_instructions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    record = _get_record(db, current_user.id)

    if record and record.content.strip():
        return CustomInstructionsOut(content=record.content, is_custom=True)

    return CustomInstructionsOut(
        content=DEFAULT_SYSTEM_PROMPT,
        is_custom=False,
    )


@router.put("", response_model=CustomInstructionsOut)
def save_custom_instructions(
    payload: CustomInstructionsUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    content = payload.content.strip()
    record = _get_record(db, current_user.id)

    # Empty content means "restore default".
    if not content:
        if record:
            db.delete(record)
            db.commit()

        return CustomInstructionsOut(
            content=DEFAULT_SYSTEM_PROMPT,
            is_custom=False,
        )

    if record:
        record.content = content
    else:
        record = UserCustomInstructions(
            user_id=current_user.id,
            content=content,
        )
        db.add(record)

    db.commit()
    db.refresh(record)

    return CustomInstructionsOut(content=record.content, is_custom=True)