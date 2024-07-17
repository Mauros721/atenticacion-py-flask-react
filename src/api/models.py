from app import db


class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(2000), nullable=False)

    def serialize(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'email': self.email
        }

    def __repr__(self):
        return '<User %r>' % self.username

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'email': self.email
        }
