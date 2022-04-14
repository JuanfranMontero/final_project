using HtmlAgilityPack;
using ScrapySharp.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace WebScraping_TiendaAnimal
{
    internal class Program
    {
        [Obsolete]
        static void Main(string[] args)
        {
            List<string> listURLMarcas = new List<string>();
            
            HtmlWeb oWeb = new HtmlWeb();
            string url = "https://www.tiendanimal.es/pienso-para-perros-c-1_25.html";
            HtmlDocument MainDoc = oWeb.Load(url);
            string[] listBrand = System.IO.File.ReadAllLines("C:/FinalProject/final_project/WebScraping_TiendaAnimal/listaMarcas.txt");


            //Este trozo de codigo muestra las etiquetas span donde deberian estar los enlaces a los piensos de las marcas 

            //TODO: descomentar el codigo para mapear las url por titulo y url
            /*var nodes = MainDoc.DocumentNode.SelectNodes("//div[@class=\"teaser-category flex items-center justify-center js-item-carousel\"]");
            nodes.ToList().ForEach(node => Console.WriteLine(node.InnerHtml));
            */
            try
            {
                listBrand.ToList().ForEach(b => Console.WriteLine(NavigateWeb(b)));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.GetType());
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public static string NavigateWeb(string urlBrand)
        {
            HtmlWeb oWeb = new HtmlWeb();
            string url = urlBrand;
            HtmlDocument MainDoc = oWeb.Load(url);
            string msg = "";
            foreach (var item in MainDoc.DocumentNode.CssSelect("a"))
            {
                if (item.GetAttributeValue("title").Contains("Pienso"))
                {
                    msg += $"{item.GetAttributeValue("href")} \n";
                    ScrapTheFuckingWeb(item.GetAttributeValue("href"));
                }      
            }

            return msg;
        }

        public static void ScrapTheFuckingWeb(string brandUrl)
        {
            do
            {
                HtmlWeb oWeb = new HtmlWeb();
                string url = brandUrl;
                HtmlDocument MainDoc = oWeb.Load(url);

                foreach (var node in MainDoc.DocumentNode.CssSelect("li"))
                {
                    if (node.InnerText.Contains("Ingredientes") || node.InnerText.Contains("Aditivos") || node.InnerText.Contains("Componentes analíticos"))
                    {
                        //listURL.Add(node.InnerText);
                        Console.WriteLine(node.InnerText);
                    }
                }
            } while (brandUrl != "https://www.tiendaanimal.es/pienso-para-perros-c-1_25.tml");

        }
    }
}
