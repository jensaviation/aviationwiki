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

  const technicalProfilesByClass = {
    "Commercial Jet": {
      dimensions: {
        Length: "Approx. 30 to 76 m, depending on the variant",
        Wingspan: "Approx. 28 to 80 m",
        Height: "Approx. 10 to 24 m"
      },
      powerplant: {
        Engines: "Usually 2 turbofan engines, with some historic 3 or 4 engine designs",
        "Engine type": "High-bypass turbofan"
      },
      performance: {
        "Cruise speed": "Around Mach 0.74 to Mach 0.86",
        Range: "Typically 2,000 to 15,000 km",
        "Service ceiling": "About 35,000 to 43,000 ft"
      },
      weights: {
        MTOW: "Program-dependent; roughly 30,000 to 575,000 kg"
      },
      capacity: {
        Crew: "2 flight crew",
        Passengers: "Varies by layout from around 50 to 850+"
      }
    },
    "Regional Turboprop": {
      dimensions: {
        Length: "Approx. 15 to 33 m",
        Wingspan: "Approx. 19 to 29 m",
        Height: "Approx. 5 to 9 m"
      },
      powerplant: {
        Engines: "Usually 2 turboprop engines",
        "Engine type": "Free-turbine turboprop"
      },
      performance: {
        "Cruise speed": "Roughly 450 to 650 km/h",
        Range: "Around 1,000 to 2,500 km",
        "Service ceiling": "About 20,000 to 30,000 ft"
      },
      weights: {
        MTOW: "Typically 6,000 to 30,000 kg"
      },
      capacity: {
        Crew: "2",
        Passengers: "Usually 15 to 90"
      }
    },
    "Business Jet": {
      dimensions: {
        Length: "Approx. 12 to 34 m",
        Wingspan: "Approx. 14 to 32 m",
        Height: "Approx. 4 to 8 m"
      },
      powerplant: {
        Engines: "Usually 2 turbofan engines",
        "Engine type": "Low- or high-bypass turbofan"
      },
      performance: {
        "Cruise speed": "Roughly Mach 0.75 to Mach 0.93",
        Range: "Approx. 2,000 to 14,000 km",
        "Service ceiling": "Around 41,000 to 51,000 ft"
      },
      weights: {
        MTOW: "Typically 5,000 to 50,000 kg"
      },
      capacity: {
        Crew: "1 or 2 pilots",
        Passengers: "Usually 4 to 19"
      }
    },
    "General Aviation": {
      dimensions: {
        Length: "Approx. 6 to 18 m",
        Wingspan: "Approx. 8 to 18 m",
        Height: "Approx. 2 to 5 m"
      },
      powerplant: {
        Engines: "Usually 1 or 2 piston or turboprop engines",
        "Engine type": "Piston, turboprop, or light jet depending on the model"
      },
      performance: {
        "Cruise speed": "Roughly 180 to 550 km/h",
        Range: "Approx. 500 to 3,500 km",
        "Service ceiling": "Around 10,000 to 35,000 ft"
      },
      weights: {
        MTOW: "Typically 500 to 8,000 kg"
      },
      capacity: {
        Crew: "1 or 2",
        Passengers: "Usually 1 to 14 total occupants"
      }
    },
    Fighter: {
      dimensions: {
        Length: "Approx. 14 to 22 m",
        Wingspan: "Approx. 8 to 15 m",
        Height: "Approx. 4 to 6 m"
      },
      powerplant: {
        Engines: "Usually 1 or 2 afterburning turbofan engines",
        "Engine type": "Low-bypass afterburning turbofan"
      },
      performance: {
        "Max speed": "Often Mach 1.6 to Mach 2.5",
        Range: "Mission-dependent; roughly 1,000 to 4,000 km ferry",
        "Service ceiling": "Around 50,000 to 65,000 ft"
      },
      weights: {
        MTOW: "Typically 10,000 to 40,000 kg"
      },
      capacity: {
        Crew: "1 or 2"
      }
    },
    "Military Transport": {
      dimensions: {
        Length: "Approx. 20 to 84 m",
        Wingspan: "Approx. 25 to 88 m",
        Height: "Approx. 8 to 18 m"
      },
      powerplant: {
        Engines: "Usually 2 to 6 turbofan or turboprop engines",
        "Engine type": "Turbofan or turboprop, mission dependent"
      },
      performance: {
        "Cruise speed": "Approx. 500 to 900 km/h",
        Range: "Approx. 2,000 to 15,000 km",
        "Service ceiling": "Around 25,000 to 45,000 ft"
      },
      weights: {
        MTOW: "Typically 20,000 to 640,000 kg"
      },
      capacity: {
        Crew: "Varies by mission",
        Payload: "Program-dependent"
      }
    },
    Trainer: {
      dimensions: {
        Length: "Approx. 7 to 18 m",
        Wingspan: "Approx. 8 to 12 m",
        Height: "Approx. 2.5 to 5 m"
      },
      powerplant: {
        Engines: "Piston, turboprop, or small turbofan depending on role",
        "Engine type": "Training mission dependent"
      },
      performance: {
        "Cruise speed": "Approx. 200 to 700 km/h",
        Range: "Approx. 700 to 2,500 km",
        "Service ceiling": "Approx. 10,000 to 45,000 ft"
      },
      weights: {
        MTOW: "Training mission dependent"
      },
      capacity: {
        Crew: "Usually 2"
      }
    },
    ISR: {
      dimensions: {
        Length: "Approx. 11 to 46 m",
        Wingspan: "Approx. 13 to 40 m",
        Height: "Approx. 4 to 13 m"
      },
      powerplant: {
        Engines: "Usually 2 turbofan or turboprop engines",
        "Engine type": "Mission-specific"
      },
      performance: {
        "Cruise speed": "Mission-dependent",
        Range: "Long-endurance mission dependent",
        "Service ceiling": "Program dependent"
      },
      weights: {
        MTOW: "Mission dependent"
      },
      capacity: {
        Crew: "Flight crew plus mission operators"
      }
    },
    Amphibian: {
      dimensions: {
        Length: "Approx. 12 to 32 m",
        Wingspan: "Approx. 18 to 33 m",
        Height: "Approx. 5 to 9 m"
      },
      powerplant: {
        Engines: "Usually 2 turbofan, turboprop, or piston engines",
        "Engine type": "Amphibious mission dependent"
      },
      performance: {
        "Cruise speed": "Typically 200 to 700 km/h",
        Range: "Approx. 1,000 to 4,000 km"
      },
      weights: {
        MTOW: "Mission dependent"
      },
      capacity: {
        Crew: "Varies"
      }
    },
    Experimental: {
      dimensions: {
        Length: "Program dependent",
        Wingspan: "Program dependent",
        Height: "Program dependent"
      },
      powerplant: {
        Engines: "Program dependent",
        "Engine type": "Future or experimental propulsion"
      },
      performance: {
        "Cruise speed": "Program dependent",
        Range: "Program dependent",
        "Service ceiling": "Program dependent"
      },
      weights: {
        MTOW: "Program dependent"
      },
      capacity: {
        Crew: "Program dependent"
      }
    }
  };

  const rawManufacturers = [
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
        { id: "airbus-a220", name: "A220", firstFlight: "2013", timeline: "Digital Age", type: "Narrowbody airliner", class: "Commercial Jet", programState: "Current program", overview: "Originally developed as the C Series, the A220 covers the 100 to 150 seat market with efficient engines and a modern cabin." },
        { id: "airbus-a300", name: "A300", firstFlight: "1972", timeline: "Jet Age", type: "Widebody airliner", class: "Commercial Jet", programState: "Historic icon", overview: "The A300 was the world's first twin-engine widebody airliner and launched Airbus into the mainline market." },
        { id: "airbus-a310", name: "A310", firstFlight: "1982", timeline: "Jet Age", type: "Widebody airliner", class: "Commercial Jet", programState: "Legacy icon", overview: "The A310 shortened the A300 concept into a medium-to-long-haul widebody used by airlines, cargo operators, and governments." },
        { id: "airbus-a319", name: "A319", firstFlight: "1995", timeline: "Digital Age", type: "Narrowbody airliner", class: "Commercial Jet", programState: "Long-running program", overview: "The A319 became popular with airlines needing a slightly smaller A320-family aircraft with common crew and systems." },
        { id: "airbus-a320", name: "A320", firstFlight: "1987", timeline: "Jet Age", type: "Narrowbody airliner", class: "Commercial Jet", programState: "Historic best-seller", overview: "The A320 changed short-haul airline design with digital fly-by-wire controls and a highly scalable single-aisle platform." },
        { id: "airbus-a320neo", name: "A320neo", firstFlight: "2014", timeline: "Digital Age", type: "Re-engined narrowbody airliner", class: "Commercial Jet", programState: "Current program", overview: "The A320neo modernized Airbus's best-known family with more efficient engines and lower operating costs." },
        { id: "airbus-a321", name: "A321", firstFlight: "1993", timeline: "Jet Age", type: "Stretched narrowbody airliner", class: "Commercial Jet", programState: "Core family program", overview: "The A321 became one of the most commercially important single-aisle aircraft by combining capacity with strong economics." },
        { id: "airbus-a321xlr", name: "A321XLR", firstFlight: "2022", timeline: "Digital Age", type: "Long-range narrowbody airliner", class: "Commercial Jet", programState: "Current program", overview: "The A321XLR extends narrowbody reach into transatlantic and thin long-haul missions that used to require larger widebodies." },
        { id: "airbus-a330-300", name: "A330-300", firstFlight: "1992", timeline: "Jet Age", type: "Widebody airliner", class: "Commercial Jet", programState: "Long-running program", overview: "The A330-300 has been a flexible widebody for medium and long-haul operations, cargo conversion, and high-density routes." },
        { id: "airbus-a330neo", name: "A330-900neo", firstFlight: "2017", timeline: "Digital Age", type: "Updated widebody airliner", class: "Commercial Jet", programState: "Current program", overview: "The A330neo refreshes a familiar widebody platform with newer engines, aerodynamic improvements, and better fuel efficiency." },
        { id: "airbus-a340-600", name: "A340-600", firstFlight: "2001", timeline: "Digital Age", type: "Long-range four-engine airliner", class: "Commercial Jet", programState: "Legacy icon", overview: "The A340-600 represented Airbus's long-haul four-engine era before very large twinjets took over much of that market." },
        { id: "airbus-a350-900", name: "A350-900", firstFlight: "2013", timeline: "Digital Age", type: "Widebody airliner", class: "Commercial Jet", programState: "Current program", overview: "The A350-900 blends composites, advanced systems, and long-range economics into one of Airbus's flagship aircraft." },
        { id: "airbus-a350-1000", name: "A350-1000", firstFlight: "2016", timeline: "Digital Age", type: "Widebody airliner", class: "Commercial Jet", programState: "Current program", overview: "The stretched A350-1000 serves high-capacity long-haul missions with strong range and efficiency." },
        { id: "airbus-a380", name: "A380", firstFlight: "2005", timeline: "Digital Age", type: "Very large airliner", class: "Commercial Jet", programState: "Modern icon", overview: "The A380 became aviation's best-known double-deck passenger jet and a symbol of the hub-and-spoke era." },
        { id: "airbus-belugaxl", name: "BelugaXL", firstFlight: "2018", timeline: "Digital Age", type: "Oversize cargo transport", class: "Commercial Jet", programState: "Specialized fleet", overview: "The BelugaXL is Airbus's unmistakable internal logistics aircraft, built to carry large fuselage and wing sections between factories." }
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
        { id: "boeing-707", name: "707", firstFlight: "1957", timeline: "Jet Age", type: "Early jet airliner", class: "Commercial Jet", programState: "Historic icon", overview: "The 707 helped turn jet travel into a practical global airline model and established Boeing as a jetliner giant." },
        { id: "boeing-727", name: "727", firstFlight: "1963", timeline: "Jet Age", type: "Trijet narrowbody airliner", class: "Commercial Jet", programState: "Historic icon", overview: "The 727 became one of the most recognizable short-to-medium-haul jets of the classic airliner era." },
        { id: "boeing-737-800", name: "737-800", firstFlight: "1997", timeline: "Digital Age", type: "Narrowbody airliner", class: "Commercial Jet", programState: "Global airline staple", overview: "The 737-800 became one of the most widely used airline aircraft in the world thanks to its size and route flexibility." },
        { id: "boeing-737-max", name: "737 MAX 8", firstFlight: "2016", timeline: "Digital Age", type: "Updated narrowbody airliner", class: "Commercial Jet", programState: "Current program", overview: "The 737 MAX continues Boeing's long-running narrowbody line with updated engines and revised systems." },
        { id: "boeing-747-400", name: "747-400", firstFlight: "1988", timeline: "Jet Age", type: "Widebody jumbo jet", class: "Commercial Jet", programState: "Historic icon", overview: "The 747-400 became one of the most famous long-haul aircraft ever built and defined the image of intercontinental travel." },
        { id: "boeing-747-8f", name: "747-8 Freighter", firstFlight: "2010", timeline: "Digital Age", type: "Widebody cargo aircraft", class: "Commercial Jet", programState: "Cargo flagship", overview: "The 747-8F carried Boeing's jumbo concept into the modern cargo world with updated aerodynamics and higher efficiency." },
        { id: "boeing-757-200", name: "757-200", firstFlight: "1982", timeline: "Jet Age", type: "Medium-range narrowbody airliner", class: "Commercial Jet", programState: "Legacy icon", overview: "The 757 combined strong runway performance and useful range, earning a loyal following among airlines and passengers." },
        { id: "boeing-767-300f", name: "767-300 Freighter", firstFlight: "1995 freighter line", timeline: "Digital Age", type: "Widebody cargo aircraft", class: "Commercial Jet", programState: "Current cargo line", overview: "The 767 freighter remains highly relevant in cargo networks and has become one of the most important mid-size freight aircraft." },
        { id: "boeing-777-300er", name: "777-300ER", firstFlight: "2003", timeline: "Digital Age", type: "Long-range widebody airliner", class: "Commercial Jet", programState: "Long-haul icon", overview: "The 777-300ER dominated premium long-haul airline planning for years with range, payload, and twin-engine efficiency." },
        { id: "boeing-777-9", name: "777-9", firstFlight: "2020", timeline: "Next Horizon", type: "Next-generation widebody airliner", class: "Commercial Jet", programState: "Advanced development", overview: "The 777-9 represents the next step in Boeing's large twinjet strategy, blending folding wingtips and updated long-range efficiency." },
        { id: "boeing-787-8", name: "787-8 Dreamliner", firstFlight: "2009", timeline: "Digital Age", type: "Widebody airliner", class: "Commercial Jet", programState: "Current program", overview: "The 787-8 launched Boeing's composite long-haul family and helped normalize thinner point-to-point long-distance routes." },
        { id: "boeing-787-9", name: "787-9 Dreamliner", firstFlight: "2013", timeline: "Digital Age", type: "Widebody airliner", class: "Commercial Jet", programState: "Current program", overview: "The 787-9 became one of Boeing's most important widebodies by pairing long range with strong airline economics." },
        { id: "boeing-787-10", name: "787-10 Dreamliner", firstFlight: "2017", timeline: "Digital Age", type: "Stretched widebody airliner", class: "Commercial Jet", programState: "Current program", overview: "The 787-10 stretches the Dreamliner concept toward higher capacity while staying focused on efficient medium and long-haul work." },
        { id: "boeing-p8", name: "P-8 Poseidon", firstFlight: "2009", timeline: "Digital Age", type: "Maritime patrol aircraft", class: "ISR", programState: "Current military derivative", overview: "The P-8 shows how Boeing's commercial jet platforms can be adapted into advanced defense and surveillance roles." }
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
        { id: "embraer-bandeirante", name: "EMB 110 Bandeirante", firstFlight: "1968", timeline: "Jet Age", type: "Twin turboprop regional aircraft", class: "Regional Turboprop", programState: "Historic regional aircraft", overview: "The Bandeirante helped establish Embraer and became an early regional workhorse." },
        { id: "embraer-erj145", name: "ERJ 145", firstFlight: "1995", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "Historic regional jet", overview: "The ERJ 145 became one of the best-known 50-seat regional jets and a familiar sight worldwide." },
        { id: "embraer-e170", name: "E170", firstFlight: "2002", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "E-Jet family program", overview: "The E170 launched the first-generation E-Jet family with a comfortable cabin and efficient short-haul performance." },
        { id: "embraer-e175", name: "E175", firstFlight: "2003", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "Current program", overview: "The E175 became a staple of regional airline fleets thanks to its cabin comfort, economics, and network flexibility." },
        { id: "embraer-e190", name: "E190", firstFlight: "2004", timeline: "Digital Age", type: "Small mainline jet", class: "Commercial Jet", programState: "Current family line", overview: "The E190 moved Embraer further upmarket into mainline routes that needed less capacity than larger narrowbodies." },
        { id: "embraer-e195-e2", name: "E195-E2", firstFlight: "2017", timeline: "Digital Age", type: "Regional jet / small mainline jet", class: "Commercial Jet", programState: "Current program", overview: "The E2 generation modernized Embraer's commercial family with new wings, engines, and improved operating efficiency." },
        { id: "embraer-kc390", name: "KC-390 Millennium", firstFlight: "2015", timeline: "Digital Age", type: "Tactical transport / tanker", class: "Military Transport", programState: "Current program", overview: "The KC-390 extends Embraer into defense airlift with jet speed, multi-role flexibility, and cargo handling capability." },
        { id: "embraer-super-tucano", name: "A-29 Super Tucano", firstFlight: "1999", timeline: "Digital Age", type: "Turboprop light attack and trainer", class: "Trainer", programState: "Current program", overview: "The Super Tucano is one of Embraer's most successful military aircraft, widely used for training and light attack missions." }
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
        { id: "bombardier-crj200", name: "CRJ200", firstFlight: "1991", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "Historic regional jet", overview: "The CRJ200 became one of the classic small regional jets and was central to high-frequency feeder flying." },
        { id: "bombardier-crj900", name: "CRJ900", firstFlight: "2001", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "Legacy icon", overview: "The CRJ900 became one of the best-known regional jet variants, helping shape high-frequency short-haul networks." },
        { id: "bombardier-q400", name: "Dash 8 Q400", firstFlight: "1998", timeline: "Digital Age", type: "Regional turboprop", class: "Regional Turboprop", programState: "Historic family member", overview: "The Q400 offered turboprop efficiency with higher speed and remains a highly recognizable regional aircraft." },
        { id: "bombardier-challenger-3500", name: "Challenger 3500", firstFlight: "2021 generation", timeline: "Next Horizon", type: "Super-midsize business jet", class: "Business Jet", programState: "Current generation", overview: "The Challenger 3500 keeps Bombardier highly visible in the super-midsize corporate market." },
        { id: "bombardier-global-7500", name: "Global 7500", firstFlight: "2016", timeline: "Digital Age", type: "Ultra-long-range business jet", class: "Business Jet", programState: "Current program", overview: "Bombardier positioned the Global 7500 at the top end of business aviation with exceptional range and a four-zone cabin." }
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
        { id: "cessna-152", name: "152", firstFlight: "1977", timeline: "Jet Age", type: "Primary trainer", class: "Trainer", programState: "Historic training icon", overview: "The Cessna 152 trained huge numbers of pilots and remains one of the most familiar light trainers ever built." },
        { id: "cessna-172", name: "172 Skyhawk", firstFlight: "1955", timeline: "Jet Age", type: "Piston trainer / touring aircraft", class: "General Aviation", programState: "Current program", overview: "The Skyhawk became a worldwide standard for pilot training thanks to its approachable handling and huge support network." },
        { id: "cessna-182", name: "182 Skylane", firstFlight: "1956", timeline: "Jet Age", type: "Touring piston single", class: "General Aviation", programState: "Long-running aircraft", overview: "The Skylane is a classic Cessna step-up aircraft for owners who want more load, speed, and traveling flexibility." },
        { id: "cessna-caravan", name: "208 Caravan", firstFlight: "1982", timeline: "Jet Age", type: "Utility turboprop", class: "General Aviation", programState: "Current program", overview: "The Caravan is a versatile single-engine turboprop used for passengers, cargo, bush operations, and special missions." },
        { id: "cessna-cj4-gen2", name: "Citation CJ4 Gen2", firstFlight: "2009 lineage", timeline: "Digital Age", type: "Light business jet", class: "Business Jet", programState: "Current program", overview: "The CJ4 line keeps Cessna strong in owner-flown and corporate light-jet operations." },
        { id: "cessna-latitude", name: "Citation Latitude", firstFlight: "2014", timeline: "Digital Age", type: "Midsize business jet", class: "Business Jet", programState: "Current program", overview: "The Citation Latitude helped Cessna move further into the midsize business jet market with a stand-up cabin." },
        { id: "cessna-longitude", name: "Citation Longitude", firstFlight: "2016", timeline: "Digital Age", type: "Super-midsize business jet", class: "Business Jet", programState: "Current program", overview: "The Citation Longitude adds long-range corporate capability to Cessna's long-running business jet family." }
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
        { id: "beechcraft-bonanza", name: "Bonanza G36", firstFlight: "1947 lineage", timeline: "Jet Age", type: "Piston single", class: "General Aviation", programState: "Current program", overview: "The Bonanza is one of general aviation's longest-running nameplates, known for speed, range, and owner-flown utility." },
        { id: "beechcraft-baron", name: "Baron G58", firstFlight: "1969 lineage", timeline: "Jet Age", type: "Twin-engine piston aircraft", class: "General Aviation", programState: "Current program", overview: "The Baron remains a famous piston twin for training, travel, and utility operations." },
        { id: "beechcraft-king-air-260", name: "King Air 260", firstFlight: "2020 generation", timeline: "Next Horizon", type: "Twin turboprop", class: "General Aviation", programState: "Current generation", overview: "The King Air 260 keeps Beechcraft visible in high-end turboprop travel and utility operations." },
        { id: "beechcraft-king-air-360", name: "King Air 360", firstFlight: "2020", timeline: "Digital Age", type: "Twin turboprop", class: "General Aviation", programState: "Current program", overview: "The King Air line remains a benchmark for flexible turboprop missions, from corporate travel to medevac and surveillance." },
        { id: "beechcraft-t6c", name: "T-6C Texan II", firstFlight: "1998", timeline: "Digital Age", type: "Military trainer", class: "Trainer", programState: "Current program", overview: "The T-6C serves as a primary and basic military trainer for air forces that need a modern cockpit training environment." }
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
        { id: "piper-j3", name: "J-3 Cub", firstFlight: "1938", timeline: "Foundational", type: "Classic light aircraft", class: "General Aviation", programState: "Historic icon", overview: "The J-3 Cub became one of aviation's most famous grassroots airplanes and helped define personal flying." },
        { id: "piper-archer-lx", name: "Archer LX", firstFlight: "1960s lineage", timeline: "Jet Age", type: "Training / touring piston single", class: "General Aviation", programState: "Current program", overview: "The Archer remains a favorite at flight schools and clubs for straightforward handling and dependable cross-country capability." },
        { id: "piper-seminole", name: "Seminole", firstFlight: "1978", timeline: "Jet Age", type: "Twin-engine trainer", class: "Trainer", programState: "Current program", overview: "The Seminole is a famous multi-engine training aircraft used by many flight schools around the world." },
        { id: "piper-m350", name: "M350", firstFlight: "Current lineage", timeline: "Digital Age", type: "Pressurized piston single", class: "General Aviation", programState: "Current program", overview: "The M350 keeps the high-performance pressurized personal aircraft concept alive in Piper's lineup." },
        { id: "piper-m600-sls", name: "M600/SLS", firstFlight: "2015", timeline: "Digital Age", type: "Pressurized single-engine turboprop", class: "General Aviation", programState: "Current program", overview: "The M600/SLS brought high-performance personal flying together with advanced automation and safety systems." },
        { id: "piper-m700-fury", name: "M700 Fury", firstFlight: "2024", timeline: "Next Horizon", type: "High-performance personal turboprop", class: "Experimental", programState: "Current direction", overview: "The M700 Fury pushes Piper's personal turboprop concept toward higher speed and a more premium owner-flown mission." }
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
        { id: "gulfstream-g280", name: "G280", firstFlight: "2009", timeline: "Digital Age", type: "Super-midsize business jet", class: "Business Jet", programState: "Current program", overview: "The G280 balances runway performance, cabin refinement, and transcontinental reach in the super-midsize segment." },
        { id: "gulfstream-g500", name: "G500", firstFlight: "2015", timeline: "Digital Age", type: "Long-range business jet", class: "Business Jet", programState: "Current program", overview: "The G500 helped introduce Gulfstream's newer symmetric flight deck and a fresh large-cabin generation." },
        { id: "gulfstream-g650er", name: "G650ER", firstFlight: "2014 variant", timeline: "Digital Age", type: "Ultra-long-range business jet", class: "Business Jet", programState: "Flagship icon", overview: "The G650ER became one of the defining ultra-long-range business jets of the modern era." },
        { id: "gulfstream-g700", name: "G700", firstFlight: "2020", timeline: "Next Horizon", type: "Ultra-long-range business jet", class: "Business Jet", programState: "Current generation", overview: "The G700 expands Gulfstream's top-end offering with a large cabin, advanced flight deck, and long-range mission profile." },
        { id: "gulfstream-g800", name: "G800", firstFlight: "2022", timeline: "Next Horizon", type: "Ultra-long-range business jet", class: "Business Jet", programState: "Current generation", overview: "The G800 emphasizes maximum range, giving operators a flagship option aimed at the most demanding intercontinental routes." }
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
        { id: "atr-42-600", name: "ATR 42-600", firstFlight: "2010", timeline: "Digital Age", type: "Regional turboprop", class: "Regional Turboprop", programState: "Current program", overview: "The ATR 42-600 is designed for lower-demand routes, flexible passenger layouts, and strong short-runway utility." },
        { id: "atr-72-600", name: "ATR 72-600", firstFlight: "2009", timeline: "Digital Age", type: "Regional turboprop", class: "Regional Turboprop", programState: "Current program", overview: "ATR's 72-seat flagship is a workhorse on regional networks where low fuel burn and field performance matter most." },
        { id: "atr-evo", name: "ATR EVO", firstFlight: "2030s", timeline: "Next Horizon", type: "Next-generation regional turboprop", class: "Experimental", programState: "Future direction", overview: "ATR EVO represents the company's future-facing path toward hybridized systems, lower emissions, and updated regional operations." }
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
        { id: "comac-c909", name: "C909", firstFlight: "2008", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "Current program", overview: "Originally launched as the ARJ21, the C909 serves regional jet routes and built COMAC's early certification and airline experience." },
        { id: "comac-c919", name: "C919", firstFlight: "2017", timeline: "Digital Age", type: "Narrowbody airliner", class: "Commercial Jet", programState: "Current program", overview: "The C919 is COMAC's mainline narrowbody program aimed at the single-aisle market long dominated by Airbus and Boeing." },
        { id: "comac-c929", name: "C929", firstFlight: "Future", timeline: "Next Horizon", type: "Widebody airliner", class: "Experimental", programState: "Future direction", overview: "The C929 reflects COMAC's long-range ambition to expand from narrowbodies into intercontinental widebody design." }
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
        { id: "lockheed-f16v", name: "F-16V", firstFlight: "1974 lineage", timeline: "Jet Age", type: "Multirole fighter", class: "Fighter", programState: "Current upgrade line", overview: "The F-16 remains one of the most widespread fighters globally, with the V-standard bringing modern sensors and avionics." },
        { id: "lockheed-f22", name: "F-22 Raptor", firstFlight: "1997", timeline: "Digital Age", type: "Stealth air superiority fighter", class: "Fighter", programState: "Modern icon", overview: "The F-22 became a benchmark stealth fighter focused on air dominance, speed, and supercruise." },
        { id: "lockheed-f35a", name: "F-35A Lightning II", firstFlight: "2006", timeline: "Digital Age", type: "Stealth multirole fighter", class: "Fighter", programState: "Current program", overview: "The F-35 centers on sensor fusion, stealth, and shared mission systems across allied air forces." },
        { id: "lockheed-f35b", name: "F-35B Lightning II", firstFlight: "2008", timeline: "Digital Age", type: "STOVL stealth fighter", class: "Fighter", programState: "Current program", overview: "The F-35B adds short takeoff and vertical landing flexibility to the Joint Strike Fighter family." },
        { id: "lockheed-f35c", name: "F-35C Lightning II", firstFlight: "2010", timeline: "Digital Age", type: "Carrier-based stealth fighter", class: "Fighter", programState: "Current program", overview: "The F-35C adapts the family to catapult-launch carrier operations with larger wings and navalized structure." },
        { id: "lockheed-c130j", name: "C-130J Super Hercules", firstFlight: "1996", timeline: "Digital Age", type: "Tactical airlifter", class: "Military Transport", programState: "Current program", overview: "The C-130J modernizes a classic airlift platform with updated avionics, engines, and broad special mission adaptability." }
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
        { id: "northrop-b2", name: "B-2 Spirit", firstFlight: "1989", timeline: "Jet Age", type: "Stealth bomber", class: "Military Transport", programState: "Strategic icon", overview: "The B-2 became one of the most visually distinctive aircraft ever built and a symbol of stealth bomber design." },
        { id: "northrop-b21", name: "B-21 Raider", firstFlight: "2020s", timeline: "Next Horizon", type: "Stealth bomber", class: "Experimental", programState: "Current generation", overview: "The B-21 represents the United States' next major stealth bomber, focused on long-range penetration and future adaptability." },
        { id: "northrop-e2d", name: "E-2D Advanced Hawkeye", firstFlight: "2007", timeline: "Digital Age", type: "Carrier-based airborne early warning aircraft", class: "ISR", programState: "Current program", overview: "The E-2D provides fleet-level radar coverage, battle management, and persistent airborne sensing for naval operations." },
        { id: "northrop-mq4c", name: "MQ-4C Triton", firstFlight: "2013", timeline: "Digital Age", type: "High-altitude surveillance aircraft", class: "ISR", programState: "Current program", overview: "The MQ-4C extends long-endurance maritime surveillance with broad-area sensors and high-altitude persistence." }
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
        { id: "dassault-mirage2000", name: "Mirage 2000", firstFlight: "1978", timeline: "Jet Age", type: "Multirole fighter", class: "Fighter", programState: "Classic fighter line", overview: "The Mirage 2000 became one of Dassault's most recognizable export fighters and a signature delta-wing aircraft." },
        { id: "dassault-rafale-f4", name: "Rafale F4", firstFlight: "1986 lineage", timeline: "Digital Age", type: "Omnirole fighter", class: "Fighter", programState: "Current program", overview: "The Rafale blends air-to-air, strike, and naval capability with continual sensor and software modernization." },
        { id: "dassault-falcon-8x", name: "Falcon 8X", firstFlight: "2015", timeline: "Digital Age", type: "Long-range business jet", class: "Business Jet", programState: "Current program", overview: "The Falcon 8X combines intercontinental reach with tri-jet flexibility and an efficient premium cabin layout." },
        { id: "dassault-falcon-10x", name: "Falcon 10X", firstFlight: "Next generation", timeline: "Next Horizon", type: "Ultra-long-range business jet", class: "Business Jet", programState: "Advanced development", overview: "The Falcon 10X is intended to move Dassault further into the flagship business-jet segment with a very large cabin." }
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
        { id: "saab-gripen-e", name: "Gripen E", firstFlight: "2017", timeline: "Digital Age", type: "Multirole fighter", class: "Fighter", programState: "Current program", overview: "Gripen E emphasizes sensor integration, dispersed operations, and cost-conscious multirole capability." },
        { id: "saab-globaleye", name: "GlobalEye", firstFlight: "2018", timeline: "Digital Age", type: "Airborne early warning and surveillance aircraft", class: "ISR", programState: "Current program", overview: "GlobalEye turns a business-jet platform into a long-endurance multi-domain surveillance node." },
        { id: "saab-340-aew", name: "Saab 340 AEW&C", firstFlight: "1983 lineage", timeline: "Jet Age", type: "Regional surveillance aircraft", class: "ISR", programState: "Current mission family", overview: "The Saab 340 has served both airline and surveillance roles, showing the company's talent for adaptable platforms." }
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
        { id: "sukhoi-superjet100", name: "Superjet 100", firstFlight: "2008", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "Civil program", overview: "The Superjet 100 gave Sukhoi a civilian regional-jet presence beyond its fighter legacy." },
        { id: "sukhoi-su27", name: "Su-27", firstFlight: "1977", timeline: "Jet Age", type: "Air superiority fighter", class: "Fighter", programState: "Historic icon", overview: "The Su-27 established the Flanker family and became one of the most famous Soviet fighter designs." },
        { id: "sukhoi-su30sm2", name: "Su-30SM2", firstFlight: "1990s lineage", timeline: "Digital Age", type: "Multirole fighter", class: "Fighter", programState: "Current program", overview: "The Su-30SM2 continues the versatile Flanker family with long range, payload, and two-seat mission flexibility." },
        { id: "sukhoi-su35s", name: "Su-35S", firstFlight: "2008", timeline: "Digital Age", type: "Air superiority fighter", class: "Fighter", programState: "Current program", overview: "The Su-35S refines the Flanker line with advanced maneuverability, sensor upgrades, and strong range performance." },
        { id: "sukhoi-su57", name: "Su-57", firstFlight: "2010", timeline: "Next Horizon", type: "Stealth fighter", class: "Fighter", programState: "Current generation", overview: "The Su-57 represents Sukhoi's move into lower-observable fighter design and next-generation mission systems." }
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
        { id: "antonov-an124", name: "An-124 Ruslan", firstFlight: "1982", timeline: "Jet Age", type: "Strategic heavy transport", class: "Military Transport", programState: "Legacy icon", overview: "The An-124 is one of the largest cargo aircraft ever built and a symbol of Antonov's heavy-lift design philosophy." },
        { id: "antonov-an148", name: "An-148", firstFlight: "2004", timeline: "Digital Age", type: "Regional jet", class: "Commercial Jet", programState: "Regional program", overview: "The An-148 served short and medium routes with a design aimed at flexible infrastructure and harsh-weather operation." },
        { id: "antonov-an225", name: "An-225 Mriya", firstFlight: "1988", timeline: "Jet Age", type: "Ultra-heavy cargo aircraft", class: "Military Transport", programState: "Historic icon", overview: "The An-225 became one of aviation's most iconic aircraft thanks to its unmatched size and oversize cargo role." }
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
        { id: "mdd-dc10", name: "DC-10", firstFlight: "1970", timeline: "Jet Age", type: "Widebody trijet airliner", class: "Commercial Jet", programState: "Historic icon", overview: "The DC-10 became one of the signature trijets of long-haul travel and cargo flying." },
        { id: "mdd-md11", name: "MD-11", firstFlight: "1990", timeline: "Digital Age", type: "Widebody trijet airliner and freighter", class: "Commercial Jet", programState: "Cargo icon", overview: "The MD-11 found a second life in cargo networks and remains a memorable final major trijet." },
        { id: "mdd-md80", name: "MD-80", firstFlight: "1979", timeline: "Jet Age", type: "Rear-engined narrowbody airliner", class: "Commercial Jet", programState: "Historic airline staple", overview: "The MD-80 family was a short-haul workhorse and a familiar sound and shape at airports for decades." },
        { id: "mdd-md95", name: "MD-95 / Boeing 717", firstFlight: "1998", timeline: "Digital Age", type: "Short-haul narrowbody airliner", class: "Commercial Jet", programState: "Transition aircraft", overview: "The MD-95 evolved into the Boeing 717 and bridged McDonnell Douglas history into the Boeing era." }
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
        { id: "dhc-twin-otter", name: "DHC-6 Twin Otter", firstFlight: "1965", timeline: "Jet Age", type: "STOL utility aircraft", class: "General Aviation", programState: "Current program", overview: "The Twin Otter is valued for short takeoff performance, remote operations, and dependable service on land, skis, or floats." },
        { id: "dhc-dash-8-400", name: "Dash 8-400", firstFlight: "1998", timeline: "Digital Age", type: "Regional turboprop", class: "Regional Turboprop", programState: "Current program", overview: "The Dash 8-400 pairs turboprop efficiency with higher speed, making it a versatile regional platform." },
        { id: "dhc-515", name: "DHC-515 Firefighter", firstFlight: "Future", timeline: "Next Horizon", type: "Amphibious aerial firefighter", class: "Experimental", programState: "Future direction", overview: "The DHC-515 aims to modernize the aerial scooper role for wildfire response and public-service aviation." }
      ]
    }
  ];

  const aircraftArticles = {
    "airbus-a220": {
      overview: "The A220 is Airbus's smallest jetliner family and is optimized for lower-capacity short and medium-haul routes where airlines want mainline comfort with strong fuel efficiency.",
      design: "It uses a modern aluminum-lithium and composite structure, a clean-sheet wing, and geared turbofan engines to reduce fuel burn and noise.",
      service: "Airlines use the A220 on regional and thin mainline routes where the economics of a larger single-aisle would be less attractive.",
      specs: {
        dimensions: { Length: "35.0 to 38.7 m", Wingspan: "35.1 m", Height: "11.5 m" },
        powerplant: { Engines: "2", "Engine type": "Pratt & Whitney PW1500G geared turbofan" },
        performance: { "Cruise speed": "Mach 0.78", Range: "Up to about 6,300 km", "Service ceiling": "41,000 ft" },
        weights: { MTOW: "Up to about 70,900 kg" },
        capacity: { Crew: "2", Passengers: "Approx. 100 to 160" }
      },
      facts: ["Clean-sheet design for the 100-150 seat market", "Known for a wide cabin cross-section relative to its class"],
      variants: ["A220-100", "A220-300"]
    },
    "airbus-a300": {
      overview: "The A300 was the first twin-engine widebody airliner and the aircraft that put Airbus on the global airliner map.",
      design: "It was designed to provide widebody cabin space with fewer engines than the long-haul tri- and quad-jets of its era.",
      service: "Passenger fleets declined over time, but cargo conversions kept the A300 highly relevant in freight networks.",
      specs: {
        dimensions: { Length: "Approx. 54.1 m", Wingspan: "44.8 m", Height: "16.5 m" },
        powerplant: { Engines: "2", "Engine type": "High-bypass turbofan" },
        performance: { "Cruise speed": "Approx. Mach 0.80", Range: "Approx. 4,000 to 7,500 km", "Service ceiling": "39,000 ft" },
        weights: { MTOW: "Up to about 171,700 kg" },
        capacity: { Crew: "2 to 3 depending on generation", Passengers: "Typically 250 to 300+" }
      },
      facts: ["First twin-engine widebody", "Critical to Airbus's early credibility"],
      variants: ["A300B2", "A300B4", "A300-600", "A300F"]
    },
    "airbus-a320": {
      overview: "The Airbus A320 is one of the most influential single-aisle airliners ever built and a foundational aircraft of modern airline fleets.",
      design: "It introduced digital fly-by-wire controls and a two-pilot glass cockpit to the short-haul jet market at large scale.",
      service: "The A320 family serves everything from high-frequency domestic flying to short transcontinental and leisure operations.",
      specs: {
        dimensions: { Length: "37.6 m", Wingspan: "34.1 m", Height: "11.8 m" },
        powerplant: { Engines: "2", "Engine type": "CFM56 or IAE V2500 turbofan" },
        performance: { "Cruise speed": "Mach 0.78", Range: "Approx. 6,100 km", "Service ceiling": "39,000 ft" },
        weights: { MTOW: "Up to about 78,000 kg" },
        capacity: { Crew: "2", Passengers: "Typically 150 to 180" }
      },
      facts: ["Mass-market fly-by-wire narrowbody", "Created a hugely scalable family platform"],
      variants: ["A318", "A319", "A320", "A321"]
    },
    "airbus-a320neo": {
      overview: "The A320neo is the re-engined evolution of the classic A320 and is one of the most important airliner upgrades of the 21st century.",
      design: "It pairs newer engines with aerodynamic refinements such as sharklets to reduce fuel burn and operating cost.",
      service: "The neo family is widely used by low-cost, network, charter, and leasing operators.",
      specs: {
        dimensions: { Length: "37.6 m", Wingspan: "35.8 m", Height: "11.8 m" },
        powerplant: { Engines: "2", "Engine type": "CFM LEAP-1A or Pratt & Whitney PW1100G-JM" },
        performance: { "Cruise speed": "Mach 0.78", Range: "Approx. 6,300 to 6,500 km", "Service ceiling": "39,000 ft" },
        weights: { MTOW: "Up to about 79,000 kg" },
        capacity: { Crew: "2", Passengers: "Typically 150 to 190" }
      },
      facts: ["One of the most commercially successful re-engining programs ever", "Improved fuel efficiency and lower community noise"],
      variants: ["A319neo", "A320neo", "A321neo"]
    },
    "airbus-a321": {
      overview: "The A321 is the stretched member of the A320 family and one of the most commercially important narrowbodies in service.",
      design: "It extends the A320 formula with more fuselage length and capacity, enabling dense trunk routes and longer-range missions.",
      service: "Airlines use the A321 for domestic high-density routes, leisure markets, and medium-haul flying.",
      specs: {
        dimensions: { Length: "44.5 m", Wingspan: "34.1 m", Height: "11.8 m" },
        powerplant: { Engines: "2", "Engine type": "CFM56 or IAE V2500 turbofan" },
        performance: { "Cruise speed": "Mach 0.78", Range: "Approx. 5,600 km", "Service ceiling": "39,000 ft" },
        weights: { MTOW: "Up to about 93,500 kg on later variants" },
        capacity: { Crew: "2", Passengers: "Typically 185 to 220+" }
      },
      facts: ["One of the key narrowbodies in today's airline market", "Strong economics on dense short and medium-haul routes"],
      variants: ["A321ceo", "A321neo", "A321LR", "A321XLR"]
    },
    "airbus-a321xlr": {
      overview: "The A321XLR extends the A321 family into long-range narrowbody territory, allowing airlines to open thinner long-haul routes.",
      design: "It adds range through fuel-system changes, structural reinforcement, and optimized operating economics for long narrowbody missions.",
      service: "The aircraft is aimed at transatlantic and other long, lower-demand routes that previously needed larger jets.",
      specs: {
        dimensions: { Length: "44.5 m", Wingspan: "35.8 m", Height: "11.8 m" },
        powerplant: { Engines: "2", "Engine type": "CFM LEAP-1A or Pratt & Whitney PW1100G-JM" },
        performance: { "Cruise speed": "Mach 0.78", Range: "Approx. 8,700 km", "Service ceiling": "39,000 ft" },
        weights: { MTOW: "Approx. 101,000 kg" },
        capacity: { Crew: "2", Passengers: "Typically 180 to 220" }
      },
      facts: ["Very long range for a single-aisle airliner", "Designed to open city pairs that do not justify a widebody"],
      variants: ["A321LR", "A321XLR"]
    },
    "airbus-a330-300": {
      overview: "The A330-300 is one of Airbus's most versatile widebodies and a long-running staple of medium and long-haul airline fleets.",
      design: "It uses a two-engine widebody layout that balances capacity, range, and operating cost.",
      service: "The type has served network carriers, leisure airlines, freight programs, and military conversion roles.",
      specs: {
        dimensions: { Length: "63.7 m", Wingspan: "60.3 m", Height: "16.8 m" },
        powerplant: { Engines: "2", "Engine type": "Rolls-Royce Trent 700, GE CF6, or Pratt & Whitney PW4000 turbofan" },
        performance: { "Cruise speed": "Mach 0.82", Range: "Approx. 11,750 km", "Service ceiling": "41,000 ft" },
        weights: { MTOW: "Up to about 242,000 kg" },
        capacity: { Crew: "2", Passengers: "Typically 277 to 440" }
      },
      facts: ["One of the classic modern twin-engine widebodies", "Popular in both passenger and freight operations"],
      variants: ["A330-200", "A330-300", "A330 MRTT", "A330F"]
    },
    "airbus-a330neo": {
      overview: "The A330neo modernizes the A330 with newer engines, aerodynamic refinements, and updated cabin systems.",
      design: "It combines a proven fuselage with a revised wing and Rolls-Royce Trent 7000 engines for improved economics.",
      service: "The A330neo targets operators that want a long-haul twin with lower acquisition risk than a clean-sheet design.",
      specs: {
        dimensions: { Length: "63.7 m", Wingspan: "64.0 m", Height: "16.8 m" },
        powerplant: { Engines: "2", "Engine type": "Rolls-Royce Trent 7000 turbofan" },
        performance: { "Cruise speed": "Mach 0.82", Range: "Approx. 13,300 km", "Service ceiling": "41,100 ft" },
        weights: { MTOW: "Up to about 251,000 kg" },
        capacity: { Crew: "2", Passengers: "Typically around 260 to 300+" }
      },
      facts: ["Updated A330 generation", "Offers long-haul capability with strong commonality"],
      variants: ["A330-800neo", "A330-900neo"]
    },
    "airbus-a350-900": {
      overview: "The A350-900 is Airbus's flagship long-haul twin in the mid-to-large segment and one of the most advanced airliners in service.",
      design: "It uses extensive carbon-fiber composites, a high-aspect-ratio wing, and advanced systems to optimize long-range efficiency.",
      service: "Airlines use it on premium intercontinental routes and long sectors where fuel burn and cabin comfort both matter.",
      specs: {
        dimensions: { Length: "66.8 m", Wingspan: "64.8 m", Height: "17.1 m" },
        powerplant: { Engines: "2", "Engine type": "Rolls-Royce Trent XWB turbofan" },
        performance: { "Cruise speed": "Mach 0.85", Range: "Approx. 15,000 km", "Service ceiling": "43,100 ft" },
        weights: { MTOW: "Up to about 283,000 kg" },
        capacity: { Crew: "2", Passengers: "Typically around 300 to 350" }
      },
      facts: ["Composite long-haul flagship", "Competes directly with large Boeing long-haul twins"],
      variants: ["A350-900", "A350-900ULR", "A350-1000"]
    },
    "airbus-a350-1000": {
      overview: "The A350-1000 is the larger member of the A350 family and targets high-capacity long-haul missions.",
      design: "It stretches the A350 concept with more cabin capacity, updated landing gear, and strong long-range efficiency.",
      service: "The aircraft is positioned for premium long-haul trunk routes where airlines want a large but efficient twin.",
      specs: {
        dimensions: { Length: "73.8 m", Wingspan: "64.8 m", Height: "17.1 m" },
        powerplant: { Engines: "2", "Engine type": "Rolls-Royce Trent XWB-97 turbofan" },
        performance: { "Cruise speed": "Mach 0.85", Range: "Approx. 16,100 km", "Service ceiling": "43,100 ft" },
        weights: { MTOW: "Up to about 319,000 kg" },
        capacity: { Crew: "2", Passengers: "Typically around 350 to 410" }
      },
      facts: ["Largest A350 family member", "Built for high-capacity ultra long-haul routes"],
      variants: ["A350-1000"]
    },
    "airbus-a380": {
      overview: "The A380 is the world's largest full-length double-deck passenger airliner and one of the most iconic aircraft ever built.",
      design: "It was designed for very high-capacity hub-and-spoke operations with four engines, two full passenger decks, and an enormous wing.",
      service: "The aircraft is most associated with premium long-haul travel and high-density hub routes.",
      specs: {
        dimensions: { Length: "72.7 m", Wingspan: "79.8 m", Height: "24.1 m" },
        powerplant: { Engines: "4", "Engine type": "Engine Alliance GP7200 or Rolls-Royce Trent 900 turbofan" },
        performance: { "Cruise speed": "Mach 0.85", Range: "Approx. 15,200 km", "Service ceiling": "43,000 ft" },
        weights: { MTOW: "Up to about 575,000 kg" },
        capacity: { Crew: "2", Passengers: "Typical 500+; certified for much more in dense layout" }
      },
      facts: ["Largest passenger airliner built", "A defining symbol of the superjumbo era"],
      variants: ["A380-800"]
    },
    "boeing-707": {
      overview: "The Boeing 707 was one of the first successful commercial jetliners and a central aircraft in the birth of mass jet travel.",
      design: "Its swept wing, underwing engines, and long-range capability helped establish the modern jet airliner layout.",
      service: "The aircraft served airlines, militaries, and governments and also generated important special mission derivatives.",
      specs: {
        dimensions: { Length: "Approx. 46.6 m", Wingspan: "Approx. 44.4 m", Height: "Approx. 12.9 m" },
        powerplant: { Engines: "4", "Engine type": "Turbojet or low-bypass turbofan depending on variant" },
        performance: { "Cruise speed": "Approx. Mach 0.84", Range: "Approx. 6,000 to 10,000 km", "Service ceiling": "Around 42,000 ft" },
        weights: { MTOW: "Up to about 151,000 kg" },
        capacity: { Crew: "3 on early operations", Passengers: "Typically around 140 to 219" }
      },
      facts: ["One of the most important early jetliners", "Parent to many military and special mission derivatives"],
      variants: ["707-120", "707-320", "E-3 Sentry derivative lineage", "KC-135 related family roots"]
    },
    "boeing-727": {
      overview: "The 727 was designed for short and medium-haul routes, secondary airports, and conditions where a versatile trijet made commercial sense.",
      design: "Its three-engine layout, rear stairs, and good runway performance made it especially adaptable.",
      service: "The aircraft became a global short-haul icon and remained popular in cargo service long after passenger retirement.",
      specs: {
        dimensions: { Length: "Approx. 46.7 m", Wingspan: "Approx. 32.9 m", Height: "Approx. 10.4 m" },
        powerplant: { Engines: "3", "Engine type": "Pratt & Whitney JT8D low-bypass turbofan" },
        performance: { "Cruise speed": "Approx. Mach 0.84", Range: "Approx. 4,000 to 4,500 km", "Service ceiling": "42,000 ft" },
        weights: { MTOW: "Up to about 95,000 kg" },
        capacity: { Crew: "3", Passengers: "Typically around 130 to 189" }
      },
      facts: ["Classic trijet for domestic and medium-haul use", "Excellent field performance helped it serve smaller airports"],
      variants: ["727-100", "727-200"]
    },
    "boeing-737-800": {
      overview: "The 737-800 is one of the most common modern airliners and a core aircraft for both low-cost and network carriers.",
      design: "As part of the Next Generation 737 family, it stretched the 737 platform into a high-volume, highly flexible airline workhorse.",
      service: "It is used on everything from hour-long sectors to medium-haul international flying.",
      specs: {
        dimensions: { Length: "39.5 m", Wingspan: "35.8 m", Height: "12.5 m" },
        powerplant: { Engines: "2", "Engine type": "CFM56-7B turbofan" },
        performance: { "Cruise speed": "Mach 0.785", Range: "Approx. 5,400 km", "Service ceiling": "41,000 ft" },
        weights: { MTOW: "Up to about 79,000 kg" },
        capacity: { Crew: "2", Passengers: "Typical 162 to 189" }
      },
      facts: ["One of the most widely used airliners ever", "Key model for both low-cost and legacy carriers"],
      variants: ["737-700", "737-800", "737-900ER"]
    },
    "boeing-737-max": {
      overview: "The 737 MAX 8 updates Boeing's best-known narrowbody line with new engines, aerodynamic tweaks, and revised systems.",
      design: "It retains family continuity with earlier 737 generations while introducing higher-efficiency powerplants and modernized systems integration.",
      service: "The MAX 8 targets airlines that want a familiar narrowbody with lower fuel burn on short and medium-haul routes.",
      specs: {
        dimensions: { Length: "39.5 m", Wingspan: "35.9 m", Height: "12.3 m" },
        powerplant: { Engines: "2", "Engine type": "CFM LEAP-1B turbofan" },
        performance: { "Cruise speed": "Mach 0.79", Range: "Approx. 6,570 km", "Service ceiling": "41,000 ft" },
        weights: { MTOW: "Up to about 82,190 kg" },
        capacity: { Crew: "2", Passengers: "Typical 162 to 178, up to 210 in dense layout" }
      },
      facts: ["Re-engined successor to the 737NG core models", "Designed to compete directly with the A320neo family"],
      variants: ["737 MAX 7", "737 MAX 8", "737 MAX 9", "737 MAX 10"]
    },
    "boeing-747-400": {
      overview: "The 747-400 is one of the most famous widebody airliners ever built and a defining symbol of long-haul aviation.",
      design: "It refined the original 747 with updated engines, a glass cockpit, winglets, and improved range.",
      service: "The type served major airlines worldwide in passenger and cargo forms and dominated intercontinental travel for years.",
      specs: {
        dimensions: { Length: "70.7 m", Wingspan: "64.4 m", Height: "19.4 m" },
        powerplant: { Engines: "4", "Engine type": "High-bypass turbofan" },
        performance: { "Cruise speed": "Mach 0.85", Range: "Approx. 13,450 km", "Service ceiling": "45,100 ft" },
        weights: { MTOW: "Up to about 396,900 kg" },
        capacity: { Crew: "2", Passengers: "Typical around 416 to 524" }
      },
      facts: ["One of the most recognizable aircraft in aviation history", "The benchmark jumbo jet for decades"],
      variants: ["747-400 passenger", "747-400F", "747-400M", "747-400ER"]
    },
    "boeing-747-8f": {
      overview: "The 747-8 Freighter is the modern cargo-focused evolution of the 747 line and one of the largest freight aircraft in service.",
      design: "It uses a stretched fuselage, revised wing, and newer engines derived in part from Dreamliner-era technology.",
      service: "It is optimized for high-volume long-haul freight markets and outsized cargo capability.",
      specs: {
        dimensions: { Length: "76.3 m", Wingspan: "68.4 m", Height: "19.4 m" },
        powerplant: { Engines: "4", "Engine type": "GEnx-2B turbofan" },
        performance: { "Cruise speed": "Mach 0.855", Range: "Approx. 8,130 km with full payload", "Service ceiling": "43,100 ft" },
        weights: { MTOW: "Approx. 447,700 kg" },
        capacity: { Crew: "2", Payload: "Approx. 137 t class payload" }
      },
      facts: ["One of the largest dedicated freighters in service", "Carries the final major evolution of the 747 line"],
      variants: ["747-8F", "747-8 Intercontinental"]
    },
    "boeing-757-200": {
      overview: "The 757-200 is famous for pairing narrowbody economics with unusually strong takeoff performance and useful range.",
      design: "It was built for medium-haul work but proved capable on hot-and-high operations, high-demand domestic flying, and long thinner sectors.",
      service: "The type became especially beloved for transcontinental and some transatlantic operations.",
      specs: {
        dimensions: { Length: "47.3 m", Wingspan: "38.0 m", Height: "13.6 m" },
        powerplant: { Engines: "2", "Engine type": "Rolls-Royce RB211 or Pratt & Whitney PW2000 turbofan" },
        performance: { "Cruise speed": "Mach 0.80", Range: "Approx. 7,200 km", "Service ceiling": "42,000 ft" },
        weights: { MTOW: "Up to about 115,700 kg" },
        capacity: { Crew: "2", Passengers: "Typical 178 to 239" }
      },
      facts: ["Known for excellent runway and climb performance", "Still highly valued on niche missions years after production ended"],
      variants: ["757-200", "757-200F", "757-300"]
    },
    "boeing-767-300f": {
      overview: "The 767 freighter line remains one of the most commercially important mid-size cargo families in global aviation.",
      design: "It blends widebody cargo volume with twin-engine efficiency and manageable operating cost.",
      service: "The 767 freighter is especially common in parcel and express networks.",
      specs: {
        dimensions: { Length: "54.9 m", Wingspan: "47.6 m", Height: "15.8 m" },
        powerplant: { Engines: "2", "Engine type": "High-bypass turbofan" },
        performance: { "Cruise speed": "Mach 0.80", Range: "Approx. 6,000 km with freight mission profile", "Service ceiling": "43,000 ft" },
        weights: { MTOW: "Approx. 186,900 kg" },
        capacity: { Crew: "2", Payload: "Approx. 52 to 58 t class" }
      },
      facts: ["One of the main express-freight aircraft families", "Has also remained relevant as a base for military derivatives"],
      variants: ["767-300ER", "767-300F", "KC-46-derived lineage"]
    },
    "boeing-777-300er": {
      overview: "The 777-300ER became a defining long-haul airliner thanks to its combination of size, range, reliability, and twin-engine economics.",
      design: "It stretched the 777 family into a high-capacity long-haul flagship with powerful GE90 engines and excellent payload-range capability.",
      service: "Many airlines built their long-haul premium networks around the 777-300ER.",
      specs: {
        dimensions: { Length: "73.9 m", Wingspan: "64.8 m", Height: "18.5 m" },
        powerplant: { Engines: "2", "Engine type": "GE90-115B turbofan" },
        performance: { "Cruise speed": "Mach 0.84", Range: "Approx. 13,650 km", "Service ceiling": "43,100 ft" },
        weights: { MTOW: "Approx. 351,500 kg" },
        capacity: { Crew: "2", Passengers: "Typical 350 to 396" }
      },
      facts: ["One of the most commercially influential long-haul aircraft ever", "Known for strong economics on large international routes"],
      variants: ["777-200ER", "777-300ER", "777F"]
    },
    "boeing-777-9": {
      overview: "The 777-9 is Boeing's next-generation large twinjet aimed at very high-capacity long-haul flying.",
      design: "It adds a new composite wing with folding tips, updated systems, and new GE9X engines to the 777 architecture.",
      service: "The aircraft is intended for airlines that want high seat counts with modern long-haul efficiency.",
      specs: {
        dimensions: { Length: "76.7 m", Wingspan: "71.8 m unfolded", Height: "19.5 m" },
        powerplant: { Engines: "2", "Engine type": "GE9X turbofan" },
        performance: { "Cruise speed": "Approx. Mach 0.84", Range: "Approx. 13,500 km", "Service ceiling": "43,100 ft" },
        weights: { MTOW: "Approx. 351,500+ kg class" },
        capacity: { Crew: "2", Passengers: "Typical 400+" }
      },
      facts: ["Folding wingtips are one of its signature features", "Targets the top end of high-capacity twin-engine flying"],
      variants: ["777-8", "777-9", "777-8F"]
    },
    "boeing-787-8": {
      overview: "The 787-8 launched the Dreamliner family and reshaped long-haul network planning by making thinner long-distance routes more viable.",
      design: "It uses extensive composites, higher cabin humidity, larger windows, and efficient engines to improve economics and passenger comfort.",
      service: "The 787-8 is often used on long routes where widebody demand is significant but not enormous.",
      specs: {
        dimensions: { Length: "56.7 m", Wingspan: "60.1 m", Height: "17.0 m" },
        powerplant: { Engines: "2", "Engine type": "Rolls-Royce Trent 1000 or GE GEnx turbofan" },
        performance: { "Cruise speed": "Mach 0.85", Range: "Approx. 13,620 km", "Service ceiling": "43,000 ft" },
        weights: { MTOW: "Approx. 227,900 kg" },
        capacity: { Crew: "2", Passengers: "Typical 242 to 290" }
      },
      facts: ["Launched the Dreamliner family", "Known for composite structure and passenger-focused cabin improvements"],
      variants: ["787-8", "787-9", "787-10"]
    },
    "boeing-787-9": {
      overview: "The 787-9 is one of Boeing's most commercially important current widebodies and a key long-haul fleet type.",
      design: "It stretches the Dreamliner concept to deliver more capacity while preserving the family's efficient long-range profile.",
      service: "Airlines use the 787-9 on both premium intercontinental routes and thinner long-haul connections.",
      specs: {
        dimensions: { Length: "62.8 m", Wingspan: "60.1 m", Height: "17.0 m" },
        powerplant: { Engines: "2", "Engine type": "Rolls-Royce Trent 1000 or GE GEnx turbofan" },
        performance: { "Cruise speed": "Mach 0.85", Range: "Approx. 14,100 km", "Service ceiling": "43,000 ft" },
        weights: { MTOW: "Approx. 254,000 kg" },
        capacity: { Crew: "2", Passengers: "Typical 280 to 320" }
      },
      facts: ["The commercial sweet spot of the Dreamliner family", "Widely used for both network and point-to-point long-haul service"],
      variants: ["787-8", "787-9", "787-10"]
    },
    "boeing-787-10": {
      overview: "The 787-10 is the highest-capacity Dreamliner and is optimized for routes that value seats and efficiency over maximum family range.",
      design: "It stretches the family further while keeping the same basic airframe philosophy and systems architecture.",
      service: "The 787-10 is especially attractive on dense regional and long-medium-haul routes.",
      specs: {
        dimensions: { Length: "68.3 m", Wingspan: "60.1 m", Height: "17.0 m" },
        powerplant: { Engines: "2", "Engine type": "Rolls-Royce Trent 1000 or GE GEnx turbofan" },
        performance: { "Cruise speed": "Mach 0.85", Range: "Approx. 11,900 km", "Service ceiling": "43,000 ft" },
        weights: { MTOW: "Approx. 254,000 kg" },
        capacity: { Crew: "2", Passengers: "Typical 318 to 336+" }
      },
      facts: ["Largest Dreamliner variant", "Best suited to routes that don't require the longest-range family capability"],
      variants: ["787-8", "787-9", "787-10"]
    },
    "embraer-e175": {
      overview: "The E175 is one of the most popular regional jets in service and a major driver of Embraer's airline success.",
      design: "It blends a comfortable cabin, low wing loading, and efficient operations for regional networks.",
      service: "The aircraft is especially common on high-frequency routes flown by regional partners of major airlines.",
      specs: {
        dimensions: { Length: "31.7 m", Wingspan: "26.0 m", Height: "9.7 m" },
        powerplant: { Engines: "2", "Engine type": "GE CF34-8E turbofan" },
        performance: { "Cruise speed": "Mach 0.78", Range: "Approx. 3,700 km", "Service ceiling": "41,000 ft" },
        weights: { MTOW: "Approx. 38,790 kg" },
        capacity: { Crew: "2", Passengers: "Typically 76 to 88" }
      },
      facts: ["One of the most commercially successful regional jets", "Highly popular in North American feeder networks"],
      variants: ["E170", "E175", "E190", "E195"]
    },
    "embraer-e195-e2": {
      overview: "The E195-E2 is the largest and most advanced member of Embraer's E2 family.",
      design: "It adds a new wing, newer engines, and updated systems to improve fuel burn, range, and maintenance efficiency.",
      service: "It sits between classic regional jets and larger narrowbodies, ideal for thinner mainline routes.",
      specs: {
        dimensions: { Length: "41.5 m", Wingspan: "35.1 m", Height: "10.9 m" },
        powerplant: { Engines: "2", "Engine type": "Pratt & Whitney PW1900G geared turbofan" },
        performance: { "Cruise speed": "Mach 0.82", Range: "Approx. 4,800 to 5,300 km", "Service ceiling": "41,000 ft" },
        weights: { MTOW: "Approx. 61,500 kg" },
        capacity: { Crew: "2", Passengers: "Typically 120 to 146" }
      },
      facts: ["Largest E2 family member", "Competes at the lower edge of mainline narrowbody capacity"],
      variants: ["E175-E2", "E190-E2", "E195-E2"]
    },
    "embraer-kc390": {
      overview: "The KC-390 Millennium is Embraer's jet-powered tactical airlift and tanker aircraft.",
      design: "It uses a swept wing, high-mounted tail, rear cargo ramp, and modern avionics to deliver cargo capability with higher speed than many turboprop competitors.",
      service: "It is designed for transport, aerial refueling, paratroop operations, medevac, and humanitarian relief.",
      specs: {
        dimensions: { Length: "35.2 m", Wingspan: "35.0 m", Height: "11.8 m" },
        powerplant: { Engines: "2", "Engine type": "IAE V2500-E5 turbofan" },
        performance: { "Cruise speed": "Approx. 870 km/h", Range: "Approx. 2,800 km with full payload, farther on lighter missions", "Service ceiling": "36,000 ft" },
        weights: { MTOW: "Approx. 87,000 kg" },
        capacity: { Crew: "2", Payload: "Approx. 26 t class" }
      },
      facts: ["Jet tactical airlifter", "Combines transport and tanker roles in a single platform"],
      variants: ["KC-390 Millennium"]
    },
    "bombardier-crj900": {
      overview: "The CRJ900 stretched the CRJ concept into a larger regional jet that became extremely common in feeder networks.",
      design: "It preserves the narrow fuselage and rear-engine layout of the CRJ family while adding more seats and improved economics.",
      service: "The type became a familiar sight in North American regional airline operations.",
      specs: {
        dimensions: { Length: "36.4 m", Wingspan: "24.9 m", Height: "7.5 m" },
        powerplant: { Engines: "2", "Engine type": "GE CF34-8C turbofan" },
        performance: { "Cruise speed": "Approx. Mach 0.78", Range: "Approx. 2,900 km", "Service ceiling": "41,000 ft" },
        weights: { MTOW: "Approx. 38,300 kg" },
        capacity: { Crew: "2", Passengers: "Typically 76 to 90" }
      },
      facts: ["One of the most familiar regional jets", "Rear-engine layout gives the cabin a distinctive feel"],
      variants: ["CRJ700", "CRJ900", "CRJ1000"]
    },
    "bombardier-q400": {
      overview: "The Q400 pushed turboprop regional flying toward higher speed without giving up the economics that make turboprops attractive.",
      design: "It combines a large propeller-driven wing, active noise and vibration management, and a long fuselage for higher capacity.",
      service: "Operators use the Q400 on regional sectors where fuel burn matters but block time still needs to stay competitive.",
      specs: {
        dimensions: { Length: "32.8 m", Wingspan: "28.4 m", Height: "8.4 m" },
        powerplant: { Engines: "2", "Engine type": "Pratt & Whitney Canada PW150A turboprop" },
        performance: { "Cruise speed": "Approx. 660 km/h", Range: "Approx. 2,000 km", "Service ceiling": "25,000 ft" },
        weights: { MTOW: "Approx. 29,260 kg" },
        capacity: { Crew: "2", Passengers: "Typically 68 to 90" }
      },
      facts: ["Fast regional turboprop", "Well known for balancing efficiency and schedule competitiveness"],
      variants: ["Q400"]
    },
    "bombardier-global-7500": {
      overview: "The Global 7500 sits at the very top of modern business aviation and emphasizes exceptional range and cabin size.",
      design: "It combines a very large four-zone cabin, advanced wing design, and high-speed cruise capability.",
      service: "The aircraft is used on premium nonstop intercontinental corporate missions.",
      specs: {
        dimensions: { Length: "33.8 m", Wingspan: "31.8 m", Height: "8.1 m" },
        powerplant: { Engines: "2", "Engine type": "GE Passport turbofan" },
        performance: { "Cruise speed": "Up to Mach 0.925", Range: "Approx. 14,260 km", "Service ceiling": "51,000 ft" },
        weights: { MTOW: "Approx. 52,100 kg" },
        capacity: { Crew: "2 to 4", Passengers: "Typically up to 19" }
      },
      facts: ["One of the longest-range business jets in service", "A benchmark aircraft in ultra-long-range corporate travel"],
      variants: ["Global 7500", "Global 8000 lineage"]
    },
    "cessna-172": {
      overview: "The Cessna 172 Skyhawk is one of the most famous light aircraft ever built and a worldwide training standard.",
      design: "Its high wing, forgiving handling, and simple operating philosophy made it ideal for training and private ownership.",
      service: "It is used by flying schools, clubs, personal owners, and utility operators around the world.",
      specs: {
        dimensions: { Length: "8.3 m", Wingspan: "11.0 m", Height: "2.7 m" },
        powerplant: { Engines: "1", "Engine type": "Lycoming piston engine" },
        performance: { "Cruise speed": "Approx. 226 km/h", Range: "Approx. 1,180 km", "Service ceiling": "14,000 ft" },
        weights: { MTOW: "Approx. 1,157 kg" },
        capacity: { Crew: "1", Passengers: "Up to 3 more occupants" }
      },
      facts: ["One of the most produced aircraft in history", "A major gateway aircraft for pilot training"],
      variants: ["172 classic line", "172S Skyhawk"]
    },
    "cessna-caravan": {
      overview: "The Caravan is a famous single-engine turboprop utility aircraft used for everything from bush flying to package freight.",
      design: "It uses a fixed landing gear, spacious cabin, and tough airframe to support demanding utility missions.",
      service: "Operators use it for passengers, cargo, skydiving, humanitarian flying, and remote air service.",
      specs: {
        dimensions: { Length: "12.7 m", Wingspan: "15.9 m", Height: "4.5 m" },
        powerplant: { Engines: "1", "Engine type": "Pratt & Whitney Canada PT6A turboprop" },
        performance: { "Cruise speed": "Approx. 340 km/h", Range: "Approx. 1,700 km", "Service ceiling": "25,000 ft" },
        weights: { MTOW: "Approx. 3,970 kg to 3,995 kg class depending on model" },
        capacity: { Crew: "1 or 2", Passengers: "Typically up to 9 to 14 depending on layout and rules" }
      },
      facts: ["One of the best-known utility turboprops ever built", "Used heavily in cargo and remote service missions"],
      variants: ["208 Caravan", "208B Grand Caravan", "EX line"]
    },
    "cessna-longitude": {
      overview: "The Citation Longitude is one of Cessna's most capable business jets, aimed at the super-midsize market.",
      design: "It pairs a stand-up cabin with long range, modern avionics, and a clean-sheet aerodynamic profile in its class.",
      service: "The jet is meant for premium coast-to-coast and transcontinental business flying.",
      specs: {
        dimensions: { Length: "22.3 m", Wingspan: "21.0 m", Height: "6.2 m" },
        powerplant: { Engines: "2", "Engine type": "Honeywell HTF7700L turbofan" },
        performance: { "Cruise speed": "Approx. Mach 0.84", Range: "Approx. 6,500 km", "Service ceiling": "45,000 ft" },
        weights: { MTOW: "Approx. 17,900 kg" },
        capacity: { Crew: "2", Passengers: "Typically up to 12" }
      },
      facts: ["Cessna's super-midsize flagship", "Targets long-range business travel with a quieter cabin and modern flight deck"],
      variants: ["Citation Longitude"]
    },
    "gulfstream-g650er": {
      overview: "The G650ER became a benchmark ultra-long-range business jet and is associated with top-tier global business travel.",
      design: "It combines a very high-speed cruise, long slender wing, large cabin, and long range in one platform.",
      service: "Its missions are centered on nonstop intercontinental travel with premium comfort and speed.",
      specs: {
        dimensions: { Length: "30.4 m", Wingspan: "30.4 m", Height: "7.8 m" },
        powerplant: { Engines: "2", "Engine type": "Rolls-Royce BR725 turbofan" },
        performance: { "Cruise speed": "Up to Mach 0.925", Range: "Approx. 13,900 km", "Service ceiling": "51,000 ft" },
        weights: { MTOW: "Approx. 45,200 kg" },
        capacity: { Crew: "2 to 4", Passengers: "Typically up to 19" }
      },
      facts: ["A defining ultra-long-range business jet", "Known for both speed and range leadership"],
      variants: ["G650", "G650ER"]
    },
    "gulfstream-g700": {
      overview: "The G700 represents Gulfstream's modern flagship philosophy with a very large cabin and exceptional range.",
      design: "It uses a large-cabin fuselage, new wing architecture, and efficient high-speed engines to maximize premium long-range capability.",
      service: "The aircraft is aimed at the most demanding business aviation missions in the market.",
      specs: {
        dimensions: { Length: "33.5 m", Wingspan: "31.4 m", Height: "7.8 m" },
        powerplant: { Engines: "2", "Engine type": "Rolls-Royce Pearl 700 turbofan" },
        performance: { "Cruise speed": "Approx. Mach 0.90, max Mach 0.935", Range: "Approx. 13,900 km", "Service ceiling": "51,000 ft" },
        weights: { MTOW: "Approx. 48,200 kg" },
        capacity: { Crew: "2 to 4", Passengers: "Typically up to 19" }
      },
      facts: ["Current flagship-class Gulfstream", "Known for a huge cabin and long-range performance"],
      variants: ["G700", "G800 family connection"]
    },
    "lockheed-f16v": {
      overview: "The F-16V is the latest major evolution of one of the world's most successful multirole fighters.",
      design: "It builds on the lightweight F-16 concept with advanced avionics, radar, and systems upgrades.",
      service: "The platform is still central to many air forces for air defense, multirole strike, and training progression.",
      specs: {
        dimensions: { Length: "15.0 m", Wingspan: "9.96 m", Height: "4.9 m" },
        powerplant: { Engines: "1", "Engine type": "Afterburning turbofan" },
        performance: { "Max speed": "Approx. Mach 2.0", Range: "Ferry range roughly 4,200 km with tanks", "Service ceiling": "50,000+ ft" },
        weights: { MTOW: "Approx. 19,000 kg class" },
        capacity: { Crew: "1 or 2 depending on configuration" }
      },
      facts: ["One of the most successful fighters in aviation history", "F-16V adds major avionics modernization"],
      variants: ["Single-seat and two-seat F-16 variants", "V-standard upgrades"]
    },
    "lockheed-f22": {
      overview: "The F-22 Raptor is a fifth-generation air superiority fighter optimized for stealth, supercruise, and high-end air combat.",
      design: "It combines low observability, thrust-vectoring performance, and advanced sensor integration.",
      service: "The aircraft is focused on securing air dominance in contested environments.",
      specs: {
        dimensions: { Length: "18.9 m", Wingspan: "13.6 m", Height: "5.1 m" },
        powerplant: { Engines: "2", "Engine type": "Pratt & Whitney F119 afterburning turbofan" },
        performance: { "Max speed": "Approx. Mach 2.0+", Range: "Approx. 3,000 km ferry class", "Service ceiling": "65,000 ft" },
        weights: { MTOW: "Approx. 38,000 kg" },
        capacity: { Crew: "1" }
      },
      facts: ["Stealth air-dominance specialist", "Known for supercruise and thrust-vector agility"],
      variants: ["F-22A"]
    },
    "lockheed-f35a": {
      overview: "The F-35A is the conventional-takeoff member of the Joint Strike Fighter family and one of the most complex combat aircraft in service.",
      design: "It centers on stealth shaping, sensor fusion, software-driven capability, and multi-role mission flexibility.",
      service: "The aircraft is used by allied air forces for strike, air defense, and data-rich networked missions.",
      specs: {
        dimensions: { Length: "15.7 m", Wingspan: "10.7 m", Height: "4.4 m" },
        powerplant: { Engines: "1", "Engine type": "Pratt & Whitney F135 afterburning turbofan" },
        performance: { "Max speed": "Approx. Mach 1.6", Range: "Approx. 2,200 km class", "Service ceiling": "50,000+ ft" },
        weights: { MTOW: "Approx. 31,800 kg" },
        capacity: { Crew: "1" }
      },
      facts: ["Centers on sensor fusion as much as raw performance", "The most widely exported fifth-generation fighter family"],
      variants: ["F-35A", "F-35B", "F-35C"]
    },
    "lockheed-c130j": {
      overview: "The C-130J Super Hercules is the modernized version of one of the most versatile tactical airlifters ever built.",
      design: "It updates the Hercules concept with new turboprops, six-bladed propellers, digital avionics, and improved performance.",
      service: "The aircraft supports transport, tanker, special operations, medevac, firefighting, and humanitarian missions.",
      specs: {
        dimensions: { Length: "29.8 m", Wingspan: "40.4 m", Height: "11.9 m" },
        powerplant: { Engines: "4", "Engine type": "Rolls-Royce AE 2100D3 turboprop" },
        performance: { "Cruise speed": "Approx. 670 km/h", Range: "Approx. 3,300 km with useful payload", "Service ceiling": "28,000 ft+" },
        weights: { MTOW: "Approx. 74,400 kg" },
        capacity: { Crew: "Usually 2 to 5 depending on mission", Payload: "Approx. 20 t class" }
      },
      facts: ["One of the most versatile military aircraft families ever", "Used for far more than standard cargo airlift"],
      variants: ["C-130J-30", "KC-130J", "MC-130J", "AC-130J"]
    },
    "northrop-b2": {
      overview: "The B-2 Spirit is a flying-wing stealth bomber built for long-range penetration and strategic strike.",
      design: "Its tailless flying wing reduces radar signature and supports long-duration missions with large internal payload volume.",
      service: "The B-2 is designed for strategic missions in highly defended airspace.",
      specs: {
        dimensions: { Length: "21.0 m", Wingspan: "52.4 m", Height: "5.2 m" },
        powerplant: { Engines: "4", "Engine type": "General Electric F118 turbofan" },
        performance: { "Cruise speed": "High subsonic", Range: "Intercontinental with refueling support", "Service ceiling": "50,000 ft class" },
        weights: { MTOW: "Approx. 170,600 kg" },
        capacity: { Crew: "2", Payload: "Internal strategic weapons load" }
      },
      facts: ["One of the most distinctive aircraft ever built", "Flying-wing design optimized for low observability"],
      variants: ["B-2 Spirit"]
    },
    "northrop-b21": {
      overview: "The B-21 Raider is the next-generation American stealth bomber intended to succeed aging strategic strike platforms.",
      design: "It follows a flying-wing stealth approach with a stronger emphasis on adaptability, digital sustainment, and future mission growth.",
      service: "The aircraft is intended for long-range strike in contested environments over decades of future service.",
      specs: {
        dimensions: { Length: "Not fully public", Wingspan: "Not fully public", Height: "Not fully public" },
        powerplant: { Engines: "Undisclosed", "Engine type": "Stealth bomber turbofan configuration" },
        performance: { "Cruise speed": "Undisclosed high-subsonic class", Range: "Long-range strategic mission", "Service ceiling": "Undisclosed" },
        weights: { MTOW: "Undisclosed" },
        capacity: { Crew: "Expected 2", Payload: "Strategic internal load" }
      },
      facts: ["Future strategic stealth bomber", "Aims for maintainability and long-term growth as well as stealth"],
      variants: ["B-21 Raider"]
    },
    "dassault-rafale-f4": {
      overview: "The Rafale is Dassault's omnirole fighter, designed to cover air-to-air, strike, reconnaissance, and naval missions in one family.",
      design: "It combines a delta-canard layout with advanced sensors, data links, and continuous software modernization.",
      service: "It is used as both a land-based and carrier-capable fighter.",
      specs: {
        dimensions: { Length: "15.3 m", Wingspan: "10.9 m", Height: "5.3 m" },
        powerplant: { Engines: "2", "Engine type": "Safran M88 afterburning turbofan" },
        performance: { "Max speed": "Approx. Mach 1.8", Range: "Ferry range around 3,700 km class", "Service ceiling": "50,000+ ft" },
        weights: { MTOW: "Approx. 24,500 kg" },
        capacity: { Crew: "1 or 2 depending on version" }
      },
      facts: ["True multi-role design with strong naval integration", "F4 standard is a major software and systems step"],
      variants: ["Rafale C", "Rafale B", "Rafale M", "F4 standard"]
    },
    "dassault-falcon-8x": {
      overview: "The Falcon 8X is Dassault's long-range tri-jet business aircraft with strong runway flexibility and premium comfort.",
      design: "It combines a long-range swept wing with three engines and a highly customizable intercontinental cabin.",
      service: "It is used for premium long-range corporate missions and specialized government transport.",
      specs: {
        dimensions: { Length: "24.5 m", Wingspan: "26.2 m", Height: "7.9 m" },
        powerplant: { Engines: "3", "Engine type": "Pratt & Whitney Canada PW307D turbofan" },
        performance: { "Cruise speed": "Approx. Mach 0.90", Range: "Approx. 11,900 km", "Service ceiling": "51,000 ft" },
        weights: { MTOW: "Approx. 33,100 kg" },
        capacity: { Crew: "2 to 3", Passengers: "Typically up to 16" }
      },
      facts: ["Tri-jet business jet", "Known for long range and airport flexibility"],
      variants: ["Falcon 7X", "Falcon 8X", "Falcon 10X lineage"]
    },
    "mdd-dc10": {
      overview: "The DC-10 was one of the best-known widebody trijets of the classic long-haul airline era.",
      design: "Its trijet layout balanced long-range needs, airport compatibility, and then-current engine and certification realities.",
      service: "The aircraft served airlines, freighter operators, military users, and tanker derivatives.",
      specs: {
        dimensions: { Length: "Approx. 55.5 m", Wingspan: "Approx. 50.4 m", Height: "Approx. 17.7 m" },
        powerplant: { Engines: "3", "Engine type": "High-bypass turbofan" },
        performance: { "Cruise speed": "Approx. Mach 0.84", Range: "Approx. 6,000 to 10,000+ km depending on series", "Service ceiling": "42,000 ft" },
        weights: { MTOW: "Up to about 263,000 kg class" },
        capacity: { Crew: "3 on early generations", Passengers: "Typically around 250 to 380" }
      },
      facts: ["One of the defining classic trijets", "Later became an important tanker and freighter platform"],
      variants: ["DC-10-10", "DC-10-30", "MD-10 conversion line", "KC-10 derivative"]
    },
    "mdd-md11": {
      overview: "The MD-11 was the final major commercial trijet and is especially remembered today in cargo service.",
      design: "It refined the DC-10 concept with updated aerodynamics, a glass cockpit, and more range.",
      service: "Passenger service declined earlier than hoped, but freight operators kept the type highly visible for years.",
      specs: {
        dimensions: { Length: "61.2 m", Wingspan: "51.7 m", Height: "17.6 m" },
        powerplant: { Engines: "3", "Engine type": "High-bypass turbofan" },
        performance: { "Cruise speed": "Approx. Mach 0.86", Range: "Approx. 12,000+ km passenger mission class", "Service ceiling": "43,000 ft" },
        weights: { MTOW: "Approx. 286,000 kg class" },
        capacity: { Crew: "2", Passengers: "Typical 285 to 410" }
      },
      facts: ["The last major commercial trijet", "Highly visible in cargo operations after passenger retirement"],
      variants: ["MD-11", "MD-11F", "MD-11C"]
    },
    "mdd-md80": {
      overview: "The MD-80 family was one of the most familiar short-haul jets of the late 20th century.",
      design: "It retained the rear-engine T-tail philosophy of earlier Douglas narrowbodies while improving range, efficiency, and capacity.",
      service: "The aircraft became a domestic fleet backbone for several major airlines.",
      specs: {
        dimensions: { Length: "Approx. 45.1 m", Wingspan: "32.9 m", Height: "9.1 m" },
        powerplant: { Engines: "2", "Engine type": "Pratt & Whitney JT8D turbofan" },
        performance: { "Cruise speed": "Approx. Mach 0.76", Range: "Approx. 2,900 to 4,600 km depending on series", "Service ceiling": "37,000 ft" },
        weights: { MTOW: "Up to about 72,500 kg class" },
        capacity: { Crew: "2", Passengers: "Typically 130 to 172" }
      },
      facts: ["A major domestic workhorse in the United States and elsewhere", "Known for its rear-engine narrowbody profile"],
      variants: ["MD-81", "MD-82", "MD-83", "MD-88", "MD-90 lineage"]
    }
  };

  const historyMilestones = [
    { year: "1783", era: "Lighter-Than-Air Dawn", title: "Montgolfier Balloon Flight", summary: "Human aviation begins with the first crewed hot-air balloon ascents.", highlight: "The dream of flight becomes visible." },
    { year: "1903", era: "Powered Flight", title: "Wright Flyer Takes Off", summary: "The Wright brothers combine propulsion and control into the first sustained powered flight.", highlight: "Flight becomes steerable, not just possible." },
    { year: "1939", era: "Jet Era Begins", title: "First Turbojet Aircraft Flies", summary: "Jet propulsion opens a new performance envelope in aviation.", highlight: "A new speed and altitude ceiling appears." },
    { year: "1952", era: "Jetliners For The Public", title: "The Jet Airliner Arrives", summary: "Commercial aviation begins compressing global travel times at scale.", highlight: "Distance starts to feel smaller." },
    { year: "2020s", era: "Sustainable Transition", title: "Hydrogen, SAF, Electric, And New Layouts", summary: "The industry turns toward emissions reduction and new energy systems.", highlight: "Future aviation is also an energy story." }
  ];

  const futureSignals = [
    { title: "Hydrogen Airframes", tag: "Energy Shift", summary: "Expect more work around cryogenic storage, redesigned fuselages, and new airport support systems." },
    { title: "Blended Wing Bodies", tag: "Layout Rethink", summary: "Wide lifting bodies could improve efficiency, but they challenge cabin layout and airport compatibility." },
    { title: "Autonomous Assistance", tag: "Software Layer", summary: "Flight decks will likely gain more predictive assistance before full autonomy becomes realistic." },
    { title: "Regional Electrification", tag: "Short-Haul Labs", summary: "Training and short-hop aircraft are likely to be early proving grounds for electric propulsion." }
  ];

  function mergeSpecs(baseSpecs, overrideSpecs) {
    const merged = {};
    ["dimensions", "powerplant", "performance", "weights", "capacity"].forEach((group) => {
      if (baseSpecs[group] || (overrideSpecs && overrideSpecs[group])) {
        merged[group] = {
          ...(baseSpecs[group] || {}),
          ...((overrideSpecs && overrideSpecs[group]) || {})
        };
      }
    });
    return merged;
  }

  function buildFallbackArticle(aircraft, manufacturer) {
    const classProfile = technicalProfilesByClass[aircraft.class] || technicalProfilesByClass.Experimental;
    return {
      overview: `${aircraft.name} is featured here as a ${aircraft.type.toLowerCase()} from ${manufacturer.name}. This page surfaces the main role, design context, and technical profile for quick comparison across the aviation wiki.`,
      design: `${manufacturer.name} positions this aircraft within the ${aircraft.class.toLowerCase()} space. The program is associated with the ${aircraft.timeline.toLowerCase()} and reflects the company's approach to mission, efficiency, and systems integration.`,
      service: `In service terms, ${aircraft.name} fits the ${aircraft.programState.toLowerCase()} phase of the aviation catalog. Operators and exact mission details can vary by version, but the aircraft sits clearly inside the ${aircraft.class.toLowerCase()} category.`,
      specs: classProfile,
      facts: [
        `Manufacturer: ${manufacturer.name}`,
        `Aircraft class: ${aircraft.class}`,
        `Timeline band: ${aircraft.timeline}`,
        `Program state: ${aircraft.programState}`
      ],
      variants: ["Variant details can be expanded further for this program."],
      notableOperators: ["Operator examples can be added program-by-program as the wiki grows."]
    };
  }

  function enrichAircraft(aircraft, manufacturer) {
    const fallback = buildFallbackArticle(aircraft, manufacturer);
    const override = aircraftArticles[aircraft.id] || {};

    return {
      ...aircraft,
      detail: {
        overview: override.overview || fallback.overview,
        design: override.design || fallback.design,
        service: override.service || fallback.service,
        specs: mergeSpecs(fallback.specs, override.specs || {}),
        facts: override.facts || fallback.facts,
        variants: override.variants || fallback.variants,
        notableOperators: override.notableOperators || fallback.notableOperators
      }
    };
  }

  const manufacturers = rawManufacturers.map((manufacturer) => ({
    ...manufacturer,
    aircraft: manufacturer.aircraft.map((aircraft) => enrichAircraft(aircraft, manufacturer))
  }));

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
