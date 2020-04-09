"""votes tables

Revision ID: e2141e97ecc8
Revises: 24d55cf1a96f
Create Date: 2020-04-09 14:26:46.035562

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e2141e97ecc8'
down_revision = '24d55cf1a96f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('vote',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('valid', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('vote_song',
    sa.Column('vote', sa.Integer(), nullable=False),
    sa.Column('song', sa.Integer(), nullable=False),
    sa.Column('position', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('vote', 'song', 'position')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('vote_song')
    op.drop_table('vote')
    # ### end Alembic commands ###
