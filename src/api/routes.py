from flask import jsonify, request, Blueprint
from .models import User
from app import db
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_bp = Blueprint('user', __name__)
CORS(user_bp, resources={r"/*": {"origins": "*", "allow_headers": ["Content-Type", "Authorization", "X-Requested-With",
                                                                   "application/json"]}})


@user_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    user = User(
        email=data['email'],
        username=data['username'],
        password=generate_password_hash(data['password'])
    )
    access_token = create_access_token(identity=user.user_id)
    db.session.add(user)
    db.session.commit()
    return jsonify({
        'user_id': user.user_id,
        'email': user.email,
        'username': user.username,
        'success': True,
        'response': 'User created successfully',
        'token': access_token
    }), 201


@user_bp.route('/login', methods=['POST'])
def login_user():  # OK
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    access_token = create_access_token(identity=user.user_id)
    if user and check_password_hash(user.password, data['password']):
        return jsonify({
            'user_id': user.user_id,
            'email': user.email,
            'username': user.username,
            'token': access_token
        }), 200
    return jsonify({'message': 'Invalid email or password'}), 401


@user_bp.route('/validate-token', methods=['GET'])
@jwt_required()
def validate_token():
    current_user = get_jwt_identity()
    auth_header = request.headers.get('Authorization')
    print(f"auth_header: {auth_header}")
    return jsonify(current_user), 200


@user_bp.route('/user', methods=['GET'])
def get_user():
    try:
        user_id = request.args.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            if user is None:
                return jsonify({'message': 'User not found'}), 404
            else:
                return jsonify({
                    'user_id': user.user_id,
                    'email': user.email,
                    'username': user.username
                }), 200
        else:
            users = User.query.all()
            return jsonify([user.to_dict() for user in users]), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@user_bp.route('/user', methods=['DELETE'])
def delete_user():
    data = request.get_json()
    user = User.query.filter_by(user_id=data['user_id']).first()
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'}), 200
