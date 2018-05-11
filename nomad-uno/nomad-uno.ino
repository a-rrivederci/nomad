// Nomad firmware abstraction for the Arduino-Uno
// License can be found in LICENSE
// @since 19-APR-2018

#define DBG
// Right wheels
#define ENR         (5) // right enable
#define RFD         (6) // right forward
#define RBD         (7) // right backward

// Left Wheels
#define ENL         (11) // left enable
#define LBD         (8) // left backward
#define LFD         (9) // left forward

// Robot Parameters
#define LSD         (90) // min speed
#define MSD         (255) // max speed

// Motion API
#define STOP        ('A')
#define FWRD        ('B')
#define BKWD        ('C')
#define RGHT        ('D')
#define LEFT        ('E')
#define SENS        ('F')

// Protocol parameters
#define FIRST       STOP
#define LAST        SENS
#define ASSERT      ('>')
#define NOT_ASSERT  ('<')
#define READY       ('~')     

char currentState = STOP; // Currrent rover state
int motorSpeed = 0; // Motor Speed

// Program setup
void setup() {
  // Set right motor pins as output pins
  pinMode(RFD, OUTPUT);
  pinMode(RBD, OUTPUT);
  pinMode(ENR, OUTPUT);
  // Set left  motor pins as output pins
  pinMode(LBD, OUTPUT);
  pinMode(LFD, OUTPUT);
  pinMode(ENL, OUTPUT);

  // Start serial ----------------------
  Serial.begin(115200);
  Serial.println("NOMAD Uno v3.0.0");

  // Disbale all motors 
  digitalWrite(RFD, LOW); // disable right fwd pins
  digitalWrite(RBD, LOW); // disable right bwd pins
  digitalWrite(ENR, LOW); // disable right motors
  digitalWrite(LFD, LOW); // disable left fwd pins
  digitalWrite(LBD, LOW); // disable left bwd pins
  digitalWrite(ENL, LOW); // disable left motors

  // Begin serial process
  serialReady();
}

// Program loop
void loop() {
}
