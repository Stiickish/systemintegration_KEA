text = "This is a text from main.py"
encoded = text.encode('utf_16','strict')
print("This is the encoded text:" ,encoded)

decoded = encoded.decode('utf-16','strict')
print("This is the decoded text:", decoded)