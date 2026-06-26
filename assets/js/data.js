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
          id: "airbus-a350-1000",
          name: "A350-1000",
          firstFlight: "2016",
          timeline: "Digital Age",
          type: "Widebody airliner",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "Airbus built the A350 family around composite structure, efficient engines, and long-range airline economics."
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
          id: "boeing-737-max",
          name: "737 MAX",
          firstFlight: "2016",
          timeline: "Digital Age",
          type: "Narrowbody airliner",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "The 737 MAX continues Boeing's long-running narrowbody line with updated engines and revised systems."
        },
        {
          id: "boeing-787-9",
          name: "787-9 Dreamliner",
          firstFlight: "2013",
          timeline: "Digital Age",
          type: "Widebody airliner",
          class: "Commercial Jet",
          programState: "Current program",
          overview: "The 787 family pushed composite airliner construction into the mainstream and reshaped long-haul route planning."
        },
        {
          id: "boeing-777-9",
          name: "777-9",
          firstFlight: "2020",
          timeline: "Next Horizon",
          type: "Widebody airliner",
          class: "Commercial Jet",
          programState: "Advanced development",
          overview: "The 777-9 represents the next step in Boeing's large twinjet strategy, blending folding wingtips and updated long-range efficiency."
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
          id: "bombardier-challenger-650",
          name: "Challenger 650",
          firstFlight: "2015",
          timeline: "Digital Age",
          type: "Large-cabin business jet",
          class: "Business Jet",
          programState: "Current program",
          overview: "The Challenger 650 emphasizes cabin comfort, dispatch reliability, and a strong transcontinental mission profile."
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
      id: "diamond",
      name: "Diamond Aircraft",
      country: "Austria",
      founded: "1981",
      status: "Active",
      category: "Business & General Aviation",
      aircraftFocus: ["Trainer", "Composite piston", "Hybrid-electric"],
      summary: "Diamond Aircraft is known for efficient composite trainers and research into lower-emission propulsion paths.",
      aircraft: [
        {
          id: "diamond-da40-ng",
          name: "DA40 NG",
          firstFlight: "2002 lineage",
          timeline: "Digital Age",
          type: "Training / touring single",
          class: "Trainer",
          programState: "Current program",
          overview: "The DA40 NG is widely used for modern flight training thanks to its visibility, composite structure, and operating efficiency."
        },
        {
          id: "diamond-da62",
          name: "DA62",
          firstFlight: "2012",
          timeline: "Digital Age",
          type: "Twin-engine touring aircraft",
          class: "General Aviation",
          programState: "Current program",
          overview: "The DA62 combines sleek aerodynamics, a glass cockpit, and efficient powerplants in a premium piston twin layout."
        },
        {
          id: "diamond-eda40",
          name: "eDA40",
          firstFlight: "Future",
          timeline: "Next Horizon",
          type: "Electric trainer",
          class: "Experimental",
          programState: "Future direction",
          overview: "The eDA40 signals Diamond's push toward electric primary training and a lower-noise, lower-emission operating model."
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
      id: "daher",
      name: "Daher",
      country: "France",
      founded: "1863",
      status: "Active",
      category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Utility turboprop", "Backcountry"],
      summary: "Daher combines the fast TBM line with the rugged Kodiak family, covering both executive speed and adventurous utility flying.",
      aircraft: [
        {
          id: "daher-tbm-960",
          name: "TBM 960",
          firstFlight: "2022 variant",
          timeline: "Next Horizon",
          type: "High-speed personal turboprop",
          class: "General Aviation",
          programState: "Current generation",
          overview: "The TBM 960 is designed for owner-flown speed, advanced avionics, and efficient point-to-point travel."
        },
        {
          id: "daher-kodiak-100",
          name: "Kodiak 100",
          firstFlight: "2004",
          timeline: "Digital Age",
          type: "Backcountry utility turboprop",
          class: "General Aviation",
          programState: "Current program",
          overview: "The Kodiak 100 focuses on rugged short-field capability for cargo, charter, humanitarian, and expedition flying."
        },
        {
          id: "daher-kodiak-900",
          name: "Kodiak 900",
          firstFlight: "2022",
          timeline: "Next Horizon",
          type: "Utility turboprop",
          class: "General Aviation",
          programState: "Current generation",
          overview: "The Kodiak 900 stretches the Kodiak concept toward more speed and capacity while keeping its practical utility roots."
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
      id: "ilyushin",
      name: "Ilyushin",
      country: "Russia",
      founded: "1933",
      status: "Active",
      category: "Regional & Utility",
      aircraftFocus: ["Military Transport", "Airliner", "Utility transport"],
      summary: "Ilyushin has long been associated with transports and airliners designed for resilience, payload, and broad state-service use.",
      aircraft: [
        {
          id: "ilyushin-il76md90a",
          name: "Il-76MD-90A",
          firstFlight: "2012 variant",
          timeline: "Digital Age",
          type: "Strategic airlifter",
          class: "Military Transport",
          programState: "Current program",
          overview: "The updated Il-76MD-90A continues a long-running heavy transport family with new engines and revised systems."
        },
        {
          id: "ilyushin-il96-400m",
          name: "Il-96-400M",
          firstFlight: "2020s",
          timeline: "Next Horizon",
          type: "Widebody airliner",
          class: "Commercial Jet",
          programState: "Current generation",
          overview: "The Il-96-400M revisits Ilyushin's long-range airliner line with modernization aimed at sustained state and specialized roles."
        },
        {
          id: "ilyushin-il114-300",
          name: "Il-114-300",
          firstFlight: "2020s",
          timeline: "Next Horizon",
          type: "Regional turboprop",
          class: "Regional Turboprop",
          programState: "Current generation",
          overview: "The Il-114-300 is positioned as a short-haul turboprop for regional connectivity and austere operating environments."
        }
      ]
    },
    {
      id: "tupolev",
      name: "Tupolev",
      country: "Russia",
      founded: "1922",
      status: "Active",
      category: "Military & Defense",
      aircraftFocus: ["Airliner", "Strategic bomber", "Special mission"],
      summary: "Tupolev spans civil jets and strategic bombers, making it one of the most historically consequential Soviet and Russian design bureaus.",
      aircraft: [
        {
          id: "tupolev-tu204",
          name: "Tu-204",
          firstFlight: "1989",
          timeline: "Jet Age",
          type: "Narrowbody airliner",
          class: "Commercial Jet",
          programState: "Legacy line",
          overview: "The Tu-204 was designed as a modern twinjet successor to older Soviet medium-haul aircraft families."
        },
        {
          id: "tupolev-tu214",
          name: "Tu-214",
          firstFlight: "1996",
          timeline: "Digital Age",
          type: "Narrowbody airliner / special mission platform",
          class: "Commercial Jet",
          programState: "Current line",
          overview: "The Tu-214 has served as both a civil airliner and the basis for government and special mission configurations."
        },
        {
          id: "tupolev-tu160m",
          name: "Tu-160M",
          firstFlight: "1981 lineage",
          timeline: "Jet Age",
          type: "Supersonic strategic bomber",
          class: "Military Transport",
          programState: "Current strategic line",
          overview: "The Tu-160M continues one of the fastest and most dramatic bomber designs ever fielded."
        }
      ]
    },
    {
      id: "hal",
      name: "Hindustan Aeronautics Limited",
      country: "India",
      founded: "1940",
      status: "Active",
      category: "Military & Defense",
      aircraftFocus: ["Fighter", "Trainer", "Utility transport"],
      summary: "HAL is central to India's indigenous aerospace ecosystem, building fighters, trainers, and utility aircraft for national programs.",
      aircraft: [
        {
          id: "hal-tejas-mk1a",
          name: "Tejas Mk1A",
          firstFlight: "2001 lineage",
          timeline: "Digital Age",
          type: "Light combat aircraft",
          class: "Fighter",
          programState: "Current program",
          overview: "The Tejas program represents India's effort to field a domestic light fighter with modern avionics and multirole capability."
        },
        {
          id: "hal-htt40",
          name: "HTT-40",
          firstFlight: "2016",
          timeline: "Digital Age",
          type: "Basic trainer",
          class: "Trainer",
          programState: "Current program",
          overview: "The HTT-40 is part of HAL's drive to support indigenous pilot training with a locally developed platform."
        },
        {
          id: "hal-do228",
          name: "Do-228",
          firstFlight: "1981 lineage",
          timeline: "Jet Age",
          type: "Utility transport",
          class: "Military Transport",
          programState: "Current mission line",
          overview: "Built in India for multiple roles, the Do-228 remains useful for transport, patrol, and light logistics tasks."
        }
      ]
    },
    {
      id: "chengdu",
      name: "Chengdu Aircraft Corporation",
      country: "China",
      founded: "1958",
      status: "Active",
      category: "Military & Defense",
      aircraftFocus: ["Fighter", "Stealth fighter", "Export fighter"],
      summary: "Chengdu has become one of China's flagship fighter manufacturers, moving from lightweight combat aircraft to stealth designs.",
      aircraft: [
        {
          id: "chengdu-j10c",
          name: "J-10C",
          firstFlight: "1998 lineage",
          timeline: "Digital Age",
          type: "Multirole fighter",
          class: "Fighter",
          programState: "Current program",
          overview: "The J-10C is an evolved lightweight fighter with updated sensors, weapons, and multirole flexibility."
        },
        {
          id: "chengdu-j20",
          name: "J-20",
          firstFlight: "2011",
          timeline: "Next Horizon",
          type: "Stealth fighter",
          class: "Fighter",
          programState: "Current generation",
          overview: "The J-20 marks Chengdu's transition into long-range stealth fighter design with a distinct configuration and mission profile."
        },
        {
          id: "chengdu-jf17",
          name: "JF-17 Block III",
          firstFlight: "2003 lineage",
          timeline: "Digital Age",
          type: "Export multirole fighter",
          class: "Fighter",
          programState: "Current program",
          overview: "The JF-17 family reflects Chengdu's role in affordable fighter solutions aimed at export and cooperative development."
        }
      ]
    },
    {
      id: "shenyang",
      name: "Shenyang Aircraft Corporation",
      country: "China",
      founded: "1951",
      status: "Active",
      category: "Military & Defense",
      aircraftFocus: ["Fighter", "Carrier fighter", "Stealth fighter"],
      summary: "Shenyang has built major Chinese fighter families across carrier operations, strike roles, and newer low-observable concepts.",
      aircraft: [
        {
          id: "shenyang-j15",
          name: "J-15",
          firstFlight: "2009",
          timeline: "Digital Age",
          type: "Carrier-based fighter",
          class: "Fighter",
          programState: "Current program",
          overview: "The J-15 gives Shenyang a navalized fighter role with carrier launch and recovery capability."
        },
        {
          id: "shenyang-j16",
          name: "J-16",
          firstFlight: "2011",
          timeline: "Digital Age",
          type: "Strike fighter",
          class: "Fighter",
          programState: "Current program",
          overview: "The J-16 expands the heavy fighter concept into an advanced strike and electronic warfare-capable platform."
        },
        {
          id: "shenyang-j35",
          name: "J-35",
          firstFlight: "2020s",
          timeline: "Next Horizon",
          type: "Stealth fighter",
          class: "Fighter",
          programState: "Current generation",
          overview: "The J-35 represents Shenyang's move into carrier-capable stealth fighter design and future air combat concepts."
        }
      ]
    },
    {
      id: "beriev",
      name: "Beriev",
      country: "Russia",
      founded: "1934",
      status: "Active",
      category: "Special Mission & Amphibious",
      aircraftFocus: ["Amphibian", "Firefighting", "Special mission"],
      summary: "Beriev is uniquely associated with amphibious aircraft and special mission designs built around water operations and national service roles.",
      aircraft: [
        {
          id: "beriev-be200",
          name: "Be-200 Altair",
          firstFlight: "1998",
          timeline: "Digital Age",
          type: "Amphibious firefighting aircraft",
          class: "Amphibian",
          programState: "Current program",
          overview: "The Be-200 can scoop water from lakes or seas and shift quickly between firefighting, rescue, and transport missions."
        },
        {
          id: "beriev-a50u",
          name: "A-50U",
          firstFlight: "1980s lineage",
          timeline: "Jet Age",
          type: "Airborne early warning aircraft",
          class: "ISR",
          programState: "Current mission line",
          overview: "The A-50U shows Beriev's parallel role in modifying large aircraft into airborne command and surveillance platforms."
        },
        {
          id: "beriev-be103",
          name: "Be-103",
          firstFlight: "1997",
          timeline: "Digital Age",
          type: "Light amphibian",
          class: "Amphibian",
          programState: "Specialized program",
          overview: "The Be-103 demonstrates Beriev's interest in smaller amphibious utility flying alongside its larger mission aircraft."
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
