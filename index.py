from flask import Flask, request, make_response, render_template
import json

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/giveResult', methods=['POST'])
def give_result():
    req = request.json  
    print(req)
    
    response = make_response(json.dumps(req), 200)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')