import pandas as pd
import json
from pprint import pprint
from pymongo import MongoClient

client = MongoClient('ds217131.mlab.com',17131)
db=client['savetheblood']
db.authenticate('manmeet','Manmeet12')
q=db['questions']

with open('set2.json') as f:
    data=json.load(f)

for i in range(len(data)):
    post_id=q.insert_one(data[i]).inserted_id
    print (post_id)