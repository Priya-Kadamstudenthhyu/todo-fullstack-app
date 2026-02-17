from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/status")
def status():
    return jsonify({"message": "Python backend is running!"})

if __name__ == "__main__":
    app.run(port=6000)
