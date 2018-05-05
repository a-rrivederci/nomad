// Motion functions
// @since 19-APR-2018

// Stops robot
void nStop() {
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
  if (motion == FWRD) {
    return;
  }
  motion = FWRD;

  // Set forward pins to HIGH
  digitalWrite(RFD, HIGH);
  digitalWrite(LFD, HIGH);
  // Set backward pins to LOW
  digitalWrite(RBD, LOW);
  digitalWrite(LBD, LOW); 
  // Accelerate fwd
  accelerate();

  return;
}

// Move robot Backwards
void nBackward() {
  if (motion == BKWD) {
    return;
  }
  motion = BKWD;

  // Set forward pins to LOW
  digitalWrite(RFD, LOW);
  digitalWrite(LFD, LOW);
  // Set backward pins to HIGH
  digitalWrite(RBD, HIGH);
  digitalWrite(LBD, HIGH); 
  // Accelerate bwd
  accelerate();

  return;
}

// Move robot right
void nRight() {
  if (motion == RGHT) {
    return;
  }
  motion = RGHT;

  // Set right pins reverse
  digitalWrite(RFD, LOW);
  digitalWrite(RBD, HIGH);
  // Set left pins to forward
  digitalWrite(LFD, HIGH);
  digitalWrite(LBD, LOW);
  // Accelerate fwd
  accelerateRight();

  return;
}

// Move robot left
void nLeft() {
  if (motion == LEFT) {
    return;
  }
  motion = LEFT;

  // Set right pins forward
  digitalWrite(RFD, HIGH);
  digitalWrite(RBD, LOW);
  // Set left pins to reverse
  digitalWrite(LFD, LOW);
  digitalWrite(LBD, HIGH);
  // Accelerate bwd
  accelerateLeft();

  return;
}

// Slowly increase enable pin values
void accelerate() {
  // accelerate right and left side
  for (int val=0x00; val<=MSD; val+=ACC) { // Control motor speed
    analogWrite(ENR, val);
    analogWrite(ENL, val);
    delay(5);      
  }

  return;
}
void accelerateLeft() {
  // accelerate right side
  for (int val=0x00; val<=MSD; val+=ACC) { // Control motor speed
    analogWrite(ENR, val);
    delay(5);      
  }

  return;
}
void accelerateRight() {
  // accelerate left side
  for (int val=0x00; val<=MSD; val+=ACC) { // Control motor speed
    analogWrite(ENL, val);
    delay(5);      
  }

  return;
}
