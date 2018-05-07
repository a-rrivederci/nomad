// Communications
// @since 19-APR-2018

// Fires at an interval when data is on the serial port
void serialEvent() {
  if (Serial.available()) {
    // Get the new byte of data
    char inChar = (char)Serial.read();

    if (assertCommand(inChar)) {
      // Immediately parse input for decoding
      Serial.println(F("Asserted"));
      decodeCommand(inChar);
    }
    else {
      if (inChar == '\n') {
        inChar = "";
      }
      else {
        Serial.println(F("Not Asserted"));
        // Send end signal
        serialReady();
      }
    }
  }
}

// Checks if the added command is part of the API specs
// this catches bad commands early.
byte assertCommand(char cmd) {
  byte ret = 0x00;
  // check if cmd is a capital letter
  if ((cmd >= FIRST) && (cmd <= LAST)) {
    ret = 0x01;
  }
  return ret;
}

// Get ready to send another message
void serialReady() {
  // Print end character for each command execution
  Serial.println(F("~"));
  return;
}

// Runs specific function based on asserted command
void decodeCommand(char cmd) {
  // if next command does not equal the previous one,
  // reset the motor speed to minimum.
  // if it does increase the speed or cap the speed.

  // Check if STOP command or sensor data is requested
  if (cmd == STOP || cmd == SENS) {
    // Do nothing
  }
  // Check if the same movement command is sent;
  // Saturate Speed or increase speed
  else if (cmd == motion) {
    // Increase speed
    if (speed >= 235) {
      speed = 255;
    }
    else {
      speed = speed + 5;
    }
  }
  // Check if the next movement command is not the current;
  // Stop and use base speed
  else if (cmd != motion) {
    nStop(); // first stop motion
    speed = 90;
  }

  switch (cmd) {
    case FWRD:
      nForward();
      break;
    case BKWD:
      nBackward();
      break;
    case RGHT:
      nRight();
      break;
    case LEFT:
      nLeft();
      break;
    case SENS:
      getSenosorValues();
      break;
    default:
      nStop();
      break;
  }
  serialReady();
}
