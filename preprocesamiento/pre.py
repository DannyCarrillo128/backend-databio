#encoding: utf-8

import sys
import pandas as pd
import csv

#Importación del dataset

#print(sys.path)

data = pd.read_csv(sys.argv [1], dtype={"associatedReferences": str, "habitat": str, "minimumElevationInMeters": str, "coordinateUncertaintyInMeters": str, "kingdom": str, "specificEpithet": str, "taxonRemarks": str})
df = pd.DataFrame(data)

#Busca los nulos y los reemplaza por una cadena de texto
sinNulos = df.fillna('Sin especificar')


#crea un dataset con todos los campos nulos reemplazados
sinNulos.drop(df.columns[[0]], axis='columns')
inciva = sinNulos.to_csv(r'./preprocesamiento/data.csv', index=False)
#print(inciva) 