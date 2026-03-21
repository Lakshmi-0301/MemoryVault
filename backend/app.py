from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)

users = []
events_store = {}

from datetime import datetime
capsules = []

# ---------------- SIGNUP ----------------
@app.route("/signup", methods=["POST"])
def signup():
    data = request.form

    user = {
        "name": data.get("name"),
        "email": data.get("email"),
        "password": data.get("password"),
        "dob": data.get("dob")
    }

    # check if user exists
    for u in users:
        if u["email"] == user["email"]:
            return jsonify({"message": "User already exists"}), 400

    users.append(user)
    return jsonify({"message": "Signup successful"}), 200


# ---------------- LOGIN ----------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    for user in users:
        if user["email"] == email and user["password"] == password:
            return jsonify({
                "message": "Login successful",
                "user": {
                    "name": user["name"],
                    "email": user["email"],
                    "dob": user["dob"]
                }
            }), 200

    return jsonify({"message": "Invalid credentials"}), 401


@app.route("/users", methods=["GET"])
def get_users():
    return jsonify(users), 200



@app.route("/api/events/<user_email>", methods=["GET"])
def get_events(user_email):
    """Fetch all timeline events for a user. Future: Query MongoDB by user_email."""
    user_events = events_store.get(user_email, [])
    return jsonify({"events": user_events}), 200


@app.route("/api/events/<user_email>", methods=["POST"])
def add_event(user_email):
    """
    Add a new timeline event for the user.
    Future: Insert into MongoDB events collection.
    Body: { id, event_name, date, notes, media: {images, audio, video}, is_dob }
    """
    data = request.json
    if not data:
        return jsonify({"message": "Invalid request body"}), 400

    if not data.get("event_name") or not data.get("date"):
        return jsonify({"message": "event_name and date are required"}), 400

    event = {
        "id": data.get("id", str(uuid.uuid4())),
        "event_name": data.get("event_name"),
        "date": data.get("date"),
        "notes": data.get("notes", ""),
        "media": {
            "images": data.get("media", {}).get("images", []),
            "audio": data.get("media", {}).get("audio", []),
            "video": data.get("media", {}).get("video", []),
        },
        "is_dob": data.get("is_dob", False),
        "user_email": user_email,
    }

    if user_email not in events_store:
        events_store[user_email] = []

    events_store[user_email].append(event)
    return jsonify({"message": "Event added", "event": event}), 201


@app.route("/add_capsule", methods=["POST"])
def add_capsule():
    data = request.form

    capsule = {
        "name": data.get("name"),
        "email": data.get("email"),
        "date_created": datetime.now().strftime("%Y-%m-%d"),
        "open_date": data.get("open_date"),
        "notes": data.get("notes"),
        "letter": data.get("letter")
    }

    capsules.append(capsule)

    return jsonify({"message": "Capsule created"}), 200

@app.route("/capsules/<email>", methods=["GET"])
def get_capsules(email):
    user_capsules = [c for c in capsules if c["email"] == email]
    return jsonify(user_capsules), 200

@app.route("/open_capsule", methods=["POST"])
def open_capsule():
    data = request.json

    name = data.get("name")
    email = data.get("email")

    for c in capsules:
        if c["name"] == name and c["email"] == email:
            today = datetime.now().strftime("%Y-%m-%d")

            if today >= c["open_date"]:
                return jsonify({"status": "open", "capsule": c})
            else:
                return jsonify({"status": "locked", "message": "Too early!"})

    return jsonify({"message": "Capsule not found"}), 404

 
@app.route("/profile/<email>", methods=["GET"])
def get_profile(email):
    """
    Returns the profile details for a given user email.
    Frontend calls: GET /profile/<email>
    """
    user = next((u for u in users if u["email"] == email), None)
 
    if not user:
        return jsonify({"message": "User not found"}), 404
 
    return jsonify({
        "name":  user["name"],
        "email": user["email"],
        "dob":   user["dob"],
    }), 200
 
 
@app.route("/change_password", methods=["POST"])
def change_password():
    """
    Changes the password for a user after verifying the current one.
    Body (JSON): { "email": "...", "current_password": "...", "new_password": "..." }
    """
    data = request.get_json()
 
    email            = data.get("email", "").strip()
    current_password = data.get("current_password", "")
    new_password     = data.get("new_password", "")
 
    if not email or not current_password or not new_password:
        return jsonify({"message": "All fields are required"}), 400
 
    if len(new_password) < 8:
        return jsonify({"message": "New password must be at least 8 characters"}), 400
 
    user = next((u for u in users if u["email"] == email), None)
 
    if not user:
        return jsonify({"message": "User not found"}), 404
 
    if user["password"] != current_password:
        return jsonify({"message": "Current password is incorrect"}), 401
 
    if new_password == current_password:
        return jsonify({"message": "New password must differ from the current one"}), 400
 
    user["password"] = new_password
    return jsonify({"message": "Password updated successfully"}), 200


if __name__ == "__main__":
    app.run(debug=True)