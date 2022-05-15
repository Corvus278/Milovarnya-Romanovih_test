import json
from pysendpulse.pysendpulse import PySendPulse


class SendPulseApi(PySendPulse):

    def __init__(self):
        API_INFO_DICT = self.read_api_info()
        USER_ID = API_INFO_DICT['id']
        USER_SECRET = API_INFO_DICT['secret']
        TOKEN_STORAGE = 'memcached'
        super().__init__(USER_ID, USER_SECRET, TOKEN_STORAGE)

    def send_form_data(self, data_dict):
        """Отправка данных в адрессную книгу которая указанна в sendPulsData.json.
        Возвращает словарь с результатом отправки """
        adressbook_id = self.read_api_info()['adressbook_id']

        dict_of_info = [{
            'email': data_dict['email'],
            'variables': {
                'Имя': data_dict['name'],
                'Гидролаты': data_dict['gidrolats']
            }
        }]

        response = self.add_emails_to_addressbook(adressbook_id, dict_of_info)
        return response

    def read_api_info(self):
        with open('sendPulsData.json', 'r', encoding='utf-8') as f_json:
            f = json.load(f_json)
            id = f['id']
            secret = f['secret']
            adressbook_id = f['adressbookId']
        return {'id': id, 'secret': secret, 'adressbook_id': adressbook_id}
