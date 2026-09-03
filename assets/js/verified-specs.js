(function () {
  "use strict";

  const BOEING_757 = { name: "Boeing 757 Airplane Characteristics for Airport Planning, Rev H (December 2024)", url: "https://www.boeing.com/content/dam/boeing/v2/airports/acaps/757_Rev_H.pdf" };
  const BOEING_767 = { name: "Boeing 767 Airplane Characteristics for Airport Planning, Rev K (December 2024)", url: "https://www.boeing.com/content/dam/boeing/v2/airports/acaps/767_REV_K.pdf" };
  const AIRBUS_A321 = { name: "Airbus A321neo key figures", url: "https://www.aircraft.airbus.com/en/aircraft/a320-family/a321neo" };
  const ANTONOV_AN72 = { name: "Antonov AN-72 history and characteristics", url: "https://antonov.com/en/history/an-72" };
  const PROGRESS_D36 = { name: "Ukrainian aviation-industry catalogue - D-36 family", url: "https://progress.gov.ua/wp-content/uploads/2020/08/aviation-industry.pdf" };
  const EUROCONTROL_AN72 = { name: "EUROCONTROL Aircraft Performance Database - AN72", url: "https://contentzone.eurocontrol.int/aircraftperformance/details.aspx?GroupFilter=4&ICAO=AN72" };
  const NAVY_F14D = { name: "National Naval Aviation Museum - F-14D Tomcat", url: "https://www.history.navy.mil/content/history/museums/nnam/explore/collections/aircraft/f/f-14d-tomcat.html" };
  const AIR_FORCE_F15 = { name: "U.S. Air Force - F-15 Eagle fact sheet", url: "https://www.af.mil/About-Us/Fact-Sheets/Display/Article/104501/f-15-eagle/" };
  const CESSNA_172S = { name: "Textron Aviation - Cessna Skyhawk specifications", url: "https://cessna.txtav.com/en/piston/cessna-skyhawk" };
  const SCHLEICHER_ASK21 = { name: "Alexander Schleicher - ASK 21 technical data", url: "https://www.alexander-schleicher.de/en/flugzeuge/ask-21/" };
  const RAF_SPITFIRE_MKI = { name: "Royal Air Force Museum - Supermarine Spitfire Mk I", url: "https://www.rafmuseum.org.uk/documents/LargePrintGuides/BoB_Guides/LPG_Battle_of_Britain_Cosford_web.pdf" };

  const records = {
    "boeing-757-200": {
      description: "The Boeing 757-200 is the original passenger member of the twin-engine 757 family. Boeing's planning manual lists overwing-exit and four-door layouts, typical two-class seating for 186, and high-gross configurations capable of about 3,900 nmi.",
      basic: { country: "United States", firstFlight: "1982-02-19", production: "1981-2004", status: "Out of production; in service", role: "Narrow-body passenger airliner", numberBuilt: "913 (757-200 passenger aircraft)" },
      specs: {
        dimensions: { Length: "47.32 m / 155 ft 3 in", Wingspan: "38.05 m / 124 ft 10 in", Height: "13.56 m / 44 ft 6 in" },
        powerplant: { Engines: "2", "Engine options": "Rolls-Royce RB211-535C / RB211-535E4 / RB211-535E4B; Pratt & Whitney PW2037 / PW2040", "Engine type": "High-bypass turbofan", "Thrust per engine": "37,200-43,100 lbf / 165.5-191.7 kN, by engine option" },
        performance: { "Cruise speed": "Mach 0.80", "Typical full-load range": "2,900 nmi / 5,371 km", "High-gross range": "about 3,900 nmi / 7,223 km" },
        weights: { "Operating empty weight": "56,748-62,114 kg / 125,110-136,940 lb, typical configuration", MTOW: "115,666 kg / 255,000 lb", "Maximum landing weight": "95,254 kg / 210,000 lb", "Maximum structural payload": "up to 26,712 kg / 58,890 lb" },
        capacity: { Crew: "2 flight crew", Passengers: "186 typical two-class", "Maximum passengers": "239 (four-door FAA exit limit)", "Lower-deck cargo volume": "51 m³ / 1,790 ft³" }
      },
      technical: { dimensions: { length: { value: 47.32, unit: "m" }, wingspan: { value: 38.05, unit: "m" }, height: { value: 13.56, unit: "m" } }, weights: { mtow: { value: 115666, unit: "kg" } } },
      sources: [BOEING_757]
    },
    "boeing-757-200f": {
      description: "The Boeing 757-200F (757-200PF in Boeing planning documents) is the purpose-built package freighter. It has a large forward main-deck cargo door, no cabin windows or passenger doors, and space for 15 main-deck unit-load devices.",
      basic: { country: "United States", status: "Out of production; in service", role: "Narrow-body freighter" },
      specs: {
        dimensions: { Length: "47.32 m / 155 ft 3 in", Wingspan: "38.05 m / 124 ft 10 in", Height: "13.56 m / 44 ft 6 in" },
        powerplant: { Engines: "2", "Engine options": "Rolls-Royce RB211-535E4 / RB211-535E4B; Pratt & Whitney PW2037 / PW2040", "Engine type": "High-bypass turbofan", "Thrust per engine": "37,200-43,100 lbf / 165.5-191.7 kN, by engine option" },
        performance: { "Cruise speed": "Mach 0.80" },
        weights: { "Operating empty weight": "51,709 kg / 114,000 lb, typical", MTOW: "115,666 kg / 255,000 lb", "Maximum landing weight": "95,254 kg / 210,000 lb", "Maximum structural payload": "39,008 kg / 86,000 lb" },
        capacity: { Crew: "2 flight crew", "Main-deck cargo volume": "187 m³ / 6,600 ft³", "Lower-deck cargo volume": "52 m³ / 1,830 ft³" }
      },
      technical: { dimensions: { length: { value: 47.32, unit: "m" }, wingspan: { value: 38.05, unit: "m" }, height: { value: 13.56, unit: "m" } }, weights: { mtow: { value: 115666, unit: "kg" } } },
      sources: [BOEING_757]
    },
    "boeing-757-300": {
      description: "The Boeing 757-300 is a stretched second-generation derivative of the 757-200. Boeing added two fuselage extensions for more passenger and cargo capacity and incorporated extended-range-operations provisions in the standard design.",
      basic: { country: "United States", firstFlight: "1998-08-02", production: "1998-2004", status: "Out of production; in service", role: "Stretched narrow-body passenger airliner", numberBuilt: "55" },
      specs: {
        dimensions: { Length: "54.47 m / 178 ft 7 in", Wingspan: "38.05 m / 124 ft 10 in", Height: "13.56 m / 44 ft 6 in" },
        powerplant: { Engines: "2", "Engine options": "Rolls-Royce RB211-535E4 / RB211-535E4B; Pratt & Whitney PW2040 / PW2043", "Engine type": "High-bypass turbofan", "Thrust per engine": "40,100-43,850 lbf / 178.4-195.1 kN, by engine option" },
        performance: { "Cruise speed": "Mach 0.80" },
        weights: { "Operating empty weight": "64,319-64,568 kg / 141,800-142,350 lb, typical configuration", MTOW: "122,449 kg / 270,000 lb", "Maximum landing weight": "101,604 kg / 224,000 lb", "Maximum structural payload": "30,685-30,935 kg / 67,650-68,200 lb" },
        capacity: { Crew: "2 flight crew", Passengers: "243 typical two-class", "Maximum passengers": "279 all-economy", "Lower-deck cargo volume": "67.5 m³ / 2,382 ft³" }
      },
      technical: { dimensions: { length: { value: 54.47, unit: "m" }, wingspan: { value: 38.05, unit: "m" }, height: { value: 13.56, unit: "m" } }, weights: { mtow: { value: 122449, unit: "kg" } } },
      sources: [BOEING_757]
    },
    "boeing-767-200": {
      description: "The Boeing 767-200 is the original short-fuselage member of the 767 twin-engine wide-body family. Boeing's planning configuration accommodates 216 passengers in mixed class, with optional exit arrangements allowing a higher certified limit.",
      basic: { country: "United States", firstFlight: "1981-09-26", status: "Out of production; limited service", role: "Wide-body passenger airliner" },
      specs: {
        dimensions: { Length: "48.51 m / 159 ft 2 in", Wingspan: "47.57 m / 156 ft 1 in", Height: "15.85 m / 52 ft" },
        powerplant: { Engines: "2", "Engine options": "Pratt & Whitney JT9D-7R4D / JT9D-7R4E; General Electric CF6-80A / CF6-80A2", "Engine type": "High-bypass turbofan", "Thrust per engine": "48,000-50,000 lbf / 213.5-222.4 kN" },
        performance: { "Planning range": "about 3,900 nmi / 7,223 km" },
        weights: { "Operating empty weight": "78,974-80,285 kg / 174,110-177,000 lb, typical configuration", MTOW: "up to 142,881 kg / 315,000 lb", "Maximum landing weight": "up to 123,377 kg / 272,000 lb", "Maximum structural payload": "up to 33,271 kg / 73,350 lb" },
        capacity: { Crew: "2 flight crew", Passengers: "216 typical mixed class", "Maximum passengers": "255; up to 290 with second overwing exit", "Lower-deck cargo volume": "86.9 m³ / 3,070 ft³" }
      }, technical: { dimensions: { length: { value: 48.51, unit: "m" }, wingspan: { value: 47.57, unit: "m" }, height: { value: 15.85, unit: "m" } }, weights: { mtow: { value: 142881, unit: "kg" } } }, sources: [BOEING_767]
    },
    "boeing-767-200er": {
      description: "The Boeing 767-200ER retains the 767-200's outside dimensions but adds center fuel tanks and higher certified weights for long-range service. Boeing describes routes beyond 5,200 nmi with the planning passenger load.",
      basic: { country: "United States", status: "Out of production; in service", role: "Extended-range wide-body passenger airliner" },
      specs: {
        dimensions: { Length: "48.51 m / 159 ft 2 in", Wingspan: "47.57 m / 156 ft 1 in", Height: "15.85 m / 52 ft" },
        powerplant: { Engines: "2", "Engine options": "Pratt & Whitney JT9D-7R4D/-7R4E or PW4000 series; General Electric CF6-80A/-80C2; Rolls-Royce RB211-524G/-524H", "Engine type": "High-bypass turbofan", "Thrust per engine": "48,000-60,600 lbf / 213.5-269.6 kN, by engine and weight option" },
        performance: { "Planning range": "more than 5,200 nmi / 9,630 km" },
        weights: { "Operating empty weight": "82,159-82,376 kg / 181,130-181,610 lb, typical configuration", MTOW: "up to 179,169 kg / 395,000 lb", "Maximum landing weight": "up to 136,077 kg / 300,000 lb", "Maximum structural payload": "up to 35,607 kg / 78,500 lb" },
        capacity: { Crew: "2 flight crew", Passengers: "216 typical mixed class", "Maximum passengers": "255; up to 290 with second overwing exit", "Lower-deck cargo volume": "86.9 m³ / 3,070 ft³" }
      }, technical: { dimensions: { length: { value: 48.51, unit: "m" }, wingspan: { value: 47.57, unit: "m" }, height: { value: 15.85, unit: "m" } }, weights: { mtow: { value: 179169, unit: "kg" } } }, sources: [BOEING_767]
    },
    "boeing-767-300": {
      description: "The Boeing 767-300 stretches the 767-200 fuselage by 21 ft 1 in for more passenger and cargo space while retaining the earlier model's basic wing and tail dimensions.",
      basic: { country: "United States", status: "Out of production; in service", role: "Stretched wide-body passenger airliner" },
      specs: {
        dimensions: { Length: "54.94 m / 180 ft 3 in", Wingspan: "47.57 m / 156 ft 1 in", Height: "15.85 m / 52 ft" },
        powerplant: { Engines: "2", "Engine options": "Pratt & Whitney JT9D or PW4000 series; General Electric CF6-80A/-80C2; Rolls-Royce RB211-524", "Engine type": "High-bypass turbofan" },
        weights: { "Operating empty weight": "84,540-86,069 kg / 186,380-189,750 lb, typical configuration", MTOW: "up to 158,757 kg / 350,000 lb", "Maximum landing weight": "136,077 kg / 300,000 lb", "Maximum structural payload": "up to 41,558 kg / 91,620 lb" },
        capacity: { Crew: "2 flight crew", Passengers: "261 typical mixed class", "Maximum passengers": "290; up to 299 with mid-cabin Type A door", "Lower-deck cargo volume": "114.1 m³ / 4,030 ft³" }
      }, technical: { dimensions: { length: { value: 54.94, unit: "m" }, wingspan: { value: 47.57, unit: "m" }, height: { value: 15.85, unit: "m" } }, weights: { mtow: { value: 158757, unit: "kg" } } }, sources: [BOEING_767]
    },
    "boeing-767-300er": {
      description: "The Boeing 767-300ER combines the 767-300's stretched fuselage with center fuel tanks and higher weight options. It became the principal long-range passenger version of the family and was offered with GE, Pratt & Whitney, and Rolls-Royce engines.",
      basic: { country: "United States", status: "Out of production; in service", role: "Extended-range wide-body passenger airliner" },
      specs: {
        dimensions: { Length: "54.94 m / 180 ft 3 in", Wingspan: "47.57 m / 156 ft 1 in", Height: "15.85 m / 52 ft" },
        powerplant: { Engines: "2", "Engine options": "General Electric CF6-80C2; Pratt & Whitney PW4000; Rolls-Royce RB211-524G/-524H", "Engine type": "High-bypass turbofan", "Thrust per engine": "approximately 52,500-61,500 lbf / 233.5-273.6 kN, by certified engine option" },
        weights: { "Operating empty weight": "87,924-90,010 kg / 193,840-198,440 lb, typical configuration", MTOW: "up to 186,880 kg / 412,000 lb", "Maximum landing weight": "145,149 kg / 320,000 lb", "Maximum structural payload": "up to 43,798 kg / 96,560 lb" },
        capacity: { Crew: "2 flight crew", Passengers: "261 typical mixed class", "Maximum passengers": "290; up to 299 with second overwing exit", "Lower-deck cargo volume": "114.1 m³ / 4,030 ft³" }
      }, technical: { dimensions: { length: { value: 54.94, unit: "m" }, wingspan: { value: 47.57, unit: "m" }, height: { value: 15.85, unit: "m" } }, weights: { mtow: { value: 186880, unit: "kg" } } }, sources: [BOEING_767]
    },
    "boeing-767-300f": {
      description: "The Boeing 767-300 Freighter is the purpose-built cargo member of the 767 family. Its main deck accepts up to 24 Type A pallets plus two contoured pallets, while the lower hold retains wide-body container capability.",
      basic: { country: "United States", status: "In production", role: "Wide-body freighter" },
      specs: {
        dimensions: { Length: "54.94 m / 180 ft 3 in", Wingspan: "47.57 m / 156 ft 1 in", Height: "15.85 m / 52 ft" },
        powerplant: { Engines: "2", "Engine options": "General Electric CF6-80C2; Pratt & Whitney PW4000; Rolls-Royce RB211-524", "Engine type": "High-bypass turbofan" },
        performance: { Range: "6,110 km / 3,300 nmi with 57 t structural payload" },
        weights: { "Operating empty weight": "85,275-86,182 kg / 188,000-190,000 lb, typical configuration", MTOW: "186,880 kg / 412,000 lb", "Maximum landing weight": "147,871 kg / 326,000 lb", "Maximum structural payload": "up to 54,884 kg / 121,000 lb" },
        capacity: { Crew: "2 flight crew", "Main deck": "Up to 24 Type A pallets plus 2 contoured pallets", "Lower-deck cargo volume": "114.1 m³ / 4,030 ft³" }
      }, technical: { dimensions: { length: { value: 54.94, unit: "m" }, wingspan: { value: 47.57, unit: "m" }, height: { value: 15.85, unit: "m" } }, weights: { mtow: { value: 186880, unit: "kg" } }, performance: { range: { value: 6110, unit: "km" } } }, sources: [BOEING_767, { name: "Boeing 767 Freighter specifications", url: "https://www.boeing.com/commercial/767" }]
    },
    "boeing-767-400er": {
      description: "The Boeing 767-400ER is the longest 767 passenger model. It adds a 21 ft fuselage extension beyond the 767-300, a new-generation wing with raked tips, updated engines, and a three-class planning layout for 243 passengers.",
      basic: { country: "United States", firstFlight: "1999-10-09", status: "Out of production; in service", role: "Extended-range wide-body passenger airliner", numberBuilt: "38" },
      specs: {
        dimensions: { Length: "61.37 m / 201 ft 4 in", Wingspan: "51.92 m / 170 ft 4 in", Height: "16.84 m / 55 ft 4 in" },
        powerplant: { Engines: "2", "Engine options": "General Electric CF6-80C2B7F1; Pratt & Whitney PW4062 (offered)", "Engine type": "High-bypass turbofan", "Thrust per engine": "60,600 lbf / 269.6 kN" },
        weights: { "Operating empty weight": "103,146-103,872 kg / 227,400-229,000 lb, typical configuration", MTOW: "204,116 kg / 450,000 lb", "Maximum landing weight": "158,757 kg / 350,000 lb", "Maximum structural payload": "45,812-46,538 kg / 101,000-102,600 lb" },
        capacity: { Crew: "2 flight crew", Passengers: "243 typical three-class / 296 two-class", "Maximum passengers": "409 all-economy", "Lower-deck cargo volume": "138.9 m³ / 4,905 ft³" }
      }, technical: { dimensions: { length: { value: 61.37, unit: "m" }, wingspan: { value: 51.92, unit: "m" }, height: { value: 16.84, unit: "m" } }, weights: { mtow: { value: 204116, unit: "kg" } } }, sources: [BOEING_767]
    },
    "airbus-a321neo": {
      description: "The Airbus A321neo is the longest-fuselage member of the A320neo family. It combines new-generation CFM or Pratt & Whitney engines with Sharklets and supports layouts from 180-220 seats in typical two-class service to 244 seats at maximum density.",
      basic: { country: "Multinational / Europe", status: "In production and in service", role: "Narrow-body passenger airliner" },
      specs: {
        dimensions: { Length: "44.51 m / 146 ft", Wingspan: "35.80 m / 117 ft 5 in", Height: "11.76 m / 38 ft 7 in", "Cabin length": "34.44 m / 113 ft", "Fuselage width": "3.95 m / 13 ft", "Maximum cabin width": "3.70 m / 12 ft 2 in" },
        powerplant: { Engines: "2", "Engine options": "CFM International LEAP-1A; Pratt & Whitney PW1100G-JM", "Engine type": "High-bypass geared or direct-drive turbofan" },
        performance: { "Maximum operating Mach": "Mach 0.82", Range: "7,400 km / 4,000 nmi (A321LR configuration)" },
        weights: { MTOW: "97,000 kg / 213,848 lb", "Maximum landing weight": "79,200 kg / 174,606 lb", "Maximum zero-fuel weight": "75,600 kg / 166,669 lb" },
        capacity: { Crew: "2 flight crew", Passengers: "180-220 typical two-class", "Maximum passengers": "244", "Underfloor cargo": "10 LD3-45W containers or 10 pallets; 59 m³ water volume" }
      }, technical: { dimensions: { length: { value: 44.51, unit: "m" }, wingspan: { value: 35.8, unit: "m" }, height: { value: 11.76, unit: "m" } }, weights: { mtow: { value: 97000, unit: "kg" } }, performance: { range: { value: 7400, unit: "km", configuration: "A321LR" } } }, sources: [AIRBUS_A321]
    },
    "antonov-an-72": {
      description: "The Antonov An-72 is a Soviet-designed twin-engine STOL transport whose engines sit above the wing so their exhaust flows over the flaps, using the Coanda effect to improve lift during short-field operations.",
      basic: { country: "Soviet Union / Ukraine", firstFlight: "1977-08-31", introduction: "1987", production: "1984-1992", status: "Out of production; in service", role: "STOL light transport", numberBuilt: "114" },
      specs: {
        dimensions: { Length: "28.07 m / 92 ft 1 in", Wingspan: "31.89 m / 104 ft 7 in", Height: "8.65 m / 28 ft 5 in", "Wing area": "98.78 m² / 1,063 ft²" },
        powerplant: { Engines: "2", "Engine manufacturer": "ZMKB Progress / Motor Sich", "Engine model": "D-36 Series 1A or 2A", "Engine type": "High-bypass turbofan", "Thrust per engine": "63.74 kN / 14,330 lbf" },
        performance: { "Cruise speed": "540 km/h / 292 kt", Range: "4,320 km / 2,333 nmi", "Service ceiling": "10,100 m / 33,136 ft", "STOL runway reference": "Designed for operation from unprepared strips about 600 m long" },
        capacity: { Crew: "3", Passengers: "Up to 68 in transport configuration" },
        identification: { ICAO: "AN72", IATA: "AN7" }
      }, technical: { dimensions: { length: { value: 28.07, unit: "m" }, wingspan: { value: 31.89, unit: "m" }, height: { value: 8.65, unit: "m" }, wingArea: { value: 98.78, unit: "m2" } }, performance: { cruiseSpeed: { value: 540, unit: "km/h" }, range: { value: 4320, unit: "km" }, serviceCeiling: { value: 10100, unit: "m" } } }, sources: [ANTONOV_AN72, PROGRESS_D36, EUROCONTROL_AN72]
    },
    "grumman-f-14d-tomcat": {
      description: "The Grumman F-14D was the final Tomcat variant, combining the variable-sweep carrier airframe with more powerful F110-GE-400 engines and a substantially upgraded avionics suite. It served in both fleet air-defence and precision-strike roles.",
      basic: { country: "United States", introduction: "1991", status: "Retired", role: "Carrier-based air-superiority fighter / strike aircraft" },
      specs: {
        dimensions: { Length: "19.10 m / 62 ft 8 in", Wingspan: "19.53 m / 64 ft 1 in, wings spread", "Wingspan swept": "11.58 m / 38 ft", Height: "4.88 m / 16 ft" },
        powerplant: { Engines: "2", "Engine manufacturer": "General Electric", "Engine model": "F110-GE-400", "Engine type": "Afterburning low-bypass turbofan", "Thrust per engine": "27,800 lbf / 123.7 kN with afterburner" },
        performance: { "Maximum speed": "1,544 mph / 2,485 km/h (at 40,000 ft)", "Service ceiling": "55,000 ft / 16,764 m" },
        weights: { "Empty weight": "19,838 kg / 43,735 lb", "Gross weight": "33,725 kg / 74,350 lb" },
        capacity: { Crew: "2 - pilot and radar intercept officer" }
      }, technical: { dimensions: { length: { value: 19.1, unit: "m" }, wingspan: { value: 19.53, unit: "m", configuration: "wings spread" }, height: { value: 4.88, unit: "m" } }, performance: { maxSpeed: { value: 2485, unit: "km/h" }, serviceCeiling: { value: 16764, unit: "m" } }, weights: { emptyWeight: { value: 19838, unit: "kg" } } }, sources: [NAVY_F14D]
    },
    "mcdonnell-douglas-f-15c-eagle": {
      description: "The McDonnell Douglas F-15C is the single-seat air-superiority version of the Eagle. Compared with the F-15A, it added internal fuel, provision for conformal fuel tanks, a higher takeoff weight, and later Multistage Improvement Program avionics.",
      basic: { country: "United States", introduction: "1979", status: "Retired from active U.S. Air Force service; limited service elsewhere", role: "Air-superiority fighter" },
      specs: {
        dimensions: { Length: "19.44 m / 63 ft 9 in", Wingspan: "13.05 m / 42 ft 10 in", Height: "5.64 m / 18 ft 6 in" },
        powerplant: { Engines: "2", "Engine manufacturer": "Pratt & Whitney", "Engine options": "F100-PW-100 / F100-PW-220", "Engine type": "Afterburning low-bypass turbofan", "Thrust per engine": "23,450 lbf / 104.3 kN with afterburner (C/D fact-sheet figure)" },
        performance: { "Maximum speed": "1,875 mph / 3,017 km/h (Mach 2 class)", "Ferry range": "3,000 nmi / 5,556 km with conformal and three external tanks", "Service ceiling": "65,000 ft / 19,812 m" },
        weights: { "Published weight": "14,379 kg / 31,700 lb", MTOW: "30,844 kg / 68,000 lb" },
        capacity: { Crew: "1" }
      }, technical: { dimensions: { length: { value: 19.44, unit: "m" }, wingspan: { value: 13.05, unit: "m" }, height: { value: 5.64, unit: "m" } }, performance: { maxSpeed: { value: 3017, unit: "km/h" }, ferryRange: { value: 5556, unit: "km" }, serviceCeiling: { value: 19812, unit: "m" } }, weights: { mtow: { value: 30844, unit: "kg" } } }, sources: [AIR_FORCE_F15]
    },
    "cessna-172": {
      description: "The Cessna 172S Skyhawk is the current fuel-injected production version of the four-seat high-wing trainer. Its forgiving handling, Garmin glass cockpit, and 180 hp Lycoming engine make it a standard aircraft for primary flight training and personal flying.",
      basic: { country: "United States", status: "In production and in service", role: "Four-seat trainer and personal aircraft" },
      specs: {
        dimensions: { Length: "8.28 m / 27 ft 2 in", Wingspan: "11.00 m / 36 ft 1 in", Height: "2.72 m / 8 ft 11 in", "Wing area": "16.17 m² / 174 ft²" },
        powerplant: { Engines: "1", "Engine manufacturer": "Lycoming", "Engine model": "IO-360-L2A", "Engine type": "Fuel-injected, horizontally opposed piston", Power: "180 hp / 134 kW", Propeller: "McCauley fixed-pitch" },
        performance: { "Maximum cruise speed": "124 kt / 230 km/h", Range: "640 nmi / 1,185 km", "Service ceiling": "14,000 ft / 4,267 m", "Rate of climb": "730 ft/min / 223 m/min", "Stall speed": "48 KCAS / 89 km/h", "Maximum limit speed": "163 KIAS / 302 km/h", "Takeoff distance": "497 m / 1,630 ft", "Landing distance": "407 m / 1,335 ft" },
        weights: { "Basic empty weight": "762 kg / 1,680 lb", MTOW: "1,157 kg / 2,550 lb", "Maximum landing weight": "1,157 kg / 2,550 lb", "Useful load": "398 kg / 878 lb", "Maximum payload": "395 kg / 870 lb" },
        capacity: { Crew: "1", "Maximum occupants": "4", Baggage: "54 kg / 120 lb; 0.85 m³ / 30 ft³" }
      }, technical: { dimensions: { length: { value: 8.28, unit: "m" }, wingspan: { value: 11, unit: "m" }, height: { value: 2.72, unit: "m" }, wingArea: { value: 16.17, unit: "m2" } }, performance: { cruiseSpeed: { value: 230, unit: "km/h" }, range: { value: 1185, unit: "km" }, serviceCeiling: { value: 4267, unit: "m" } }, weights: { emptyWeight: { value: 762, unit: "kg" }, mtow: { value: 1157, unit: "kg" } } }, sources: [CESSNA_172S]
    },
    "schleicher-ask-21": {
      description: "The Schleicher ASK 21 is a two-seat composite training sailplane designed by Rudolf Kaiser. Its benign handling, aerobatic capability, and durable fixed landing gear made it a widely used club trainer and spin-training platform.",
      basic: { country: "Germany", firstFlight: "1978", status: "In production and in service", role: "Two-seat training glider" },
      specs: {
        dimensions: { Length: "8.35 m / 27 ft 5 in", Wingspan: "17.00 m / 55 ft 9 in", Height: "1.55 m / 5 ft 1 in at tail", "Wing area": "17.95 m² / 193 ft²", "Aspect ratio": "16.1" },
        powerplant: { Propulsion: "Unpowered glider" },
        performance: { "Best glide": "34:1", "Minimum sink": "0.65 m/s / 128 ft/min", "Never-exceed speed": "280 km/h / 151 kt" },
        weights: { "Empty mass": "360 kg / 794 lb", MTOW: "600 kg / 1,323 lb", "Maximum cockpit load": "2 x 110 kg / 2 x 242 lb" },
        capacity: { Crew: "2" }
      }, technical: { dimensions: { length: { value: 8.35, unit: "m" }, wingspan: { value: 17, unit: "m" }, height: { value: 1.55, unit: "m", reference: "tail" }, wingArea: { value: 17.95, unit: "m2" } }, weights: { emptyWeight: { value: 360, unit: "kg" }, mtow: { value: 600, unit: "kg" } } }, sources: [SCHLEICHER_ASK21]
    },
    "supermarine-spitfire-mk-i": {
      description: "The Supermarine Spitfire Mk I was the first production version of R. J. Mitchell's elliptical-wing fighter. Entering RAF service in August 1938, it combined a Rolls-Royce Merlin engine with retractable landing gear and became one of the principal British fighters of the Battle of Britain.",
      basic: { country: "United Kingdom", firstFlight: "1936-03-05", introduction: "1938-08-04", production: "1938-1941", status: "Retired; preserved examples remain", role: "Single-seat fighter" },
      specs: {
        dimensions: { Length: "9.1 m / 29 ft 11 in", Wingspan: "11.2 m / 36 ft 10 in" },
        powerplant: { Engines: "1", "Engine manufacturer": "Rolls-Royce", "Engine model": "Merlin III", "Engine type": "Liquid-cooled V-12 piston", Power: "1,030 hp / 768 kW" },
        performance: { "Maximum speed": "353 mph / 568 km/h / 307 kt", "Service ceiling": "9,723 m / 31,900 ft" },
        capacity: { Crew: "1" }
      },
      technical: { dimensions: { length: { value: 9.1, unit: "m" }, wingspan: { value: 11.2, unit: "m" } }, performance: { maxSpeed: { value: 568, unit: "km/h" }, serviceCeiling: { value: 9723, unit: "m" } } },
      sources: [RAF_SPITFIRE_MKI]
    }
  };

  const catalog = window.AviationSpecEnrichment || { version: "2026-09-01", coverage: {}, records: {} };
  Object.entries(records).forEach(([id, record]) => {
    const existing = catalog.records[id] || {};
    catalog.records[id] = {
      ...existing,
      ...record,
      reviewed: true,
      basic: { ...(existing.basic || {}), ...(record.basic || {}) },
      specs: Object.fromEntries(["dimensions", "powerplant", "performance", "weights", "capacity", "identification"].map((group) => [group, { ...(existing.specs?.[group] || {}), ...(record.specs?.[group] || {}) }]).filter(([, values]) => Object.keys(values).length)),
      technical: { ...(existing.technical || {}), ...(record.technical || {}) },
      sources: [...(record.sources || []), ...(existing.sources || [])].filter((source, index, all) => all.findIndex((item) => item.url === source.url) === index)
    };
  });
  catalog.coverage.reviewedPrimarySourceRecords = Object.keys(records).length;
  window.AviationSpecEnrichment = catalog;
})();
