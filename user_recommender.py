
print("user_wallah")
#Importing Libraries!
import os
import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.sparse
from scipy.sparse import csr_matrix
import sklearn
from pymongo import MongoClient 
import urllib.parse
from random import randint
import pickle
from model_creation import X, correlation_matrix
from sklearn.decomposition import TruncatedSVD

mongo_url= "mongodb+srv://vishu:" + urllib.parse.quote("PJ8EUXXMkfvjSaHu") + "@cluster0-bajdy.mongodb.net/user?retryWrites=true"

client = MongoClient(mongo_url)


db= client['user']

i= f"{sys.argv[1]}"
print(i)
x= db.users.find_one({"id" : i})
#cur = db.users.find({"id": i})

lm=[]
#for a in cur:
#    lm.append(a["deal_id"])
lm.append(x["r1"].split(" ")[-1])
lm.append(x["r2"].split(" ")[-1])
lm.append(x["r3"].split(" ")[-1])
lm.append(x["r4"].split(" ")[-1])
lm.append(x["r5"].split(" ")[-1])



cwd = os.getcwd()
filepath= f"{cwd}/kuchfile.pickle"
SVD = pickle.load(open(filepath, 'rb'))

user_recomm=[]

for i in lm:
    if(i!='0'):
        product_names = list(X.index)
        product_ID = product_names.index(i)
        correlation_product_ID = correlation_matrix[product_ID]
        correlation_product_ID.shape
        indexes=correlation_product_ID.argsort()[-10:][::-1]
        recom_prods=[]
        for p in indexes:
            if(correlation_product_ID[p] > 0.0):
                recom_prods.append(p)
                
        Recommend = list(X.index[recom_prods])
        
        # Removes the item already bought by the customer
        Recommend.remove(i) 
        
        Recommend[0:5]
        
        for j in Recommend:
            if(j!='0'):
                if (j not in user_recomm):
                    user_recomm.append(j)
#db.recoms.find_one_and_delete({prod_id = i})

user_recomm[0:15]

user_recomm.remove('0')
print(user_recomm)
#company_cuisine = ['Pizza', 'Bar Food', 'Fast Food', 'Italian', 'Mexican', 'American', 'Sushi Bar', 'Vegetarian']
#for x in recommends:
recomms = {
    'recommendations' : user_recomm,
    'user_id' : x["id"]
}


   #Step 3: Insert business object directly into MongoDB via isnert_one
if (db.user_recoms.find_one({"user_id" : x["id"]})):
    db.user_recoms.find_one_and_update({ "user_id" : x["id"]}, {'$set': { "recommendations" : user_recomm } })
    print("done1")
else:
    db.user_recoms.insert_one(recomms)
    print('Done')
    #Step 4: Print to the console the ObjectID of the new document