window.AviationData = (() => {
  const timelineOrder = ["Foundational", "Jet Age", "Digital Age", "Next Horizon"];

  const timelineDescriptions = {
    Foundational: "Early propeller, piston, and pre-digital era aircraft that shaped the first decades of flight.",
    "Jet Age": "Cold War and early jet-era aircraft that defined global airline and military expansion.",
    "Digital Age": "Aircraft designed around modern avionics, composites, efficient engines, and networked operations.",
    "Next Horizon": "Future-facing aircraft programs, development projects, and upcoming aviation directions."
  };

  const categoryDescriptions = {
    "Commercial Airliner": "Large passenger and cargo aircraft builders focused on major airline networks.",
    "Regional & Utility": "Manufacturers serving short-haul routes, STOL utility roles, and specialized transport missions.",
    "Business & General Aviation": "Builders of personal, training, business, and light utility aircraft families.",
    "Military & Defense": "Manufacturers centered on fighters, surveillance, bombers, transports, and mission aircraft.",
    "Special Mission & Amphibious": "Aircraft makers focused on unique roles such as water operations, patrol, and rescue."
  };

  const classDescriptions = {
    "Commercial Jet": "Mainline passenger or cargo jets for regional, national, or intercontinental networks.",
    "Regional Turboprop": "Efficient propeller aircraft optimized for shorter sectors and smaller runways.",
    "Business Jet": "Corporate and private jets focused on speed, range, and cabin comfort.",
    "General Aviation": "Personal, training, and utility aircraft serving a broad civil flying market.",
    Fighter: "Combat aircraft designed for air superiority, multirole strike, or interception.",
    "Military Transport": "Aircraft built to move people, cargo, or special mission systems for defense operators.",
    Trainer: "Aircraft specialized for pilot instruction, lead-in fighter training, or ab initio flying.",
    Amphibian: "Aircraft designed to operate from land and water for firefighting, rescue, or utility roles.",
    ISR: "Intelligence, surveillance, reconnaissance, and airborne early warning platforms.",
    Experimental: "Concept aircraft, future programs, or technology demonstrators aimed at the next era."
  };

  const manufacturers = [
    {
      id: "airbus",
      name: "Airbus",
      country: "Europe",
      founded: "1970",
      status: "Active",
      category: "Commercial Airliner",
      aircraftFocus: ["Commercial Jet", "Widebody", "Freighter"],
      summary: "Airbus is a major European airframer known for fly-by-wire airliners, wide global airline reach, and an extensive modern jet family.",
      aircraft: [
        {
          id: "airbus-a220",
          name: "A220",
          firstFlight: "2013",
          timeline: "Digital Age",
          type: "Narrowbody airliner",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "Originally developed as the C Series, the A220 covers the 100 to 150 seat market with efficient engines and a modern cabin."
        },
        {
          id: "airbus-a300",
          name: "A300",
          firstFlight: "1972",
          timeline: "Jet Age",
          type: "Widebody airliner",
          class: "Commercial Jet",
          programState: "Historic icon",
          overview: "The A300 was the world's first twin-engine widebody airliner and launched Airbus into the mainline market."
        },
        {
          id: "airbus-a310",
          name: "A310",
          firstFlight: "1982",
          timeline: "Jet Age",
          type: "Widebody airliner",
          class: "Commercial Jet",
          programState: "Legacy icon",
          overview: "The A310 shortened the A300 concept into a medium-to-long-haul widebody used by airlines, cargo operators, and governments."
        },
        {
          id: "airbus-a318",
          name: "A318",
          firstFlight: "2002",
          timeline: "Digital Age",
          type: "Short narrowbody airliner",
          class: "Commercial Jet",
          programState: "Legacy program",
          overview: "The A318 was the smallest A320-family variant and served niche airline and special mission roles."
        },
        {
          id: "airbus-a319",
          name: "A319",
          firstFlight: "1995",
          timeline: "Digital Age",
          type: "Narrowbody airliner",
          class: "Commercial Jet",
          programState: "Long-running program",
          overview: "The A319 became popular with airlines needing a slightly smaller A320-family aircraft with common crew and systems."
        },
        {
          id: "airbus-a320",
          name: "A320",
          firstFlight: "1987",
          timeline: "Jet Age",
          type: "Narrowbody airliner",
          class: "Commercial Jet",
          programState: "Historic best-seller",
          overview: "The A320 changed short-haul airline design with digital fly-by-wire controls and a highly scalable single-aisle platform."
        },
        {
          id: "airbus-a320neo",
          name: "A320neo",
          firstFlight: "2014",
          timeline: "Digital Age",
          type: "Re-engined narrowbody airliner",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "The A320neo modernized Airbus's best-known family with more efficient engines and lower operating costs."
        },
        {
          id: "airbus-a321",
          name: "A321",
          firstFlight: "1993",
          timeline: "Jet Age",
          type: "Stretched narrowbody airliner",
          class: "Commercial Jet",
          programState: "Core family program",
          overview: "The A321 became one of the most commercially important single-aisle aircraft by combining capacity with strong economics."
        },
        {
          id: "airbus-a321xlr",
          name: "A321XLR",
          firstFlight: "2022",
          timeline: "Digital Age",
          type: "Long-range narrowbody airliner",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "The A321XLR extends narrowbody reach into transatlantic and thin long-haul missions that used to require larger widebodies."
        },
        {
          id: "airbus-a330-300",
          name: "A330-300",
          firstFlight: "1992",
          timeline: "Jet Age",
          type: "Widebody airliner",
          class: "Commercial Jet",
          programState: "Long-running program",
          overview: "The A330-300 has been a flexible widebody for medium and long-haul operations, cargo conversion, and high-density routes."
        },
        {
          id: "airbus-a330neo",
          name: "A330-900neo",
          firstFlight: "2017",
          timeline: "Digital Age",
          type: "Updated widebody airliner",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "The A330neo refreshes a familiar widebody platform with newer engines, aerodynamic improvements, and better fuel efficiency."
        },
        {
          id: "airbus-a340-600",
          name: "A340-600",
          firstFlight: "2001",
          timeline: "Digital Age",
          type: "Long-range four-engine airliner",
          class: "Commercial Jet",
          programState: "Legacy icon",
          overview: "The A340-600 represented Airbus's long-haul four-engine era before very large twinjets took over much of that market."
        },
        {
          id: "airbus-a350-900",
          name: "A350-900",
          firstFlight: "2013",
          timeline: "Digital Age",
          type: "Widebody airliner",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "The A350-900 blends composites, advanced systems, and long-range economics into one of Airbus's flagship aircraft."
        },
        {
          id: "airbus-a350-1000",
          name: "A350-1000",
          firstFlight: "2016",
          timeline: "Digital Age",
          type: "Widebody airliner",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "The stretched A350-1000 serves high-capacity long-haul missions with strong range and efficiency."
        },
        {
          id: "airbus-a380",
          name: "A380",
          firstFlight: "2005",
          timeline: "Digital Age",
          type: "Very large airliner",
          class: "Commercial Jet",
          programState: "Modern icon",
          overview: "The A380 became aviation's best-known double-deck passenger jet and a symbol of the hub-and-spoke era."
        },
        {
          id: "airbus-belugaxl",
          name: "BelugaXL",
          firstFlight: "2018",
          timeline: "Digital Age",
          type: "Oversize cargo transport",
          class: "Commercial Jet",
          programState: "Specialized fleet",
          overview: "The BelugaXL is Airbus's unmistakable internal logistics aircraft, built to carry large fuselage and wing sections between factories."
        }
      ]
    },
    {
      id: "boeing",
      name: "Boeing",
      country: "United States",
      founded: "1916",
      status: "Active",
      category: "Commercial Airliner",
      aircraftFocus: ["Commercial Jet", "Cargo", "Widebody"],
      summary: "Boeing spans early aviation history through the modern jetliner era and remains one of the defining names in global aerospace.",
      aircraft: [
        {
          id: "boeing-707",
          name: "707",
          firstFlight: "1957",
          timeline: "Jet Age",
          type: "Early jet airliner",
          class: "Commercial Jet",
          programState: "Historic icon",
          overview: "The 707 helped turn jet travel into a practical global airline model and established Boeing as a jetliner giant."
        },
        {
          id: "boeing-727",
          name: "727",
          firstFlight: "1963",
          timeline: "Jet Age",
          type: "Trijet narrowbody airliner",
          class: "Commercial Jet",
          programState: "Historic icon",
          overview: "The 727 became one of the most recognizable short-to-medium-haul jets of the classic airliner era."
        },
        {
          id: "boeing-737-800",
          name: "737-800",
          firstFlight: "1997",
          timeline: "Digital Age",
          type: "Narrowbody airliner",
          class: "Commercial Jet",
          programState: "Global airline staple",
          overview: "The 737-800 became one of the most widely used airline aircraft in the world thanks to its size and route flexibility."
        },
        {
          id: "boeing-737-max",
          name: "737 MAX 8",
          firstFlight: "2016",
          timeline: "Digital Age",
          type: "Updated narrowbody airliner",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "The 737 MAX continues Boeing's long-running narrowbody line with updated engines and revised systems."
        },
        {
          id: "boeing-747-400",
          name: "747-400",
          firstFlight: "1988",
          timeline: "Jet Age",
          type: "Widebody jumbo jet",
          class: "Commercial Jet",
          programState: "Historic icon",
          overview: "The 747-400 became one of the most famous long-haul aircraft ever built and defined the image of intercontinental travel."
        },
        {
          id: "boeing-747-8f",
          name: "747-8 Freighter",
          firstFlight: "2010",
          timeline: "Digital Age",
          type: "Widebody cargo aircraft",
          class: "Commercial Jet",
          programState: "Cargo flagship",
          overview: "The 747-8F carried Boeing's jumbo concept into the modern cargo world with updated aerodynamics and higher efficiency."
        },
        {
          id: "boeing-757-200",
          name: "757-200",
          firstFlight: "1982",
          timeline: "Jet Age",
          type: "Medium-range narrowbody airliner",
          class: "Commercial Jet",
          programState: "Legacy icon",
          overview: "The 757 combined strong runway performance and useful range, earning a loyal following among airlines and passengers."
        },
        {
          id: "boeing-767-300f",
          name: "767-300 Freighter",
          firstFlight: "1995 freighter line",
          timeline: "Digital Age",
          type: "Widebody cargo aircraft",
          class: "Commercial Jet",
          programState: "Current cargo line",
          overview: "The 767 freighter remains highly relevant in cargo networks and has become one of the most important mid-size freight aircraft."
        },
        {
          id: "boeing-777-300er",
          name: "777-300ER",
          firstFlight: "2003",
          timeline: "Digital Age",
          type: "Long-range widebody airliner",
          class: "Commercial Jet",
          programState: "Long-haul icon",
          overview: "The 777-300ER dominated premium long-haul airline planning for years with range, payload, and twin-engine efficiency."
        },
        {
          id: "boeing-777-9",
          name: "777-9",
          firstFlight: "2020",
          timeline: "Next Horizon",
          type: "Next-generation widebody airliner",
          class: "Commercial Jet",
          programState: "Advanced development",
          overview: "The 777-9 represents the next step in Boeing's large twinjet strategy, blending folding wingtips and updated long-range efficiency."
        },
        {
          id: "boeing-787-8",
          name: "787-8 Dreamliner",
          firstFlight: "2009",
          timeline: "Digital Age",
          type: "Widebody airliner",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "The 787-8 launched Boeing's composite long-haul family and helped normalize thinner point-to-point long-distance routes."
        },
        {
          id: "boeing-787-9",
          name: "787-9 Dreamliner",
          firstFlight: "2013",
          timeline: "Digital Age",
          type: "Widebody airliner",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "The 787-9 became one of Boeing's most important widebodies by pairing long range with strong airline economics."
        },
        {
          id: "boeing-787-10",
          name: "787-10 Dreamliner",
          firstFlight: "2017",
          timeline: "Digital Age",
          type: "Stretched widebody airliner",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "The 787-10 stretches the Dreamliner concept toward higher capacity while staying focused on efficient medium and long-haul work."
        },
        {
          id: "boeing-p8",
          name: "P-8 Poseidon",
          firstFlight: "2009",
          timeline: "Digital Age",
          type: "Maritime patrol aircraft",
          class: "ISR",
          programState: "Current military derivative",
          overview: "The P-8 shows how Boeing's commercial jet platforms can be adapted into advanced defense and surveillance roles."
        }
      ]
    },
    {
      id: "embraer",
      name: "Embraer",
      country: "Brazil",
      founded: "1969",
      status: "Active",
      category: "Regional & Utility",
      aircraftFocus: ["Commercial Jet", "Regional jet", "Military Transport"],
      summary: "Embraer blends regional jet leadership with business aviation and defense programs, giving it one of the broadest portfolios in aerospace.",
      aircraft: [
        {
          id: "embraer-bandeirante",
          name: "EMB 110 Bandeirante",
          firstFlight: "1968",
          timeline: "Jet Age",
          type: "Twin turboprop regional aircraft",
          class: "Regional Turboprop",
          programState: "Historic regional aircraft",
          overview: "The Bandeirante helped establish Embraer and became an early regional workhorse."
        },
        {
          id: "embraer-erj145",
          name: "ERJ 145",
          firstFlight: "1995",
          timeline: "Digital Age",
          type: "Regional jet",
          class: "Commercial Jet",
          programState: "Historic regional jet",
          overview: "The ERJ 145 became one of the best-known 50-seat regional jets and a familiar sight worldwide."
        },
        {
          id: "embraer-e170",
          name: "E170",
          firstFlight: "2002",
          timeline: "Digital Age",
          type: "Regional jet",
          class: "Commercial Jet",
          programState: "E-Jet family program",
          overview: "The E170 launched the first-generation E-Jet family with a comfortable cabin and efficient short-haul performance."
        },
        {
          id: "embraer-e175",
          name: "E175",
          firstFlight: "2003",
          timeline: "Digital Age",
          type: "Regional jet",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "The E175 became a staple of regional airline fleets thanks to its cabin comfort, economics, and network flexibility."
        },
        {
          id: "embraer-e190",
          name: "E190",
          firstFlight: "2004",
          timeline: "Digital Age",
          type: "Small mainline jet",
          class: "Commercial Jet",
          programState: "Current family line",
          overview: "The E190 moved Embraer further upmarket into mainline routes that needed less capacity than larger narrowbodies."
        },
        {
          id: "embraer-e195-e2",
          name: "E195-E2",
          firstFlight: "2017",
          timeline: "Digital Age",
          type: "Regional jet / small mainline jet",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "The E2 generation modernized Embraer's commercial family with new wings, engines, and improved operating efficiency."
        },
        {
          id: "embraer-kc390",
          name: "KC-390 Millennium",
          firstFlight: "2015",
          timeline: "Digital Age",
          type: "Tactical transport / tanker",
          class: "Military Transport",
          programState: "Current program",
          overview: "The KC-390 extends Embraer into defense airlift with jet speed, multi-role flexibility, and cargo handling capability."
        },
        {
          id: "embraer-super-tucano",
          name: "A-29 Super Tucano",
          firstFlight: "1999",
          timeline: "Digital Age",
          type: "Turboprop light attack and trainer",
          class: "Trainer",
          programState: "Current program",
          overview: "The Super Tucano is one of Embraer's most successful military aircraft, widely used for training and light attack missions."
        }
      ]
    },
    {
      id: "comac",
      name: "COMAC",
      country: "China",
      founded: "2008",
      status: "Active",
      category: "Commercial Airliner",
      aircraftFocus: ["Commercial Jet", "Regional jet", "Narrowbody"],
      summary: "COMAC is China's flagship airliner manufacturer and a central player in the country's long-term commercial aviation ambitions.",
      aircraft: [
        {
          id: "comac-c909",
          name: "C909",
          firstFlight: "2008",
          timeline: "Digital Age",
          type: "Regional jet",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "Originally launched as the ARJ21, the C909 serves regional jet routes and built COMAC's early certification and airline experience."
        },
        {
          id: "comac-c919",
          name: "C919",
          firstFlight: "2017",
          timeline: "Digital Age",
          type: "Narrowbody airliner",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "The C919 is COMAC's mainline narrowbody program aimed at the single-aisle market long dominated by Airbus and Boeing."
        },
        {
          id: "comac-c929",
          name: "C929",
          firstFlight: "Future",
          timeline: "Next Horizon",
          type: "Widebody airliner",
          class: "Experimental",
          programState: "Future direction",
          overview: "The C929 reflects COMAC's long-range ambition to expand from narrowbodies into intercontinental widebody design."
        }
      ]
    },
    {
      id: "atr",
      name: "ATR",
      country: "France / Italy",
      founded: "1981",
      status: "Active",
      category: "Regional & Utility",
      aircraftFocus: ["Regional Turboprop", "Short-haul", "Commuter"],
      summary: "ATR focuses on fuel-efficient regional turboprops tailored for short sectors, small airports, and airline connectivity.",
      aircraft: [
        {
          id: "atr-42-600",
          name: "ATR 42-600",
          firstFlight: "2010",
          timeline: "Digital Age",
          type: "Regional turboprop",
          class: "Regional Turboprop",
          programState: "Current program",
          overview: "The ATR 42-600 is designed for lower-demand routes, flexible passenger layouts, and strong short-runway utility."
        },
        {
          id: "atr-72-600",
          name: "ATR 72-600",
          firstFlight: "2009",
          timeline: "Digital Age",
          type: "Regional turboprop",
          class: "Regional Turboprop",
          programState: "Current program",
          overview: "ATR's 72-seat flagship is a workhorse on regional networks where low fuel burn and field performance matter most."
        },
        {
          id: "atr-evo",
          name: "ATR EVO",
          firstFlight: "2030s",
          timeline: "Next Horizon",
          type: "Next-generation regional turboprop",
          class: "Experimental",
          programState: "Future direction",
          overview: "ATR EVO represents the company's future-facing path toward hybridized systems, lower emissions, and updated regional operations."
        }
      ]
    },
    {
      id: "bombardier",
      name: "Bombardier",
      country: "Canada",
      founded: "1942",
      status: "Active",
      category: "Business & General Aviation",
      aircraftFocus: ["Business Jet", "Regional jet", "Long-range"],
      summary: "Bombardier evolved from regional airliners into a business-jet specialist known for long-range cabins and premium corporate aircraft.",
      aircraft: [
        {
          id: "bombardier-crj200",
          name: "CRJ200",
          firstFlight: "1991",
          timeline: "Digital Age",
          type: "Regional jet",
          class: "Commercial Jet",
          programState: "Historic regional jet",
          overview: "The CRJ200 became one of the classic small regional jets and was central to high-frequency feeder flying."
        },
        {
          id: "bombardier-crj900",
          name: "CRJ900",
          firstFlight: "2001",
          timeline: "Digital Age",
          type: "Regional jet",
          class: "Commercial Jet",
          programState: "Legacy icon",
          overview: "The CRJ900 became one of the best-known regional jet variants, helping shape high-frequency short-haul networks."
        },
        {
          id: "bombardier-q400",
          name: "Dash 8 Q400",
          firstFlight: "1998",
          timeline: "Digital Age",
          type: "Regional turboprop",
          class: "Regional Turboprop",
          programState: "Historic family member",
          overview: "The Q400 offered turboprop efficiency with higher speed and remains a highly recognizable regional aircraft."
        },
        {
          id: "bombardier-challenger-3500",
          name: "Challenger 3500",
          firstFlight: "2021 generation",
          timeline: "Next Horizon",
          type: "Super-midsize business jet",
          class: "Business Jet",
          programState: "Current generation",
          overview: "The Challenger 3500 keeps Bombardier highly visible in the super-midsize corporate market."
        },
        {
          id: "bombardier-global-7500",
          name: "Global 7500",
          firstFlight: "2016",
          timeline: "Digital Age",
          type: "Ultra-long-range business jet",
          class: "Business Jet",
          programState: "Current program",
          overview: "Bombardier positioned the Global 7500 at the top end of business aviation with exceptional range and a four-zone cabin."
        }
      ]
    },
    {
      id: "cessna",
      name: "Cessna",
      country: "United States",
      founded: "1927",
      status: "Active",
      category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Trainer", "Business Jet"],
      summary: "Cessna is one of the most recognized general aviation names, spanning primary trainers, utility aircraft, and business jets.",
      aircraft: [
        {
          id: "cessna-152",
          name: "152",
          firstFlight: "1977",
          timeline: "Jet Age",
          type: "Primary trainer",
          class: "Trainer",
          programState: "Historic training icon",
          overview: "The Cessna 152 trained huge numbers of pilots and remains one of the most familiar light trainers ever built."
        },
        {
          id: "cessna-172",
          name: "172 Skyhawk",
          firstFlight: "1955",
          timeline: "Jet Age",
          type: "Piston trainer / touring aircraft",
          class: "General Aviation",
          programState: "Current program",
          overview: "The Skyhawk became a worldwide standard for pilot training thanks to its approachable handling and huge support network."
        },
        {
          id: "cessna-182",
          name: "182 Skylane",
          firstFlight: "1956",
          timeline: "Jet Age",
          type: "Touring piston single",
          class: "General Aviation",
          programState: "Long-running aircraft",
          overview: "The Skylane is a classic Cessna step-up aircraft for owners who want more load, speed, and traveling flexibility."
        },
        {
          id: "cessna-caravan",
          name: "208 Caravan",
          firstFlight: "1982",
          timeline: "Jet Age",
          type: "Utility turboprop",
          class: "General Aviation",
          programState: "Current program",
          overview: "The Caravan is a versatile single-engine turboprop used for passengers, cargo, bush operations, and special missions."
        },
        {
          id: "cessna-cj4-gen2",
          name: "Citation CJ4 Gen2",
          firstFlight: "2009 lineage",
          timeline: "Digital Age",
          type: "Light business jet",
          class: "Business Jet",
          programState: "Current program",
          overview: "The CJ4 line keeps Cessna strong in owner-flown and corporate light-jet operations."
        },
        {
          id: "cessna-latitude",
          name: "Citation Latitude",
          firstFlight: "2014",
          timeline: "Digital Age",
          type: "Midsize business jet",
          class: "Business Jet",
          programState: "Current program",
          overview: "The Citation Latitude helped Cessna move further into the midsize business jet market with a stand-up cabin."
        },
        {
          id: "cessna-longitude",
          name: "Citation Longitude",
          firstFlight: "2016",
          timeline: "Digital Age",
          type: "Super-midsize business jet",
          class: "Business Jet",
          programState: "Current program",
          overview: "The Citation Longitude adds long-range corporate capability to Cessna's long-running business jet family."
        }
      ]
    },
    {
      id: "beechcraft",
      name: "Beechcraft",
      country: "United States",
      founded: "1932",
      status: "Active",
      category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Turboprop", "Trainer"],
      summary: "Beechcraft blends classic personal aircraft with durable turboprops and military training platforms.",
      aircraft: [
        {
          id: "beechcraft-bonanza",
          name: "Bonanza G36",
          firstFlight: "1947 lineage",
          timeline: "Jet Age",
          type: "Piston single",
          class: "General Aviation",
          programState: "Current program",
          overview: "The Bonanza is one of general aviation's longest-running nameplates, known for speed, range, and owner-flown utility."
        },
        {
          id: "beechcraft-baron",
          name: "Baron G58",
          firstFlight: "1969 lineage",
          timeline: "Jet Age",
          type: "Twin-engine piston aircraft",
          class: "General Aviation",
          programState: "Current program",
          overview: "The Baron remains a famous piston twin for training, travel, and utility operations."
        },
        {
          id: "beechcraft-king-air-260",
          name: "King Air 260",
          firstFlight: "2020 generation",
          timeline: "Next Horizon",
          type: "Twin turboprop",
          class: "General Aviation",
          programState: "Current generation",
          overview: "The King Air 260 keeps Beechcraft visible in high-end turboprop travel and utility operations."
        },
        {
          id: "beechcraft-king-air-360",
          name: "King Air 360",
          firstFlight: "2020",
          timeline: "Digital Age",
          type: "Twin turboprop",
          class: "General Aviation",
          programState: "Current program",
          overview: "The King Air line remains a benchmark for flexible turboprop missions, from corporate travel to medevac and surveillance."
        },
        {
          id: "beechcraft-t6c",
          name: "T-6C Texan II",
          firstFlight: "1998",
          timeline: "Digital Age",
          type: "Military trainer",
          class: "Trainer",
          programState: "Current program",
          overview: "The T-6C serves as a primary and basic military trainer for air forces that need a modern cockpit training environment."
        }
      ]
    },
    {
      id: "piper",
      name: "Piper",
      country: "United States",
      founded: "1937",
      status: "Active",
      category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Trainer", "Personal aircraft"],
      summary: "Piper is a foundational general aviation brand with training aircraft, touring singles, and modern personal transport models.",
      aircraft: [
        {
          id: "piper-j3",
          name: "J-3 Cub",
          firstFlight: "1938",
          timeline: "Foundational",
          type: "Classic light aircraft",
          class: "General Aviation",
          programState: "Historic icon",
          overview: "The J-3 Cub became one of aviation's most famous grassroots airplanes and helped define personal flying."
        },
        {
          id: "piper-archer-lx",
          name: "Archer LX",
          firstFlight: "1960s lineage",
          timeline: "Jet Age",
          type: "Training / touring piston single",
          class: "General Aviation",
          programState: "Current program",
          overview: "The Archer remains a favorite at flight schools and clubs for straightforward handling and dependable cross-country capability."
        },
        {
          id: "piper-seminole",
          name: "Seminole",
          firstFlight: "1978",
          timeline: "Jet Age",
          type: "Twin-engine trainer",
          class: "Trainer",
          programState: "Current program",
          overview: "The Seminole is a famous multi-engine training aircraft used by many flight schools around the world."
        },
        {
          id: "piper-m350",
          name: "M350",
          firstFlight: "Current lineage",
          timeline: "Digital Age",
          type: "Pressurized piston single",
          class: "General Aviation",
          programState: "Current program",
          overview: "The M350 keeps the high-performance pressurized personal aircraft concept alive in Piper's lineup."
        },
        {
          id: "piper-m600-sls",
          name: "M600/SLS",
          firstFlight: "2015",
          timeline: "Digital Age",
          type: "Pressurized single-engine turboprop",
          class: "General Aviation",
          programState: "Current program",
          overview: "The M600/SLS brought high-performance personal flying together with advanced automation and safety systems."
        },
        {
          id: "piper-m700-fury",
          name: "M700 Fury",
          firstFlight: "2024",
          timeline: "Next Horizon",
          type: "High-performance personal turboprop",
          class: "Experimental",
          programState: "Current direction",
          overview: "The M700 Fury pushes Piper's personal turboprop concept toward higher speed and a more premium owner-flown mission."
        }
      ]
    },
    {
      id: "cirrus",
      name: "Cirrus",
      country: "United States",
      founded: "1984",
      status: "Active",
      category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Composite piston", "Personal jet"],
      summary: "Cirrus helped redefine owner-flown aircraft with composite construction, glass cockpits, and whole-aircraft parachute systems.",
      aircraft: [
        {
          id: "cirrus-sr20",
          name: "SR20",
          firstFlight: "1995",
          timeline: "Digital Age",
          type: "Composite piston single",
          class: "General Aviation",
          programState: "Current program",
          overview: "The SR20 introduced Cirrus's signature blend of modern avionics, composite aerodynamics, and parachute-based safety thinking."
        },
        {
          id: "cirrus-sr22t",
          name: "SR22T",
          firstFlight: "2010",
          timeline: "Digital Age",
          type: "Turbocharged piston single",
          class: "General Aviation",
          programState: "Current program",
          overview: "The SR22T became a premium personal aircraft for fast cross-country travel with advanced cockpit integration."
        },
        {
          id: "cirrus-vision-jet",
          name: "Vision Jet",
          firstFlight: "2008",
          timeline: "Digital Age",
          type: "Single-engine personal jet",
          class: "Business Jet",
          programState: "Current program",
          overview: "The Vision Jet carved out a new niche between piston singles and traditional business jets for private owners and small operators."
        }
      ]
    },
    {
      id: "gulfstream",
      name: "Gulfstream",
      country: "United States",
      founded: "1958",
      status: "Active",
      category: "Business & General Aviation",
      aircraftFocus: ["Business Jet", "Long-range", "Special mission"],
      summary: "Gulfstream sits at the premium end of business aviation, with long-range cabins and special mission variants derived from corporate platforms.",
      aircraft: [
        {
          id: "gulfstream-g280",
          name: "G280",
          firstFlight: "2009",
          timeline: "Digital Age",
          type: "Super-midsize business jet",
          class: "Business Jet",
          programState: "Current program",
          overview: "The G280 balances runway performance, cabin refinement, and transcontinental reach in the super-midsize segment."
        },
        {
          id: "gulfstream-g500",
          name: "G500",
          firstFlight: "2015",
          timeline: "Digital Age",
          type: "Long-range business jet",
          class: "Business Jet",
          programState: "Current program",
          overview: "The G500 helped introduce Gulfstream's newer symmetric flight deck and a fresh large-cabin generation."
        },
        {
          id: "gulfstream-g650er",
          name: "G650ER",
          firstFlight: "2014 variant",
          timeline: "Digital Age",
          type: "Ultra-long-range business jet",
          class: "Business Jet",
          programState: "Flagship icon",
          overview: "The G650ER became one of the defining ultra-long-range business jets of the modern era."
        },
        {
          id: "gulfstream-g700",
          name: "G700",
          firstFlight: "2020",
          timeline: "Next Horizon",
          type: "Ultra-long-range business jet",
          class: "Business Jet",
          programState: "Current generation",
          overview: "The G700 expands Gulfstream's top-end offering with a large cabin, advanced flight deck, and long-range mission profile."
        },
        {
          id: "gulfstream-g800",
          name: "G800",
          firstFlight: "2022",
          timeline: "Next Horizon",
          type: "Ultra-long-range business jet",
          class: "Business Jet",
          programState: "Current generation",
          overview: "The G800 emphasizes maximum range, giving operators a flagship option aimed at the most demanding intercontinental routes."
        }
      ]
    },
    {
      id: "pilatus",
      name: "Pilatus",
      country: "Switzerland",
      founded: "1939",
      status: "Active",
      category: "Business & General Aviation",
      aircraftFocus: ["Utility turboprop", "Business Jet", "Trainer"],
      summary: "Pilatus bridges rugged utility flying and executive travel with aircraft that are efficient, distinctive, and highly adaptable.",
      aircraft: [
        {
          id: "pilatus-pc12-ngx",
          name: "PC-12 NGX",
          firstFlight: "2019 variant",
          timeline: "Digital Age",
          type: "Single-engine utility turboprop",
          class: "General Aviation",
          programState: "Current program",
          overview: "The PC-12 NGX continues Pilatus's single-engine utility formula with executive comfort and impressive field flexibility."
        },
        {
          id: "pilatus-pc24",
          name: "PC-24",
          firstFlight: "2015",
          timeline: "Digital Age",
          type: "Light business jet",
          class: "Business Jet",
          programState: "Current program",
          overview: "Pilatus markets the PC-24 as a practical jet that can use shorter runways and support mixed passenger-cargo missions."
        },
        {
          id: "pilatus-pc21",
          name: "PC-21",
          firstFlight: "2002",
          timeline: "Digital Age",
          type: "Advanced trainer",
          class: "Trainer",
          programState: "Current program",
          overview: "The PC-21 uses performance, avionics, and mission simulation to narrow the gap between basic training and frontline jets."
        }
      ]
    },
    {
      id: "lockheed-martin",
      name: "Lockheed Martin",
      country: "United States",
      founded: "1995",
      status: "Active",
      category: "Military & Defense",
      aircraftFocus: ["Fighter", "Military Transport", "Special mission"],
      summary: "Lockheed Martin builds some of the best-known combat and airlift aircraft in the world, spanning tactical fighters to heavy logistics.",
      aircraft: [
        {
          id: "lockheed-f16v",
          name: "F-16V",
          firstFlight: "1974 lineage",
          timeline: "Jet Age",
          type: "Multirole fighter",
          class: "Fighter",
          programState: "Current upgrade line",
          overview: "The F-16 remains one of the most widespread fighters globally, with the V-standard bringing modern sensors and avionics."
        },
        {
          id: "lockheed-f22",
          name: "F-22 Raptor",
          firstFlight: "1997",
          timeline: "Digital Age",
          type: "Stealth air superiority fighter",
          class: "Fighter",
          programState: "Modern icon",
          overview: "The F-22 became a benchmark stealth fighter focused on air dominance, speed, and supercruise."
        },
        {
          id: "lockheed-f35a",
          name: "F-35A Lightning II",
          firstFlight: "2006",
          timeline: "Digital Age",
          type: "Stealth multirole fighter",
          class: "Fighter",
          programState: "Current program",
          overview: "The F-35 centers on sensor fusion, stealth, and shared mission systems across allied air forces."
        },
        {
          id: "lockheed-f35b",
          name: "F-35B Lightning II",
          firstFlight: "2008",
          timeline: "Digital Age",
          type: "STOVL stealth fighter",
          class: "Fighter",
          programState: "Current program",
          overview: "The F-35B adds short takeoff and vertical landing flexibility to the Joint Strike Fighter family."
        },
        {
          id: "lockheed-f35c",
          name: "F-35C Lightning II",
          firstFlight: "2010",
          timeline: "Digital Age",
          type: "Carrier-based stealth fighter",
          class: "Fighter",
          programState: "Current program",
          overview: "The F-35C adapts the family to catapult-launch carrier operations with larger wings and navalized structure."
        },
        {
          id: "lockheed-c130j",
          name: "C-130J Super Hercules",
          firstFlight: "1996",
          timeline: "Digital Age",
          type: "Tactical airlifter",
          class: "Military Transport",
          programState: "Current program",
          overview: "The C-130J modernizes a classic airlift platform with updated avionics, engines, and broad special mission adaptability."
        }
      ]
    },
    {
      id: "northrop-grumman",
      name: "Northrop Grumman",
      country: "United States",
      founded: "1994",
      status: "Active",
      category: "Military & Defense",
      aircraftFocus: ["Stealth bomber", "ISR", "Carrier support"],
      summary: "Northrop Grumman is heavily associated with stealth design, airborne surveillance, and large high-end defense systems.",
      aircraft: [
        {
          id: "northrop-b2",
          name: "B-2 Spirit",
          firstFlight: "1989",
          timeline: "Jet Age",
          type: "Stealth bomber",
          class: "Military Transport",
          programState: "Strategic icon",
          overview: "The B-2 became one of the most visually distinctive aircraft ever built and a symbol of stealth bomber design."
        },
        {
          id: "northrop-b21",
          name: "B-21 Raider",
          firstFlight: "2020s",
          timeline: "Next Horizon",
          type: "Stealth bomber",
          class: "Experimental",
          programState: "Current generation",
          overview: "The B-21 represents the United States' next major stealth bomber, focused on long-range penetration and future adaptability."
        },
        {
          id: "northrop-e2d",
          name: "E-2D Advanced Hawkeye",
          firstFlight: "2007",
          timeline: "Digital Age",
          type: "Carrier-based airborne early warning aircraft",
          class: "ISR",
          programState: "Current program",
          overview: "The E-2D provides fleet-level radar coverage, battle management, and persistent airborne sensing for naval operations."
        },
        {
          id: "northrop-mq4c",
          name: "MQ-4C Triton",
          firstFlight: "2013",
          timeline: "Digital Age",
          type: "High-altitude surveillance aircraft",
          class: "ISR",
          programState: "Current program",
          overview: "The MQ-4C extends long-endurance maritime surveillance with broad-area sensors and high-altitude persistence."
        }
      ]
    },
    {
      id: "dassault",
      name: "Dassault Aviation",
      country: "France",
      founded: "1929",
      status: "Active",
      category: "Military & Defense",
      aircraftFocus: ["Fighter", "Business Jet", "Special mission"],
      summary: "Dassault pairs combat-aircraft heritage with a high-end Falcon business-jet family, making it unusually balanced across civil and military sectors.",
      aircraft: [
        {
          id: "dassault-mirage2000",
          name: "Mirage 2000",
          firstFlight: "1978",
          timeline: "Jet Age",
          type: "Multirole fighter",
          class: "Fighter",
          programState: "Classic fighter line",
          overview: "The Mirage 2000 became one of Dassault's most recognizable export fighters and a signature delta-wing aircraft."
        },
        {
          id: "dassault-rafale-f4",
          name: "Rafale F4",
          firstFlight: "1986 lineage",
          timeline: "Digital Age",
          type: "Omnirole fighter",
          class: "Fighter",
          programState: "Current program",
          overview: "The Rafale blends air-to-air, strike, and naval capability with continual sensor and software modernization."
        },
        {
          id: "dassault-falcon-8x",
          name: "Falcon 8X",
          firstFlight: "2015",
          timeline: "Digital Age",
          type: "Long-range business jet",
          class: "Business Jet",
          programState: "Current program",
          overview: "The Falcon 8X combines intercontinental reach with tri-jet flexibility and an efficient premium cabin layout."
        },
        {
          id: "dassault-falcon-10x",
          name: "Falcon 10X",
          firstFlight: "Next generation",
          timeline: "Next Horizon",
          type: "Ultra-long-range business jet",
          class: "Business Jet",
          programState: "Advanced development",
          overview: "The Falcon 10X is intended to move Dassault further into the flagship business-jet segment with a very large cabin."
        }
      ]
    },
    {
      id: "saab",
      name: "Saab",
      country: "Sweden",
      founded: "1937",
      status: "Active",
      category: "Military & Defense",
      aircraftFocus: ["Fighter", "ISR", "Special mission"],
      summary: "Saab is best known for agile fighters and adaptable special mission aircraft tailored for efficient national defense and export markets.",
      aircraft: [
        {
          id: "saab-gripen-e",
          name: "Gripen E",
          firstFlight: "2017",
          timeline: "Digital Age",
          type: "Multirole fighter",
          class: "Fighter",
          programState: "Current program",
          overview: "Gripen E emphasizes sensor integration, dispersed operations, and cost-conscious multirole capability."
        },
        {
          id: "saab-globaleye",
          name: "GlobalEye",
          firstFlight: "2018",
          timeline: "Digital Age",
          type: "Airborne early warning and surveillance aircraft",
          class: "ISR",
          programState: "Current program",
          overview: "GlobalEye turns a business-jet platform into a long-endurance multi-domain surveillance node."
        },
        {
          id: "saab-340-aew",
          name: "Saab 340 AEW&C",
          firstFlight: "1983 lineage",
          timeline: "Jet Age",
          type: "Regional surveillance aircraft",
          class: "ISR",
          programState: "Current mission family",
          overview: "The Saab 340 has served both airline and surveillance roles, showing the company's talent for adaptable platforms."
        }
      ]
    },
    {
      id: "sukhoi",
      name: "Sukhoi",
      country: "Russia",
      founded: "1939",
      status: "Active",
      category: "Military & Defense",
      aircraftFocus: ["Fighter", "Air superiority", "Stealth"],
      summary: "Sukhoi is associated with powerful high-performance fighters that have been central to Russian tactical aviation and exports.",
      aircraft: [
        {
          id: "sukhoi-superjet100",
          name: "Superjet 100",
          firstFlight: "2008",
          timeline: "Digital Age",
          type: "Regional jet",
          class: "Commercial Jet",
          programState: "Civil program",
          overview: "The Superjet 100 gave Sukhoi a civilian regional-jet presence beyond its fighter legacy."
        },
        {
          id: "sukhoi-su27",
          name: "Su-27",
          firstFlight: "1977",
          timeline: "Jet Age",
          type: "Air superiority fighter",
          class: "Fighter",
          programState: "Historic icon",
          overview: "The Su-27 established the Flanker family and became one of the most famous Soviet fighter designs."
        },
        {
          id: "sukhoi-su30sm2",
          name: "Su-30SM2",
          firstFlight: "1990s lineage",
          timeline: "Digital Age",
          type: "Multirole fighter",
          class: "Fighter",
          programState: "Current program",
          overview: "The Su-30SM2 continues the versatile Flanker family with long range, payload, and two-seat mission flexibility."
        },
        {
          id: "sukhoi-su35s",
          name: "Su-35S",
          firstFlight: "2008",
          timeline: "Digital Age",
          type: "Air superiority fighter",
          class: "Fighter",
          programState: "Current program",
          overview: "The Su-35S refines the Flanker line with advanced maneuverability, sensor upgrades, and strong range performance."
        },
        {
          id: "sukhoi-su57",
          name: "Su-57",
          firstFlight: "2010",
          timeline: "Next Horizon",
          type: "Stealth fighter",
          class: "Fighter",
          programState: "Current generation",
          overview: "The Su-57 represents Sukhoi's move into lower-observable fighter design and next-generation mission systems."
        }
      ]
    },
    {
      id: "antonov",
      name: "Antonov",
      country: "Ukraine",
      founded: "1946",
      status: "Active / disrupted",
      category: "Regional & Utility",
      aircraftFocus: ["Military Transport", "Heavy lift", "Regional transport"],
      summary: "Antonov became legendary for outsized cargo airlifters and practical transport aircraft able to operate in difficult conditions.",
      aircraft: [
        {
          id: "antonov-an124",
          name: "An-124 Ruslan",
          firstFlight: "1982",
          timeline: "Jet Age",
          type: "Strategic heavy transport",
          class: "Military Transport",
          programState: "Legacy icon",
          overview: "The An-124 is one of the largest cargo aircraft ever built and a symbol of Antonov's heavy-lift design philosophy."
        },
        {
          id: "antonov-an148",
          name: "An-148",
          firstFlight: "2004",
          timeline: "Digital Age",
          type: "Regional jet",
          class: "Commercial Jet",
          programState: "Regional program",
          overview: "The An-148 served short and medium routes with a design aimed at flexible infrastructure and harsh-weather operation."
        },
        {
          id: "antonov-an225",
          name: "An-225 Mriya",
          firstFlight: "1988",
          timeline: "Jet Age",
          type: "Ultra-heavy cargo aircraft",
          class: "Military Transport",
          programState: "Historic icon",
          overview: "The An-225 became one of aviation's most iconic aircraft thanks to its unmatched size and oversize cargo role."
        }
      ]
    },
    {
      id: "mcdonnell-douglas",
      name: "McDonnell Douglas",
      country: "United States",
      founded: "1967",
      status: "Historic",
      category: "Commercial Airliner",
      aircraftFocus: ["Commercial Jet", "Trijet", "Military aircraft"],
      summary: "McDonnell Douglas produced some of the most famous late-20th-century airliners and military jets before merging into Boeing.",
      aircraft: [
        {
          id: "mdd-dc10",
          name: "DC-10",
          firstFlight: "1970",
          timeline: "Jet Age",
          type: "Widebody trijet airliner",
          class: "Commercial Jet",
          programState: "Historic icon",
          overview: "The DC-10 became one of the signature trijets of long-haul travel and cargo flying."
        },
        {
          id: "mdd-md11",
          name: "MD-11",
          firstFlight: "1990",
          timeline: "Digital Age",
          type: "Widebody trijet airliner and freighter",
          class: "Commercial Jet",
          programState: "Cargo icon",
          overview: "The MD-11 found a second life in cargo networks and remains a memorable final major trijet."
        },
        {
          id: "mdd-md80",
          name: "MD-80",
          firstFlight: "1979",
          timeline: "Jet Age",
          type: "Rear-engined narrowbody airliner",
          class: "Commercial Jet",
          programState: "Historic airline staple",
          overview: "The MD-80 family was a short-haul workhorse and a familiar sound and shape at airports for decades."
        },
        {
          id: "mdd-md95",
          name: "MD-95 / Boeing 717",
          firstFlight: "1998",
          timeline: "Digital Age",
          type: "Short-haul narrowbody airliner",
          class: "Commercial Jet",
          programState: "Transition aircraft",
          overview: "The MD-95 evolved into the Boeing 717 and bridged McDonnell Douglas history into the Boeing era."
        }
      ]
    },
    {
      id: "dehavilland-canada",
      name: "De Havilland Canada",
      country: "Canada",
      founded: "1928",
      status: "Active",
      category: "Regional & Utility",
      aircraftFocus: ["Regional Turboprop", "STOL utility", "Firefighting"],
      summary: "De Havilland Canada is famous for rugged utility aircraft and regional turboprops designed for demanding environments.",
      aircraft: [
        {
          id: "dhc-twin-otter",
          name: "DHC-6 Twin Otter",
          firstFlight: "1965",
          timeline: "Jet Age",
          type: "STOL utility aircraft",
          class: "General Aviation",
          programState: "Current program",
          overview: "The Twin Otter is valued for short takeoff performance, remote operations, and dependable service on land, skis, or floats."
        },
        {
          id: "dhc-dash-8-400",
          name: "Dash 8-400",
          firstFlight: "1998",
          timeline: "Digital Age",
          type: "Regional turboprop",
          class: "Regional Turboprop",
          programState: "Current program",
          overview: "The Dash 8-400 pairs turboprop efficiency with higher speed, making it a versatile regional platform."
        },
        {
          id: "dhc-515",
          name: "DHC-515 Firefighter",
          firstFlight: "Future",
          timeline: "Next Horizon",
          type: "Amphibious aerial firefighter",
          class: "Experimental",
          programState: "Future direction",
          overview: "The DHC-515 aims to modernize the aerial scooper role for wildfire response and public-service aviation."
        }
      ]
    }
  ];

  const historyMilestones = [
    {
      year: "1783",
      era: "Lighter-Than-Air Dawn",
      title: "Montgolfier Balloon Flight",
      summary: "Human aviation begins with the first crewed hot-air balloon ascents, proving that people can deliberately leave the ground.",
      highlight: "The dream of flight becomes visible."
    },
    {
      year: "1891",
      era: "Experimental Flight",
      title: "Otto Lilienthal's Glider Campaign",
      summary: "Lilienthal's repeated glider tests turn flight into an engineering problem of lift, control, and repeatable experimentation.",
      highlight: "Aerodynamics starts to replace pure guesswork."
    },
    {
      year: "1903",
      era: "Powered Flight",
      title: "Wright Flyer Takes Off",
      summary: "The Wright brothers combine propulsion, wing design, and control into the first sustained powered heavier-than-air flight.",
      highlight: "Flight becomes steerable, not just possible."
    },
    {
      year: "1914",
      era: "Commercial Beginnings",
      title: "Scheduled Airline Service Appears",
      summary: "Early passenger operations hint that aircraft can become transportation systems rather than one-off inventions.",
      highlight: "Aviation shifts from novelty to utility."
    },
    {
      year: "1915-1918",
      era: "Rapid Wartime Development",
      title: "World War I Accelerates Design",
      summary: "Airframes, engines, and tactics evolve quickly as nations invest in reconnaissance, fighters, and aerial coordination.",
      highlight: "Speed, reliability, and maneuverability all advance."
    },
    {
      year: "1927",
      era: "Range Revolution",
      title: "Spirit of St. Louis Crosses the Atlantic",
      summary: "Long-distance solo flight captures the public imagination and proves that aircraft can connect continents.",
      highlight: "Endurance and navigation become strategic goals."
    },
    {
      year: "1939",
      era: "Jet Era Begins",
      title: "First Turbojet Aircraft Flies",
      summary: "Jet propulsion breaks aviation out of the piston paradigm and points toward much higher speed and altitude.",
      highlight: "A new performance ceiling appears."
    },
    {
      year: "1947",
      era: "Supersonic Breakthrough",
      title: "Bell X-1 Crosses Mach 1",
      summary: "Supersonic flight proves controllable, opening the door to new fighter, research, and high-speed design philosophies.",
      highlight: "The sound barrier becomes a design milestone."
    },
    {
      year: "1952",
      era: "Jetliners For The Public",
      title: "The Jet Airliner Arrives",
      summary: "Commercial aviation enters the jet age and begins compressing global travel times for passengers and airlines alike.",
      highlight: "Distance starts to feel smaller."
    },
    {
      year: "1969",
      era: "Scale And Reach",
      title: "Widebody Air Travel Expands",
      summary: "The arrival of high-capacity jets transforms airline economics, airport design, and the physical scale of air travel.",
      highlight: "Mass long-haul travel becomes real."
    },
    {
      year: "1976",
      era: "Supersonic Prestige",
      title: "Concorde Enters Service",
      summary: "Supersonic passenger travel reaches the airline world, showing what was technically possible even if it stayed exclusive.",
      highlight: "Speed becomes a luxury product."
    },
    {
      year: "1988",
      era: "Digital Flight Deck",
      title: "Fly-By-Wire Goes Mainstream",
      summary: "Advanced computers, protections, and glass cockpits reshape the relationship between pilot, aircraft, and control laws.",
      highlight: "Software becomes central to flying."
    },
    {
      year: "1990s-2000s",
      era: "Globalized Aerospace",
      title: "Composite Structures And Global Supply Chains",
      summary: "Modern aircraft programs spread design and production across continents while making more use of lightweight materials.",
      highlight: "Efficiency becomes multidisciplinary."
    },
    {
      year: "2010s",
      era: "Connected Aircraft",
      title: "Sensor Fusion, Data, And Autonomy Grow",
      summary: "Commercial and military aircraft increasingly depend on integrated avionics, software updates, and data-driven operations.",
      highlight: "Aircraft become networked systems."
    },
    {
      year: "2020s",
      era: "Sustainable Transition",
      title: "Hydrogen, SAF, Electric, And New Layouts",
      summary: "The industry turns toward emissions reduction, alternative propulsion, and redesigned airframes for the next long cycle of flight.",
      highlight: "Future aviation is as much an energy question as an aerodynamics one."
    }
  ];

  const futureSignals = [
    {
      title: "Hydrogen Airframes",
      tag: "Energy Shift",
      summary: "Expect more design work around cryogenic tanks, new fuselage volumes, and airports that can support alternative fuels."
    },
    {
      title: "Blended Wing Bodies",
      tag: "Layout Rethink",
      summary: "Wide lifting bodies could improve efficiency, but they challenge cabin layout, evacuation, and airport compatibility."
    },
    {
      title: "Autonomous Assistance",
      tag: "Software Layer",
      summary: "Flight decks will likely gain more decision support, predictive maintenance, and mission automation before full autonomy."
    },
    {
      title: "Regional Electrification",
      tag: "Short-Haul Labs",
      summary: "Training and short-hop aircraft are likely to be early proving grounds for electric and hybrid propulsion ecosystems."
    }
  ];

  const allAircraft = manufacturers.flatMap((manufacturer) =>
    manufacturer.aircraft.map((aircraft) => ({
      ...aircraft,
      manufacturerId: manufacturer.id,
      manufacturerName: manufacturer.name,
      manufacturerCategory: manufacturer.category,
      manufacturerCountry: manufacturer.country
    }))
  );

  function getManufacturerById(id) {
    return manufacturers.find((manufacturer) => manufacturer.id === id) || null;
  }

  function getAircraftById(id) {
    return allAircraft.find((aircraft) => aircraft.id === id) || null;
  }

  function getUniqueCategories() {
    return [...new Set(manufacturers.map((manufacturer) => manufacturer.category))];
  }

  function getUniqueAircraftClasses() {
    return [...new Set(allAircraft.map((aircraft) => aircraft.class))];
  }

  function groupAircraftByTimeline(aircraftList) {
    return timelineOrder
      .map((timeline) => ({
        timeline,
        description: timelineDescriptions[timeline],
        aircraft: aircraftList.filter((aircraft) => aircraft.timeline === timeline)
      }))
      .filter((group) => group.aircraft.length > 0);
  }

  return {
    manufacturers,
    historyMilestones,
    futureSignals,
    allAircraft,
    timelineOrder,
    timelineDescriptions,
    categoryDescriptions,
    classDescriptions,
    getManufacturerById,
    getAircraftById,
    getUniqueCategories,
    getUniqueAircraftClasses,
    groupAircraftByTimeline
  };
})();

(() => {
  if (typeof document === "undefined") {
    return;
  }

  const styleId = "aviation-wiki-layout-fixes";

  function applyLayoutFixes() {
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .control-deck {
        position: static !important;
        top: auto !important;
      }
    `;

    document.head.appendChild(style);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyLayoutFixes, { once: true });
  } else {
    applyLayoutFixes();
  }
})();
