import json
import sqlite3
from flask import Flask, request, make_response, render_template
from sendplus_api import api_int, give_form_data

app = Flask(__name__)


def remove_space_and_CS(string):
    # Удаление пробелов
    string = ''.join(string.split(' '))
    # Перевод в нижний регистр
    string = string.casefold()
    return string


# подключение к базе данных
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


conn = sqlite3.connect('products.db')
conn.row_factory = dict_factory
cursor = conn.cursor()
cursor.execute('SELECT * FROM product')
all_product = cursor.fetchall()


# Инициализация обекта для взаимодействия с апи
api_obj = api_int()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/giveResult', methods=['POST'])
def give_result():
    products_names = request.json['productsNames']
    products_list = []
    for product in all_product:
        if remove_space_and_CS(product['name']) in products_names:
            products_list.append(
                {
                    'name': product['name'],
                    'imgUrl': product['imgUrl'],
                    'description': product['description'].replace("\n", '').replace('\xa0', '').split(';'),
                    'howToUse': product['howToUse'].replace("\n", '').replace('\xa0', '').split(';'),
                    'moreLink': product['moreLink']
                }
            )
    product_dict_json = json.dumps({'products': products_list})
    
    response = make_response(product_dict_json, 200)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/sendData', methods=['POST'])
def send_data():
    form_name = request.json['name']
    form_email = request.json['email']
    form_gidrolats = request.json['gidrolats']

    status = give_form_data(form_email, form_name, form_gidrolats, api_obj)

    if status['result']:
        response = make_response(json.dumps('ok'), 200)
    else:
        response = make_response(json.dumps('Данные по через апи не отправлены'), 500)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
