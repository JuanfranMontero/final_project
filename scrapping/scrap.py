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
enlaces = dom.xpath('//*[@id="iscroll"]/ul/li/div/div/div/a')
imagenes = dom.xpath('//*[@id="iscroll"]/ul/li/div/div/figure/div[1]/img/@src')

npaginas = 70 #Hay 70 paginas en mimascota.es
cont = 0

#Bucle para que busque en todas las paginas
while True:
    cont+=1

    url='https://www.miscota.es/perros/c_comida?pag='+str(cont)
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    dom = etree.HTML(str(soup))

    enlaces += dom.xpath('//*[@id="iscroll"]/ul/li/div/div/div/a')
    imagenes += dom.xpath('//*[@id="iscroll"]/ul/li/div/div/figure/div[1]/img/@src')

    if cont==npaginas:
        break

#Saca por pantalla los href
enlaces = [i.get('href') for i in enlaces]
cont=0
npiensos = 1383 #Hay 20 piensos por cada pagina

#Miro dentro de cada enlace y cojo lo que quiero
ingredientes=list()

for enlace in enlaces:
    url=enlace
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    dom = etree.HTML(str(soup))

    ingredientes.append(dom.xpath('//*[@id="content-ingredients"]/div/div/p/text()')+dom.xpath('//*[@id="content-ingredients"]/div/div/text()'))
    
    cont+=1
    if cont==npiensos:
        break


cursor = connection.cursor()

cont=0
juntito=''
for ingrediente in ingredientes:
    for ingredient in ingrediente:
        juntito+=ingredient+' '

    sql="INSERT INTO descripcion_nutricional (ingredientes) VALUES (%s)"
    value=juntito
    cursor.execute(sql,value)

    cont+=1
    if cont == npiensos:
        break

    juntito=''




connection.commit()








