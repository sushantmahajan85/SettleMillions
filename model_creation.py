# -*- coding: utf-8 -*-
"""
Created on Wed Dec 23 15:21:59 2020

@author: ADITYA GOEL
"""

#Importing Libraries!
print("wallah")
import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.sparse
from scipy.sparse import csr_matrix
import sklearn
from sklearn.decomposition import TruncatedSVD
from pymongo import MongoClient
import urllib.parse
print("allah")
mongo_url= "mongodb+srv://vishu:" + urllib.parse.quote("PJ8EUXXMkfvjSaHu") + "@cluster0-bajdy.mongodb.net/user?retryWrites=true"

client = MongoClient(mongo_url)


db= client['user']
#entry_db= client['users']

mydict={}

mydict["user_id"]=[]
mydict["product_id"]=[]

print(mydict)

cur= db.users.find()
lm={}
for x in cur:
    lm[x["id"]]=[]
    lm[x["id"]].append(x["r1"].split(" ")[-1])
    lm[x["id"]].append(x["r2"].split(" ")[-1])
    lm[x["id"]].append(x["r3"].split(" ")[-1])
    lm[x["id"]].append(x["r4"].split(" ")[-1])
    lm[x["id"]].append(x["r5"].split(" ")[-1])
    
    mydict["user_id"].append(x["id"])
    mydict["product_id"].append(x["r1"].split(" ")[-1])
    mydict["user_id"].append(x["id"])
    mydict["product_id"].append(x["r2"].split(" ")[-1])
    mydict["user_id"].append(x["id"])
    mydict["product_id"].append(x["r3"].split(" ")[-1])
    mydict["user_id"].append(x["id"])
    mydict["product_id"].append(x["r4"].split(" ")[-1])     
    mydict["user_id"].append(x["id"])
    mydict["product_id"].append(x["r5"].split(" ")[-1])
    
    
user_pro_dict= pd.DataFrame()
user_pro_dict["users"]= lm.keys()
user_pro_dict["products"]= lm.values()

user_set= pd.DataFrame(mydict)

products = user_set.drop(columns=["user_id"])
users= user_set.drop(columns=["product_id"])
user_set= np.array(user_set)
user_array = np.array(users)
products_array = np.array(products)
uni_products = np.unique(products_array)
uni_users = np.unique(user_array)

newdict= np.array(user_pro_dict)
matrix = csr_matrix((len(uni_users), len(uni_products)), dtype=np.int8)
df = pd.DataFrame.sparse.from_spmatrix(matrix, columns=uni_products, index=uni_users)
df= df.sparse.to_dense()
i=0
for user, pro in newdict:
    for item in pro:
        df.iloc[i][item]=1
    i=i+1
X= df.T
SVD = TruncatedSVD(n_components=3)
decomposed_matrix = SVD.fit_transform(X)
decomposed_matrix.shape
correlation_matrix = np.corrcoef(decomposed_matrix)
correlation_matrix.shape

# print(correlation_matrix)

import pickle

cwd = os.getcwd()
filepath= f"{cwd}/kuchfile.pickle"
#with open('model_pickle', 'wb') as f:
pickle.dump(SVD, open(filepath, 'wb'))