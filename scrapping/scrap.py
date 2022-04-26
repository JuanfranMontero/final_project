from turtle import title
from bs4 import BeautifulSoup
import requests
import pandas as pd
from lxml import etree
import pymysql

connection = pymysql.connect(
    host="localhost",
    user="root",
    password="",
    db="proyecto_final"
)



url = 'https://www.miscota.es/perros/c_comida'
page = requests.get(url)
soup = BeautifulSoup(page.content, 'html.parser')
dom = etree.HTML(str(soup))

#Primera pagina
enlaces = dom.xpath('//*[@id="iscroll"]/ul/li/div/div/div/a/@href')
imagenes1 = dom.xpath('//*[@id="iscroll"]/ul/li/div/div/figure/div[1]/img/@data-original')
imagenes2 = dom.xpath('//*[@id="iscroll"]/ul/li/div/div/figure/div[2]/img/@data-original')

npaginas = 66 #Hay 66 paginas en mimascota.es
cont = 0

#Bucle para que busque en todas las paginas
while True:
    cont+=1

    url='https://www.miscota.es/perros/c_comida?pag='+str(cont)
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    dom = etree.HTML(str(soup))

    enlaces += dom.xpath('//*[@id="iscroll"]/ul/li/div/div/div/a/@href')
    imagenes1 += dom.xpath('//*[@id="iscroll"]/ul/li/div/div/figure/div[1]/img/@data-original')
    imagenes2 += dom.xpath('//*[@id="iscroll"]/ul/li/div/div/figure/div[2]/img/@data-original')
    

    if cont==npaginas:
        break

#Saca por pantalla los href
cont=0
npiensos = 1303 #Hay 20 piensos por cada pagina

#Miro dentro de cada enlace y cojo lo que quiero
ingredientes=list()
caracteristicas_array=list()


for enlace in enlaces:
    url=enlace
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    dom = etree.HTML(str(soup))

    ingredientes.append(dom.xpath('//*[@id="content-ingredients"]/div/div//text()'))
    caracteristicas_array.append(dom.xpath('//*[@id="content-mainInfo"]/div//text()'))
    
    cont+=1
    if cont==npiensos:
        break

#Quitar los '\n'
'''for caracteristica in caracteristicas_array:
    for caract in caracteristica:
        if caract=='\n':
            caracteristica.remove(caract)

for ingrediente in ingredientes:
    for ingredient in ingrediente:
        if ingredient =='\n':
            ingrediente.remove(ingredient)   '''        

cursor = connection.cursor()

cont=0
juntito=''
for ingrediente in ingredientes:
    for ingredient in ingrediente:
        juntito+=ingredient+' '

    if juntito == '':
        juntito='---'

    sql="INSERT INTO descripcion_nutricional (ingredientes) VALUES (%s)"
    value=juntito
    cursor.execute(sql,value)

    cont+=1
    if cont == npiensos:
        break

    juntito=''


juntito=''
for caracteristica in caracteristicas_array:
    for caracter in caracteristica:
        juntito+=caracter+' '

    sql="INSERT INTO caracteristicas (caracteristicas) VALUES (%s)"
    value=juntito
    cursor.execute(sql,value)  

    juntito='' 

cont=0
cont2=0
while True:
    sql="INSERT INTO alimentos (enlace, enlace_imagen, enlace_imagen_2) VALUES (%s, %s, %s)"
    value=enlaces[cont],imagenes1[cont],imagenes2[cont2]
    cursor.execute(sql,value)

    cont+=1
    cont2+=1
    if cont2 == len(imagenes2):
        imagenes2[cont2-1]=''
        cont2-=1
    if cont == len(enlaces):
        break

connection.commit()








