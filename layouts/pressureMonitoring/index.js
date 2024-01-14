import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";


import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDInput from "components/MDInput";


import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import MDButton from "components/MDButton";


import mqtt from "mqtt";
import { options } from "../../config/mqtt.config";
import { host } from "../../config/mqtt.config";
import MDTypography from "components/MDTypography";


const pressureMonitoring = () => {


  const [messages, setMessages] = useState([]);

  //  console.log(messages);

  async function getMessages() {
    try {
      const response = await axios.post('http://localhost:3001/api/messages/getBySensorId', { "sensor_id": 1 });
      let result = response.data;
      console.log(result.length);

      let shortResult = result.splice(result.length - 20, result.length);

      setMessages({
        labels: shortResult.map(x => x.message_id),
        datasets: { label: "Temperature", data: shortResult.map(x => JSON.parse(x.message).temp) },
      });

      console.log(messages);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMessages();
  }, []);

  /*   Set Data */
  const [settingsTempTime, setSettingsTempTime] = useState(0);
  const [settingsHumTime, setSettingsHumTime] = useState(0);


  function setMqttData() {
    try {
      let publishSettings = JSON.stringify({ 'humTime': settingsHumTime, 'tempTime': settingsTempTime });
      console.log(publishSettings);

      let result = client.publish('microlab/agro/device/ventilation/settings', publishSettings);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const changeTempSettingsHandler = (e) => {
    setSettingsTempTime(e.target.value);
  };

  const changeHumiditySettingsHandler = (e) => {
    setSettingsHumTime(e.target.value);
  };



  /* MQTT */
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState(null);

  const [temp, setTemp] = useState(0);
  const [hum, setHum] = useState(0);

  //const tempTopic = 'agrobot/sensors/temperature/sensor-1';
  //const humTopic = 'agrobot/sensors/temperature/sensor-2';


  const mqttConnect = () => {
    setConnectStatus('Connecting');
    let client = mqtt.connect(host, options);
    setClient(client);
  };

  useEffect(() => {
    mqttConnect();
  }, []);

  useEffect(() => {
    if (client) {
      console.log(client);
      client.on('connect', () => {
        setConnectStatus('Connected');

        client.subscribe(tempTopic);
        client.subscribe(humTopic);
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        setConnectStatus('Message received');

        if (topic === tempTopic) {
          setTemp(JSON.parse(message.toString()).temp);
        } else if (topic === humTopic) {
          setHum(JSON.parse(message.toString()).hum);
        }
        console.log(message.toString());
      });
    }
  }, [client]);


  return (
    <DashboardLayout marginLeft={274}>
      <DashboardNavbar />
      <MDBox py={3}>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Pressure statistic"
                  description={
                    <>
                      This chart represents the pressure statistic for the insulation pillow.
                    </>
                  }
                  date="Updated 20min"
                  chart={messages}
                />
              </MDBox>
            </Grid>

          </Grid>
        </MDBox>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Pump On/Off statistic"
                  description={
                    <>
                      This chart represent the pump on/off status.
                    </>
                  }
                  date="Updated 20min ago"
                  chart={messages}
                />
              </MDBox>
            </Grid>
            <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
           
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <MDButton variant="gradient" color="info" fullWidth type="submit" onClick={(e) => getMessages(e)}>
                Load Pump Data
              </MDButton>
            </MDBox>

          </Grid>

          <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <MDTypography > MQTT status : {connectStatus}</MDTypography>
              </MDBox>
              <MDBox mb={1.5}>
                <MDTypography > Current Settings :</MDTypography>

              </MDBox>

            </Grid>
        </Grid>

          </Grid>
        </MDBox>
        

      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default pressureMonitoring;
