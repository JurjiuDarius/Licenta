from database import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    email = db.Column(db.String(128))

    name = db.Column(db.Integer, default=0)

    date_created = db.Column()

    def __init__(self, email=None, name=None, date_created=None):
        self.email = email
        self.name = name
        self.date_created = date_created
