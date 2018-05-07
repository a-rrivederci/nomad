// Motion functions
// @since 19-APR-2018

// Stops robot
void nStop() {
  // Avoid sending multiple STOP commands when stopped
  if (motion == STOP) {
    return;
  }
  motion = STOP;

  // Disable
  // Set all motor pins to low
  digitalWrite(RFD, LOW); // disable right fwd pins
  digitalWrite(RBD, LOW); // disable right bwd pins
  digitalWrite(ENR, LOW); // disable right motors
  digitalWrite(LFD, LOW); // disable left fwd pins
  digitalWrite(LBD, LOW); // disable left bwd pins
  digitalWrite(ENL, LOW); // disable left motors

  return;
}

// Move robot forward
void nForward() {
  motion = FWRD;

  // Set forward pins to HIGH
  digitalWrite(RFD, HIGH);
  digitalWrite(LFD, HIGH);
  // Set backward pins to LOW
  digitalWrite(RBD, LOW);
  digitalWrite(LBD, LOW);

  // Actuate speed
  setSpeed();

  return;
}

// Move robot Backwards
void nBackward() {
  motion = BKWD;

  // Set forward pins to LOW
  digitalWrite(RFD, LOW);
  digitalWrite(LFD, LOW);
  // Set backward pins to HIGH
  digitalWrite(RBD, HIGH);
  digitalWrite(LBD, HIGH); 
  
  // Actuate speed
  setSpeed();

  return;
}

// Move robot right
void nRight() {
  motion = RGHT;

  // Set right pins reverse
  digitalWrite(RFD, LOW);
  digitalWrite(RBD, HIGH);
  // Set left pins to forward
  digitalWrite(LFD, HIGH);
  digitalWrite(LBD, LOW);

  // Actuate speed
  setSpeed();

  return;
}

// Move robot left
void nLeft() {
  motion = LEFT;

  // Set right pins forward
  digitalWrite(RFD, HIGH);
  digitalWrite(RBD, LOW);
  // Set left pins to reverse
  digitalWrite(LFD, LOW);
  digitalWrite(LBD, HIGH);
  
  // Actuate speed
  setSpeed();

  return;
}

// Set speed values for forward, backward, left and right motions
void setSpeed() {
  switch (motion) {
    case FWRD:
      analogWrite(ENR, speed);
      analogWrite(ENL, speed);
      break;
    case LEFT:
      analogWrite(ENR, speed);
      analogWrite(ENL, 0);
    case RGHT:
      analogWrite(ENR, 0);
      analogWrite(ENL, speed);
    default:
      break; 
  }
  return;
}
