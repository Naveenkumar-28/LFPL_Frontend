"""Email sending via Resend.

Gracefully no-ops when RESEND_API_KEY or TO_EMAIL are not configured,
so submissions still save to MongoDB even without email credentials.
"""
from __future__ import annotations

import asyncio
import logging
import os
from typing import Optional

import resend

logger = logging.getLogger(__name__)


def _enabled() -> bool:
    return bool(os.environ.get("RESEND_API_KEY") and os.environ.get("TO_EMAIL"))


def _configure() -> None:
    resend.api_key = os.environ["RESEND_API_KEY"]


def _row(label: str, value: Optional[str]) -> str:
    if not value:
        return ""
    return (
        f'<tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:140px;">{label}</td>'
        f'<td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600;">{value}</td></tr>'
    )


def _build_html(submission: dict) -> str:
    type_label = (submission.get("type") or "submission").upper()
    rows = "".join(
        [
            _row("Name", submission.get("name")),
            _row("Company", submission.get("company")),
            _row("Email", submission.get("email")),
            _row("Phone", submission.get("phone")),
            _row("Product", submission.get("product_type")),
            _row("Quantity", submission.get("quantity")),
        ]
    )
    body_text = submission.get("requirement") or submission.get("message") or ""
    body_html = (
        f'<div style="margin-top:24px;padding:16px;background:#f9fafb;'
        f'border-left:3px solid #ff6b00;color:#0f172a;font-size:14px;'
        f'line-height:1.6;">{body_text}</div>'
        if body_text
        else ""
    )
    return f"""
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
      <div style="background:#050816;padding:24px;color:#ffffff;">
        <div style="font-size:11px;letter-spacing:2px;color:#ff6b00;text-transform:uppercase;">New {type_label}</div>
        <div style="font-size:22px;font-weight:700;margin-top:6px;">Lombodaran Packaging</div>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;">{rows}</table>
        {body_html}
        <p style="margin-top:28px;color:#6b7280;font-size:12px;">
          Sent automatically from lombodaran.in — reply directly to respond to the lead.
        </p>
      </div>
    </div>
    """


async def send_submission_email(submission: dict) -> Optional[str]:
    """Send a submission notification email. Returns Resend email id on success, None on skip/fail."""
    if not _enabled():
        logger.info("Resend skipped: RESEND_API_KEY or TO_EMAIL not configured.")
        return None
    try:
        _configure()
        type_label = (submission.get("type") or "submission").capitalize()
        subject_who = submission.get("name") or submission.get("email") or "Anonymous"
        params = {
            "from": os.environ.get("SENDER_EMAIL", "onboarding@resend.dev"),
            "to": [os.environ["TO_EMAIL"]],
            "subject": f"New {type_label} from {subject_who} · Lombodaran",
            "html": _build_html(submission),
            "reply_to": submission.get("email") or None,
        }
        if not params["reply_to"]:
            params.pop("reply_to")
        result = await asyncio.to_thread(resend.Emails.send, params)
        email_id = result.get("id") if isinstance(result, dict) else None
        logger.info(f"Resend OK · id={email_id} · type={submission.get('type')}")
        return email_id
    except Exception as e:
        logger.error(f"Resend failed: {e}")
        return None
