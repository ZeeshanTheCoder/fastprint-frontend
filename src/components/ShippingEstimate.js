"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/services/baseUrl";
import {
  getBookSpecsForShipping,
  getShippingWeightMultiplier,
} from "@/utils/bookWeightCalculator";

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "IE", name: "Ireland" },
  { code: "PT", name: "Portugal" },
  { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czech Republic" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "CN", name: "China" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "AR", name: "Argentina" },
  { code: "CO", name: "Colombia" },
  { code: "ZA", name: "South Africa" },
  { code: "EG", name: "Egypt" },
  { code: "MA", name: "Morocco" },
  { code: "ZW", name: "Zimbabwe" },
  { code: "PK", name: "Pakistan" },
];

const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
  { code: "DC", name: "District of Columbia" },
];

const CANADIAN_PROVINCES = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "YT", name: "Yukon" },
];

// Australian States and Territories
const AUSTRALIAN_STATES = [
  { code: "NSW", name: "New South Wales" },
  { code: "VIC", name: "Victoria" },
  { code: "QLD", name: "Queensland" },
  { code: "WA", name: "Western Australia" },
  { code: "SA", name: "South Australia" },
  { code: "TAS", name: "Tasmania" },
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "NT", name: "Northern Territory" },
];

// German States
const GERMAN_STATES = [
  { code: "BW", name: "Baden-Württemberg" },
  { code: "BY", name: "Bavaria" },
  { code: "BE", name: "Berlin" },
  { code: "BB", name: "Brandenburg" },
  { code: "HB", name: "Bremen" },
  { code: "HH", name: "Hamburg" },
  { code: "HE", name: "Hesse" },
  { code: "MV", name: "Mecklenburg-Vorpommern" },
  { code: "NI", name: "Lower Saxony" },
  { code: "NW", name: "North Rhine-Westphalia" },
  { code: "RP", name: "Rhineland-Palatinate" },
  { code: "SL", name: "Saarland" },
  { code: "SN", name: "Saxony" },
  { code: "ST", name: "Saxony-Anhalt" },
  { code: "SH", name: "Schleswig-Holstein" },
  { code: "TH", name: "Thuringia" },
];

// French Regions
const FRENCH_REGIONS = [
  { code: "ARA", name: "Auvergne-Rhône-Alpes" },
  { code: "BFC", name: "Bourgogne-Franche-Comté" },
  { code: "BRE", name: "Bretagne" },
  { code: "CVL", name: "Centre-Val de Loire" },
  { code: "COR", name: "Corse" },
  { code: "GES", name: "Grand Est" },
  { code: "HDF", name: "Hauts-de-France" },
  { code: "IDF", name: "Île-de-France" },
  { code: "NOR", name: "Normandie" },
  { code: "NAQ", name: "Nouvelle-Aquitaine" },
  { code: "OCC", name: "Occitanie" },
  { code: "PDL", name: "Pays de la Loire" },
  { code: "PAC", name: "Provence-Alpes-Côte d'Azur" },
];

// Italian Regions
const ITALIAN_REGIONS = [
  { code: "ABR", name: "Abruzzo" },
  { code: "BAS", name: "Basilicata" },
  { code: "CAL", name: "Calabria" },
  { code: "CAM", name: "Campania" },
  { code: "EMR", name: "Emilia-Romagna" },
  { code: "FVG", name: "Friuli-Venezia Giulia" },
  { code: "LAZ", name: "Lazio" },
  { code: "LIG", name: "Liguria" },
  { code: "LOM", name: "Lombardia" },
  { code: "MAR", name: "Marche" },
  { code: "MOL", name: "Molise" },
  { code: "PAB", name: "Piemonte" },
  { code: "PUG", name: "Puglia" },
  { code: "SAR", name: "Sardegna" },
  { code: "SIC", name: "Sicilia" },
  { code: "TOS", name: "Toscana" },
  { code: "TAA", name: "Trentino-Alto Adige" },
  { code: "UMB", name: "Umbria" },
  { code: "VDA", name: "Valle d'Aosta" },
  { code: "VEN", name: "Veneto" },
];

// Spanish Autonomous Communities
const SPANISH_REGIONS = [
  { code: "AN", name: "Andalucía" },
  { code: "AR", name: "Aragón" },
  { code: "AS", name: "Asturias" },
  { code: "CB", name: "Cantabria" },
  { code: "CL", name: "Castilla y León" },
  { code: "CM", name: "Castilla-La Mancha" },
  { code: "CT", name: "Cataluña" },
  { code: "EX", name: "Extremadura" },
  { code: "GA", name: "Galicia" },
  { code: "IB", name: "Islas Baleares" },
  { code: "CN", name: "Canarias" },
  { code: "RI", name: "La Rioja" },
  { code: "MD", name: "Madrid" },
  { code: "MC", name: "Murcia" },
  { code: "NC", name: "Navarra" },
  { code: "PV", name: "País Vasco" },
  { code: "VC", name: "Valencia" },
  { code: "CE", name: "Ceuta" },
  { code: "ML", name: "Melilla" },
];

// Brazilian States
const BRAZILIAN_STATES = [
  { code: "AC", name: "Acre" },
  { code: "AL", name: "Alagoas" },
  { code: "AP", name: "Amapá" },
  { code: "AM", name: "Amazonas" },
  { code: "BA", name: "Bahia" },
  { code: "CE", name: "Ceará" },
  { code: "DF", name: "Distrito Federal" },
  { code: "ES", name: "Espírito Santo" },
  { code: "GO", name: "Goiás" },
  { code: "MA", name: "Maranhão" },
  { code: "MT", name: "Mato Grosso" },
  { code: "MS", name: "Mato Grosso do Sul" },
  { code: "MG", name: "Minas Gerais" },
  { code: "PA", name: "Pará" },
  { code: "PB", name: "Paraíba" },
  { code: "PR", name: "Paraná" },
  { code: "PE", name: "Pernambuco" },
  { code: "PI", name: "Piauí" },
  { code: "RJ", name: "Rio de Janeiro" },
  { code: "RN", name: "Rio Grande do Norte" },
  { code: "RS", name: "Rio Grande do Sul" },
  { code: "RO", name: "Rondônia" },
  { code: "RR", name: "Roraima" },
  { code: "SC", name: "Santa Catarina" },
  { code: "SP", name: "São Paulo" },
  { code: "SE", name: "Sergipe" },
  { code: "TO", name: "Tocantins" },
];

// Mexican States
const MEXICAN_STATES = [
  { code: "AGU", name: "Aguascalientes" },
  { code: "BCN", name: "Baja California" },
  { code: "BCS", name: "Baja California Sur" },
  { code: "CAM", name: "Campeche" },
  { code: "CHP", name: "Chiapas" },
  { code: "CHH", name: "Chihuahua" },
  { code: "COA", name: "Coahuila" },
  { code: "COL", name: "Colima" },
  { code: "DUR", name: "Durango" },
  { code: "GUA", name: "Guanajuato" },
  { code: "GRO", name: "Guerrero" },
  { code: "HID", name: "Hidalgo" },
  { code: "JAL", name: "Jalisco" },
  { code: "MEX", name: "México" },
  { code: "MIC", name: "Michoacán" },
  { code: "MOR", name: "Morelos" },
  { code: "NAY", name: "Nayarit" },
  { code: "NLE", name: "Nuevo León" },
  { code: "OAX", name: "Oaxaca" },
  { code: "PUE", name: "Puebla" },
  { code: "QUE", name: "Querétaro" },
  { code: "ROO", name: "Quintana Roo" },
  { code: "SLP", name: "San Luis Potosí" },
  { code: "SIN", name: "Sinaloa" },
  { code: "SON", name: "Sonora" },
  { code: "TAB", name: "Tabasco" },
  { code: "TAM", name: "Tamaulipas" },
  { code: "TLA", name: "Tlaxcala" },
  { code: "VER", name: "Veracruz" },
  { code: "YUC", name: "Yucatán" },
  { code: "ZAC", name: "Zacatecas" },
];

// Indian States
const INDIAN_STATES = [
  { code: "AP", name: "Andhra Pradesh" },
  { code: "AR", name: "Arunachal Pradesh" },
  { code: "AS", name: "Assam" },
  { code: "BR", name: "Bihar" },
  { code: "CT", name: "Chhattisgarh" },
  { code: "GA", name: "Goa" },
  { code: "GJ", name: "Gujarat" },
  { code: "HR", name: "Haryana" },
  { code: "HP", name: "Himachal Pradesh" },
  { code: "JH", name: "Jharkhand" },
  { code: "KA", name: "Karnataka" },
  { code: "KL", name: "Kerala" },
  { code: "MP", name: "Madhya Pradesh" },
  { code: "MH", name: "Maharashtra" },
  { code: "MN", name: "Manipur" },
  { code: "ML", name: "Meghalaya" },
  { code: "MZ", name: "Mizoram" },
  { code: "NL", name: "Nagaland" },
  { code: "OR", name: "Odisha" },
  { code: "PB", name: "Punjab" },
  { code: "RJ", name: "Rajasthan" },
  { code: "SK", name: "Sikkim" },
  { code: "TN", name: "Tamil Nadu" },
  { code: "TS", name: "Telangana" },
  { code: "TR", name: "Tripura" },
  { code: "UP", name: "Uttar Pradesh" },
  { code: "UT", name: "Uttarakhand" },
  { code: "WB", name: "West Bengal" },
];

// Chinese Provinces
const CHINESE_PROVINCES = [
  { code: "BJ", name: "Beijing" },
  { code: "TJ", name: "Tianjin" },
  { code: "HE", name: "Hebei" },
  { code: "SX", name: "Shanxi" },
  { code: "NM", name: "Inner Mongolia" },
  { code: "LN", name: "Liaoning" },
  { code: "JL", name: "Jilin" },
  { code: "HL", name: "Heilongjiang" },
  { code: "SH", name: "Shanghai" },
  { code: "JS", name: "Jiangsu" },
  { code: "ZJ", name: "Zhejiang" },
  { code: "AH", name: "Anhui" },
  { code: "FJ", name: "Fujian" },
  { code: "JX", name: "Jiangxi" },
  { code: "SD", name: "Shandong" },
  { code: "HA", name: "Henan" },
  { code: "HB", name: "Hubei" },
  { code: "HN", name: "Hunan" },
  { code: "GD", name: "Guangdong" },
  { code: "GX", name: "Guangxi" },
  { code: "HI", name: "Hainan" },
  { code: "CQ", name: "Chongqing" },
  { code: "SC", name: "Sichuan" },
  { code: "GZ", name: "Guizhou" },
  { code: "YN", name: "Yunnan" },
  { code: "XZ", name: "Tibet" },
  { code: "SN", name: "Shaanxi" },
  { code: "GS", name: "Gansu" },
  { code: "QH", name: "Qinghai" },
  { code: "NX", name: "Ningxia" },
  { code: "XJ", name: "Xinjiang" },
  { code: "HK", name: "Hong Kong" },
  { code: "MO", name: "Macau" },
  { code: "TW", name: "Taiwan" },
];

// Japanese Prefectures
const JAPANESE_PREFECTURES = [
  { code: "HOK", name: "Hokkaido" },
  { code: "AOM", name: "Aomori" },
  { code: "IWA", name: "Iwate" },
  { code: "MIY", name: "Miyagi" },
  { code: "AKI", name: "Akita" },
  { code: "YAM", name: "Yamagata" },
  { code: "FUK", name: "Fukushima" },
  { code: "IBR", name: "Ibaraki" },
  { code: "TOCH", name: "Tochigi" },
  { code: "GUN", name: "Gunma" },
  { code: "SAIT", name: "Saitama" },
  { code: "CHIB", name: "Chiba" },
  { code: "TOKY", name: "Tokyo" },
  { code: "KANA", name: "Kanagawa" },
  { code: "NIIG", name: "Niigata" },
  { code: "TOYA", name: "Toyama" },
  { code: "ISHI", name: "Ishikawa" },
  { code: "FUKU", name: "Fukui" },
  { code: "YAMA", name: "Yamanashi" },
  { code: "NAGA", name: "Nagano" },
  { code: "GIFU", name: "Gifu" },
  { code: "SHIZ", name: "Shizuoka" },
  { code: "AICH", name: "Aichi" },
  { code: "MIE", name: "Mie" },
  { code: "SHIG", name: "Shiga" },
  { code: "KYOT", name: "Kyoto" },
  { code: "OSAK", name: "Osaka" },
  { code: "HYOG", name: "Hyogo" },
  { code: "NARA", name: "Nara" },
  { code: "WAKA", name: "Wakayama" },
  { code: "TOTT", name: "Tottori" },
  { code: "SHIM", name: "Shimane" },
  { code: "OKAY", name: "Okayama" },
  { code: "HIRO", name: "Hiroshima" },
  { code: "YAMA", name: "Yamaguchi" },
  { code: "TOKU", name: "Tokushima" },
  { code: "KAGA", name: "Kagawa" },
  { code: "EHIM", name: "Ehime" },
  { code: "KOCH", name: "Kochi" },
  { code: "FUKU", name: "Fukuoka" },
  { code: "SAGA", name: "Saga" },
  { code: "NAGA", name: "Nagasaki" },
  { code: "KUM", name: "Kumamoto" },
  { code: "OITA", name: "Oita" },
  { code: "MIYA", name: "Miyazaki" },
  { code: "KAGO", name: "Kagoshima" },
  { code: "OKIN", name: "Okinawa" },
];

// United Kingdom Countries and Regions
const UK_REGIONS = [
  { code: "ENG", name: "England" },
  { code: "SCT", name: "Scotland" },
  { code: "WLS", name: "Wales" },
  { code: "NIR", name: "Northern Ireland" },
  { code: "GBN", name: "Great Britain" },
];

// Netherlands Provinces
const DUTCH_PROVINCES = [
  { code: "DR", name: "Drenthe" },
  { code: "FL", name: "Flevoland" },
  { code: "FR", name: "Friesland" },
  { code: "GE", name: "Gelderland" },
  { code: "GR", name: "Groningen" },
  { code: "LI", name: "Limburg" },
  { code: "NB", name: "Noord-Brabant" },
  { code: "NH", name: "Noord-Holland" },
  { code: "OV", name: "Overijssel" },
  { code: "UT", name: "Utrecht" },
  { code: "ZE", name: "Zeeland" },
  { code: "ZH", name: "Zuid-Holland" },
];

// Belgian Regions and Provinces
const BELGIAN_REGIONS = [
  { code: "VLG", name: "Flanders" },
  { code: "WAL", name: "Wallonia" },
  { code: "BRU", name: "Brussels-Capital Region" },
];

const BELGIAN_PROVINCES = [
  { code: "ANT", name: "Antwerp" },
  { code: "LIM", name: "Limburg" },
  { code: "OVL", name: "East Flanders" },
  { code: "VBR", name: "Flemish Brabant" },
  { code: "WVL", name: "West Flanders" },
  { code: "HAI", name: "Hainaut" },
  { code: "LIE", name: "Liège" },
  { code: "LUX", name: "Luxembourg" },
  { code: "NAM", name: "Namur" },
  { code: "WBR", name: "Walloon Brabant" },
];

// Swiss Cantons
const SWISS_CANTONS = [
  { code: "AG", name: "Aargau" },
  { code: "AI", name: "Appenzell Innerrhoden" },
  { code: "AR", name: "Appenzell Ausserrhoden" },
  { code: "BE", name: "Bern" },
  { code: "BL", name: "Basel-Landschaft" },
  { code: "BS", name: "Basel-Stadt" },
  { code: "FR", name: "Fribourg" },
  { code: "GE", name: "Geneva" },
  { code: "GL", name: "Glarus" },
  { code: "GR", name: "Graubünden" },
  { code: "JU", name: "Jura" },
  { code: "LU", name: "Lucerne" },
  { code: "NE", name: "Neuchâtel" },
  { code: "NW", name: "Nidwalden" },
  { code: "OW", name: "Obwalden" },
  { code: "SG", name: "St. Gallen" },
  { code: "SH", name: "Schaffhausen" },
  { code: "SO", name: "Solothurn" },
  { code: "SZ", name: "Schwyz" },
  { code: "TG", name: "Thurgau" },
  { code: "TI", name: "Ticino" },
  { code: "UR", name: "Uri" },
  { code: "VD", name: "Vaud" },
  { code: "VS", name: "Valais" },
  { code: "ZG", name: "Zug" },
  { code: "ZH", name: "Zürich" },
];

// Austrian States (Bundesländer)
const AUSTRIAN_STATES = [
  { code: "B", name: "Burgenland" },
  { code: "K", name: "Carinthia" },
  { code: "NÖ", name: "Lower Austria" },
  { code: "OÖ", name: "Upper Austria" },
  { code: "S", name: "Salzburg" },
  { code: "ST", name: "Styria" },
  { code: "T", name: "Tyrol" },
  { code: "V", name: "Vorarlberg" },
  { code: "W", name: "Vienna" },
];

// Swedish Counties (Län)
const SWEDISH_COUNTIES = [
  { code: "AB", name: "Stockholm County" },
  { code: "AC", name: "Västerbotten County" },
  { code: "BD", name: "Norrbotten County" },
  { code: "C", name: "Uppsala County" },
  { code: "D", name: "Södermanland County" },
  { code: "E", name: "Östergötland County" },
  { code: "F", name: "Jönköping County" },
  { code: "G", name: "Kronoberg County" },
  { code: "H", name: "Kalmar County" },
  { code: "I", name: "Gotland County" },
  { code: "K", name: "Blekinge County" },
  { code: "M", name: "Skåne County" },
  { code: "N", name: "Halland County" },
  { code: "O", name: "Västra Götaland County" },
  { code: "S", name: "Värmland County" },
  { code: "T", name: "Örebro County" },
  { code: "U", name: "Västmanland County" },
  { code: "W", name: "Dalarna County" },
  { code: "X", name: "Gävleborg County" },
  { code: "Y", name: "Västernorrland County" },
  { code: "Z", name: "Jämtland County" },
];

// Norwegian Counties (Fylker)
const NORWEGIAN_COUNTIES = [
  { code: "03", name: "Oslo" },
  { code: "11", name: "Rogaland" },
  { code: "15", name: "Møre og Romsdal" },
  { code: "18", name: "Nordland" },
  { code: "30", name: "Viken" },
  { code: "34", name: "Innlandet" },
  { code: "38", name: "Vestfold og Telemark" },
  { code: "42", name: "Agder" },
  { code: "46", name: "Vestland" },
  { code: "50", name: "Trøndelag" },
  { code: "54", name: "Troms og Finnmark" },
];

// Danish Regions
const DANISH_REGIONS = [
  { code: "H", name: "Capital Region" },
  { code: "M", name: "Central Jutland" },
  { code: "N", name: "North Jutland" },
  { code: "S", name: "Southern Denmark" },
  { code: "Z", name: "Zealand" },
];

// Finnish Regions (Maakunnat)
const FINNISH_REGIONS = [
  { code: "01", name: "Åland Islands" },
  { code: "02", name: "South Karelia" },
  { code: "03", name: "Southern Ostrobothnia" },
  { code: "04", name: "Southern Savonia" },
  { code: "05", name: "Kainuu" },
  { code: "06", name: "Tavastia Proper" },
  { code: "07", name: "Central Ostrobothnia" },
  { code: "08", name: "Central Finland" },
  { code: "09", name: "Kymenlaakso" },
  { code: "10", name: "Lappi" },
  { code: "11", name: "Pirkanmaa" },
  { code: "12", name: "Ostrobothnia" },
  { code: "13", name: "North Karelia" },
  { code: "14", name: "Northern Ostrobothnia" },
  { code: "15", name: "Northern Savonia" },
  { code: "16", name: "Päijänne Tavastia" },
  { code: "17", name: "Satakunta" },
  { code: "18", name: "Uusimaa" },
  { code: "19", name: "Southwest Finland" },
];

// Icelandic Regions
const ICELANDIC_REGIONS = [
  { code: "HÖV", name: "Capital Region" },
  { code: "SUÐ", name: "Southern Peninsula" },
  { code: "VES", name: "Western Region" },
  { code: "VES", name: "Westfjords" },
  { code: "NOR", name: "Northwestern Region" },
  { code: "NOR", name: "Northeastern Region" },
  { code: "AUS", name: "Eastern Region" },
  { code: "SUÐ", name: "Southern Region" },
];

// Irish Counties
const IRISH_COUNTIES = [
  { code: "CW", name: "Carlow" },
  { code: "CN", name: "Cavan" },
  { code: "CE", name: "Clare" },
  { code: "CK", name: "Cork" },
  { code: "DL", name: "Donegal" },
  { code: "D", name: "Dublin" },
  { code: "G", name: "Galway" },
  { code: "KY", name: "Kerry" },
  { code: "KE", name: "Kildare" },
  { code: "KK", name: "Kilkenny" },
  { code: "LS", name: "Laois" },
  { code: "LM", name: "Leitrim" },
  { code: "LK", name: "Limerick" },
  { code: "LD", name: "Longford" },
  { code: "LH", name: "Louth" },
  { code: "MO", name: "Mayo" },
  { code: "MH", name: "Meath" },
  { code: "MN", name: "Monaghan" },
  { code: "OY", name: "Offaly" },
  { code: "RN", name: "Roscommon" },
  { code: "SO", name: "Sligo" },
  { code: "TA", name: "Tipperary" },
  { code: "WD", name: "Waterford" },
  { code: "WH", name: "Westmeath" },
  { code: "WX", name: "Wexford" },
  { code: "WW", name: "Wicklow" },
];

// Portuguese Districts and Autonomous Regions
const PORTUGUESE_REGIONS = [
  { code: "01", name: "Aveiro" },
  { code: "02", name: "Beja" },
  { code: "03", name: "Braga" },
  { code: "04", name: "Bragança" },
  { code: "05", name: "Castelo Branco" },
  { code: "06", name: "Coimbra" },
  { code: "07", name: "Évora" },
  { code: "08", name: "Faro" },
  { code: "09", name: "Guarda" },
  { code: "10", name: "Leiria" },
  { code: "11", name: "Lisboa" },
  { code: "12", name: "Portalegre" },
  { code: "13", name: "Porto" },
  { code: "14", name: "Santarém" },
  { code: "15", name: "Setúbal" },
  { code: "16", name: "Viana do Castelo" },
  { code: "17", name: "Vila Real" },
  { code: "18", name: "Viseu" },
  { code: "20", name: "Azores" },
  { code: "30", name: "Madeira" },
];

// Polish Voivodeships
const POLISH_VOIVODESHIPS = [
  { code: "DS", name: "Lower Silesian" },
  { code: "KP", name: "Kuyavian-Pomeranian" },
  { code: "LU", name: "Lublin" },
  { code: "LB", name: "Lubusz" },
  { code: "LD", name: "Łódź" },
  { code: "MA", name: "Lesser Poland" },
  { code: "MZ", name: "Masovian" },
  { code: "OP", name: "Opole" },
  { code: "PK", name: "Subcarpathian" },
  { code: "PD", name: "Podlaskie" },
  { code: "PM", name: "Pomeranian" },
  { code: "SL", name: "Silesian" },
  { code: "SK", name: "Świętokrzyskie" },
  { code: "WN", name: "Warmian-Masurian" },
  { code: "WP", name: "Greater Poland" },
  { code: "ZP", name: "West Pomeranian" },
];

// Czech Regions (Kraje)
const CZECH_REGIONS = [
  { code: "JC", name: "South Bohemian" },
  { code: "JM", name: "South Moravian" },
  { code: "KA", name: "Karlovy Vary" },
  { code: "KR", name: "Hradec Králové" },
  { code: "LI", name: "Liberec" },
  { code: "MO", name: "Moravian-Silesian" },
  { code: "OL", name: "Olomouc" },
  { code: "PA", name: "Pardubice" },
  { code: "PL", name: "Plzeň" },
  { code: "PR", name: "Prague" },
  { code: "ST", name: "Central Bohemian" },
  { code: "US", name: "Ústí nad Labem" },
  { code: "VY", name: "Vysočina" },
  { code: "ZL", name: "Zlín" },
];

// South Korean Provinces and Special Cities
const SOUTH_KOREAN_REGIONS = [
  { code: "11", name: "Seoul" },
  { code: "26", name: "Busan" },
  { code: "27", name: "Daegu" },
  { code: "28", name: "Incheon" },
  { code: "29", name: "Gwangju" },
  { code: "30", name: "Daejeon" },
  { code: "31", name: "Ulsan" },
  { code: "36", name: "Sejong" },
  { code: "41", name: "Gyeonggi" },
  { code: "42", name: "Gangwon" },
  { code: "43", name: "North Chungcheong" },
  { code: "44", name: "South Chungcheong" },
  { code: "45", name: "North Jeolla" },
  { code: "46", name: "South Jeolla" },
  { code: "47", name: "North Gyeongsang" },
  { code: "48", name: "South Gyeongsang" },
  { code: "50", name: "Jeju" },
];

// Argentine Provinces
const ARGENTINE_PROVINCES = [
  { code: "B", name: "Buenos Aires" },
  { code: "C", name: "Ciudad Autónoma de Buenos Aires" },
  { code: "K", name: "Catamarca" },
  { code: "H", name: "Chaco" },
  { code: "U", name: "Chubut" },
  { code: "X", name: "Córdoba" },
  { code: "W", name: "Corrientes" },
  { code: "E", name: "Entre Ríos" },
  { code: "P", name: "Formosa" },
  { code: "Y", name: "Jujuy" },
  { code: "L", name: "La Pampa" },
  { code: "F", name: "La Rioja" },
  { code: "M", name: "Mendoza" },
  { code: "N", name: "Misiones" },
  { code: "Q", name: "Neuquén" },
  { code: "R", name: "Río Negro" },
  { code: "A", name: "Salta" },
  { code: "J", name: "San Juan" },
  { code: "D", name: "San Luis" },
  { code: "Z", name: "Santa Cruz" },
  { code: "S", name: "Santa Fe" },
  { code: "G", name: "Santiago del Estero" },
  { code: "V", name: "Tierra del Fuego" },
  { code: "T", name: "Tucumán" },
];

// Colombian Departments
const COLOMBIAN_DEPARTMENTS = [
  { code: "AMA", name: "Amazonas" },
  { code: "ANT", name: "Antioquia" },
  { code: "ARA", name: "Arauca" },
  { code: "ATL", name: "Atlántico" },
  { code: "BOL", name: "Bolívar" },
  { code: "BOY", name: "Boyacá" },
  { code: "CAL", name: "Caldas" },
  { code: "CAQ", name: "Caquetá" },
  { code: "CAS", name: "Casanare" },
  { code: "CAU", name: "Cauca" },
  { code: "CES", name: "Cesar" },
  { code: "CHO", name: "Chocó" },
  { code: "COR", name: "Córdoba" },
  { code: "CUN", name: "Cundinamarca" },
  { code: "GUA", name: "Guainía" },
  { code: "GUV", name: "Guaviare" },
  { code: "HUI", name: "Huila" },
  { code: "LAG", name: "La Guajira" },
  { code: "MAG", name: "Magdalena" },
  { code: "MET", name: "Meta" },
  { code: "NAR", name: "Nariño" },
  { code: "NSA", name: "Norte de Santander" },
  { code: "PUT", name: "Putumayo" },
  { code: "QUI", name: "Quindío" },
  { code: "RIS", name: "Risaralda" },
  { code: "SAP", name: "San Andrés y Providencia" },
  { code: "SAN", name: "Santander" },
  { code: "SUC", name: "Sucre" },
  { code: "TOL", name: "Tolima" },
  { code: "VAC", name: "Valle del Cauca" },
  { code: "VAU", name: "Vaupés" },
  { code: "VID", name: "Vichada" },
];

// South African Provinces
const SOUTH_AFRICAN_PROVINCES = [
  { code: "EC", name: "Eastern Cape" },
  { code: "FS", name: "Free State" },
  { code: "GP", name: "Gauteng" },
  { code: "KZN", name: "KwaZulu-Natal" },
  { code: "LP", name: "Limpopo" },
  { code: "MP", name: "Mpumalanga" },
  { code: "NC", name: "Northern Cape" },
  { code: "NW", name: "North West" },
  { code: "WC", name: "Western Cape" },
];

// Egyptian Governorates
const EGYPTIAN_GOVERNORATES = [
  { code: "ALX", name: "Alexandria" },
  { code: "ASN", name: "Aswan" },
  { code: "ASY", name: "Asyut" },
  { code: "BH", name: "Beheira" },
  { code: "BNS", name: "Beni Suef" },
  { code: "C", name: "Cairo" },
  { code: "DK", name: "Dakahlia" },
  { code: "DT", name: "Damietta" },
  { code: "FYM", name: "Faiyum" },
  { code: "GH", name: "Gharbia" },
  { code: "GZ", name: "Giza" },
  { code: "IS", name: "Ismailia" },
  { code: "KFS", name: "Kafr El Sheikh" },
  { code: "MT", name: "Matruh" },
  { code: "MN", name: "Minya" },
  { code: "MNF", name: "Monufia" },
  { code: "WAD", name: "New Valley" },
  { code: "SIN", name: "North Sinai" },
  { code: "PTS", name: "Port Said" },
  { code: "KB", name: "Qalyubia" },
  { code: "KN", name: "Qena" },
  { code: "BA", name: "Red Sea" },
  { code: "SHR", name: "Sharqia" },
  { code: "SHG", name: "Sohag" },
  { code: "JS", name: "South Sinai" },
  { code: "SUZ", name: "Suez" },
];

// Moroccan Regions
const MOROCCAN_REGIONS = [
  { code: "01", name: "Tanger-Tétouan-Al Hoceïma" },
  { code: "02", name: "L'Oriental" },
  { code: "03", name: "Fès-Meknès" },
  { code: "04", name: "Rabat-Salé-Kénitra" },
  { code: "05", name: "Béni Mellal-Khénifra" },
  { code: "06", name: "Casablanca-Settat" },
  { code: "07", name: "Marrakech-Safi" },
  { code: "08", name: "Drâa-Tafilalet" },
  { code: "09", name: "Souss-Massa" },
  { code: "10", name: "Guelmim-Oued Noun" },
  { code: "11", name: "Laâyoune-Sakia El Hamra" },
  { code: "12", name: "Dakhla-Oued Ed-Dahab" },
];

// Zimbabwe Provinces
const ZIMBABWEAN_PROVINCES = [
  { code: "BU", name: "Bulawayo" },
  { code: "HA", name: "Harare" },
  { code: "MA", name: "Manicaland" },
  { code: "MC", name: "Mashonaland Central" },
  { code: "ME", name: "Mashonaland East" },
  { code: "MW", name: "Mashonaland West" },
  { code: "MV", name: "Masvingo" },
  { code: "MN", name: "Matabeleland North" },
  { code: "MS", name: "Matabeleland South" },
  { code: "MI", name: "Midlands" },
];

// Pakistani Provinces and Territories
const PAKISTANI_REGIONS = [
  { code: "PB", name: "Punjab" },
  { code: "SD", name: "Sindh" },
  { code: "KP", name: "Khyber Pakhtunkhwa" },
  { code: "BA", name: "Balochistan" },
  { code: "GB", name: "Gilgit-Baltistan" },
];

const ShippingEstimate = ({ bookSpecs = null, pricingResult = null }) => {
  const [address, setAddress] = useState({
    country: "",
    state: "",
    city: "",
    postal_code: "",
  });

  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableStates, setAvailableStates] = useState([]);

  // Safely get token only on client
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      setAddress((prev) => ({
        ...prev,
        country: value,
        state: "",
        city: "",
        postal_code: "",
      }));

      switch (value) {
        case "US": setAvailableStates(US_STATES); break;
        case "CA": setAvailableStates(CANADIAN_PROVINCES); break;
        case "AU": setAvailableStates(AUSTRALIAN_STATES); break;
        case "DE": setAvailableStates(GERMAN_STATES); break;
        case "FR": setAvailableStates(FRENCH_REGIONS); break;
        case "IT": setAvailableStates(ITALIAN_REGIONS); break;
        case "ES": setAvailableStates(SPANISH_REGIONS); break;
        case "BR": setAvailableStates(BRAZILIAN_STATES); break;
        case "MX": setAvailableStates(MEXICAN_STATES); break;
        case "IN": setAvailableStates(INDIAN_STATES); break;
        case "CN": setAvailableStates(CHINESE_PROVINCES); break;
        case "JP": setAvailableStates(JAPANESE_PREFECTURES); break;
        case "GB": setAvailableStates(UK_REGIONS); break;
        case "NL": setAvailableStates(DUTCH_PROVINCES); break;
        case "BE": setAvailableStates(BELGIAN_PROVINCES); break;
        case "CH": setAvailableStates(SWISS_CANTONS); break;
        case "AT": setAvailableStates(AUSTRIAN_STATES); break;
        case "SE": setAvailableStates(SWEDISH_COUNTIES); break;
        case "NO": setAvailableStates(NORWEGIAN_COUNTIES); break;
        case "DK": setAvailableStates(DANISH_REGIONS); break;
        case "FI": setAvailableStates(FINNISH_REGIONS); break;
        case "IE": setAvailableStates(IRISH_COUNTIES); break;
        case "PT": setAvailableStates(PORTUGUESE_REGIONS); break;
        case "PL": setAvailableStates(POLISH_VOIVODESHIPS); break;
        case "CZ": setAvailableStates(CZECH_REGIONS); break;
        case "KR": setAvailableStates(SOUTH_KOREAN_REGIONS); break;
        case "AR": setAvailableStates(ARGENTINE_PROVINCES); break;
        case "CO": setAvailableStates(COLOMBIAN_DEPARTMENTS); break;
        case "ZA": setAvailableStates(SOUTH_AFRICAN_PROVINCES); break;
        case "EG": setAvailableStates(EGYPTIAN_GOVERNORATES); break;
        case "MA": setAvailableStates(MOROCCAN_REGIONS); break;
        case "ZW": setAvailableStates(ZIMBABWEAN_PROVINCES); break;
        case "PK": setAvailableStates(PAKISTANI_REGIONS); break;
        default: setAvailableStates([]); break;
      }
    } else {
      setAddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchShippingRates = async () => {
    const { country, state, city, postal_code } = address;

    if (!country || !state || !city || !postal_code) {
      setShippingOptions([]);
      setSelectedOption(null);
      setError("");
      return;
    }

    const token = getToken();
    if (!token) {
      setError("You need to be logged in to calculate shipping rates.");
      return;
    }

    setLoading(true);
    setError("");
    setShippingOptions([]);
    setSelectedOption(null);

    try {
      const shippingSpecs = bookSpecs ? getBookSpecsForShipping(bookSpecs) : null;

      const requestData = {
        ...address,
        account_type: "individual",
      };

      if (shippingSpecs) {
        requestData.package_specs = {
          weight: shippingSpecs.totalWeight,
          length: shippingSpecs.dimensions.length,
          width: shippingSpecs.dimensions.width,
          height: shippingSpecs.dimensions.height,
          quantity: shippingSpecs.quantity,
          description: shippingSpecs.description,
          packaging_type: shippingSpecs.packaging.type,
          packages_needed: shippingSpecs.packaging.packagesNeeded,
        };
      }

      const res = await axios.post(
        `${BASE_URL}api/shipping-rate/`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const services = res.data.available_services || [];
      if (services.length === 0) {
        setError("No shipping options available for this address.");
        return;
      }

      let options = services.map((s) => ({
        service: s.service_name,
        rate: s.total_charge,
        estimated_days: s.delivery_time,
        courier_name: s.courier_name,
      }));

      if (shippingSpecs) {
        const weightMultiplier = getShippingWeightMultiplier(shippingSpecs.packaging);
        options = options.map((option) => ({
          ...option,
          rate: (parseFloat(option.rate) * weightMultiplier).toFixed(2),
          originalRate: option.rate,
        }));
      }

      setShippingOptions(options);
    } catch (err) {
      console.error("Shipping fetch error:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else {
        setError(
          err.response?.data?.error ||
            "Failed to fetch shipping options. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchShippingRates();
    }, 500);
    return () => clearTimeout(timer);
  }, [address.country, address.state, address.city, address.postal_code, bookSpecs]);

  return (
    <div className="mt-6 p-4 bg-white border border-blue-200 rounded-lg shadow-sm">
      <h3 className="font-semibold text-blue-700 text-lg mb-4">Shipping Estimate</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <select
          name="country"
          value={address.country}
          onChange={handleAddressChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Country</option>
          {COUNTRIES.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>

        {availableStates.length > 0 ? (
          <select
            name="state"
            value={address.state}
            onChange={handleAddressChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select State/Province</option>
            {availableStates.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            name="state"
            placeholder="State/Province"
            value={address.state}
            onChange={handleAddressChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleAddressChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          value={address.postal_code}
          onChange={handleAddressChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && (
        <div className="mt-4 flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
          <p className="text-blue-600 text-sm">Loading shipping options...</p>
        </div>
      )}

      {shippingOptions.length > 0 && (
        <div className="mt-5">
          <label className="block mb-2 font-medium text-gray-700 text-sm md:text-base">
            Select Shipping Option:
          </label>
          <select
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedOption !== null ? shippingOptions.findIndex(opt => opt === selectedOption) : ""}
            onChange={(e) => {
              const idx = e.target.value === "" ? -1 : parseInt(e.target.value);
              setSelectedOption(idx >= 0 ? shippingOptions[idx] : null);
            }}
            disabled={loading}
          >
            <option value="">-- Select Shipping Method --</option>
            {shippingOptions.map((option, index) => (
              <option key={index} value={index}>
                {option.courier_name} - {option.service} — ${option.rate} — {option.estimated_days}
              </option>
            ))}
          </select>

          {selectedOption && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-800 font-medium text-sm md:text-base">
                Shipping Rate: <span className="font-bold">${selectedOption.rate}</span>
              </p>
              {pricingResult && (
                <p className="text-blue-800 font-bold text-base md:text-lg mt-2">
                  Total Price:{" "}
                  <span className="text-green-700">
                    $
                    {(
                      parseFloat(pricingResult.finalPrice || pricingResult.finalAmount || pricingResult.totalPrice) +
                      parseFloat(selectedOption.rate)
                    ).toFixed(2)}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ShippingEstimate;