"""Removed unused tables.

Revision ID: 7f547ab77736
Revises: d1bb8462a4a8
Create Date: 2024-03-26 19:45:30.561885

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "7f547ab77736"
down_revision = "d1bb8462a4a8"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("clinic_doctor")
    op.drop_table("clinic")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "clinic_doctor",
        sa.Column("doctor_id", sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column("clinic_id", sa.INTEGER(), autoincrement=False, nullable=False),
        sa.ForeignKeyConstraint(
            ["clinic_id"], ["clinic.id"], name="clinic_doctor_clinic_id_fkey"
        ),
        sa.ForeignKeyConstraint(
            ["doctor_id"], ["doctor.id"], name="clinic_doctor_doctor_id_fkey"
        ),
        sa.PrimaryKeyConstraint("doctor_id", "clinic_id", name="clinic_doctor_pkey"),
    )
    op.create_table(
        "clinic",
        sa.Column("id", sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column(
            "address", sa.VARCHAR(length=128), autoincrement=False, nullable=True
        ),
        sa.Column("name", sa.VARCHAR(length=128), autoincrement=False, nullable=True),
        sa.PrimaryKeyConstraint("id", name="clinic_pkey"),
    )
    # ### end Alembic commands ###
