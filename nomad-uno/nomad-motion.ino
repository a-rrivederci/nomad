// Motion functions
// @since 19-APR-2018

// Stops robot
void roverStop() {
  // Avoid sending multiple STOP commands when stopped
  if (currentState == STOP) {
    return;
  }
  currentState = STOP;

  // Disable
  // Set all motor pins to low
  digitalWrite(RFD, LOW); // disable right fwd pins
  digitalWrite(RBD, LOW); // disable right bwd pins
  digitalWrite(ENR, LOW); // disable right motors
  digitalWrite(LFD, LOW); // disable left fwd pins
  digitalWrite(LBD, LOW); // disable left bwd pins
  digitalWrite(ENL, LOW); // disable left motors

  #ifdef DBG
  Serial.println(F("Stop Rover"));
  #endif

  return;
}

// Move robot forward
void roverForward() {
  currentState = FWRD;

  // Set forward pins to HIGH
  digitalWrite(RFD, HIGH);
  digitalWrite(LFD, HIGH);
  // Set backward pins to LOW
  digitalWrite(RBD, LOW);
  digitalWrite(LBD, LOW);

  // Actuate speed
  setSpeed();

  #ifdef DBG
  Serial.print(F("Rover Fwd: "));
  Serial.println(motorSpeed);
  #endif

  return;
}

// Move robot Backwards
void roverBackward() {
  currentState = BKWD;

  // Set forward pins to LOW
  digitalWrite(RFD, LOW);
  digitalWrite(LFD, LOW);
  // Set backward pins to HIGH
  digitalWrite(RBD, HIGH);
  digitalWrite(LBD, HIGH); 
  
  // Actuate speed
  setSpeed();

  #ifdef DBG
  Serial.print(F("Rover Bkd: "));
  Serial.println(motorSpeed);
  #endif

  return;
}

// Move robot right
void roverRight() {
  currentState = RGHT;

  // Set right pins reverse
  digitalWrite(RFD, LOW);
  digitalWrite(RBD, HIGH);
  // Set left pins to forward
  digitalWrite(LFD, HIGH);
  digitalWrite(LBD, LOW);

  // Actuate speed
  setSpeed();

  #ifdef DBG
  Serial.print(F("Rover Rgt: "));
  Serial.println(motorSpeed);
  #endif

  return;
}

// Move robot left
void roverLeft() {
  currentState = LEFT;

  // Set right pins forward
  digitalWrite(RFD, HIGH);
  digitalWrite(RBD, LOW);
  // Set left pins to reverse
  digitalWrite(LFD, LOW);
  digitalWrite(LBD, HIGH);
  
  // Actuate speed
  setSpeed();

  #ifdef DBG
  Serial.print(F("Rover Lft: "));
  Serial.println(motorSpeed);
  #endif

  return;
}

// Set speed values for forward, backward, left and right states
void setSpeed() {
  switch (currentState) {
    case FWRD:
      analogWrite(ENR, motorSpeed);
      analogWrite(ENL, motorSpeed);
      break;
    case BKWD:
      analogWrite(ENR, motorSpeed);
      analogWrite(ENL, motorSpeed);
      break;
    case LEFT:
      analogWrite(ENR, motorSpeed);
      analogWrite(ENL, 0);
    case RGHT:
      analogWrite(ENR, 0);
      analogWrite(ENL, motorSpeed);
    default:
      break; 
  }
  return;
}
