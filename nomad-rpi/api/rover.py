#!/usr/bin/python3
# -*- coding: utf-8 -*-

'''\
Implementation specific program for the nomad rover

since: 23-APR-2018
'''

import re
import sys
import datetime
from time import sleep
import logging
from .arduino import ArduinoUno

ROOT_LOGGER = logging.getLogger("nomad")
ROOT_LOGGER.setLevel(level=logging.DEBUG)
LOG_HANDLER = logging.StreamHandler()
LOG_FORMATTER = logging.Formatter(
    fmt='%(asctime)s [%(name)s](%(levelname)s) %(message)s',
    datefmt='%H:%M:%S'
)
LOG_HANDLER.setFormatter(LOG_FORMATTER)
ROOT_LOGGER.addHandler(LOG_HANDLER)


class Rover(object):
    '''\
    Nomad Rover instructional. 
    '''
    ROV_LOG = logging.getLogger("nomad.rover")
    MCU_LOG = logging.getLogger("nomad.arduino")

    def __init__(self):
        self.ARDUINO = None
        self.BAUDRATE = 115200
        self.ptime = 0.1

        # Comms protocols
        self.ASSERT_CHAR = '>'
        self.NOT_ASSERT_CHAR = '<'
        self.READY_CHAR = '~'

        # Commands
        self.STOP = "A\n"
        self.FWRD = "B\n"
        self.BACK = "C\n"
        self.RGHT = "D\n"
        self.LEFT = "E\n"
        self.SENS = "F\n"

        self.ROV_LOG.info("Initialized {}".format(__class__))

    def connect(self) -> bool:
        '''Establish connection with the mcu'''
        ret = False
        self.ARDUINO = ArduinoUno()
        if self.ARDUINO.connect():
            self.get_response()
            ret = True
        return ret

    def move(self, direction: str, time: int=0.1) -> None:
        # if direction == "F":
        #     cmd = self.FWRD
        # elif direction == "B":
        #     cmd = self.BACK
        # elif direction == "R":
        #     cmd = self.RGHT
        # elif direction == "L":
        #     cmd = self.LEFT
        # else:
        #     cmd = self.STOP

        # Send command
        self.ARDUINO.flush_buffers()
        self.pause()
        self.ARDUINO.send_str(direction)
        self.pause()
        
    def pause(self, time: int=0.1) -> None:
        sleep(time)

    def sensor(self):
        '''Sensors method'''
        cmd = self.SENS

        # Send command
        self.ARDUINO.flush_buffers()
        self.ARDUINO.send_str(cmd)
        
        # Get sensor data
        msg = ""
        while True:
            m = self.ARDUINO.read_str()
            if m == self.READY_CHAR:
                break
            else:
                msg += m + "\n"

        # sensor data
        data = {}
        for sens in msg.split('\n')[1:-1]:
            name, val = [i.strip() for i in sens.split(':')]
            data[name] = int(val)
        ROV_LOG.info("Data: {}".format(data))
        return data

    def get_response(self):
        '''Continously log all data on the port until protocol end'''
        while True:
            msg = self.ARDUINO.read_str()
            if msg == self.READY_CHAR:
                break
            else:
                MCU_LOG.info(msg)

if __name__ == "__main__":
    rover = Rover()
    sys.exit(0)
