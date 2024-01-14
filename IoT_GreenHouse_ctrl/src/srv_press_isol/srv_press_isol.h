#ifndef SRV_SNS_AIR_PRESS_H_
#define SRV_SNS_AIR_PRESS_H_


void srv_sns_air_press_setup();
void srv_sns_air_press_loop();

float srv_sns_air_GetPressure(void);
int srv_sns_air_GetPressureError(void);


#endif