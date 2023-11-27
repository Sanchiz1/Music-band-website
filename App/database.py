from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient(
    "mongodb+srv://Sanchiz:qwerty123@cluster1.wjwaiak.mongodb.net/?retryWrites=true&w=majority")
db = client["MusicBand"]
users_collection = db["users"]
albums_collection = db["albums"]


class MongoDBHandler:
    @staticmethod
    def getUserByUsername(username):
        try:
            return users_collection.find_one({"username": username})
        except:
            return Exception

    @staticmethod
    def createUser(new_user):
        try:
            users_collection.insert_one(new_user)
        except:
            return Exception

    @staticmethod
    def getAlbums():
        try:
            return albums_collection.find()
        except Exception:
            return Exception

    @staticmethod
    def getAlbum(_id):
        try:
            return albums_collection.find({"_id": ObjectId(_id)})
        except Exception:
            return Exception

    @staticmethod
    def createAlbum(name, date, image_url):
        album = {"name": name,
         "date": date,
         "image_url": image_url}
        try:
            albums_collection.insert_one(album)
        except:
            return Exception

    @staticmethod
    def updateAlbum(name, date, image_url, _id):
        album = {"_id": ObjectId(_id)}
        newvalues = {"$set": {"name": name,
                              "date": date,
                              "image_url": image_url}}
        try:
            albums_collection.update_one(album, newvalues)
        except:
            return Exception

    @staticmethod
    def deleteAlbum(_id):
        album = {"_id": ObjectId(_id)}
        try:
            albums_collection.delete_one(album)
        except:
            return Exception