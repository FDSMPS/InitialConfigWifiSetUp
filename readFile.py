import os
import json
import subprocess

f = open("./creds.json", "r")
a = (f.read())
f.close()

print(a)
jsonDictionary = json.loads(a)
cameraCode = jsonDictionary["cameraCode"]
ssid = jsonDictionary["ssid"]
psk = jsonDictionary["pass"]
print(cameraCode)
print(psk)
print(ssid)

toWriteToConfigFile = "ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev\r\nupdate_config=1\r\ncountry=CA\r\n\r\nnetwork={\r\n        ssid=\"" + ssid + "\"" + "\r\n        psk=\"" + psk + "\"" +"\r\n        key_mgmt=WPA-PSK\r\n}\r\n\r\n"

f = open('wpa_supplicant.conf', "w")
f.write(toWriteToConfigFile)
f.close()

os.system('sudo cp wpa_supplicant.conf /boot/')
os.system('sudo reboot')
