import uuid
import json

with open("./src/db/db.json") as data:
    productsInfo = json.load(data)["productsInfo"]
    
    categories = productsInfo["categories"]
    newCategories = {}
    for cat in categories:
        catName = cat["name"]
        cat.pop("name",None)
        
        newSpecs = {}
        for spec in cat["specs"]:
            newSpecs[spec["code"]] = spec["name"]
        
        cat["specs"] = newSpecs
        newCategories[catName] = cat

    productsInfo["categories"] = newCategories


with open("./src/db/db-copy.json") as data:
    allData = json.load(data)
    allData["productsInfo"] = productsInfo

with open("./src/db/db-copy.json","w") as data:
    json.dump(allData,data)
    
