import React, { Component } from "react";

import  OrgChartComponent from "./org-chart.component";
import * as d3 from "d3";
class Chart extends Component {
    constructor() {
      super();
      this.state = {
        data: null
      };
    }


  
    render() {
        console.log(this.state.data)
      return <OrgChartComponent data={this.state.data} />;
    }
  
    componentDidMount() {
    
      const aplyTemplate = (nome, cargo, email, sector) => {
        return `<div>                 
            <div style="margin-left:70px; margin-top:10px; font-size:20px; color: ${sector && sector.length>0? "#244A7C": "white"}; font-weight:bold;">${nome}</div>                 
            <div style="margin-left:70px; margin-top:3px; font-size:16px;">${cargo}</div>                
            <div style="margin-left:70px; margin-top:3px; font-size:14px;">${email}</div>                
            <div style="margin-left:190.5px; margin-top:15px; font-size:13px; position:absolute; bottom:5px;">
            <div >${sector}</div>                   
        </div>`
      }
      
          this.setState({ data: data.map(ele => {
              const template = aplyTemplate(ele.name, ele.role, ele.email, ele.sector)
              return {...ele,template}
          } )})
    }
  }


  export default Chart

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
      "totalSubordinates": configPerson.totalSubordinates

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
      "totalSubordinates":configSector.totalSubordinates

  }
  const data = [
    {
      "nodeId": "O-1",
      "parentNodeId": null,
      "name": "Mônica Tejo Cavalcanti",
      "role": "Diretora",
      "email": "insa@insa.gov.br",
      "sector": "DIREÇÃO",
      "nodeImage": getNodeImage("https://wscom.com.br/wp-content/uploads/2020/02/images.jpeg-14-2.jpg"),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataPerson
    },
    {
      "nodeId": "O-2",
      "parentNodeId": "O-1",
      "name": "ADMINISTRACAO",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
      
    },
    {
      "nodeId": "O-3",
      "parentNodeId": "O-1",
      "name": "Maria de Fátima S Soares",
      "role": "Secretária",
      "email": "maria.fatima@insa.gov.br",
      "sector": "DIREÇÃO",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataPerson
    },
    {
      "nodeId": "O-4",
      "parentNodeId": "O-1",
      "name": "PESQUISA",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-5",
      "parentNodeId": "O-2",
      "name": "COORDENAÇÃO DE ADMINISTRAÇÃO",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-6",
      "parentNodeId": "O-2",
      "name": "SERVIÇO ADMINISTRATIVO",
      "role": "",
      "email": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-7",
      "parentNodeId": "O-2",
      "name": "ASSESSORIA DE COMUNICAÇÃO",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-8",
      "parentNodeId": "O-2",
      "name": "SERVIÇO DE INFORMAÇÃO AO CIDADÃO (SIC)",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-9",
      "parentNodeId": "O-2",
      "name": "OUVIDORIA",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-10",
      "parentNodeId": "O-2",
      "name": "TECNOLOGIA DA INFORMAÇÃO",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-11",
      "parentNodeId": "O-2",
      "name": "COMPRAS E LICITAÇÕES",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-12",
      "parentNodeId": "O-2",
      "name": "CONTABILIDADE E FINANÇAS",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-13",
      "parentNodeId": "O-2",
      "name": "LEI DE ACESSO À INFORMAÇÃO (LAI)",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-14",
      "parentNodeId": "O-2",
      "name": "SISTEMA E_AUD",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-15",
      "parentNodeId": "O-2",
      "name": "SISTEMA INCOM",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-16",
      "parentNodeId": "O-2",
      "name": "GESTÃO DE PESSOAS",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-17",
      "parentNodeId": "O-2",
      "name": "INFRAESTRUTURA E TRANSPORTE",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-18",
      "parentNodeId": "O-2",
      "name": "CONTRATOS",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-19",
      "parentNodeId": "O-2",
      "name": "BIBLIOTECA",
      "role": "",
      "email": "",
      "sector": "",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataSector
    },
    {
      "nodeId": "O-20",
      "parentNodeId": "O-5",
      "name": "Andreia Ponciano M Joffily",
      "role": "Coordenadora",
      "email": "andreia.ponciano@insa.gov.br",
      "sector": "COORDENAÇÃO DE ADMINISTRAÇÃO",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataPerson
    },
    {
      "nodeId": "O-21",
      "parentNodeId": "O-5",
      "name": "Margareth G de Lima",
      "role": "Secretária",
      "email": "margareth.lima@insa.gov.br",
      "sector": "COORDENAÇÃO DE ADMINISTRAÇÃO",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataPerson
    },
    {
      "nodeId": "O-22",
      "parentNodeId": "O-6",
      "name": "Inesca Cristina M Pereira",
      "role": "Chefe de Serviço",
      "email": "inesca.pereira@insa.gov.br",
      "sector": "SERVIÇO ADMINISTRATIVO ",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataPerson
    },
    {
        "nodeId": "O-23",
        "parentNodeId": "O-6",
        "name": "José Rafael A Motta",
        "role": "Substituto",
        "email": "rafael.motta@insa.gov.br",
        "sector": "SERVIÇO ADMINISTRATIVO ",
        "nodeImage": getNodeImage(""),
        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
        ...commonDataPerson
      },
      {
          "nodeId": "O-24",
          "parentNodeId": "O-7",
          "name": "Rodeildo Clemente A Lima",
          "role": "Titular",
          "email": "rodeildo.clemente@insa.gov.br",
          "sector": "ASSESSORIA DE COMUNICAÇÃO",
          "nodeImage": getNodeImage(""),
          "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
          ...commonDataPerson
        },
        {
            "nodeId": "O-25",
            "parentNodeId": "O-7",
            "name": "Catarina de Oliveira Buriti",
            "role": "Substituto",
            "email": "catarina.buriti@insa.gov.br",
            "sector": "ASSESSORIA DE COMUNICAÇÃO",
            "nodeImage": getNodeImage(""),
            "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
            ...commonDataPerson
          }
          ,
          {
              "nodeId": "O-26",
              "parentNodeId": "O-7",
              "name": "Wedscley Oliveira de Melo",
              "role": "Colaborador",
              "email": "wedscley.melo@insa.gov.br",
              "sector": "ASSESSORIA DE COMUNICAÇÃO",
              "nodeImage": getNodeImage(""),
              "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
              ...commonDataPerson
            }
            ,
          {
              "nodeId": "O-27",
              "parentNodeId": "O-7",
              "name": "Elaine Inocêncio Campelo",
              "role": "Estagiária",
              "email": "elaine.campelo@insa.gov.br",
              "sector": "ASSESSORIA DE COMUNICAÇÃO",
              "nodeImage": getNodeImage(""),
              "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
              ...commonDataPerson
            },
            {
                "nodeId": "O-28",
                "parentNodeId": "O-8",
                "name": "Rodeildo Clemente A Lima",
                "role": "Titular",
                "email": "rodeildo.clemente@insa.gov.br",
                "sector": "SERVIÇO DE INFORMAÇÃO AO CIDADÃO (SIC)",
                "nodeImage": getNodeImage(""),
                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                ...commonDataPerson
              },
              {
                  "nodeId": "O-29",
                  "parentNodeId": "O-8",
                  "name": "Catarina de Oliveira Buriti",
                  "role": "Substituta",
                  "email": "catarina.buriti@insa.gov.br",
                  "sector": "SERVIÇO DE INFORMAÇÃO AO CIDADÃO (SIC)",
                  "nodeImage": getNodeImage(""),
                  "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                  ...commonDataPerson
                },
                {
                    "nodeId": "O-30",
                    "parentNodeId": "O-9",
                    "name": "Everaldo Silva",
                    "role": "Respondente",
                    "email": "everaldo.silva@insa.gov.br",
                    "sector": "OUVIDORIA",
                    "nodeImage": getNodeImage(""),
                    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                    ...commonDataPerson
                  }
                  ,
                  {
                      "nodeId": "O-31",
                      "parentNodeId": "O-9",
                      "name": "Rodeildo Clemente A Lima",
                      "role": "Respondente",
                      "email": "rodeildo.clemente@insa.gov.br",
                      "sector": "OUVIDORIA",
                      "nodeImage": getNodeImage(""),
                      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                      ...commonDataPerson
                }
                ,
                  {
                      "nodeId": "O-32",
                      "parentNodeId": "O-10",
                      "name": "Gregoriev Aldano F Fernandes",
                      "role": "Responsável",
                      "email": "gregoriev.fernandes@insa.gov.br",
                      "sector": "TECNOLOGIA DA INFORMAÇÃO",
                      "nodeImage": getNodeImage(""),
                      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                      ...commonDataPerson
                }
                ,
                  {
                      "nodeId": "O-33",
                      "parentNodeId": "O-10",
                      "name": "Felipe Ataíde de Albuquerque",
                      "role": "Responsável",
                      "email": "felipe.albuquerque@insa.gov.br",
                      "sector": "TECNOLOGIA DA INFORMAÇÃO",
                      "nodeImage": getNodeImage(""),
                      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                      ...commonDataPerson
                }
                ,
                  {
                      "nodeId": "O-34",
                      "parentNodeId": "O-10",
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
                      "nodeId": "O-35",
                      "parentNodeId": "O-10",
                      "name": "Kiwsley Freire Costa",
                      "role": "Colaborador",
                      "email": "kiwsley.costa@insa.gov.br",
                      "sector": "TECNOLOGIA DA INFORMAÇÃO",
                      "nodeImage": getNodeImage(""),
                      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                      ...commonDataPerson
                }
                ,
                {
                    "nodeId": "O-36",
                    "parentNodeId": "O-10",
                    "name": "Thiago Murillo da Fonseca",
                    "role": "Estagiário",
                    "email": "thiago.fonseca@insa.gov.br",
                    "sector": "TECNOLOGIA DA INFORMAÇÃO",
                    "nodeImage": getNodeImage(""),
                    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                    ...commonDataPerson
              }
              ,
                {
                    "nodeId": "O-37",
                    "parentNodeId": "O-10",
                    "name": "Ramon Souza Silva",
                    "role": "Estagiário",
                    "email": "ramon.silva@insa.gov.br",
                    "sector": "TECNOLOGIA DA INFORMAÇÃO",
                    "nodeImage": getNodeImage(""),
                    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                    ...commonDataPerson
              },
              
                {
                    "nodeId": "O-38",
                    "parentNodeId": "O-10",
                    "name": "Adrian Bruno S Borges",
                    "role": "Estagiário",
                    "email": "adrian.borges@insa.gov.br",
                    "sector": "TECNOLOGIA DA INFORMAÇÃO",
                    "nodeImage": getNodeImage(""),
                    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                    ...commonDataPerson
              }

              ,
                {
                    "nodeId": "O-39",
                    "parentNodeId": "O-11",
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
                  "nodeId": "O-40",
                  "parentNodeId": "O-11",
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
                  "nodeId": "O-41",
                  "parentNodeId": "O-11",
                  "name": "Layana Vanessa do Nascimento",
                  "role": "Apoio Administrativo",
                  "email": "ayana.nascimento@insa.gov.br",
                  "sector": "COMPRAS E LICITAÇÕES",
                  "nodeImage": getNodeImage(""),
                  "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                  ...commonDataPerson
            }
            ,
            {
                "nodeId": "O-42",
                "parentNodeId": "O-11",
                "name": "Monyse Sayonara Araújo",
                "role": "Apoio Administrativo",
                "email": "monyse.araujo@insa.gov.br",
                "sector": "COMPRAS E LICITAÇÕES",
                "nodeImage": getNodeImage(""),
                "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
                ...commonDataPerson
          },
          {
              "nodeId": "O-43",
              "parentNodeId": "O-12",
              "name": "Giuseppe Roncali de M Paiva",
              "role": "Responsável",
              "email": "giuseppe.paiva@insa.gov.br",
              "sector": "CONTABILIDADE E FINANÇAS",
              "nodeImage": getNodeImage(""),
              "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
              ...commonDataPerson
        },
        {
            "nodeId": "O-44",
            "parentNodeId": "O-12",
            "name": "Izidoro Pereira da Silva Junior",
            "role": "Responsável",
            "email": "izidoro.junior@insa.gov.br",
            "sector": "CONTABILIDADE E FINANÇAS",
            "nodeImage": getNodeImage(""),
            "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
            ...commonDataPerson
      },
      {
          "nodeId": "O-45",
          "parentNodeId": "O-13",
          "name": "Andreia Ponciano M Joffily",
          "role": "Autoridade de Monitoramento",
          "email": "andreia.ponciano@insa.gov.br",
          "sector": "LEI DE ACESSO À INFORMAÇÃO (LAI)",
          "nodeImage": getNodeImage(""),
          "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
          ...commonDataPerson
    },
    {
        "nodeId": "O-46",
        "parentNodeId": "O-14",
        "name": "Everaldo Silva",
        "role": "Cadastrador/Supervisor",
        "email": "everaldo.silva@insa.gov.br",
        "sector": "SISTEMA E_AUD",
        "nodeImage": getNodeImage(""),
        "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
        ...commonDataPerson
  },
  {
      "nodeId": "O-48",
      "parentNodeId": "O-15",
      "name": "Rodeildo Clemente de Azevedo",
      "role": "Titular",
      "email": "rodeildo.clemente@insa.gov.br",
      "sector": "SISTEMA INCOM",
      "nodeImage": getNodeImage(""),
      "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
      ...commonDataPerson
},
{
    "nodeId": "O-49",
    "parentNodeId": "O-15",
    "name": "Everaldo Silva",
    "role": "Substituto",
    "email": "everaldo.silva@insa.gov.br",
    "sector": "SISTEMA INCOM",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-51",
    "parentNodeId": "O-16",
    "name": "Maria do Carmo F Soares",
    "role": "Titular",
    "email": "maria.soares@insa.gov.br",
    "sector": "GESTÃO DE PESSOAS",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-52",
    "parentNodeId": "O-16",
    "name": "Roberto Cavalcanti",
    "role": "Substituto",
    "email": "roberto.cavalcanti@insa.gov.br",
    "sector": "GESTÃO DE PESSOAS",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-53",
    "parentNodeId": "O-17",
    "name": "José Rafael A da Motta",
    "role": "Responsável",
    "email": "rafael.motta@insa.gov.br",
    "sector": "INFRAESTRUTURA E TRANSPORTE",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-54",
    "parentNodeId": "O-17",
    "name": "João Bosco dos Santos",
    "role": "Responsável",
    "email": "joao.santos@insa.gov.br",
    "sector": "INFRAESTRUTURA E TRANSPORTE",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-55",
    "parentNodeId": "O-17",
    "name": "Renato Avelino da Cunha",
    "role": "Responsável",
    "email": "renato.cunha@insa.gov.br",
    "sector": "INFRAESTRUTURA E TRANSPORTE",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-56",
    "parentNodeId": "O-18",
    "name": "José Rafael A da Motta",
    "role": "Responsável",
    "email": "rafael.motta@insa.gov.br",
    "sector": "CONTRATOS",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-57",
    "parentNodeId": "O-18",
    "name": "Basílio Marinho de Lira",
    "role": "Responsável",
    "email": "basilio.lira@insa.gov.br",
    "sector": "CONTRATOS",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
}
,
{
    "nodeId": "O-58",
    "parentNodeId": "O-18",
    "name": "Edna Alves da Silva",
    "role": "Responsável",
    "email": "edna.silva@insa.gov.br",
    "sector": "CONTRATOS",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-59",
    "parentNodeId": "O-19",
    "name": "Elvandy Gonçalves Chaves",
    "role": "Responsável",
    "email": "elvandy.chaves@insa.gov.br",
    "sector": "BIBLIOTECA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-60",
    "parentNodeId": "O-4",
    "name": "COORDENAÇÃO DE PESQUISA",
    "role": "",
    "email": "",
    "sector": "",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataSector
},
{
    "nodeId": "O-61",
    "parentNodeId": "O-4",
    "name": "NÚCLEO DE CIÊNCIAS DO SOLO",
    "role": "",
    "email": "",
    "sector": "",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataSector
},
{
    "nodeId": "O-62",
    "parentNodeId": "O-4",
    "name": "NÚCLEO DE BIODIVERSIDADE",
    "role": "",
    "email": "",
    "sector": "",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataSector
},
{
    "nodeId": "O-63",
    "parentNodeId": "O-4",
    "name": "NÚCLEO DE PRODUÇÃO ANIMAL",
    "role": "",
    "email": "",
    "sector": "",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataSector
}
,
{
    "nodeId": "O-64",
    "parentNodeId": "O-4",
    "name": "NÚCLEO DE PRODUÇÃO VEGETAL",
    "role": "",
    "email": "",
    "sector": "",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataSector
},
{
    "nodeId": "O-65",
    "parentNodeId": "O-4",
    "name": "NÚCLEO DE GESTÃO DA INFORMAÇÃO E DO CONHECIMENTO",
    "role": "",
    "email": "",
    "sector": "",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataSector
},
{
    "nodeId": "O-66",
    "parentNodeId": "O-60",
    "name": "Fabiane Rabelo da Costa Batista",
    "role": "Coordenadora",
    "email": "fabiane.costa@insa.gov.br",
    "sector": "COORDENAÇÃO DE PESQUISA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
}
,
{
    "nodeId": "O-67",
    "parentNodeId": "O-60",
    "name": "Margareth Guimarães de Lima",
    "role": "Secretária",
    "email": "Margareth.lima@insa.gov.br",
    "sector": "COORDENAÇÃO DE PESQUISA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
}
,
{
    "nodeId": "O-68",
    "parentNodeId": "O-60",
    "name": "Rodrigo Soares Barreto",
    "role": "Apoio a pesquisa",
    "email": "rodrigo.barreto@insa.gov.br",
    "sector": "COORDENAÇÃO DE PESQUISA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-69",
    "parentNodeId": "O-61",
    "name": "Alexandre Pereira de Bakker",
    "role": "Pesquisador Responsável",
    "email": "alexandre.bakker@insa.gov.br",
    "sector": "NÚCLEO DE CIÊNCIAS DO SOLO",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-70",
    "parentNodeId": "O-62",
    "name": "Fabiane Rabelo da Costa Batista",
    "role": "Pesquisador Responsável",
    "email": "fabiane.costa@insa.gov.br",
    "sector": "NÚCLEO DE BIODIVERSIDADE",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-71",
    "parentNodeId": "O-63",
    "name": "Geovergue Rodrigues de Medeiros",
    "role": "Pesquisador Responsável",
    "email": "geovergue.medeiros@insa.gov.br",
    "sector": "NÚCLEO DE PRODUÇÃO ANIMAL",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-72",
    "parentNodeId": "O-64",
    "name": "Jucilene Silva Araújo",
    "role": "Pesquisador Responsável",
    "email": "jucilene.araujo@insa.gov.br",
    "sector": "NÚCLEO DE PRODUÇÃO VEGETAL",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-73",
    "parentNodeId": "O-65",
    "name": "Ricardo da Cunha C Lima",
    "role": "Pesquisador Responsável",
    "email": "ricardo.lima@insa.gov.br",
    "sector": "NÚCLEO DE GESTÃO DA INFORMAÇÃO E DO CONHECIMENTO",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-74",
    "parentNodeId": "O-4",
    "name": "NÚCLEO DE RECURSOS HÍDRICOS",
    "role": "",
    "email": "",
    "sector": "",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataSector
}
,
{
    "nodeId": "O-75",
    "parentNodeId": "O-74",
    "name": "Salomão de Sousa Medeiros",
    "role": "Pesquisador Responsável",
    "email": "salomao.medeiros@insa.gov.br",
    "sector": "NÚCLEO DE RECURSOS HÍDRICOS",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-76",
    "parentNodeId": "O-4",
    "name": "NÚCLEO DE DESERTIFICAÇÃO E AGROECOLOGIA EM TERRAS SECAS",
    "role": "",
    "email": "",
    "sector": "",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataSector
},
{
    "nodeId": "O-77",
    "parentNodeId": "O-76",
    "name": "Aldrin Martin Perez Marin",
    "role": "Pesquisador Responsável",
    "email": "aldrin.perez@insa.gov.br",
    "sector": "NÚCLEO DE DESERTIFICAÇÃO E AGROECOLOGIA EM TERRAS SECAS",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-78",
    "parentNodeId": "O-4",
    "name": "COMPLEXO LABORATÓRIAIS",
    "role": "",
    "email": "",
    "sector": "",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataSector
},
{
    "nodeId": "O-79",
    "parentNodeId": "O-78",
    "name": "Alexandre Pereira de Bakker",
    "role": "Pesquisador Responsável",
    "email": "alexandre.bakker@insa.gov.br",
    "sector": "COMPLEXO LABORATÓRIAIS",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},{
    "nodeId": "O-80",
    "parentNodeId": "O-4",
    "name": "ESTAÇÃO EXPERIMENTAL",
    "role": "",
    "email": "",
    "sector": "",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataSector
},
{
    "nodeId": "O-81",
    "parentNodeId": "O-80",
    "name": "Carlos Ticiano C Ramos",
    "role": "Responsável",
    "email": "carlos.ramos@insa.gov.br",
    "sector": "ESTAÇÃO EXPERIMENTAL",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-82",
    "parentNodeId": "O-80",
    "name": "Paulo Luciano da S Santos",
    "role": "Responsável",
    "email": "paulo.santos@insa.gov.br",
    "sector": "ESTAÇÃO EXPERIMENTAL",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-83",
    "parentNodeId": "O-80",
    "name": "Claudia Mara B Ribeiro",
    "role": "Responsável",
    "email": "claudia.ribeiro@insa.gov.br",
    "sector": "ESTAÇÃO EXPERIMENTAL",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-84",
    "parentNodeId": "O-4",
    "name": "CTTD – LABINSA",
    "role": "",
    "email": "",
    "sector": "",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataSector
},
{
    "nodeId": "O-85",
    "parentNodeId": "O-84",
    "name": "Luize Frances de A Souza",
    "role": "",
    "email": "luize.frances@insa.gov.br",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-86",
    "parentNodeId": "O-84",
    "name": "Tellys Lins de A Barbosa",
    "role": "",
    "email": "tellys.barbosa@insa.gov.br",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-87",
    "parentNodeId": "O-84",
    "name": "Nyara Aschoff C Figueiredo",
    "role": "",
    "email": "nyara.figueiredo@insa.gov.br",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-88",
    "parentNodeId": "O-84",
    "name": "Erivaldo Genuíno Lima",
    "role": "",
    "email": "erivaldo.lima@insa.gov.br",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
}
,
{
    "nodeId": "O-89",
    "parentNodeId": "O-84",
    "name": "Fabiane Lira Rodrigues",
    "role": "",
    "email": "fabiane.rodrigues@insa.gov.br",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-90",
    "parentNodeId": "O-84",
    "name": "Wolfgang Harand",
    "role": "",
    "email": "wolfgang.harand@insa.gov.br",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
}
,
{
    "nodeId": "O-91",
    "parentNodeId": "O-4",
    "name": "CTTD – LABDES UFCG",
    "role": "",
    "email": "",
    "sector": "",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataSector
},
{
    "nodeId": "O-92",
    "parentNodeId": "O-91",
    "name": "Antonio Carlos S Vasconcelos",
    "role": "",
    "email": "",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-93",
    "parentNodeId": "O-91",
    "name": "Bruna Silveira Guimarães",
    "role": "",
    "email": "",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-94",
    "parentNodeId": "O-91",
    "name": "Carolina Pereira Dantas",
    "role": "",
    "email": "",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-95",
    "parentNodeId": "O-91",
    "name": "Gleriston Alves de Moraes",
    "role": "",
    "email": "",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-96",
    "parentNodeId": "O-91",
    "name": "Howard William Pearson",
    "role": "",
    "email": "",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-97",
    "parentNodeId": "O-91",
    "name": "Kepler Borges França",
    "role": "",
    "email": "",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-98",
    "parentNodeId": "O-91",
    "name": "José Esivaldo Santos",
    "role": "",
    "email": "",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-99",
    "parentNodeId": "O-91",
    "name": "Wellerson da Silva Cruz",
    "role": "",
    "email": "",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
},
{
    "nodeId": "O-100",
    "parentNodeId": "O-91",
    "name": "Welber de Lima",
    "role": "",
    "email": "",
    "sector": "CTTD – LABINSA",
    "nodeImage": getNodeImage(""),
    "nodeIcon": getNodeIcon("https://to.ly/1yZnX"),
    ...commonDataPerson
}
    
    ]