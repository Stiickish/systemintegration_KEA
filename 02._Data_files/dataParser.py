import xml.etree.ElementTree as ET
import json
import yaml
import csv

# XML 
tree = ET.parse('./me.xml')
root = tree.getroot()
xml_content = ET.tostring(root, encoding='utf-8').decode('utf-8')
print("XML:")
print(xml_content)

# JSON
with open('./me.json', 'r') as file:
    json_content = json.load(file)
    print("JSON:")
    print(json_content)

# YAML
with open('./me.yaml','r') as file:
    yaml_content = yaml.safe_load(file)
    print("YAML:")
    print(yaml.dump(yaml_content, default_flow_style=False))

# CSV
with open('./me.csv','r') as file:
    csv_reader = csv.reader(file)
    csv_content = [row for row in csv_reader]
    print("CSV:")
    print(csv_content)

# TXT
with open('./me.txt','r') as file:
    txt_content = file.read()
    print("TXT:")
    print(txt_content)