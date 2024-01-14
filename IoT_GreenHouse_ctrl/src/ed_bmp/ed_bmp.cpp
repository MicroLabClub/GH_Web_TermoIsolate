#include "Arduino.h"
#include "ed_relay/ed_relay.h"
#include <Adafruit_BMP085.h>

//#define RELAY_PIN 5

Adafruit_BMP085 bmp;

float ed_bmp_temperature = 0;
float ed_bmp_pressure = 0;

int ed_bmp_sensor_error = 0;
int ed_bmp_threshhold_pressure = 100000; // 1 bar

float ed_bmp_GetTemperature(void)
{
  return ed_bmp_temperature;
}

float ed_bmp_GetPressure(void)
{
  return ed_bmp_pressure;
}

int ed_bmp_GetSensorError(void)
{
  return ed_bmp_sensor_error;
}

void ed_bmp_setup()
{
  Serial.begin(9600);
  //  Initialize device.
  if (!bmp.begin())
  {
    Serial.println("ED BMP: Could not find a valid BMP085 sensor, check wiring!");
    ed_bmp_sensor_error = 1;
  }
  //pinMode(RELAY_PIN, OUTPUT);
}

void ed_bmp_loop()
{

  if (ed_bmp_sensor_error == 0)
  {
    ed_bmp_temperature = bmp.readTemperature();
    Serial.print("ED BMP: Temperature = ");
    Serial.print(ed_bmp_temperature);
    Serial.println(" *C");

    ed_bmp_pressure = bmp.readPressure();
    Serial.print("ED BMP: Pressure = ");
    Serial.print(ed_bmp_pressure / 100000);
    Serial.println(" bar");

    Serial.println();
  }

  //if (ed_bmp_pressure < ed_bmp_threshhold_pressure){
  //  digitalWrite(RELAY_PIN, HIGH); 
  //  ed_relay_on(4);
  //} else {
  //  digitalWrite(RELAY_PIN, LOW);
  //  ed_relay_off(4);
    
  //}
  
   
}