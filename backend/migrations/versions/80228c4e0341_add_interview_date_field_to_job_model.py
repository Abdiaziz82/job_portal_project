"""Add interview_date field to Job model

Revision ID: 80228c4e0341
Revises: 6308e7395fe6
Create Date: 2025-02-22 18:30:40.188769

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '80228c4e0341'
down_revision = '6308e7395fe6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('jobs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('interview_date', sa.Date(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('jobs', schema=None) as batch_op:
        batch_op.drop_column('interview_date')

    # ### end Alembic commands ###
