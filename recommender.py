# -*- coding: utf-8 -*-
"""
Created on Mon Dec 21 11:53:41 2020

@author: ADITYA GOEL
"""

print('Recommend')
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
    
# with open('model_pickle', 'rb') as f:
#     SVD= pickle.load(f)

print(sys.argv)

cwd = os.getcwd()
filepath= f"{cwd}/kuchfile.pickle"
SVD = pickle.load(open(filepath, 'rb'))
print(sys.argv[2]["one"])
i= f"{sys.argv[1]}"
print(i)
# input()

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
print('999999999')

# Removes the item already bought by the customer
Recommend.remove(i) 

Recommend[0:10]
Recommend.remove('0')

print(Recommend)

mongo_url= "mongodb+srv://vishu:" + urllib.parse.quote("PJ8EUXXMkfvjSaHu") + "@cluster0-bajdy.mongodb.net/user?retryWrites=true"

client = MongoClient(mongo_url)


db= client['user']
#db.recoms.find_one_and_delete({prod_id = i})

#company_cuisine = ['Pizza', 'Bar Food', 'Fast Food', 'Italian', 'Mexican', 'American', 'Sushi Bar', 'Vegetarian']
#for x in recommends:
recomms = {
    'recommendations' : Recommend,
    'prod_id' : i
}

   #Step 3: Insert business object directly into MongoDB via isnert_one
if (db.recoms.find_one({"prod_id" : i})):
    db.recoms.find_one_and_update({ "prod_id" : i}, {'$set': { "recommendations" : Recommend} })
    print("done1")
else:
    db.recoms.insert_one(recomms)
    print('Done')
    #Step 4: Print to the console the ObjectID of the new document