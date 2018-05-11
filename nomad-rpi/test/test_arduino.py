import unittest
from api.arduino import ArduinoUno

class TestArduino(unittest.TestCase):

    @classmethod
    def setUpClass(self):
        super().setUpClass()
        self.uno = ArduinoUno()

    def test_import(self):
        '''Check the baudrate and end character from the current protocol'''
        self.assertEqual(self.uno.port, None)
        self.assertEqual(self.uno.id, "Generic CDC")

    def test_connection(self):
        '''Test arduino module'''
        pass

if __name__ == '__main__':
    unittest.main()
