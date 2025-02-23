"""Added requirements and duties to Job model

Revision ID: ab3cab8d637b
Revises: 4e9a29322ecf
Create Date: 2025-02-08 21:22:50.411695

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ab3cab8d637b'
down_revision = '4e9a29322ecf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('jobs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('requirements', sa.Text(), nullable=False))
        batch_op.add_column(sa.Column('duties', sa.Text(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('jobs', schema=None) as batch_op:
        batch_op.drop_column('duties')
        batch_op.drop_column('requirements')

    # ### end Alembic commands ###
