# NOMAD Uno

Firmware abstraction for the Arduino Uno microcontroller.

## Serial control table

| Command | Response |
| --- | --- |
| `A` | Stop motors |
| `B` | Accelerate Forward |
| `C` | Accelerate Backwards |
| `D` | Turn Right |
| `E` | Turn Left |
| `F` | Get all sensor values |

&nbsp;

## Communincation Protocol

Each command is sent as a string of command followed by a newline character. After which it is ended with a `~`.

### Example 

```text
NOMAD Uno v3.0.0
~

$ A\n
>
~

$ H\n
<
~
```
