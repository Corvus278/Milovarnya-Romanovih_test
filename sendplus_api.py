import json
from pysendpulse.pysendpulse import PySendPulse


def send_form_data(email, name, gidrolats, api_obj):
    """Отправка данных в адрессную книгу которая указанна в sendPulsData.json.
    Возвращает словарь с результатом отправки """
    adressbook_id = read_api_info()['adressbook_id']

    dict_of_info = [{
            'email': email,
            'variables': {
                'Имя': name,
                'Гидролаты': gidrolats
            }
    }]

    response = api_obj.add_emails_to_addressbook(adressbook_id, dict_of_info)
    return response


def read_api_info():
    with open('sendPulsData.json', 'r', encoding='utf-8') as f_json:
        f = json.load(f_json)
        id = f['id']
        secret = f['secret']
        adressbook_id = f['adressbookId']
    return {'id': id, 'secret': secret, 'adressbook_id': adressbook_id}


def api_int():
    API_INFO_DICT = read_api_info()
    REST_API_ID = API_INFO_DICT['id']
    REST_API_SECRET = API_INFO_DICT['secret']
    TOKEN_STORAGE = 'memcached'
    SPApiProxy = PySendPulse(REST_API_ID, REST_API_SECRET, TOKEN_STORAGE)
    return SPApiProxy

