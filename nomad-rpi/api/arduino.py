#!/usr/bin/python3
# -*- coding: utf-8 -*-

'''\
Classes to easily communicate python with Arduino edge devices.

since: 23-APR-2018
'''

import io
import re
import logging
from serial import Serial, SerialException
from serial.tools import list_ports


ROOT = logging.getLogger("arduino")
ROOT.setLevel(level=logging.WARNING)

class Microcontroller(object):
    '''General purpose microcontroller python class'''
    MCU_LOG = logging.getLogger("arduino.mcu")

    def __init__(self):
        self.ports = None
        self.description = None
        self.meta = None
        self.baudrate = None
        self.connected = None
        self.connection = None

    def send_str(self, data: str) -> int:
        '''Send character string to port'''
        self.MCU_LOG.info("Sending \"{}\" string".format(data))
        num_bytes = self.connection.write(data.encode('utf-8'))

        return num_bytes

    def read_str(self, strip: bool = True) -> str:
        '''Read string from port'''
        data = self.connection.readline()
        self.MCU_LOG.info("Preprocessed: {}".format(data))

        if strip:
            string = data.decode().rstrip()
            self.MCU_LOG.info("Decoded and RStripped: {}".format(ret))
        else:
            string = data.decode()
            self.MCU_LOG.info("Only decoded: {}".format(ret))

        return string

    def flush_buffers(self) -> int:
        '''Flush serial buffer'''
        try:
            ret = 0
            self.connection.flushInput()
            self.connection.flushOutput()
        except SerialException:
            ret = 1

        return ret

    def __del__(self):
        if self.connection:
            self.connection.close()
        return

class ArdunioUno(Microcontroller):
    '''Arduino Uno device application interface'''
    ARD_LOG = logging.getLogger("arduino.uno")

    def __init__(self) -> bool:
        super().__init__()
        self.port = None
        

        self.id = 'Generic CDC'
    
    def connect(self, baudrate: int = 9600) -> bool:
        '''Automatically find the Arudino Uno and connect to it'''
        # Set baudrate
        self.baudrate = baudrate

        # Get ports and their descriptions
        self.ports, self.description, self.meta = zip(*list_ports.comports())

        if self.description == []:
            self.ARD_LOG.info("No ports found")
            # exit if no connection

            return False
        else:
            # Find likely arduino board
            for des in self.description:
                if self.id in des:
                    num = self.description.index(des)
                    self.ard_port = self.ports[num]

                    # Establish connection
                    self.connection = Serial(self.port, self.baudrate)
                    self.ARD_LOG.info("Connected to Arduino")
                    break
            else:
                # If it gets here, no description was found
                self.ARD_LOG.info("No Arduino found")
            
                return False

        return True

    def read_num(self) -> int:
        '''Read in numerical data from uno'''
        data = self.connection.readline()
        ret = int(ord(data.decode().rstrip()))

        return ret
