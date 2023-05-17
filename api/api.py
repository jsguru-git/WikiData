import sys
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/movies')
def get_movies():
    return jsonify({'movieList' : [
        {"id": 1, "item":"http://www.wikidata.org/entity/Q16734412","itemLabel":"A Girl at My Door"},
        {"id": 2, "item":"http://www.wikidata.org/entity/Q17028317","itemLabel":"Rules Don't Apply"},
        {"id": 3, "item":"http://www.wikidata.org/entity/Q17040489","itemLabel":"O Ornitólogo"},
        {"id": 1, "item":"http://www.wikidata.org/entity/Q16734412","itemLabel":"A Girl at My Door"},
        {"id": 2, "item":"http://www.wikidata.org/entity/Q17028317","itemLabel":"Rules Don't Apply"},
        {"id": 3, "item":"http://www.wikidata.org/entity/Q17040489","itemLabel":"O Ornitólogo"}
    ]})