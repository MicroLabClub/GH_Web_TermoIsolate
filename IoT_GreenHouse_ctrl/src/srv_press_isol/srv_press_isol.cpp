/*
#include "srv_press_isol.h"
#include "ed_bmp/ed_bmp.h"
#include "../lib_cond/lib_cond.h"
#include "Arduino.h"

float srv_sns_air_press = 1;
int srv_sns_air_press_error = 0;


float srv_sns_air_GetPressure(void)
{
  return srv_sns_air_press;
}


int srv_sns_air_GetPressureError(void)
{
  return srv_sns_air_press_error;
}


#define INPUT_BUFF_SIZE 8
float srv_sns_air_press_buff_in[INPUT_BUFF_SIZE];


#define MEDIAN_BUFF_SIZE 5
float srv_sns_air_press_buff_med[MEDIAN_BUFF_SIZE];

#define LPF_BUFF_SIZE 4
float srv_sns_air_press_buff_lpf[LPF_BUFF_SIZE];
float srv_sns_air_press_weights_lpf[LPF_BUFF_SIZE] = {50, 25, 15, 10};

void srv_sns_air_press_setup()
{
  

}

float srv_sns_air_temp_cond(float temp);

void srv_sns_air_press_loop()
{

    srv_sns_air_press_error = 0;
    float temp_raw = ed_bmp_GetPressure();

    // Serial.print(F("SRV SNS Temperature: "));
    // Serial.print(temp_raw);
    // Serial.println(F("°C"));

    //srv_sns_air_press = srv_sns_air_press_cond(temp_raw);
  }



float srv_sns_air_press_cond(float temp_raw)
{
  // 1. FILTRU MEDIAN
  // 1.1. coletam fluxul de intrare in bufer FIFO
  fifo_push(temp_raw, srv_sns_air_press_buff_in, INPUT_BUFF_SIZE);
  // print_buff(temp_buff_in, INPUT_BUFF_SIZE);

  // 1.2. luam o copie din buferul de intrare
  buf_copy(srv_sns_air_press_buff_in, srv_sns_air_press_buff_med, MEDIAN_BUFF_SIZE);
  // print_buff(temp_buff_med, MEDIAN_BUFF_SIZE);

  // 1.3. sortam copia
  buf_sort(srv_sns_air_press_buff_med, MEDIAN_BUFF_SIZE);
  // print_buff(temp_buff_med, MEDIAN_BUFF_SIZE);

  // 1.4. extragem mediana
  float temp_median = srv_sns_air_press_buff_med[MEDIAN_BUFF_SIZE / 2];

  // // raportam valoarea mediana
  // Serial.print(F("Temperature MEDIAN: "));
  // Serial.print(temp_median);
  // Serial.println(F("°C"));

  // 2. FILTRU TRECE JOS (media ponderata)
  // 2.1. coletam fluxul de intrare in bufer FIFO
  fifo_push(temp_median, srv_sns_air_press_buff_lpf, LPF_BUFF_SIZE);
  // print_buff(temp_buff_lpf, LPF_BUFF_SIZE);

  // 2.2 evaluam media ponderata
  float press_flt = buf_wavg(srv_sns_air_press_buff_lpf, srv_sns_air_press_weights_lpf, LPF_BUFF_SIZE);

  // // raportam valoarea filtrata
  // Serial.print(F("Temperature FTJ: "));
  // Serial.print(temp_flt);
  // Serial.println(F("°C"));

  return press_flt;
}
*/