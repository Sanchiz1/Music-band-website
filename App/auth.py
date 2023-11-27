from datetime import timedelta

from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, verify_jwt_in_request

from App.database import MongoDBHandler
from flask import Flask, render_template, request, jsonify, session, Blueprint
from flask_login import UserMixin, login_user, login_manager
from pymongo import MongoClient
import hashlib

auth = Blueprint('auth', __name__, url_prefix='/', template_folder='templates')

client = MongoClient(
    "mongodb+srv://Sanchiz:qwerty123@cluster1.wjwaiak.mongodb.net/?retryWrites=true&w=majority")
db = client["MusicBand"]
users_collection = db["users"]


@auth.route("/getUser", methods=["GET"])
def getUser():
    if not verify_jwt_in_request():
        return jsonify({'msg': 'Not logged in'}), 401
    current_user = get_jwt_identity()
    if current_user:
        return jsonify({'username': current_user}), 201
    else:
        return jsonify({'msg': 'Not logged in'}), 401


@auth.route("/register", methods=["POST"])
def register():
    new_user = request.get_json()  # store the json body request
    new_user["password"] = hashlib.sha256(new_user["password"].encode("utf-8")).hexdigest()  # encrpt password
    doc = users_collection.find_one({"username": new_user["username"]})  # check if user exist
    if not doc:
        users_collection.insert_one(new_user)
        return jsonify({'msg': 'User created successfully'}), 201
    else:
        return jsonify({'msg': 'Username already exists'}), 409


@auth.route("/login", methods=['POST'])
def login():
    logged_in_user = request.get_json()

    user = MongoDBHandler.getUserByUsername(logged_in_user["username"])

    if not user:
        return jsonify({'msg': 'User does not exist'}), 409
    if user["password"] == hashlib.sha256(logged_in_user["password"].encode("utf-8")).hexdigest():
        access_token = create_access_token(user["username"], expires_delta=timedelta(days=7))
        return jsonify({'access_token': access_token}), 201
    else:
        return jsonify({'msg': 'User does not exists'}), 409
