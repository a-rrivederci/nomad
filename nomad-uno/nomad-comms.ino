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
  switch (cmd) {
    case FWRD:
      nStop();
      nForward();
      break;
    case BKWD:
      nStop();
      nBackward();
      break;
    case RGHT:
      nStop();
      nRight();
      break;
    case LEFT:
      nStop();
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
