import json

from bson import json_util
from bson.json_util import dumps, loads
from flask_jwt_extended import create_access_token, get_jwt_identity, verify_jwt_in_request, jwt_required
from jsonschema import validate, ValidationError
from App.database import MongoDBHandler
from flask import Flask, render_template, request, jsonify, session, Blueprint
from flask_login import UserMixin, login_user, login_manager
from pymongo import MongoClient
import hashlib

albums = Blueprint('albums', __name__, url_prefix = '/', template_folder='templates')

insert_schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "date": {"type": "string"},
        "image_url": {"type": "string"},
    },
    "required": ["name", "date", "image_url"],
}

update_schema = {
    "type": "object",
    "properties": {
        "_id": {"type": "string"},
        "name": {"type": "string"},
        "date": {"type": "string"},
        "image_url": {"type": "string"},
    },
    "required": ["_id", "name", "date", "image_url"],
}

id_schema = {
    "type": "object",
    "properties": {
        "_id": {"type": "string"},
    },
    "required": ["_id"],
}


@albums.route('/insert', methods=['POST'])
@jwt_required()
def insert():
    try:
        validate(request.json, insert_schema)
    except ValidationError as e:
            return jsonify({"msg": str(e)}), 400
    album = request.get_json()
    try:
        MongoDBHandler.createAlbum(album["name"], album["date"], album["image_url"])
        return jsonify({'msg': "Inserted successfully"}), 201
    except:
        return jsonify({"msg": "Database error"}), 400

@albums.route('/update', methods=['POST'])
@jwt_required()
def update():
    try:
        validate(request.json, update_schema)
    except ValidationError as e:
            return jsonify({"msg": str(e)}), 400
    album = request.get_json()
    try:
        MongoDBHandler.updateAlbum(album["name"], album["date"], album["image_url"], album["_id"])
        return jsonify({'msg': "Inserted successfully"}), 201
    except:
        return jsonify({"msg": "Database error"}), 400


@albums.route('/delete', methods=['POST'])
@jwt_required()
def delete():
    try:
        validate(request.json, id_schema)
    except ValidationError as e:
        return jsonify({"msg": str(e)}), 400
    album = request.get_json()
    try:
        MongoDBHandler.deleteAlbum(album["_id"])
        return jsonify({'msg': "Inserted successfully"}), 201
    except:
        return jsonify({"msg": "Database error"}), 400


@albums.route('/getAll', methods=['GET'])
def get_all():
    return jsonify({"albums": json.loads(json_util.dumps(MongoDBHandler.getAlbums()))})

@albums.route('/getAlbum', methods=['POST'])
def get_album():
    try:
        validate(request.json, id_schema)
    except ValidationError as e:
        return jsonify({"msg": str(e)}), 400
    album = request.get_json()
    try:
        return jsonify({"album": json.loads(json_util.dumps(MongoDBHandler.getAlbum(album["_id"])))})
    except:
        return jsonify({"msg": "Database error"}), 400