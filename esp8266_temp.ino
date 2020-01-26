
#include <PubSubClient.h>
#include <ESP8266WiFi.h>
#include <SPI.h>

#include <math.h>

const int B = 4275;               // B value of the thermistor
const int R0 = 100000;            // R0 = 100k
const int pinTempSensor = A0;     // Grove - Temperature Sensor connect to A0
int16_t temp;

// max received message length
#define MAX_MSG_LEN (128)

//Wifi configuration
const char* ssid = "SM-G955U137";
const char* password = "rpiconnection";


//MQTT configuration
const char *serverHostname = "test.mosquitto.org";
const char *topic = "test/temp";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  // put your setup code here, to run once:

  Serial.begin(115200);

  connectWifi();
  client.setServer(serverHostname, 1883);
}

void loop() {
  // put your main code here, to run repeatedly:
  if (!client.connected()) {
    connectMQTT();
  }
  int a = analogRead(pinTempSensor);

  float R = 1023.0/a-1.0;
  R = R0*R;

  float temperature = 1.0/(log(R/R0)/B+1/298.15)-273.15;
  char result[256];
 
  String num2 = String(temperature, 2);  
  
  num2.toCharArray(result, 30);
  client.publish(topic, result);
  client.loop();
  delay(1000);
}

void connectWifi() {
  delay(10);

  Serial.printf("\nConnecting to %s\n", ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(250);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("WiFi connected on IP address ");
  Serial.println(WiFi.localIP());
}

// connect to MQTT server
void connectMQTT() {
  // Wait until we're connected
  while (!client.connected()) {
    String clientId = "ESP8266-TEMP";
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("MQTT connected");
      // Once connected, publish an announcement...
      // ... and resubscribe
      // client.subscribe(topic);
    } else {
      Serial.printf("MQTT failed, state %s, retrying...\n", client.state());
      // Wait before retrying
      delay(2000);
    }
  }
}
