import React, { Component } from "react";
import * as d3 from "d3";

import "./sunburst.styles.scss";

class Chart extends Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		var width = 100,
			height = 100, // % of the parent element
			x = d3
				.scaleLinear()
				.domain([0, width])
				.range([0, width]),
			y = d3
				.scaleLinear()
				.domain([0, height])
				.range([0, height]),
			colors = [
				"#1b9e77",
				"#d95f02",
				"#7570b3",
				"#e7298a",
				"#66a61e",
				"#e6ab02",
				"#a6761d",
				"#666666",
			],
			color = d3.scaleOrdinal().range(
				colors.map(function(c) {
					c = d3.rgb(c);
					//c.opacity = 0.5;
					return c;
				}),
			),
			treemap = d3
				.treemap()
				.size([width, height])
				//.tile(d3.treemapResquarify) // doesn't work - height & width is 100%
				.paddingInner(0)
				.round(false), //true
			data = getData(),
			nodes = d3.hierarchy(data).sum(function(d) {
				return d.value ? 1 : 0;
			}),
            //.sort(function(a, b) { return b.height - a.height || b.value - a.value });
            

			currentDepth;
            console.log(data);
		treemap(nodes);

		var chart = d3.select("#chart");
		var cells = chart
			.selectAll(".node")
			.data(nodes.descendants())
			.enter()
			.append("div")
			.attr("class", function(d) {
				return "node level-" + d.depth;
			})
			.attr("title", function(d) {
				return d.data.name ? d.data.name : "null";
			});

		cells
			.style("left", function(d) {
				return x(d.x0) + "%";
			})
			.style("top", function(d) {
				return y(d.y0) + "%";
			})
			.style("width", function(d) {
				return x(d.x1) - x(d.x0) + "%";
			})
			.style("height", function(d) {
				return y(d.y1) - y(d.y0) + "%";
			})
			//.style("background-image", function(d) { return d.value ? imgUrl + d.value : ""; })
			//.style("background-image", function(d) { return d.value ? "url(http://placekitten.com/g/300/300)" : "none"; })
			.style("background-color", function(d) {
				return d.data.color;
			})
			.on("click", zoom)
			.append("p")
			.attr("class", "label")
			.text(function(d) {
				return d.data.name ? d.data.name : "---";
			});
		//.style("font-size", "")
		//.style("opacity", function(d) { return isOverflowed( d.parent ) ? 1 : 0; });

		var parent = d3
			.select(".up")
			.datum(nodes)
			.on("click", zoom);

		function zoom(d) {
			// http://jsfiddle.net/ramnathv/amszcymq/

			d3.select(".up")
				.datum(nodes)
				.style("background-color", function() {
					return d.data.children ? d.data.color : d.parent.data.color;
				})
				.style("color", function() {
					return d.depth > 0 ? "white" : "white";
				})
				.style("border", function() {
					// return d.depth > 0 ? "none" : "1px solid gray";
				})
				.text(d.data.children ? d.data.name : d.parent.data.name);

			currentDepth = d.depth;
			parent.datum(d.parent || nodes);

			x.domain([d.x0, d.x1]);
			y.domain([d.y0, d.y1]);

			// var t = d3.transition()
			//   	.duration(800)
			//   	.ease(d3.easeCubicOut);

			cells
				// .transition()           // apply a transition
				.style("left", function(d) {
					return x(d.x0) + "%";
				})
				.style("top", function(d) {
					return y(d.y0) + "%";
				})
				.style("width", function(d) {
					return x(d.x1) - x(d.x0) + "%";
				})
				.style("height", function(d) {
					return y(d.y1) - y(d.y0) + "%";
				});

			cells // hide this depth and above
				.filter(function(d) {
					return d.ancestors();
				})
				.classed("hide", function(d) {
					return d.children ? true : false;
				});

			cells // show this depth + 1 and below
				.filter(function(d) {
					return d.depth > currentDepth;
				})
				.classed("hide", false);
		}
	}

	render() {
		return (
			<div className='sunburst-container'>
				<nav>
					<div className='up'>Organizacional</div>
				</nav>
				<div className='feature' id='chart'></div>
			</div>
		);
	}
}

export default Chart;


const configPerson = {
    width: 342,
    height: 156,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: {
        "red": 255,
        "green": 255,
        "blue": 255,
        "alpha": 1
      },
      backgroundColor: {
        "red": 244,
         "green": 172,
         "blue": 17,
         "alpha": 1
      },
      connectorLineWidth: 5,
      dashArray: "",
      expanded: false,
      directSubordinates: 4,
      totalSubordinates: 1515,
      connectorLineColor: {
        "red": 255,
        "green": 255,
        "blue": 255,
        "alpha": 1
      }
  }

  const configSector = {
    width: 342,
    height: 156,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: {
        "red": 255,
        "green": 255,
        "blue": 255,
        "alpha": 1
      },
      backgroundColor: {
        "red": 131,
        "green": 131,
        "blue": 131,
        "alpha": 1
       },
      connectorLineWidth: 5,
      dashArray: "",
      expanded: false,
      directSubordinates: 4,
      totalSubordinates: 1515,
      connectorLineColor: {
        "red": 255,
        "green": 255,
        "blue": 255,
        "alpha": 1
      }
  }
  const getNodeImage = (url) => {
      return {
        "url": url,
        "width": 100,
        "height": 100,
        "centerTopDistance": 0,
        "centerLeftDistance": 0,
        "cornerShape": "CIRCLE",
        "shadow": false,
        "borderWidth": 0,
        "borderColor": {
          "red": 19,
          "green": 123,
          "blue": 128,
          "alpha": 1
        }
    }
}
  const getNodeIcon = (url) => {
      return {
        "icon": url,
        "size": 30
      }
  }

  const commonDataPerson = {
    "width": configPerson.width,
    "height": configPerson.height,
    "borderWidth": configPerson.borderWidth,
    "borderRadius": configPerson.borderRadius,
    "borderColor": configPerson.borderColor,
    "backgroundColor": configPerson.backgroundColor,
    "connectorLineColor": configPerson.connectorLineColor,
      "connectorLineWidth": configPerson.connectorLineWidth,
      "dashArray": configPerson.dashArray,
      "expanded": configPerson.expanded,
      "directSubordinates": configPerson.directSubordinates,
      "totalSubordinates": configPerson.totalSubordinates,
      "color": "#f4ac11",
      "value": 100

  }

  const commonDataSector = {
    "width":configSector.width,
    "height":configSector.height,
    "borderWidth":configSector.borderWidth,
    "borderRadius":configSector.borderRadius,
    "borderColor":configSector.borderColor,
    "backgroundColor":configSector.backgroundColor,
    "connectorLineColor": configPerson.connectorLineColor,
      "connectorLineWidth":configSector.connectorLineWidth,
      "dashArray":configSector.dashArray,
      "expanded":configSector.expanded,
      "directSubordinates":configSector.directSubordinates,
      "totalSubordinates":configSector.totalSubordinates,
      "color": "#244A7C"
  }

  function getData() {


    return {
        "id": "O-0",
        "parentid": null,
        "name": "ORGANIZACIONAL",
        "role": "",
        "email": "",
        "sector": "",
        "nodeImage": getNodeImage(""),
        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
        ...commonDataSector,
        "children": [
            {
                "id": "O-1",
                "parentid": "O-0",
                "name": "DIREÇÃO",
                "role": "",
                "email": "insa@insa.gov.br",
                "sector": "DIREÇÃO",
                "nodeImage": getNodeImage(""),
                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                ...commonDataSector,
                "children": [
                    {
                        "id": "O-101",
                        "parentid": "O-1",
                        "name": "Mônica Tejo Cavalcanti",
                        "role": "Diretora",
                        "email": "insa@insa.gov.br",
                        "sector": "DIREÇÃO",
                        "nodeImage": getNodeImage("https://wscom.com.br/wp-content/uploads/2020/02/images.jpeg-14-2.jpg"),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataPerson,
                    },
                     {
                        "id": "O-3",
                        "parentid": "O-1",
                        "name": "Maria de Fátima S Soares",
                        "role": "Secretária",
                        "email": "maria.fatima@insa.gov.br",
                        "sector": "DIREÇÃO",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataPerson
                    }
                ]
            },
            {
                "id": "O-4",
                "parentid": "O-0",
                "name": "PESQUISA",
                "role": "",
                "email": "",
                "sector": "",
                "nodeImage": getNodeImage(""),
                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                ...commonDataSector,
                "children": [{
                        "id": "O-60",
                        "parentid": "O-4",
                        "name": "COORDENAÇÃO DE PESQUISA",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [
    
                            {
                                "id": "O-66",
                                "parentid": "O-60",
                                "name": "Fabiane Rabelo da Costa Batista",
                                "role": "Coordenadora",
                                "email": "fabiane.costa@insa.gov.br",
                                "sector": "COORDENAÇÃO DE PESQUISA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-67",
                                "parentid": "O-60",
                                "name": "Margareth Guimarães de Lima",
                                "role": "Secretária",
                                "email": "Margareth.lima@insa.gov.br",
                                "sector": "COORDENAÇÃO DE PESQUISA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-68",
                                "parentid": "O-60",
                                "name": "Rodrigo Soares Barreto",
                                "role": "Apoio a pesquisa",
                                "email": "rodrigo.barreto@insa.gov.br",
                                "sector": "COORDENAÇÃO DE PESQUISA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-61",
                        "parentid": "O-4",
                        "name": "NÚCLEO DE CIÊNCIAS DO SOLO",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [
    
                            {
                                "id": "O-69",
                                "parentid": "O-61",
                                "name": "Alexandre Pereira de Bakker",
                                "role": "Pesquisador Responsável",
                                "email": "alexandre.bakker@insa.gov.br",
                                "sector": "NÚCLEO DE CIÊNCIAS DO SOLO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
    
                        ]
                    },
                    {
                        "id": "O-62",
                        "parentid": "O-4",
                        "name": "NÚCLEO DE BIODIVERSIDADE",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                            "id": "O-70",
                            "parentid": "O-62",
                            "name": "Fabiane Rabelo da Costa Batista",
                            "role": "Pesquisador Responsável",
                            "email": "fabiane.costa@insa.gov.br",
                            "sector": "NÚCLEO DE BIODIVERSIDADE",
                            "nodeImage": getNodeImage(""),
                            "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                            ...commonDataPerson
                        }]
                    },
                    {
                        "id": "O-63",
                        "parentid": "O-4",
                        "name": "NÚCLEO DE PRODUÇÃO ANIMAL",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [
    
    
                            {
                                "id": "O-71",
                                "parentid": "O-63",
                                "name": "Geovergue Rodrigues de Medeiros",
                                "role": "Pesquisador Responsável",
                                "email": "geovergue.medeiros@insa.gov.br",
                                "sector": "NÚCLEO DE PRODUÇÃO ANIMAL",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-64",
                        "parentid": "O-4",
                        "name": "NÚCLEO DE PRODUÇÃO VEGETAL",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [
    
                            {
                                "id": "O-72",
                                "parentid": "O-64",
                                "name": "Jucilene Silva Araújo",
                                "role": "Pesquisador Responsável",
                                "email": "jucilene.araujo@insa.gov.br",
                                "sector": "NÚCLEO DE PRODUÇÃO VEGETAL",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-65",
                        "parentid": "O-4",
                        "name": "NÚCLEO DE GESTÃO DA INFORMAÇÃO E DO CONHECIMENTO",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [
    
                            {
                                "id": "O-73",
                                "parentid": "O-65",
                                "name": "Ricardo da Cunha C Lima",
                                "role": "Pesquisador Responsável",
                                "email": "ricardo.lima@insa.gov.br",
                                "sector": "NÚCLEO DE GESTÃO DA INFORMAÇÃO E DO CONHECIMENTO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    }, 
                    {
                        "id": "O-74",
                        "parentid": "O-4",
                        "name": "NÚCLEO DE RECURSOS HÍDRICOS",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [
    
    
                            {
                                "id": "O-75",
                                "parentid": "O-74",
                                "name": "Salomão de Sousa Medeiros",
                                "role": "Pesquisador Responsável",
                                "email": "salomao.medeiros@insa.gov.br",
                                "sector": "NÚCLEO DE RECURSOS HÍDRICOS",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-76",
                        "parentid": "O-4",
                        "name": "NÚCLEO DE DESERTIFICAÇÃO E AGROECOLOGIA EM TERRAS SECAS",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [
    
                            {
                                "id": "O-77",
                                "parentid": "O-76",
                                "name": "Aldrin Martin Perez Marin",
                                "role": "Pesquisador Responsável",
                                "email": "aldrin.perez@insa.gov.br",
                                "sector": "NÚCLEO DE DESERTIFICAÇÃO E AGROECOLOGIA EM TERRAS SECAS",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-78",
                        "parentid": "O-4",
                        "name": "COMPLEXO LABORATÓRIAIS",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                            "id": "O-79",
                            "parentid": "O-78",
                            "name": "Alexandre Pereira de Bakker",
                            "role": "Pesquisador Responsável",
                            "email": "alexandre.bakker@insa.gov.br",
                            "sector": "COMPLEXO LABORATÓRIAIS",
                            "nodeImage": getNodeImage(""),
                            "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                            ...commonDataPerson
                        }]
                    },
                    {
                        "id": "O-80",
                        "parentid": "O-4",
                        "name": "ESTAÇÃO EXPERIMENTAL",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                                "id": "O-81",
                                "parentid": "O-80",
                                "name": "Carlos Ticiano C Ramos",
                                "role": "Responsável",
                                "email": "carlos.ramos@insa.gov.br",
                                "sector": "ESTAÇÃO EXPERIMENTAL",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-82",
                                "parentid": "O-80",
                                "name": "Paulo Luciano da S Santos",
                                "role": "Responsável",
                                "email": "paulo.santos@insa.gov.br",
                                "sector": "ESTAÇÃO EXPERIMENTAL",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-83",
                                "parentid": "O-80",
                                "name": "Claudia Mara B Ribeiro",
                                "role": "Responsável",
                                "email": "claudia.ribeiro@insa.gov.br",
                                "sector": "ESTAÇÃO EXPERIMENTAL",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-84",
                        "parentid": "O-4",
                        "name": "CTTD – LABINSA",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                                "id": "O-85",
                                "parentid": "O-84",
                                "name": "Luize Frances de A Souza",
                                "role": "",
                                "email": "luize.frances@insa.gov.br",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-86",
                                "parentid": "O-84",
                                "name": "Tellys Lins de A Barbosa",
                                "role": "",
                                "email": "tellys.barbosa@insa.gov.br",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-87",
                                "parentid": "O-84",
                                "name": "Nyara Aschoff C Figueiredo",
                                "role": "",
                                "email": "nyara.figueiredo@insa.gov.br",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-88",
                                "parentid": "O-84",
                                "name": "Erivaldo Genuíno Lima",
                                "role": "",
                                "email": "erivaldo.lima@insa.gov.br",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-89",
                                "parentid": "O-84",
                                "name": "Fabiane Lira Rodrigues",
                                "role": "",
                                "email": "fabiane.rodrigues@insa.gov.br",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-90",
                                "parentid": "O-84",
                                "name": "Wolfgang Harand",
                                "role": "",
                                "email": "wolfgang.harand@insa.gov.br",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
    
                        ]
                    },
                    {
                        "id": "O-91",
                        "parentid": "O-4",
                        "name": "CTTD – LABDES UFCG",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                                "id": "O-92",
                                "parentid": "O-91",
                                "name": "Antonio Carlos S Vasconcelos",
                                "role": "",
                                "email": "",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-93",
                                "parentid": "O-91",
                                "name": "Bruna Silveira Guimarães",
                                "role": "",
                                "email": "",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-94",
                                "parentid": "O-91",
                                "name": "Carolina Pereira Dantas",
                                "role": "",
                                "email": "",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-95",
                                "parentid": "O-91",
                                "name": "Gleriston Alves de Moraes",
                                "role": "",
                                "email": "",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-96",
                                "parentid": "O-91",
                                "name": "Howard William Pearson",
                                "role": "",
                                "email": "",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-97",
                                "parentid": "O-91",
                                "name": "Kepler Borges França",
                                "role": "",
                                "email": "",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-98",
                                "parentid": "O-91",
                                "name": "José Esivaldo Santos",
                                "role": "",
                                "email": "",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-99",
                                "parentid": "O-91",
                                "name": "Wellerson da Silva Cruz",
                                "role": "",
                                "email": "",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-100",
                                "parentid": "O-91",
                                "name": "Welber de Lima",
                                "role": "",
                                "email": "",
                                "sector": "CTTD – LABINSA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    }
                ]
            },
            {
                "id": "O-2",
                "parentid": "O-0",
                "name": "ADMINISTRACAO",
                "role": "",
                "email": "",
                "sector": "",
                "nodeImage": getNodeImage(""),
                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                ...commonDataSector,
                "children": [{
                        "id": "O-5",
                        "parentid": "O-2",
                        "name": "COORDENAÇÃO DE ADMINISTRAÇÃO",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                                "id": "O-20",
                                "parentid": "O-5",
                                "name": "Andreia Ponciano M Joffily",
                                "role": "Coordenadora",
                                "email": "andreia.ponciano@insa.gov.br",
                                "sector": "COORDENAÇÃO DE ADMINISTRAÇÃO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-21",
                                "parentid": "O-5",
                                "name": "Margareth G de Lima",
                                "role": "Secretária",
                                "email": "margareth.lima@insa.gov.br",
                                "sector": "COORDENAÇÃO DE ADMINISTRAÇÃO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
    
                    {
                        "id": "O-6",
                        "parentid": "O-2",
                        "name": "SERVIÇO ADMINISTRATIVO",
                        "role": "",
                        "email": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                                "id": "O-22",
                                "parentid": "O-6",
                                "name": "Inesca Cristina M Pereira",
                                "role": "Chefe de Serviço",
                                "email": "inesca.pereira@insa.gov.br",
                                "sector": "SERVIÇO ADMINISTRATIVO ",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-23",
                                "parentid": "O-6",
                                "name": "José Rafael A Motta",
                                "role": "Substituto",
                                "email": "rafael.motta@insa.gov.br",
                                "sector": "SERVIÇO ADMINISTRATIVO ",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-7",
                        "parentid": "O-2",
                        "name": "ASSESSORIA DE COMUNICAÇÃO",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                                "id": "O-24",
                                "parentid": "O-7",
                                "name": "Rodeildo Clemente A Lima",
                                "role": "Titular",
                                "email": "rodeildo.clemente@insa.gov.br",
                                "sector": "ASSESSORIA DE COMUNICAÇÃO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-25",
                                "parentid": "O-7",
                                "name": "Catarina de Oliveira Buriti",
                                "role": "Substituto",
                                "email": "catarina.buriti@insa.gov.br",
                                "sector": "ASSESSORIA DE COMUNICAÇÃO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-26",
                                "parentid": "O-7",
                                "name": "Wedscley Oliveira de Melo",
                                "role": "Colaborador",
                                "email": "wedscley.melo@insa.gov.br",
                                "sector": "ASSESSORIA DE COMUNICAÇÃO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-27",
                                "parentid": "O-7",
                                "name": "Elaine Inocêncio Campelo",
                                "role": "Estagiária",
                                "email": "elaine.campelo@insa.gov.br",
                                "sector": "ASSESSORIA DE COMUNICAÇÃO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                        ]
                    },
                    {
                        "id": "O-8",
                        "parentid": "O-2",
                        "name": "SERVIÇO DE INFORMAÇÃO AO CIDADÃO (SIC)",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                                "id": "O-28",
                                "parentid": "O-8",
                                "name": "Rodeildo Clemente A Lima",
                                "role": "Titular",
                                "email": "rodeildo.clemente@insa.gov.br",
                                "sector": "SERVIÇO DE INFORMAÇÃO AO CIDADÃO (SIC)",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-29",
                                "parentid": "O-8",
                                "name": "Catarina de Oliveira Buriti",
                                "role": "Substituta",
                                "email": "catarina.buriti@insa.gov.br",
                                "sector": "SERVIÇO DE INFORMAÇÃO AO CIDADÃO (SIC)",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-9",
                        "parentid": "O-2",
                        "name": "OUVIDORIA",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                                "id": "O-30",
                                "parentid": "O-9",
                                "name": "Everaldo Silva",
                                "role": "Respondente",
                                "email": "everaldo.silva@insa.gov.br",
                                "sector": "OUVIDORIA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-31",
                                "parentid": "O-9",
                                "name": "Rodeildo Clemente A Lima",
                                "role": "Respondente",
                                "email": "rodeildo.clemente@insa.gov.br",
                                "sector": "OUVIDORIA",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
    
                        ]
                    },
                    {
                        "id": "O-10",
                        "parentid": "O-2",
                        "name": "TECNOLOGIA DA INFORMAÇÃO",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                                "id": "O-32",
                                "parentid": "O-10",
                                "name": "Gregoriev Aldano F Fernandes",
                                "role": "Responsável",
                                "email": "gregoriev.fernandes@insa.gov.br",
                                "sector": "TECNOLOGIA DA INFORMAÇÃO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-33",
                                "parentid": "O-10",
                                "name": "Felipe Ataíde de Albuquerque",
                                "role": "Responsável",
                                "email": "felipe.albuquerque@insa.gov.br",
                                "sector": "TECNOLOGIA DA INFORMAÇÃO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-34",
                                "parentid": "O-10",
                                "name": "Pedro Vitor C Pacheco",
                                "role": "Colaborador",
                                "email": "pedro.pacheco@insa.gov.br",
                                "sector": "TECNOLOGIA DA INFORMAÇÃO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
    
                            ,
                            {
                                "id": "O-35",
                                "parentid": "O-10",
                                "name": "Kiwsley Freire Costa",
                                "role": "Colaborador",
                                "email": "kiwsley.costa@insa.gov.br",
                                "sector": "TECNOLOGIA DA INFORMAÇÃO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-36",
                                "parentid": "O-10",
                                "name": "Thiago Murillo da Fonseca",
                                "role": "Estagiário",
                                "email": "thiago.fonseca@insa.gov.br",
                                "sector": "TECNOLOGIA DA INFORMAÇÃO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-37",
                                "parentid": "O-10",
                                "name": "Ramon Souza Silva",
                                "role": "Estagiário",
                                "email": "ramon.silva@insa.gov.br",
                                "sector": "TECNOLOGIA DA INFORMAÇÃO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
    
                            {
                                "id": "O-38",
                                "parentid": "O-10",
                                "name": "Adrian Bruno S Borges",
                                "role": "Estagiário",
                                "email": "adrian.borges@insa.gov.br",
                                "sector": "TECNOLOGIA DA INFORMAÇÃO",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-11",
                        "parentid": "O-2",
                        "name": "COMPRAS E LICITAÇÕES",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [
    
                            {
                                "id": "O-39",
                                "parentid": "O-11",
                                "name": "Maria Amazile V Barbosa",
                                "role": "Responsável",
                                "email": "amazile.viera@insa.gov.br",
                                "sector": "COMPRAS E LICITAÇÕES",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
    
                            ,
                            {
                                "id": "O-40",
                                "parentid": "O-11",
                                "name": "Sara Ranulce de Medeiros",
                                "role": "Responsável",
                                "email": "sara.medeiros@insa.gov.br",
                                "sector": "COMPRAS E LICITAÇÕES",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
    
                            ,
                            {
                                "id": "O-41",
                                "parentid": "O-11",
                                "name": "Layana Vanessa do Nascimento",
                                "role": "Apoio Administrativo",
                                "email": "ayana.nascimento@insa.gov.br",
                                "sector": "COMPRAS E LICITAÇÕES",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-42",
                                "parentid": "O-11",
                                "name": "Monyse Sayonara Araújo",
                                "role": "Apoio Administrativo",
                                "email": "monyse.araujo@insa.gov.br",
                                "sector": "COMPRAS E LICITAÇÕES",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-12",
                        "parentid": "O-2",
                        "name": "CONTABILIDADE E FINANÇAS",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                                "id": "O-43",
                                "parentid": "O-12",
                                "name": "Giuseppe Roncali de M Paiva",
                                "role": "Responsável",
                                "email": "giuseppe.paiva@insa.gov.br",
                                "sector": "CONTABILIDADE E FINANÇAS",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-44",
                                "parentid": "O-12",
                                "name": "Izidoro Pereira da Silva Junior",
                                "role": "Responsável",
                                "email": "izidoro.junior@insa.gov.br",
                                "sector": "CONTABILIDADE E FINANÇAS",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-13",
                        "parentid": "O-2",
                        "name": "LEI DE ACESSO À INFORMAÇÃO (LAI)",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                            "id": "O-45",
                            "parentid": "O-13",
                            "name": "Andreia Ponciano M Joffily",
                            "role": "Autoridade de Monitoramento",
                            "email": "andreia.ponciano@insa.gov.br",
                            "sector": "LEI DE ACESSO À INFORMAÇÃO (LAI)",
                            "nodeImage": getNodeImage(""),
                            "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                            ...commonDataPerson
                        }]
                    },
                    {
                        "id": "O-14",
                        "parentid": "O-2",
                        "name": "SISTEMA E_AUD",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                            "id": "O-46",
                            "parentid": "O-14",
                            "name": "Everaldo Silva",
                            "role": "Cadastrador/Supervisor",
                            "email": "everaldo.silva@insa.gov.br",
                            "sector": "SISTEMA E_AUD",
                            "nodeImage": getNodeImage(""),
                            "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                            ...commonDataPerson
                        }]
                    },
                    {
                        "id": "O-15",
                        "parentid": "O-2",
                        "name": "SISTEMA INCOM",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                                "id": "O-48",
                                "parentid": "O-15",
                                "name": "Rodeildo Clemente de Azevedo",
                                "role": "Titular",
                                "email": "rodeildo.clemente@insa.gov.br",
                                "sector": "SISTEMA INCOM",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-49",
                                "parentid": "O-15",
                                "name": "Everaldo Silva",
                                "role": "Substituto",
                                "email": "everaldo.silva@insa.gov.br",
                                "sector": "SISTEMA INCOM",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-16",
                        "parentid": "O-2",
                        "name": "GESTÃO DE PESSOAS",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                                "id": "O-51",
                                "parentid": "O-16",
                                "name": "Maria do Carmo F Soares",
                                "role": "Titular",
                                "email": "maria.soares@insa.gov.br",
                                "sector": "GESTÃO DE PESSOAS",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-52",
                                "parentid": "O-16",
                                "name": "Roberto Cavalcanti",
                                "role": "Substituto",
                                "email": "roberto.cavalcanti@insa.gov.br",
                                "sector": "GESTÃO DE PESSOAS",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-17",
                        "parentid": "O-2",
                        "name": "INFRAESTRUTURA E TRANSPORTE",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                                "id": "O-53",
                                "parentid": "O-17",
                                "name": "José Rafael A da Motta",
                                "role": "Responsável",
                                "email": "rafael.motta@insa.gov.br",
                                "sector": "INFRAESTRUTURA E TRANSPORTE",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-54",
                                "parentid": "O-17",
                                "name": "João Bosco dos Santos",
                                "role": "Responsável",
                                "email": "joao.santos@insa.gov.br",
                                "sector": "INFRAESTRUTURA E TRANSPORTE",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-55",
                                "parentid": "O-17",
                                "name": "Renato Avelino da Cunha",
                                "role": "Responsável",
                                "email": "renato.cunha@insa.gov.br",
                                "sector": "INFRAESTRUTURA E TRANSPORTE",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-18",
                        "parentid": "O-2",
                        "name": "CONTRATOS",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                                "id": "O-56",
                                "parentid": "O-18",
                                "name": "José Rafael A da Motta",
                                "role": "Responsável",
                                "email": "rafael.motta@insa.gov.br",
                                "sector": "CONTRATOS",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-57",
                                "parentid": "O-18",
                                "name": "Basílio Marinho de Lira",
                                "role": "Responsável",
                                "email": "basilio.lira@insa.gov.br",
                                "sector": "CONTRATOS",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            },
                            {
                                "id": "O-58",
                                "parentid": "O-18",
                                "name": "Edna Alves da Silva",
                                "role": "Responsável",
                                "email": "edna.silva@insa.gov.br",
                                "sector": "CONTRATOS",
                                "nodeImage": getNodeImage(""),
                                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                                ...commonDataPerson
                            }
                        ]
                    },
                    {
                        "id": "O-19",
                        "parentid": "O-2",
                        "name": "BIBLIOTECA",
                        "role": "",
                        "email": "",
                        "sector": "",
                        "nodeImage": getNodeImage(""),
                        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                        ...commonDataSector,
                        "children": [{
                            "id": "O-59",
                            "parentid": "O-19",
                            "name": "Elvandy Gonçalves Chaves",
                            "role": "Responsável",
                            "email": "elvandy.chaves@insa.gov.br",
                            "sector": "BIBLIOTECA",
                            "nodeImage": getNodeImage(""),
                            "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                            ...commonDataPerson
                        }]
                    },
                ]
    
            }
    
        ]
    }
    


  }
  