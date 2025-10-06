"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/services/baseUrl";

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
const JAPANESE_PREFECTURES = [
  { code: "HOK", name: "Hokkaido" },
  { code: "AOM", name: "Aomori" },
  { code: "IWA", name: "Iwate" },
  { code: "MIY", name: "Miyagi" },
  { code: "AKI", name: "Akita" },
  { code: "YAMA", name: "Yamagata" },
  { code: "FUKS", name: "Fukushima" }, // Changed from FUKU to FUKS
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
  { code: "FUKI", name: "Fukui" }, // Changed from FUKU to FUKI
  { code: "YAMN", name: "Yamanashi" }, // Changed from YAMA to YAMN
  { code: "NGNO", name: "Nagano" }, // Changed from NAGA to NGNO
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
  { code: "YAMG", name: "Yamaguchi" }, // Changed from YAMA to YAMG (different from Yamagata)
  { code: "TOKU", name: "Tokushima" },
  { code: "KAGA", name: "Kagawa" },
  { code: "EHIM", name: "Ehime" },
  { code: "KOCH", name: "Kochi" },
  { code: "FUKU", name: "Fukuoka" }, // Kept as FUKU (unique now)
  { code: "SAGA", name: "Saga" },
  { code: "NGSK", name: "Nagasaki" }, // Changed from NAGA to NGSK
  { code: "KUM", name: "Kumamoto" },
  { code: "OITA", name: "Oita" },
  { code: "MIYA", name: "Miyazaki" },
  { code: "KAGO", name: "Kagoshima" },
  { code: "OKIN", name: "Okinawa" },
];
const UK_REGIONS = [
  { code: "ENG", name: "England" },
  { code: "SCT", name: "Scotland" },
  { code: "WLS", name: "Wales" },
  { code: "NIR", name: "Northern Ireland" },
  { code: "GBN", name: "Great Britain" },
];
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
const DANISH_REGIONS = [
  { code: "H", name: "Capital Region" },
  { code: "M", name: "Central Jutland" },
  { code: "N", name: "North Jutland" },
  { code: "S", name: "Southern Denmark" },
  { code: "Z", name: "Zealand" },
];
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
const PAKISTANI_REGIONS = [
  { code: "PB", name: "Punjab" },
  { code: "SD", name: "Sindh" },
  { code: "KP", name: "Khyber Pakhtunkhwa" },
  { code: "BA", name: "Balochistan" },
  { code: "GB", name: "Gilgit-Baltistan" },
];

const Shop = () => {
  const router = useRouter();
  const [projectData, setProjectData] = useState(null);

  // Get data from localStorage (passed from DesignProject)

  useEffect(() => {
    const fetchLocalStorageData = () => {
      try {
        const data = localStorage.getItem("previewProjectData");
        if (data) {
          const parsedData = JSON.parse(data);
          setProjectData(parsedData);
        }
      } catch (e) {
        console.warn("Error accessing localStorage");
      }
    };

    fetchLocalStorageData();
  }, []);

  const [initialData, setInitialData] = useState({
    originalTotalCost: 0,
    finalTotalCost: 0,
    totalCost: 0,
    productQuantity: 1,
    costPerBook: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("shopData");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setInitialData({
          originalTotalCost: data.originalTotalCost ?? 0,
          finalTotalCost: data.finalTotalCost ?? 0,
          totalCost: data.totalCost ?? 0,
          productQuantity: data.productQuantity ?? 1,
          costPerBook: data.costPerBook ?? 0,
        });
      } catch (e) {
        console.warn("Invalid shopData in localStorage");
      }
    }
  }, []);

  // Destructure initial data
  const {
    originalTotalCost = 0,
    finalTotalCost = 0,
    totalCost = 0,
    productQuantity = 1,
    costPerBook = 0,
  } = initialData;

  // Determine which total cost to use
  const displayTotalCost = finalTotalCost || totalCost || originalTotalCost;

  // Calculate cost per book
  const calculatedCostPerBook =
    displayTotalCost && productQuantity
      ? displayTotalCost / productQuantity
      : costPerBook;

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    company: "",
    address: "",
    apt_floor: "",
    country: "",
    state: "",
    city: "",
    postal_code: "",
    phone_number: "",
    account_type: "individual",
    has_resale_cert: false,
  });

  const [shippingRate, setShippingRate] = useState(null);
  const [tax, setTax] = useState(null);
  const [taxRate, setTaxRate] = useState(null);
  const [taxReason, setTaxReason] = useState(null);
  const [accountType, setAccountType] = useState("individual");
  const [courierName, setCourierName] = useState(null);
  const [estimatedDelivery, setEstimatedDelivery] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingError, setShippingError] = useState(null);

  const [availableStates, setAvailableStates] = useState([]);
  useEffect(() => {
    let states = [];
    switch (form.country) {
      case "US":
        states = US_STATES;
        break;
      case "CA":
        states = CANADIAN_PROVINCES;
        break;
      case "AU":
        states = AUSTRALIAN_STATES;
        break;
      case "DE":
        states = GERMAN_STATES;
        break;
      case "FR":
        states = FRENCH_REGIONS;
        break;
      case "IT":
        states = ITALIAN_REGIONS;
        break;
      case "ES":
        states = SPANISH_REGIONS;
        break;
      case "BR":
        states = BRAZILIAN_STATES;
        break;
      case "MX":
        states = MEXICAN_STATES;
        break;
      case "IN":
        states = INDIAN_STATES;
        break;
      case "CN":
        states = CHINESE_PROVINCES;
        break;
      case "JP":
        states = JAPANESE_PREFECTURES;
        break;
      case "GB":
        states = UK_REGIONS;
        break;
      case "NL":
        states = DUTCH_PROVINCES;
        break;
      case "BE":
        states = BELGIAN_PROVINCES;
        break;
      case "CH":
        states = SWISS_CANTONS;
        break;
      case "AT":
        states = AUSTRIAN_STATES;
        break;
      case "SE":
        states = SWEDISH_COUNTIES;
        break;
      case "NO":
        states = NORWEGIAN_COUNTIES;
        break;
      case "DK":
        states = DANISH_REGIONS;
        break;
      case "FI":
        states = FINNISH_REGIONS;
        break;
      case "IS":
        states = ICELANDIC_REGIONS;
        break;
      case "IE":
        states = IRISH_COUNTIES;
        break;
      case "PT":
        states = PORTUGUESE_REGIONS;
        break;
      case "PL":
        states = POLISH_VOIVODESHIPS;
        break;
      case "CZ":
        states = CZECH_REGIONS;
        break;
      case "KR":
        states = SOUTH_KOREAN_REGIONS;
        break;
      case "AR":
        states = ARGENTINE_PROVINCES;
        break;
      case "CO":
        states = COLOMBIAN_DEPARTMENTS;
        break;
      case "ZA":
        states = SOUTH_AFRICAN_PROVINCES;
        break;
      case "EG":
        states = EGYPTIAN_GOVERNORATES;
        break;
      case "MA":
        states = MOROCCAN_REGIONS;
        break;
      case "ZW":
        states = ZIMBABWEAN_PROVINCES;
        break;
      case "PK":
        states = PAKISTANI_REGIONS;
        break;
      default:
        states = [];
    }
    setAvailableStates(states);
    setForm((prev) => ({ ...prev, state: "" }));
    // eslint-disable-next-line
  }, [form.country]);

  // Dynamic quantity state
  // const [productQuantity, setProductQuantity] = useState(initialQuantity);
  const productPrice = calculatedCostPerBook;
  const subtotal = finalTotalCost;

  const calculateTotal = () => {
    let total = subtotal;
    if (shippingRate !== null) total += shippingRate;
    if (tax !== null) total += tax;
    return total;
  };

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem("accessToken");
  };

  const deliveryHandler = async () => {
    const token = getToken();
    if (!token) {
      alert("You need to be logged in to proceed. Redirecting to login...");
      router.push("/login");
      return;
    }

    if (
      !form.first_name ||
      !form.last_name ||
      !form.address ||
      !form.country ||
      !form.city ||
      !form.phone_number
    ) {
      alert("Please fill all required fields.");
      return;
    }
    if (shippingRate === null) {
      alert("Please calculate shipping rate first.");
      return;
    }

    try {
      // Collect design and project data saved earlier
      const previewForm = localStorage.getItem("previewFormData");
      const previewProject = localStorage.getItem("previewProjectData");
      const bookFile = window.tempBookFileForSubmission;
      const coverFile = window.tempCoverFileForSubmission;
      if (!previewForm || !previewProject || !bookFile) {
        alert("Missing design or file data. Please go back to Design Project.");
        router.push("/design-project");
        return;
      }
      // Store all data in localStorage for payment page
      localStorage.setItem(
        "pendingOrderData",
        JSON.stringify({
          previewForm,
          previewProject,
          bookFile: null, // File objects can't be stored, handle in memory if needed
          coverFile: null,
          form,
          shippingRate,
          tax,
          taxRate,
          taxReason,
          accountType,
          courierName,
          estimatedDelivery,
          selectedService,
          productQuantity,
          productPrice,
          subtotal,
          displayTotalCost,
        })
      );
      localStorage.setItem(
        "paymentData",
        JSON.stringify({
          bookPrice: displayTotalCost || 0,
          productQuantity: productQuantity,
          subtotal: displayTotalCost || 0,
          shippingRate: shippingRate || 0,
          tax: tax || 0,
          totalAmount: calculateTotal(),
          selectedService: selectedService,
          taxRate: taxRate,
          accountType: accountType,
        })
      );
      router.push("/payment");
    } catch (error) {
      console.error("Shipping save error:", error.response?.data || error.message);
      alert("Failed to save shipping info. Please try again.");
    }
  };

  const fetchShippingRate = async () => {
    const token = getToken();
    if (!token) {
      alert(
        "You need to be logged in to calculate shipping. Redirecting to login..."
      );
      router.push("/login");
      return;
    }

    const { country, state, city, postal_code } = form;
    if (!country || !state || !city || !postal_code) {
      alert("Please fill country, state, city, and postal code.");
      return;
    }

    setIsLoading(true);
    setShippingError(null);

    try {
      const res = await axios.post(
        `${BASE_URL}api/shipping-rate/`,
        {
          country: country.trim().toUpperCase(),
          state: state.trim().toUpperCase(),
          city: city.trim(),
          postal_code: postal_code.trim(),
          account_type: form.account_type,
          has_resale_cert: form.has_resale_cert,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const {
        shipping_rate = 0,
        tax: resTax = 0,
        tax_rate = "0.00%",
        tax_reason = "",
        account_type: resAccountType = "individual",
        courier_name = "",
        estimated_delivery = "",
        available_services = [],
      } = res.data;

      // Double the shipping rate from API
      const doubledShippingRate = shipping_rate * 2;

      setShippingRate(doubledShippingRate);
      setTax(resTax);
      setTaxRate(tax_rate);
      setTaxReason(tax_reason);
      setAccountType(resAccountType);
      setCourierName(courier_name);
      setEstimatedDelivery(estimated_delivery);

      // Double the shipping rates in available services
      const modifiedServices = (available_services || []).map((service) => ({
        ...service,
        total_charge: service.total_charge * 2,
      }));
      setAvailableServices(modifiedServices);

      if (modifiedServices && modifiedServices.length > 0) {
        const cheapestService = modifiedServices.reduce((prev, current) =>
          prev.total_charge < current.total_charge ? prev : current
        );
        setSelectedService(cheapestService);
      }
    } catch (error) {
      console.error("Rate error:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        setShippingError("Authentication failed. Please log in again.");
      } else {
        setShippingError(
          error.response?.data?.error?.includes("No DHL or FedEx")
            ? `No DHL or FedEx services available for this destination. Available couriers: ${
                error.response.data.available_couriers?.join(", ") || "None"
              }`
            : "Failed to fetch shipping rate. Please try again."
        );
      }
      [
        setShippingRate,
        setTax,
        setTaxRate,
        setTaxReason,
        setCourierName,
        setEstimatedDelivery,
        setSelectedService,
        setShippingError,
      ].forEach((fn) => fn(null));
      setAvailableServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceSelection = (service) => {
    setSelectedService(service);
    setShippingRate(service.total_charge);
    setCourierName(service.courier_name);
    setEstimatedDelivery(service.delivery_time);
    const newTax = shippingRate
      ? (tax / shippingRate) * service.total_charge
      : tax;
    setTax(newTax);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });

    if (
      [
        "country",
        "state",
        "city",
        "postal_code",
        "account_type",
        "has_resale_cert",
      ].includes(name)
    ) {
      [
        setShippingRate,
        setTax,
        setTaxRate,
        setTaxReason,
        setCourierName,
        setEstimatedDelivery,
        setSelectedService,
        setShippingError,
      ].forEach((fn) => fn(null));
      setAvailableServices([]);
    }
  };

  const inputClass =
    "w-full p-2 md:p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const buttonClass =
    "w-full py-2 md:py-3 text-white font-medium text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200";

  const handleEditClick = () => {
    router.push("/design-project");
  };

  return (
    <>
      <div
        className="w-full h-[51px] flex items-center px-4 md:px-6"
        style={{
          background:
            "linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)",
        }}
      >
        <h1 className="text-white text-base md:text-lg font-semibold">Shop</h1>
      </div>

      <div className="w-full min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] px-4 md:px-6 py-6 md:py-10 font-sans relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-10 relative">
          {/* Left Section */}
          <div className="w-full lg:w-[60%] bg-gradient-to-br from-[#f2f9ff] via-white to-[#fff0f5] rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 lg:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#2A428C] mb-4">
              Enter Your Shipping Address
            </h2>
            <hr className="mb-4 md:mb-6 border-[#2A428C]" />

            {/* Account Type Selection */}
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-base md:text-lg font-semibold text-[#2A428C] mb-2 md:mb-3">
                Account Type
              </h3>
              <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                {["individual", "enterprise"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="account_type"
                      value={type}
                      checked={form.account_type === type}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm md:text-base font-medium">
                      {type === "enterprise"
                        ? "Enterprise/Business"
                        : "Individual"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Resale Certificate */}
            {form.account_type === "enterprise" && (
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-50 rounded-lg border border-green-200">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="has_resale_cert"
                    checked={form.has_resale_cert}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm md:text-base font-medium text-green-800">
                    I have a valid resale certificate (tax exempt)
                  </span>
                </label>
              </div>
            )}

            {/* Form Fields */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4">
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleInputChange}
                placeholder="First Name"
                className={`${inputClass} md:w-1/2`}
              />
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleInputChange}
                placeholder="Last Name"
                className={`${inputClass} md:w-1/2`}
              />
            </div>

            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleInputChange}
              placeholder="Company/Organization Name (Optional)"
              className={`${inputClass} mb-4`}
            />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleInputChange}
              placeholder="Street Address"
              className={`${inputClass} mb-4`}
            />
            <input
              type="text"
              name="apt_floor"
              value={form.apt_floor}
              onChange={handleInputChange}
              placeholder="Apt/Floor/Suite (Optional)"
              className={`${inputClass} mb-4`}
            />

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4">
              <select
                name="country"
                value={form.country}
                onChange={handleInputChange}
                className={`${inputClass} md:w-1/2`}
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
                  value={form.state}
                  onChange={handleInputChange}
                  className={`${inputClass} md:w-1/2`}
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
                  value={form.state}
                  onChange={handleInputChange}
                  className={`${inputClass} md:w-1/2`}
                />
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4">
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleInputChange}
                placeholder="City"
                className={`${inputClass} md:w-1/2`}
              />
              <input
                type="text"
                name="postal_code"
                value={form.postal_code}
                onChange={handleInputChange}
                placeholder="Postal Code"
                className={`${inputClass} md:w-1/2`}
              />
            </div>

            <input
              type="text"
              name="phone_number"
              value={form.phone_number}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className={`${inputClass} mb-4`}
            />

            {/* Error Message */}
            {shippingError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm md:text-base">
                {shippingError}
              </div>
            )}

            {/* Calculate Rate */}
            <button
              className={`${buttonClass} mb-3 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#44c6ff] to-[#1786ff] hover:from-[#3bb5ff] hover:to-[#0f75ff]"
              }`}
              onClick={fetchShippingRate}
              disabled={isLoading}
            >
              {isLoading ? "Calculating..." : "Calculate Shipping Rate "}
            </button>

            {/* Available Services */}
            {availableServices && availableServices.length > 0 && (
              <div className="mb-4 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-base md:text-lg font-semibold text-[#2A428C] mb-2 md:mb-3">
                  Available Shipping Services
                </h3>
                <div className="space-y-2">
                  {availableServices.map((service, index) => (
                    <label
                      key={index}
                      className="flex items-center p-2 md:p-3 border rounded-lg hover:bg-blue-100 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="selected_service"
                        value={index}
                        checked={
                          selectedService?.courier_name ===
                            service.courier_name &&
                          selectedService?.service_name === service.service_name
                        }
                        onChange={() => handleServiceSelection(service)}
                        className="mr-2 md:mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                          <span className="font-medium text-sm md:text-base">
                            {service.courier_name}
                          </span>
                          <span className="font-bold text-[#2A428C] text-sm md:text-base">
                            ${service.total_charge.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-xs md:text-sm text-gray-600">
                          {service.service_name && (
                            <span>{service.service_name} • </span>
                          )}
                          <span>Delivery: {service.delivery_time}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Info Display */}
            {selectedService && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm md:text-base">
                <p>
                  <strong>Selected Service:</strong>{" "}
                  {selectedService.courier_name}
                </p>
                <p>
                  <strong>Service Type:</strong>{" "}
                  {selectedService.service_name || "Standard"}
                </p>
                <p>
                  <strong>Estimated Delivery:</strong>{" "}
                  {selectedService.delivery_time}
                </p>
                <p>
                  <strong>Account Type:</strong> {accountType}
                </p>
                <p>
                  <strong>Tax Rate:</strong> {taxRate}
                </p>
                {taxReason && (
                  <p>
                    <strong>Tax Reason:</strong> {taxReason}
                  </p>
                )}
              </div>
            )}

            {/* Save Info */}
            <button
              className={`${buttonClass} bg-gradient-to-r from-[#0a79f8] to-[#1e78ee] hover:from-[#0968d9] hover:to-[#1560d5]`}
              onClick={deliveryHandler}
            >
              Check Delivery Method
            </button>
          </div>

          {/* Right Section - Cart Summary */}
          <div className="w-full lg:w-[40%]">
            <div className="w-full bg-gradient-to-br from-[#e0f3ff] via-white to-[#ffe4ec] rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6">
              <div className="flex justify-between mb-4">
                <h3 className="text-[#2A428C] text-lg md:text-xl font-semibold">
                  Cart Summary
                </h3>
                <div
                  className="flex items-center gap-2 text-[#2A428C] font-semibold text-lg md:text-xl cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={handleEditClick}
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
                  </svg>
                </div>
              </div>

              <div className="bg-[#E5FBFF] rounded-xl p-3 md:p-4 flex gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex flex-col justify-center">
                  <h4 className="text-[#2A428C] font-bold text-lg md:text-xl mb-1">
                    {projectData?.projectTitle || "Book"}
                  </h4>
                  <p className="text-[#2A428C] text-base md:text-lg font-semibold">
                    Total Price: $
                    {displayTotalCost ? displayTotalCost.toFixed(2) : "0.00"}
                  </p>
                </div>
              </div>

              <div className="text-sm space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-600">Subtotal </span>
                  <span className="text-[#2A428C]">
                    {" "}
                    ${displayTotalCost ? displayTotalCost.toFixed(2) : "0.00"}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-600">
                    Shipping{" "}
                    {selectedService && `(${selectedService.courier_name})`}
                  </span>
                  <span
                    className={
                      shippingRate !== null ? "text-gray-900" : "text-gray-400"
                    }
                  >
                    {shippingRate !== null
                      ? `$${shippingRate.toFixed(2)}`
                      : "Calculate first"}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-600">
                    Taxes {taxRate && `(${taxRate})`}
                  </span>
                  <span
                    className={tax !== null ? "text-gray-900" : "text-gray-400"}
                  >
                    {tax !== null ? `$${tax.toFixed(2)}` : "Calculate first"}
                  </span>
                </div>
                {taxReason && (
                  <div className="text-xs text-gray-500 italic pl-2">
                    {taxReason}
                  </div>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between font-bold text-base md:text-lg">
                  <span className="text-[#2A428C]">Total</span>
                  <span className="text-[#2A428C]">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Account Type Badge */}
              {accountType && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3 md:mb-4">
                  <p className="text-xs text-blue-800 text-center">
                    <strong>Account:</strong>{" "}
                    {accountType.charAt(0).toUpperCase() + accountType.slice(1)}
                    {form.account_type === "enterprise" &&
                      form.has_resale_cert &&
                      " (Tax Exempt)"}
                  </p>
                </div>
              )}

              {/* Shipping Status */}
              {shippingRate !== null && selectedService && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-2 md:p-3 mb-3 md:mb-4">
                  <p className="text-xs md:text-sm text-green-800">
                    <strong>Ready to checkout!</strong>{" "}
                    {selectedService.courier_name} shipping selected.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
  