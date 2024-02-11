import csv
import xmltodict
import yaml
import json

# CSV
def parse_csv(filename):
    with open(filename, 'r') as file:
        csv_reader = csv.DictReader(file)
        csv_data = [row for row in csv_reader]
        return csv_data

# XML
def parse_xml(filename):
    with open(filename, 'r') as file:
        xml_data = xmltodict.parse(file.read())
        return xml_data

# YAML
def parse_yaml(filename):
    with open(filename, 'r') as file:
        yaml_data = yaml.safe_load(file)
        return yaml_data

# JSON
def parse_json(filename):
    with open(filename, 'r') as file:
        json_data = json.load(file)
        return json_data

# TXT
def read_text(filename):
    with open(filename, 'r') as file:
        text_content = file.read()
        return text_content
    
if __name__ == '__main__':
    csv_data = parse_csv('../data/me.csv')
    xml_data = parse_xml('../data/me.xml')
    yaml_data = parse_yaml('../data/me.yaml')
    json_data = parse_json('../data/me.json')
    text_content = read_text('../data/me.txt')

    print("CSV Data: ", csv_data)
    print("\nXML Data: ", xml_data)
    print("\nYAML Data: ", yaml_data)
    print("\nJSON Data: ", json_data)
    print("\nText Content: \n", text_content)
