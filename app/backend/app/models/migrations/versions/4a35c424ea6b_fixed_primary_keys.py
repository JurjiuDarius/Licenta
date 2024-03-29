"""Fixed primary keys

Revision ID: 4a35c424ea6b
Revises: 7f17205de8d2
Create Date: 2023-11-12 16:53:02.112909

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4a35c424ea6b'
down_revision = '7f17205de8d2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('clinic_doctor', schema=None) as batch_op:
        batch_op.alter_column('doctor_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('clinic_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.drop_column('id')

    with op.batch_alter_table('patient_doctor', schema=None) as batch_op:
        batch_op.add_column(sa.Column('patient_id', sa.Integer(), nullable=False))
        batch_op.alter_column('doctor_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.drop_constraint('patient_doctor_patient_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'patient', ['patient_id'], ['id'])
        batch_op.drop_column('patient')
        batch_op.drop_column('id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('patient_doctor', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False))
        batch_op.add_column(sa.Column('patient', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('patient_doctor_patient_fkey', 'patient', ['patient'], ['id'])
        batch_op.alter_column('doctor_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.drop_column('patient_id')

    with op.batch_alter_table('clinic_doctor', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False))
        batch_op.alter_column('clinic_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('doctor_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###
