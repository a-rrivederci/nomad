// Communications
// @since 19-APR-2018

// Fires at an interval when data is on the serial port
void serialEvent() {
  if (Serial.available()) {
    // Get the new byte of data
    char inChar = (char)Serial.read();

    // If command is not asserted, check if it is an end character
    // For end character reset the inChar,
    // else return unassertion and prep for the next command
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
        serialReady();
      }
    }
  }
}

// Checks if the added command is part of the API specs
// this catches bad commands early.
byte assertCommand(char nextCmd) {
  byte value = 0;
  // check if nextCmd is a capital letter in the current protocol
  // ASCII A(65) - F(70)
  if ((nextCmd >= FIRST) && (nextCmd <= LAST)) {
    value = 1;
  }
  return value;
}

// Get ready to send another message
void serialReady() {
  // Print end character for each command execution
  Serial.println(F("~"));
  return;
}

// Runs specific function based on asserted command
void decodeCommand(char nextCmd) {
  // if next command does not equal the previous one,
  // reset the motor speed to minimum.
  // if it does increase the speed or cap the speed.

  // Check if STOP command or sensor data is requested
  if (nextCmd == STOP || nextCmd == SENS) {
    // Do nothing
  }
  // Check if the same movement command is sent;
  // Saturate Speed or increase speed
  else if (nextCmd == currentState) {
    // Increase speed
    if (motorSpeed >= 235) {
      motorSpeed = MSD;
    }
    else {
      motorSpeed = motorSpeed + 5;
      #ifdef DBG
      Serial.println(F("Speed++"));
      #endif
    }
  }
  // Check if the next movement command is not the current;
  // Stop and use base speed
  else if (nextCmd != currentState) {
    roverStop(); // first stop motion
    motorSpeed = LSD;

    #ifdef DBG
    Serial.println(F("Reset speed to lowest"));
    #endif
  }
  else {
    // Nothing
  }

  switch (nextCmd) {
    case FWRD:
      roverForward();
      break;
    case BKWD:
      roverBackward();
      break;
    case RGHT:
      roverRight();
      break;
    case LEFT:
      roverLeft();
      break;
    case SENS:
      getSenosorValues();
      break;
    default:
      roverStop();
      break;
  }
  serialReady();
}
