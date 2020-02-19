import os
import json

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

# {"cameraCode":"1234556","ssid":"eduroam","pass":"password"}


filePathToWrite = '/Users/dors/Desktop/Fifth year/ECE 492/wifiLogin/public'
filepath = os.path.join(filePathToWrite, 'wpa_supplicant.conf')
if not os.path.exists(filePathToWrite):
    os.makedirs(filePathToWrite)

toWriteToConfigFile = "network={\n\tssid=\"" + ssid + "\"" + "\n\tpsk=\"" + psk + "\"" +"\n}"

f = open(filepath, "w")
f.write(toWriteToConfigFile)
f.close()





# network={
#     ssid="testing"
#     psk="testingPassword"
# }

