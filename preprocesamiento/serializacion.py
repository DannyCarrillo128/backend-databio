# encoding: UTF-8

import sys
import pandas as pd
from rdflib import Namespace, URIRef, Literal, Graph
from rdflib.namespace import RDF, RDFS


# ===============================================================
# Namespaces
# ===============================================================
# Ontologías
OWL = Namespace('http://www.w3.org/2002/07/owl#')
DWC = Namespace('http://rs.tdwg.org/dwc/terms/')
skos = Namespace('http://www.w3.org/2004/02/skos/core#')
UMBEL = Namespace('http://umbel.org/umbel#')

# Dataset
coleccion = Namespace('http://localhost:3000/databio/herbario/')

# Datasets
uniprot = Namespace('http://www.uniprot.org/taxonomy/')
dbpedia = Namespace('http://dbpedia.org/page/')

data = pd.read_csv(r'./preprocesamiento/HerbarioTULV.csv')

g = Graph()

def serializar(uri, recordedBy, scientificName, family, institutionCode, continent, country, stateProvince, county, municipality, locality, uriLink):
    g.add((URIRef(uri), DWC.recordedBy, Literal(recordedBy)))
    g.add((URIRef(uri), DWC.scientificName, Literal(scientificName)))
    g.add((URIRef(uri), DWC.family, Literal(family)))
    g.add((URIRef(uri), DWC.institutionCode, Literal(institutionCode)))
    g.add((URIRef(uri), DWC.continent, Literal(continent)))
    g.add((URIRef(uri), DWC.country, Literal(country)))
    g.add((URIRef(uri), DWC.stateProvince, Literal(stateProvince)))
    g.add((URIRef(uri), DWC.county, Literal(county)))
    g.add((URIRef(uri), DWC.municipality, Literal(municipality)))
    g.add((URIRef(uri), DWC.locality, Literal(locality)))

    g.add((URIRef(uri), OWL.sameAs, URIRef(uriLink)))
    
    g.add((URIRef(uri), UMBEL.isAbout, URIRef(coleccion['HerbarioTULV.rdf'])))

for i in range(len(data.index)):
    serializar(
        coleccion['HerbarioTULV.rdf#'+ data.iloc[i]['catalogNumber']],
        data.iloc[i]['recordedBy'],
        data.iloc[i]['scientificName'],
        data.iloc[i]['family'],
        data.iloc[i]['institutionCode'],
        data.iloc[i]['continent'],
        data.iloc[i]['country'],
        data.iloc[i]['stateProvince'],
        data.iloc[i]['county'],
        data.iloc[i]['municipality'],
        data.iloc[i]['locality'],
        dbpedia[data.iloc[i]['family'].capitalize()])

g.serialize(destination=sys.argv [1], format='xml')