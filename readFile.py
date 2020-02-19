import os
import json
import subprocess

f = open("creds.json", "r")
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


# filePathToWrite = '/Users/dors/Desktop/Fifth year/ECE 492/wifiLogin/public'
# filepath = os.path.join(filePathToWrite, 'wpa_supplicant.conf')
# if not os.path.exists(filePathToWrite):
#     os.makedirs(filePathToWrite)

toWriteToConfigFile = "network={\n\tssid=\"" + ssid + "\"" + "\n\tpsk=\"" + psk + "\"" +"\n}"

f = open('wpa_supplicant.conf', "w")
f.write(toWriteToConfigFile)
f.close()


subprocess.call(['./copy.sh'])