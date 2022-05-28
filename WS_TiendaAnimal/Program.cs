using HtmlAgilityPack;
using ScrapySharp.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using WS_TiendaAnimal.Models;

namespace WebScraping_TiendaAnimal
{
    internal class Programç

    {
        static void Main(string[] args)
        {
           
            string[] listBrand = System.IO.File.ReadAllLines("C:/Final_Project/final_project/WS_TiendaAnimal/MarcasURL.txt");

           

            try
            {
                
                listBrand.ToList()
                    .ForEach(b => NavigateWeb(b));
                Console.WriteLine("Conseguido =)");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Tipo de error: " + ex.GetType());
                Console.WriteLine("El mensaje: " + ex.Message);
                throw;
            }
        }

            public static void NavigateWeb(string urlBrand)
        {

            HtmlDocument MainDoc = GetScrappingObject(urlBrand);

            foreach (var item in MainDoc.DocumentNode.CssSelect("a").Where(item => item.GetAttributeValue("title").Contains("Pienso") && item.GetAttributeValue("href") != null && item.GetAttributeValue("class") == "teaser__title text_color block mt0 mt2-sm  js-enhanced_product  js-ellipsis_wrapper"))
            {
                ScrapTheFuckingWeb(item.GetAttributeValue("href"));
            }
        }

        public static void ScrapTheFuckingWeb(string brandUrl)
        {
            using (TiendaAnimalDataEntities1 db = new TiendaAnimalDataEntities1())
            {

            
                HtmlDocument MainDoc = GetScrappingObject(brandUrl);
                ////Extraigo los titulos
                var nodoTitulo = MainDoc.DocumentNode.CssSelect("H1");
            
                var tablaProducto = new productos();// instancio un objeto produco
                nodoTitulo.ToList().ForEach(x => tablaProducto.nombre = x.InnerText);
                //Console.WriteLine($"{dbTitulo.nombre}");
                db.productos.Add(tablaProducto);

                ////Extaigo las imagenes
                var nodoImagen = MainDoc.DocumentNode.CssSelect("img").Where(img => img.GetAttributeValue("class") == "img-responsive product__image round").Select(x => x.GetAttributeValue("src"));
                var dbImagen = new productos();


                foreach (var img in nodoImagen.ToList())
                {
                    tablaProducto.imagen = img;
                    db.productos.Add(dbImagen);
                }

                ////Extraigo las caracteristicas
                IEnumerable<HtmlNode> enumerableKey = MainDoc.DocumentNode.CssSelect("div")
                                .Where(div => div.GetAttributeValue("class") == "col-md-4 mt3 mt0-md")
                                .CssSelect("span").Where(s => s.GetAttributeValue("class") == "flex-none mr2");
                IEnumerable<HtmlNode> enumerableValue = MainDoc.DocumentNode.CssSelect("div")
                                .Where(div => div.GetAttributeValue("class") == "col-md-4 mt3 mt0-md")
                                .CssSelect("span").Where(s => s.GetAttributeValue("class") == "text-right bold ml-auto");

                var Key = enumerableKey.ToArray();
                var Value = enumerableValue.ToArray();


                var tablaCaracteristicas = new caracteristicas();

                for (int i = 0; i < (Key.Length); i++)
                {
                    if (Key[i].InnerText.Contains("C&oacute;digo EAN"))
                    {

                        string[] v = Value[i].InnerText.Split(',').ToArray();

                        for (int j = 0; j < v.Length; j++)
                        {
                            if (!v[j].Contains("System."))
                            {
                                
                                tablaCaracteristicas.codigo_ean = Value[i].InnerText;
                                db.caracteristicas.Add(tablaCaracteristicas);
                                j = v.Length;
                            }
                        }
                    }
                }
            
                for (int i = 0; i < (Key.Length); i++)
                {
               
                    if (Key[i].InnerText.Contains("Edad"))
                    {
                        ;
                        tablaCaracteristicas.edad = Value[i].InnerText;
                        
                        //Console.WriteLine($"{Key[i].InnerText}: {Value[i].InnerText}");

                    }
                    else if (Key[i].InnerText.Contains("Cuidados específicos"))
                    {
                        
                        tablaCaracteristicas.cuidado_especifico = Value[i].InnerText;
                        
                        //Console.WriteLine($"{Key[i].InnerText}: {Value[i].InnerText}");

                    }
                    else if (Key[i].InnerText.Contains("Ingrediente Principal"))
                    {
                      
                        tablaCaracteristicas.ingrediente_principal = Value[i].InnerText;
                        db.caracteristicas.Add(tablaCaracteristicas);
                        //Console.WriteLine($"{Key[i].InnerText}: {Value[i].InnerText}");

                    }
                    else if (Key[i].InnerText.Contains("Raza"))
                    {
                        
                        tablaCaracteristicas.raza = Value[i].InnerText;
                       
                        //Console.WriteLine($"{Key[i].InnerText}: {Value[i].InnerText}");

                    }
                
                    else if (Key[i].InnerText.Contains("Opción nutricional"))
                    {

                        
                        tablaCaracteristicas.opcion_nutricional = Value[i].InnerText;
                       
                        //Console.WriteLine($"{Key[i].InnerText}: {Value[i].InnerText}");

                    }
                }
                db.caracteristicas.Add(tablaCaracteristicas);

                //Extraigo las descripciones

                var tablaIngredientes = new descripciones();

                foreach (var node in MainDoc.DocumentNode.CssSelect("li").Where(node => node.InnerText.Contains("Ingredientes:") || node.InnerText.Contains("Aditivos:") || node.InnerText.Contains("Componentes analíticos:") || node.InnerText.Contains("Constituyentes analíticos:") || node.InnerText.Contains("Minerales:")))
                {
                    //Console.WriteLine($"{node.InnerText}\n");
                    if (node.InnerText.Contains("Ingredientes:"))
                    {
                        
                        tablaIngredientes.ingrediente = node.InnerText;
                        db.descripciones.Add(tablaIngredientes);
                    }
                    else if (node.InnerText.Contains("Aditivos:"))
                    {
                       
                        tablaIngredientes.aditivos_tecnologicos = node.InnerText;
                        db.descripciones.Add(tablaIngredientes);
                    }
                    else if (node.InnerText.Contains("Componentes analíticos:"))
                    {
                        
                        tablaIngredientes.constituyente_analticos = node.InnerText;
                        db.descripciones.Add(tablaIngredientes);
                    }
                    else if (node.InnerText.Contains("Constituyentes analíticos:"))
                    {
                       
                        tablaIngredientes.constituyente_analticos = node.InnerText;
                        db.descripciones.Add(tablaIngredientes);
                    }
                }
                db.SaveChanges();
            }
        }


        public static HtmlDocument GetScrappingObject(String brandUrl)
        {
            HtmlWeb oWeb = new HtmlWeb();
            string url = brandUrl;
            return oWeb.Load(url);
        }
    }
}
