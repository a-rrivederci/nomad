import pyrebase

class Firebase(object):
    '''Class for firebase project'''

    # firebase configuration
    config = {
        "apiKey": "AIzaSyD9QEbkOyk0B25L3s7X1T_wfBNuLrOyCuc",
        "authDomain": "nomad-fire.firebaseapp.com",
        "databaseURL": "https://nomad-fire.firebaseio.com",
        "projectId": "nomad-fire",
        "storageBucket": "nomad-fire.appspot.com",
        "messagingSenderId": "1097082057466"
    }

    def __init__(self):
        self.firebase = pyrebase.initialize_app(self.config)
        self.database = self.firebase.database()
