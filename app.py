from flask import Flask
from flask_jwt_extended import JWTManager

from App.Albums import albums

from App.auth import auth
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.register_blueprint(auth)
app.register_blueprint(albums)
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
jwt = JWTManager(app)
@app.route('/')
def index():
    return "Hello world"



if __name__ == '__main__':
    app.run(debug=True)
