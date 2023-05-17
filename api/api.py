import sys
from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

connect = sqlite3.connect('database.db')
connect.execute(
    'CREATE TABLE IF NOT EXISTS MOVIES (item TEXT, itemLabel TEXT)')
connect.close()

@app.route('/movies')
def get_movies():
    connect = sqlite3.connect('database.db')
    cursor = connect.cursor()
    cursor.execute('SELECT * FROM MOVIES')
    data = cursor.fetchall()
    connect.close()
    return jsonify({'movieList': data})

@app.route('/save', methods=['POST'])
def set_movies():
    records = request.get_json()["movies"]
    with sqlite3.connect('database.db') as connect:
        cursor = connect.cursor()
        cursor.executemany("INSERT INTO MOVIES (item,itemLabel) VALUES (?,?)", records)
        connect.commit()
        # connect.close()
    return {'status': 'success'}

@app.route('/clear')
def clear_movies():
    connect = sqlite3.connect('database.db')
    cursor = connect.cursor()
    cursor.execute('DELETE FROM MOVIES')
    connect.commit()
    connect.close()
    return {'status': 'success'}