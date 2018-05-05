// On-board Nomad sensors
// @since 19-APR-2018

// Return all connected on-board nomad sensors
void getSenosorValues() {
  irSensorLeft();
  irSensorMiddle();
  irSensorRight();
  return;
}

void irSensorLeft() {
  Serial.print(F("leftIR:"));
  Serial.println(analogRead(10));
  return;
}

void irSensorMiddle() {
  Serial.print(F("midIR:"));
  Serial.println(analogRead(4));
  return;
}

void irSensorRight() {
  Serial.print(F("rightIR:"));
  Serial.println(analogRead(2));
  return;
}
