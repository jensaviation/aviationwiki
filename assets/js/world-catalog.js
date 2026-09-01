(function () {
  "use strict";

  const ICAO_SOURCE = {
    name: "ICAO Aircraft Type Designators (Doc 8643)",
    url: "https://www.icao.int/operational-safety/doc-8643-aircraft-type-designators/search"
  };

  function slugify(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function inferTimeline(firstFlight) {
    const match = String(firstFlight).match(/\d{4}/);
    if (!match) return /future|development|planned/i.test(String(firstFlight)) ? "Next Horizon" : "Digital Age";
    const year = Number(match[0]);
    if (year < 1946) return "Foundational";
    if (year < 1995) return "Jet Age";
    return "Digital Age";
  }

  function parseModels(specification) {
    return specification
      .split(";")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const fields = entry.split("|").map((value) => value.trim());
        const [name, firstFlight = "Documented", dimensions = ""] = fields;
        const programState = fields.slice(3).find(Boolean) || "Documented variant";
        const [length, wingspan, height] = dimensions.split(",").map((value) => value.trim());
        return {
          name,
          firstFlight,
          programState,
          dimensions: length && wingspan && height
            ? { Length: length, Wingspan: wingspan, Height: height }
            : undefined
        };
      });
  }

  function family(name, className, type, models, options = {}) {
    return {
      name,
      className,
      type,
      models: parseModels(models),
      ...options
    };
  }

  function manufacturer({
    id,
    name,
    country,
    founded = "Documented",
    status = "Historic and current catalogue",
    category,
    aircraftFocus,
    summary,
    source = ICAO_SOURCE,
    families
  }) {
    const aircraft = families.flatMap((aircraftFamily) =>
      aircraftFamily.models.map((model, index) => {
        const type = aircraftFamily.type;
        const className = aircraftFamily.className;
        const timeline = aircraftFamily.timeline || inferTimeline(model.firstFlight);
        const modelSource = aircraftFamily.source || source;
        return {
          id: `${id}-${slugify(model.name)}`,
          name: model.name,
          familyName: aircraftFamily.name,
          familySort: index + 1,
          firstFlight: model.firstFlight,
          timeline,
          type,
          class: className,
          programState: model.programState,
          overview: `${model.name} is a documented ${type.toLowerCase()} in the ${aircraftFamily.name} from ${name}. It is listed separately because it represents a recognised production version, military designation, or historically significant variant.`,
          dimensions: model.dimensions,
          source: modelSource
        };
      })
    );

    return {
      id,
      name,
      country,
      founded,
      status,
      category,
      aircraftFocus,
      summary,
      source,
      aircraft
    };
  }

  const establishedManufacturers = [
    manufacturer({
      id: "airbus", name: "Airbus", country: "Europe", founded: "1970", category: "Commercial Airliner",
      aircraftFocus: ["Commercial Jet", "Widebody", "Freighter"],
      summary: "Airbus produces single-aisle, widebody, freighter, and special-mission aircraft for operators worldwide.",
      source: { name: "Airbus aircraft catalogue", url: "https://www.aircraft.airbus.com/en/aircraft" },
      families: [
        family("A220 Family", "Commercial Jet", "Narrowbody airliner", "A220-100|2013|35.0 m,35.1 m,11.5 m; A220-300|2015|38.7 m,35.1 m,11.5 m"),
        family("A300 Family", "Commercial Jet", "Widebody airliner", "A300B2|1972; A300B4-200|1974; A300-600|1983; A300-600R|1987; A300-600F|1993"),
        family("A310 Family", "Commercial Jet", "Widebody airliner", "A310-200|1982; A310-300|1985"),
        family("A320 Family", "Commercial Jet", "Narrowbody airliner", "A318-100|2002; A319-100|1995; A319neo|2017; A320-200|1987; A320neo|2014; A321-200|1993; A321neo|2016; A321LR|2018; A321XLR|2022"),
        family("A330 Family", "Commercial Jet", "Widebody airliner", "A330-200F|2009; A330-800neo|2018; A330-900neo|2017"),
        family("Airbus Tanker Family", "Tanker", "Aerial refueling tanker", "A310 MRTT|2003; A330 MRTT|2007; A330 MRTT+|In development|||Advanced development"),
        family("A350 Family", "Commercial Jet", "Widebody airliner", "A350-900ULR|2018; A350-1000|2016; A350F|In development|||Advanced development"),
        family("A380 Family", "Commercial Jet", "Very large airliner", "A380-800|2005|72.7 m,79.8 m,24.1 m")
      ]
    }),
    manufacturer({
      id: "boeing", name: "Boeing", country: "United States", founded: "1916", category: "Commercial Airliner",
      aircraftFocus: ["Commercial Jet", "Cargo", "Historic aircraft"],
      summary: "Boeing's catalogue spans pioneering transports, classic jetliners, modern widebodies, and major military programs.",
      source: { name: "Boeing products through history", url: "https://www.boeing.com/history" },
      families: [
        family("Early Boeing Transports", "Commercial Jet", "Historic transport aircraft", "Model 40|1925; Model 80|1928; 247|1933; 307 Stratoliner|1938; 314 Clipper|1938"),
        family("707 Family", "Commercial Jet", "Four-engine jet airliner", "707-120|1957; 707-120B|1960; 707-220|1959; 707-320|1958; 707-320B|1962; 707-320C|1963; 720|1959; 720B|1960"),
        family("717 Family", "Commercial Jet", "Twin-engine jet airliner", "717-200|1998|37.8 m,28.4 m,8.9 m"),
        family("727 Family", "Commercial Jet", "Trijet airliner", "727-100|1963|40.6 m,32.9 m,10.4 m; 727-100C|1964; 727-200|1967|46.7 m,32.9 m,10.4 m; 727-200 Advanced|1972; 727-200F|1983"),
        family("737 Family", "Commercial Jet", "Narrowbody airliner", "737-200C|1968; 737-700ER|2006; 737-700C|1999; 737-800BCF|2018; 737-900|2000; 737 MAX 8 200|2019"),
        family("747 Family", "Commercial Jet", "Widebody airliner", "747-100SR|1973; 747-200F|1972; 747SP|1975; 747-400F|1993; 747-400ER|2002; 747-400ERF|2002"),
        family("757 Family", "Commercial Jet", "Narrowbody airliner", "757-200|1982|47.3 m,38.1 m,13.6 m; 757-200F|1987|47.3 m,38.1 m,13.6 m; 757-300|1998|54.5 m,38.1 m,13.6 m"),
        family("767 Family", "Commercial Jet", "Widebody airliner", "767-200|1981|48.5 m,47.6 m,15.8 m; 767-200ER|1984|48.5 m,47.6 m,15.8 m; 767-300|1986|54.9 m,47.6 m,15.9 m; 767-300ER|1986|54.9 m,47.6 m,15.9 m; 767-300F|1995|54.9 m,47.6 m,15.9 m; 767-400ER|1999|61.4 m,51.9 m,16.8 m"),
        family("777 Family", "Commercial Jet", "Widebody airliner", "777F|2008; 777-8F|In development|||Advanced development"),
        family("Military Boeing", "Bomber", "Military bomber or patrol aircraft", "B-17E Flying Fortress|1941; B-17F Flying Fortress|1942; B-17G Flying Fortress|1943; B-29 Superfortress|1942; B-47E Stratojet|1953; B-52B Stratofortress|1954; B-52D Stratofortress|1956; B-52G Stratofortress|1958; B-52H Stratofortress|1960; P-8A Poseidon|2009"),
        family("Boeing Tanker Family", "Tanker", "Aerial refueling tanker", "KC-97 Stratofreighter|1944; KC-135A Stratotanker|1956; KC-135E Stratotanker|1982; KC-135R Stratotanker|1982; KC-135T Stratotanker|1982; KC-767A|2005; KC-767J|2007; KC-46A Pegasus|2015"),
        family("Boeing Airborne Command and AEW", "ISR", "Airborne early-warning or command aircraft", "E-3A Sentry|1975; E-3D Sentry AEW.1|1989; E-4A|1973; E-4B|1973; E-6A Mercury|1987; E-6B Mercury|1997; E-7A Wedgetail|2004"),
        family("Boeing Trainers and Experimental", "Experimental", "Trainer or research aircraft", "T-7A Red Hawk|2016; X-32A|2000; X-32B|2001; X-37B|2010")
      ]
    }),
    manufacturer({
      id: "embraer", name: "Embraer", country: "Brazil", founded: "1969", category: "Commercial Airliner",
      aircraftFocus: ["Regional Jet", "Military Transport", "Business Jet"],
      summary: "Embraer builds regional airliners, executive jets, trainers, transports, and special-mission aircraft.",
      source: { name: "Embraer aircraft and services", url: "https://www.embraer.com/en/" },
      families: [
        family("Bandeirante and Brasilia", "Regional Turboprop", "Regional turboprop", "EMB 110 Bandeirante|1968; EMB 120 Brasilia|1983"),
        family("ERJ Family", "Commercial Jet", "Regional jet", "ERJ 135|1998; ERJ 140|2000; ERJ 145|1995; ERJ 145XR|2001; Legacy 600|2001; Legacy 650|2009"),
        family("E-Jet Family", "Commercial Jet", "Regional jet", "E170|2002; E175|2003; E190|2004; E195|2004; E190-E2|2016; E195-E2|2017"),
        family("Embraer Executive Jets", "Business Jet", "Business jet", "Phenom 100EV|2016; Phenom 300E|2017; Legacy 450|2013; Legacy 500|2012; Praetor 500|2018; Praetor 600|2018; Lineage 1000E|2013"),
        family("Embraer Defence", "Military Transport", "Military aircraft", "EMB 312 Tucano|1980; A-29A Super Tucano|1999; A-29B Super Tucano|1999; C-390 Millennium|2015; KC-390 Millennium|2015; R-99 Erieye|1999")
      ]
    }),
    manufacturer({
      id: "bombardier", name: "Bombardier", country: "Canada", founded: "1942", category: "Business & General Aviation",
      aircraftFocus: ["Regional Jet", "Business Jet", "Special Mission"],
      summary: "Bombardier's aviation catalogue includes the CRJ regional family and Challenger and Global business jets.",
      source: { name: "Bombardier aircraft", url: "https://bombardier.com/en/aircraft" },
      families: [
        family("CRJ Family", "Commercial Jet", "Regional jet", "CRJ440|2001; CRJ550|2019; CRJ705|2005"),
        family("Challenger Family", "Business Jet", "Business jet", "Challenger 300|2001; Challenger 350|2013; Challenger 3500|2021; Challenger 600|1978; Challenger 601|1982; Challenger 604|1994; Challenger 605|2006; Challenger 650|2015"),
        family("Global Family", "Business Jet", "Long-range business jet", "Global Express|1996; Global 5000|2003; Global 5500|2018; Global 6000|2011; Global 6500|2018; Global 7500|2016; Global 8000|2022")
      ]
    }),
    manufacturer({
      id: "cessna", name: "Cessna", country: "United States", founded: "1927", category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Business Jet", "Utility"],
      summary: "Cessna is one of the most prolific producers of personal, training, utility, and business aircraft.",
      source: { name: "Cessna aircraft", url: "https://cessna.txtav.com/" },
      families: [
        family("Cessna Two-Seat Singles", "General Aviation", "Training and personal aircraft", "Cessna 120|1946; Cessna 140|1946; Cessna 150A|1959; Cessna 150M|1974; Cessna 152|1977; Cessna 152 Aerobat|1977"),
        family("Cessna 170 and 172 Family", "General Aviation", "Single-engine piston aircraft", "Cessna 170A|1948; Cessna 170B|1952; Cessna 172|1955; Cessna 172A|1959; Cessna 172M|1972; Cessna 172N|1976; Cessna 172P|1980; Cessna 172R|1996; Cessna 172S Skyhawk|1998|8.3 m,11.0 m,2.7 m"),
        family("Cessna 180 and 185 Family", "General Aviation", "Bush and utility aircraft", "Cessna 180|1952; Cessna 180J|1972; Cessna 185 Skywagon|1960; Cessna A185F|1972"),
        family("Cessna 182 Family", "General Aviation", "Single-engine piston aircraft", "Cessna 182|1956; Cessna 182J Skylane|1966; Cessna 182P Skylane|1971; Cessna 182R Skylane|1980; Cessna 182S Skylane|1996; Cessna 182T Skylane|2001; Cessna T182T Turbo Skylane|2001"),
        family("Cessna 206 and 210 Family", "General Aviation", "Utility aircraft", "Cessna 205|1962; Cessna 206|1964; Cessna U206G Stationair|1968; Cessna TU206G Turbo Stationair|1968; Cessna 206H Stationair|1998; Cessna T206H Turbo Stationair|1998; Cessna 210 Centurion|1957; Cessna T210N Turbo Centurion|1979"),
        family("Cessna Caravan Family", "General Aviation", "Single-engine turboprop utility aircraft", "Cessna 208 Caravan|1982; Cessna 208A Cargomaster|1984; Cessna 208B Grand Caravan|1986; Cessna 208B Grand Caravan EX|2012; AC-208 Combat Caravan|2009"),
        family("Cessna Twins", "General Aviation", "Twin-engine piston aircraft", "Cessna 310|1953; Cessna 320 Skyknight|1961; Cessna 335|1978; Cessna 340A|1975; Cessna 401|1965; Cessna 402C|1978; Cessna 404 Titan|1975; Cessna 414A Chancellor|1977; Cessna 421C Golden Eagle|1975"),
        family("Citation Family", "Business Jet", "Business jet", "Citation I|1969; Citation II|1977; Citation III|1979; Citation V|1987; CitationJet CJ1+|2004; Citation CJ2+|2005; Citation CJ3+|2014; Citation CJ4 Gen2|2025; Citation XLS Gen2|2021; Citation Sovereign+|2012; Citation Latitude|2014; Citation Longitude|2016")
      ]
    }),
    manufacturer({
      id: "beechcraft", name: "Beechcraft", country: "United States", founded: "1932", category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Business Aviation", "Trainer"],
      summary: "Beechcraft is known for Bonanza and Baron piston aircraft, King Air turboprops, and military trainers.",
      source: { name: "Beechcraft aircraft", url: "https://beechcraft.txtav.com/" },
      families: [
        family("Bonanza Family", "General Aviation", "Single-engine piston aircraft", "Model 35 Bonanza|1945; Model 33 Debonair|1959; F33A Bonanza|1970; V35B Bonanza|1970; A36 Bonanza 36|1968; G36 Bonanza|2005"),
        family("Baron Family", "General Aviation", "Twin-engine piston aircraft", "Model 55 Baron|1960; B55 Baron|1964; C55 Baron|1965; E55 Baron|1970; Model 56TC Baron|1966; Model 58 Baron|1969; 58P Pressurized Baron|1976; G58 Baron|2005"),
        family("Beechcraft Twins", "General Aviation", "Twin-engine utility aircraft", "Model 18|1937; Model 50 Twin Bonanza|1949; Model 60 Duke|1966; Model 76 Duchess|1974"),
        family("King Air Family", "General Aviation", "Twin turboprop", "King Air 65-90|1964; King Air A90|1966; King Air B90|1967; King Air C90|1970; King Air E90|1972; King Air F90|1978; King Air 100|1969; King Air 200|1972; King Air B200|1980; King Air 300|1983; King Air 350|1988; King Air 260|2020; King Air 360|2020"),
        family("Beechcraft Military", "Trainer", "Military trainer or attack aircraft", "T-34A Mentor|1948; T-34C Turbo Mentor|1973; T-6A Texan II|1992; AT-6E Wolverine|2014")
      ]
    }),
    manufacturer({
      id: "piper", name: "Piper", country: "United States", founded: "1927", category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Trainer", "Turboprop"],
      summary: "Piper's broad catalogue covers training, touring, bush, twin-engine, and pressurized turboprop aircraft.",
      source: { name: "Piper aircraft", url: "https://www.piper.com/" },
      families: [
        family("Cub Family", "General Aviation", "Light utility aircraft", "J-3 Cub|1938; PA-11 Cub Special|1946; PA-12 Super Cruiser|1946; PA-14 Family Cruiser|1947; PA-18-95 Super Cub|1949; PA-18-150 Super Cub|1954"),
        family("PA-28 Cherokee Family", "General Aviation", "Training and touring aircraft", "PA-28-140 Cherokee Cruiser|1964; PA-28-150 Cherokee|1960; PA-28-161 Warrior III|1994; PA-28-180 Cherokee|1962; PA-28-181 Archer III|1994; PA-28-200R Arrow|1966; PA-28R-201 Arrow III|1976; PA-28R-201T Turbo Arrow III|1976; Pilot 100i|2019"),
        family("PA-32 Cherokee Six Family", "General Aviation", "Six-seat touring aircraft", "PA-32-260 Cherokee Six|1963; PA-32-300 Cherokee Six|1965; PA-32R-300 Lance|1975; PA-32R-301 Saratoga SP|1980; PA-32R-301T Saratoga II TC|1997"),
        family("Piper Twins", "General Aviation", "Twin-engine piston aircraft", "PA-23 Apache|1952; PA-23-250 Aztec|1959; PA-30 Twin Comanche|1962; PA-31 Navajo|1964; PA-31-350 Chieftain|1972; PA-34-200 Seneca|1969; PA-34-220T Seneca V|1996; PA-44-180 Seminole|1976"),
        family("Piper M-Class", "General Aviation", "Pressurized turboprop or piston aircraft", "PA-46-350P Malibu Mirage|1988; M350|2015; M500|2015; M600 SLS|2019; M700 Fury|2024"),
        family("Piper Utility", "General Aviation", "Utility aircraft", "PA-25 Pawnee|1957; PA-36 Pawnee Brave|1969; PA-46R-350T Matrix|2007; PA-47 PiperJet|2008|||Prototype")
      ]
    }),
    manufacturer({
      id: "gulfstream", name: "Gulfstream", country: "United States", founded: "1958", category: "Business & General Aviation",
      aircraftFocus: ["Business Jet", "Special Mission", "Long Range"],
      summary: "Gulfstream produces large-cabin, long-range business jets and special-mission derivatives.",
      source: { name: "Gulfstream aircraft", url: "https://www.gulfstream.com/en/aircraft/" },
      families: [
        family("Classic Gulfstream Family", "Business Jet", "Business aircraft", "Gulfstream I|1958; Gulfstream II|1966; Gulfstream III|1979; Gulfstream IV|1985; Gulfstream IV-SP|1991; Gulfstream V|1995"),
        family("Mid-Cabin Gulfstream Family", "Business Jet", "Business jet", "G100|1981; G150|2005; G200|1997; G280|2009"),
        family("Large-Cabin Gulfstream Family", "Business Jet", "Long-range business jet", "G300|2002; G350|2003; G400|2024; G450|2003; G500|2015; G550|2003; G600|2016; G650|2009; G650ER|2014; G700|2020; G800|2022")
      ]
    }),
    manufacturer({
      id: "atr", name: "ATR", country: "France / Italy", founded: "1981", category: "Regional & Utility",
      aircraftFocus: ["Regional Turboprop", "Freighter", "Commuter"],
      summary: "ATR specializes in 40-to-78-seat regional turboprops and their cargo and short-field derivatives.",
      source: { name: "ATR aircraft family", url: "https://www.atr-aircraft.com/aircraft-services/aircraft-family/" },
      families: [
        family("ATR 42 Family", "Regional Turboprop", "Regional turboprop", "ATR 42-200|1984; ATR 42-300|1984; ATR 42-320|1986; ATR 42-400|1995; ATR 42-500|1994; ATR 42-600|2010; ATR 42-600S|2022"),
        family("ATR 72 Family", "Regional Turboprop", "Regional turboprop", "ATR 72-200|1988; ATR 72-210|1992; ATR 72-500|1997; ATR 72-600|2009; ATR 72-600F|2020")
      ]
    }),
    manufacturer({
      id: "comac", name: "COMAC", country: "China", founded: "2008", category: "Commercial Airliner",
      aircraftFocus: ["Commercial Jet", "Regional Jet", "Widebody"],
      summary: "COMAC develops Chinese regional and mainline commercial jet families.",
      source: { name: "COMAC products", url: "https://english.comac.cc/products/" },
      families: [
        family("ARJ21 Family", "Commercial Jet", "Regional jet", "ARJ21-700|2008; ARJ21F|2020; ARJ21B|2022; C909|2008"),
        family("C919 Family", "Commercial Jet", "Narrowbody airliner", "C919|2017; C919 Stretched Variant|In development|||Advanced development"),
        family("C929 Family", "Commercial Jet", "Widebody airliner", "C929|In development|||Advanced development")
      ]
    }),
    manufacturer({
      id: "lockheed-martin", name: "Lockheed Martin", country: "United States", founded: "1995", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Military Transport", "Experimental"],
      summary: "Lockheed Martin produces combat, transport, surveillance, and advanced-development aircraft.",
      source: { name: "Lockheed Martin aeronautics", url: "https://www.lockheedmartin.com/en-us/who-we-are/business-areas/aeronautics.html" },
      families: [
        family("F-16 Fighting Falcon Family", "Fighter", "Multirole fighter", "F-16A Fighting Falcon|1976|15.1 m,10.0 m,5.1 m; F-16B Fighting Falcon|1977|15.1 m,10.0 m,5.1 m; F-16C Fighting Falcon|1984|15.1 m,10.0 m,5.1 m; F-16D Fighting Falcon|1984|15.1 m,10.0 m,5.1 m; F-16E Desert Falcon|2004; F-16F Desert Falcon|2003; F-16I Sufa|2003; F-16V Viper|2015; F-16C Block 50|1991; F-16C Block 52|1992; F-16C Block 70|2019; F-16D Block 72|2023"),
        family("F-22 Raptor Family", "Fighter", "Stealth air-superiority fighter", "YF-22|1990; F-22A Raptor|1997"),
        family("C-130J Super Hercules Family", "Military Transport", "Military transport", "C-130J Super Hercules|1996; C-130J-30 Super Hercules|1997; HC-130J Combat King II|2002; MC-130J Commando II|2011; AC-130J Ghostrider|2014; LM-100J|2017"),
        family("KC-130J Tanker Family", "Tanker", "Aerial refueling tanker and transport", "KC-130J|1999; KC-130J Harvest HAWK|2010"),
        family("Advanced Development Programs", "Experimental", "Experimental or reconnaissance aircraft", "U-2S Dragon Lady|1994; SR-72 Concept|In development|||Concept aircraft; X-59 QueSST|2023|||Research aircraft")
      ]
    }),
    manufacturer({
      id: "northrop-grumman", name: "Northrop Grumman", country: "United States", founded: "1994", category: "Military & Defense",
      aircraftFocus: ["ISR", "Bomber", "Uncrewed Aircraft"],
      summary: "Northrop Grumman develops stealth bombers, airborne surveillance systems, and high-altitude uncrewed aircraft.",
      source: { name: "Northrop Grumman air systems", url: "https://www.northropgrumman.com/what-we-do/air" },
      families: [
        family("Northrop Grumman Bomber Programs", "Bomber", "Stealth bomber", "B-2A Spirit|1989|21.0 m,52.4 m,5.2 m; B-21 Raider|2023|||Flight-test program"),
        family("Hawkeye Family", "ISR", "Airborne early-warning aircraft", "E-2C Hawkeye|1971; E-2D Advanced Hawkeye|2007"),
        family("Global Hawk Family", "ISR", "High-altitude uncrewed reconnaissance aircraft", "RQ-4A Global Hawk|1998; RQ-4B Global Hawk|2006; MQ-4C Triton|2013"),
        family("Northrop Grumman Experimental", "Experimental", "Technology demonstrator", "X-47A Pegasus|2003; X-47B UCAS-D|2011")
      ]
    }),
    manufacturer({
      id: "dassault", name: "Dassault Aviation", country: "France", founded: "1929", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Business Jet", "Maritime Patrol"],
      summary: "Dassault combines combat aircraft design with the long-running Falcon business-jet family.",
      source: { name: "Dassault Aviation aircraft", url: "https://www.dassault-aviation.com/en/" },
      families: [
        family("Ouragan and Mystère Family", "Fighter", "Jet fighter", "MD 450 Ouragan|1949; Mystère II|1951; Mystère IV A|1952; Super Mystère B2|1955"),
        family("Mirage III and 5 Family", "Fighter", "Supersonic fighter", "Mirage IIIA|1958; Mirage IIIC|1960; Mirage IIID|1959; Mirage IIIE|1961; Mirage IIIR|1961; Mirage 5|1967; Mirage 50|1979"),
        family("Mirage F1 Family", "Fighter", "Supersonic fighter", "Mirage F1C|1966; Mirage F1B|1976; Mirage F1CR|1981; Mirage F1CT|1991"),
        family("Mirage 2000 Family", "Fighter", "Multirole fighter", "Mirage 2000C|1978; Mirage 2000B|1980; Mirage 2000N|1983; Mirage 2000D|1991; Mirage 2000-5|1990; Mirage 2000-9|1997"),
        family("Rafale Family", "Fighter", "Multirole fighter", "Rafale A|1986; Rafale B|1993|15.3 m,10.9 m,5.3 m; Rafale C|1991|15.3 m,10.9 m,5.3 m; Rafale M|1986|15.3 m,10.9 m,5.3 m"),
        family("Falcon Family", "Business Jet", "Business jet", "Falcon 10|1970; Falcon 20|1963; Falcon 50|1976; Falcon 900B|1985; Falcon 900EX|1995; Falcon 2000|1993; Falcon 2000EX|2001; Falcon 7X|2005; Falcon 8X|2015; Falcon 6X|2021; Falcon 10X|In development|||Advanced development"),
        family("Dassault Maritime and Strategic", "ISR", "Maritime patrol or strategic aircraft", "Étendard IVM|1958; Super Étendard|1974; Atlantique 2|1981; Mirage IV A|1959")
      ]
    }),
    manufacturer({
      id: "saab", name: "Saab", country: "Sweden", founded: "1937", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Regional Turboprop", "AEW&C"],
      summary: "Saab's catalogue spans Swedish combat aircraft, regional transports, trainers, and airborne surveillance platforms.",
      source: { name: "Saab air products", url: "https://www.saab.com/products/air" },
      families: [
        family("Saab Historic Fighters", "Fighter", "Military fighter", "Saab 21|1943; Saab 29 Tunnan|1948; Saab 32 Lansen|1952; Saab 35 Draken|1955; Saab 37 Viggen|1967"),
        family("Gripen Family", "Fighter", "Multirole fighter", "JAS 39A Gripen|1988; JAS 39B Gripen|1992; JAS 39C Gripen|1999; JAS 39D Gripen|1999; JAS 39E Gripen|2017; JAS 39F Gripen|2020"),
        family("Saab Regional Family", "Regional Turboprop", "Regional turboprop", "Saab 340A|1983; Saab 340B|1989; Saab 340B Plus|1994; Saab 2000|1992"),
        family("Saab Special Mission", "ISR", "Airborne surveillance aircraft", "Saab 105|1963; Saab 340 AEW&C|1994; Saab 2000 Erieye|1999; GlobalEye|2018")
      ]
    }),
    manufacturer({
      id: "sukhoi", name: "Sukhoi", country: "Russia", founded: "1939", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Attack", "Commercial Jet"],
      summary: "Sukhoi is known for combat aircraft from the Su-7 through the Flanker family and modern regional jets.",
      source: { name: "United Aircraft Corporation lineup", url: "https://uacrussia.ru/en/aircraft/lineup/" },
      families: [
        family("Sukhoi Early Jets", "Fighter", "Jet combat aircraft", "Su-7B|1955; Su-9|1956; Su-11|1958; Su-15TM|1962; Su-17M|1966; Su-17M4|1980"),
        family("Su-24 Family", "Attack", "Strike aircraft", "Su-24|1967; Su-24M|1977; Su-24MR|1980"),
        family("Su-25 Family", "Attack", "Ground-attack aircraft", "Su-25|1975; Su-25UB|1985; Su-25T|1984; Su-25SM|2002"),
        family("Flanker Family", "Fighter", "Multirole fighter", "Su-27S|1977; Su-27UB|1985; Su-27SM|2002; Su-30|1989; Su-30MKI|1997; Su-30MKK|1999; Su-30MKA|2006; Su-30MKM|2003; Su-30SM|2012; Su-30SM2|2021; Su-33|1987; Su-34|1990; Su-35|1988; Su-35S|2008"),
        family("Modern Sukhoi Fighters", "Fighter", "Stealth or advanced fighter", "Su-47 Berkut|1997|||Technology demonstrator; Su-57|2010"),
        family("Sukhoi Civil", "Commercial Jet", "Regional jet", "Sukhoi Superjet 100-95B|2008; Sukhoi Superjet 100-95LR|2013; SJ-100|2023")
      ]
    }),
    manufacturer({
      id: "antonov", name: "Antonov", country: "Ukraine", founded: "1946", category: "Regional & Utility",
      aircraftFocus: ["Military Transport", "Cargo", "Regional Aircraft"],
      summary: "Antonov designed transports ranging from rugged light utility aircraft to the world's largest cargo airplanes.",
      source: { name: "Antonov aircraft", url: "https://www.antonov.com/en/aircraft" },
      families: [
        family("Antonov Light and Regional", "Regional Turboprop", "Utility or regional transport", "An-2|1947; An-3T|1980; An-14 Pchelka|1958; An-28|1969; An-38|1994; An-74|1983; An-140|1997; An-148|2004; An-158|2010"),
        family("Antonov Military Transports", "Military Transport", "Military transport", "An-8|1956; An-10|1957; An-12BK|1957; An-22 Antei|1965; An-24|1959; An-26|1969; An-30|1967; An-32|1976; An-70|1994; An-178|2015"),
        family("Antonov Heavy Cargo", "Military Transport", "Heavy cargo aircraft", "An-72|1977; An-124-100 Ruslan|1982; An-225 Mriya|1988")
      ]
    }),
    manufacturer({
      id: "mcdonnell-douglas", name: "McDonnell Douglas", country: "United States", founded: "1967", status: "Historic manufacturer", category: "Commercial Airliner",
      aircraftFocus: ["Commercial Jet", "Fighter", "Transport"],
      summary: "McDonnell Douglas combined Douglas airliners with McDonnell military aircraft and produced influential jet families.",
      source: { name: "Boeing heritage products", url: "https://www.boeing.com/history" },
      families: [
        family("DC-9 Family", "Commercial Jet", "Twin-engine jet airliner", "DC-9-10|1965; DC-9-15|1966; DC-9-20|1968; DC-9-30|1966; DC-9-40|1967; DC-9-50|1974; C-9A Nightingale|1967; C-9B Skytrain II|1976"),
        family("DC-10 Family", "Commercial Jet", "Trijet widebody airliner", "DC-10-10|1970; DC-10-15|1981; DC-10-30|1972; DC-10-30F|1973; DC-10-40|1972"),
        family("KC-10 Extender Family", "Tanker", "Aerial refueling tanker and transport", "KC-10A Extender|1980; KDC-10|1994"),
        family("MD-80 Family", "Commercial Jet", "Twin-engine jet airliner", "MD-81|1979; MD-82|1981; MD-83|1984; MD-87|1986; MD-88|1987"),
        family("MD-90 Family", "Commercial Jet", "Twin-engine jet airliner", "MD-90-30|1993; MD-90-30ER|1997"),
        family("MD-11 Family", "Commercial Jet", "Trijet widebody airliner", "MD-11|1990; MD-11C|1991; MD-11CF|1991; MD-11F|1990|61.2 m,51.7 m,17.6 m"),
        family("McDonnell Douglas Fighters", "Fighter", "Military fighter", "F-4B Phantom II|1958; F-4C Phantom II|1963; F-4D Phantom II|1965; F-4E Phantom II|1965; F-4G Wild Weasel V|1975; F-4J Phantom II|1966; F-4K Phantom FG.1|1966; F-4M Phantom FGR.2|1967; AV-8B Harrier II|1978"),
        family("F-15 Eagle Family", "Fighter", "Air-superiority or strike fighter", "F-15A Eagle|1972|19.4 m,13.1 m,5.6 m; F-15B Eagle|1973|19.4 m,13.1 m,5.6 m; F-15C Eagle|1979|19.4 m,13.1 m,5.6 m; F-15D Eagle|1979|19.4 m,13.1 m,5.6 m; F-15E Strike Eagle|1986|19.4 m,13.1 m,5.6 m; F-15J Eagle|1980|19.4 m,13.1 m,5.6 m; F-15DJ Eagle|1981|19.4 m,13.1 m,5.6 m; F-15K Slam Eagle|2005|19.4 m,13.1 m,5.6 m; F-15SA|2013|19.4 m,13.1 m,5.6 m; F-15QA Ababil|2020|19.4 m,13.1 m,5.6 m; F-15EX Eagle II|2021|19.4 m,13.1 m,5.6 m"),
        family("F/A-18 Hornet Family", "Fighter", "Carrier-based multirole fighter", "F/A-18A Hornet|1978|17.1 m,12.3 m,4.7 m; F/A-18B Hornet|1978|17.1 m,12.3 m,4.7 m; F/A-18C Hornet|1987|17.1 m,12.3 m,4.7 m; F/A-18D Hornet|1988|17.1 m,12.3 m,4.7 m; CF-188A Hornet|1982; CF-188B Hornet|1982; EF-18A Hornet|1986; F-18L|1977|||Prototype"),
        family("F/A-18 Super Hornet Family", "Fighter", "Carrier-based multirole fighter", "F/A-18E Super Hornet|1995|18.3 m,13.6 m,4.9 m; F/A-18F Super Hornet|1995|18.3 m,13.6 m,4.9 m; EA-18G Growler|2006|18.3 m,13.6 m,4.9 m; F/A-18E Block III Super Hornet|2020|18.3 m,13.6 m,4.9 m; F/A-18F Block III Super Hornet|2020|18.3 m,13.6 m,4.9 m")
      ]
    }),
    manufacturer({
      id: "dehavilland-canada", name: "De Havilland Canada", country: "Canada", founded: "1928", category: "Regional & Utility",
      aircraftFocus: ["Regional Turboprop", "STOL Utility", "Firefighting"],
      summary: "De Havilland Canada specializes in rugged utility and regional aircraft for demanding environments.",
      source: { name: "De Havilland Canada aircraft", url: "https://dehavilland.com/en" },
      families: [
        family("DHC Utility Family", "General Aviation", "STOL utility aircraft", "DHC-1 Chipmunk|1946; DHC-2 Beaver|1947; DHC-2T Turbo Beaver|1965; DHC-3 Otter|1951; DHC-3T Turbo Otter|1980; DHC-4 Caribou|1958; DHC-5 Buffalo|1964; DHC-6-100 Twin Otter|1965; DHC-6-200 Twin Otter|1968; DHC-6-300 Twin Otter|1969; DHC-6 Series 400 Twin Otter|2008"),
        family("Dash 7 Family", "Regional Turboprop", "STOL regional turboprop", "DHC-7-100 Dash 7|1975; DHC-7-150 Dash 7|1978"),
        family("Dash 8 Family", "Regional Turboprop", "Regional turboprop", "DHC-8-100|1983; DHC-8-200|1995; DHC-8-300|1987; DHC-8-400|1998"),
        family("DHC Firefighting Family", "Amphibian", "Amphibious firefighting aircraft", "DHC-515 Firefighter|In development|||Advanced development")
      ]
    })
  ];
  const westernManufacturers = [
    manufacturer({
      id: "douglas", name: "Douglas Aircraft", country: "United States", founded: "1921", status: "Historic manufacturer", category: "Commercial Airliner",
      aircraftFocus: ["Commercial Airliner", "Military Transport", "Attack"],
      summary: "Douglas created foundational airliners, naval aircraft, military transports, and the DC-series jetliners.",
      source: { name: "Boeing Douglas heritage", url: "https://www.boeing.com/history" },
      families: [
        family("Douglas Commercial Transports", "Commercial Jet", "Historic airliner", "DC-1|1933; DC-2|1934; DC-3|1935; DC-4|1942; DC-5|1939; DC-6|1946; DC-6B|1951; DC-7|1953; DC-7B|1955; DC-7C Seven Seas|1956"),
        family("DC-8 Family", "Commercial Jet", "Four-engine jet airliner", "DC-8-10|1958; DC-8-20|1958; DC-8-30|1958; DC-8-40|1959; DC-8-50|1960; DC-8-61|1966; DC-8-62|1966; DC-8-63|1967; DC-8-71|1981; DC-8-72|1982; DC-8-73|1982"),
        family("Douglas Military Transports", "Military Transport", "Military transport", "C-47 Skytrain|1941; C-54 Skymaster|1942; C-74 Globemaster|1945; C-124 Globemaster II|1949; C-133 Cargomaster|1956"),
        family("Douglas Naval and Attack", "Attack", "Naval or attack aircraft", "SBD-3 Dauntless|1940; A-20G Havoc|1941; A-26B Invader|1942; AD-4 Skyraider|1945; A-4B Skyhawk|1954; A-4C Skyhawk|1958; A-4E Skyhawk|1961; A-4F Skyhawk|1966; TA-4J Skyhawk|1969; F4D Skyray|1951; F5D Skylancer|1956")
      ]
    }),
    manufacturer({
      id: "lockheed", name: "Lockheed", country: "United States", founded: "1926", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Military Transport", "ISR"],
      summary: "Lockheed's heritage includes classic transports, reconnaissance aircraft, fighters, and strategic airlifters.",
      source: { name: "Lockheed Martin heritage", url: "https://www.lockheedmartin.com/en-us/who-we-are/heritage.html" },
      families: [
        family("Lockheed Civil Transports", "Commercial Jet", "Commercial transport", "Model 10 Electra|1934; Model 12 Electra Junior|1936; Model 14 Super Electra|1937; L-049 Constellation|1943; L-749 Constellation|1947; L-1049 Super Constellation|1951; L-1649 Starliner|1956; L-188 Electra|1957; L-1011-1 TriStar|1970; L-1011-200 TriStar|1976; L-1011-500 TriStar|1978"),
        family("Lockheed Fighters", "Fighter", "Military fighter", "P-38J Lightning|1939; P-80A Shooting Star|1944; F-94C Starfire|1949; F-104A Starfighter|1954; F-104C Starfighter|1958; F-104G Starfighter|1960; F-104S Starfighter|1968; F-117A Nighthawk|1981"),
        family("Blackbird Family", "ISR", "High-speed reconnaissance aircraft", "A-12|1962; YF-12A|1963; SR-71A Blackbird|1964; SR-71B Blackbird|1965"),
        family("C-130 Hercules Family", "Military Transport", "Military transport", "C-130A Hercules|1954; C-130B Hercules|1958; C-130E Hercules|1961; C-130H Hercules|1964; AC-130A Spectre|1967; AC-130H Spectre|1969; EC-130H Compass Call|1981; HC-130P Combat King|1964; KC-130F|1960; MC-130E Combat Talon I|1966; WC-130J|1999"),
        family("Lockheed Heavy Airlift", "Military Transport", "Strategic transport", "C-141A Starlifter|1963; C-141B Starlifter|1977; C-5A Galaxy|1968; C-5B Galaxy|1985; C-5M Super Galaxy|2006"),
        family("Lockheed Patrol and AEW", "ISR", "Patrol or early-warning aircraft", "P-2V Neptune|1945; P-3A Orion|1959; P-3B Orion|1965; P-3C Orion|1968; EP-3E Aries II|1969; S-3A Viking|1972; S-3B Viking|1984")
      ]
    }),
    manufacturer({
      id: "northrop", name: "Northrop", country: "United States", founded: "1939", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Bomber", "Trainer"],
      summary: "Northrop produced influential fighters, trainers, interceptors, and experimental flying-wing aircraft.",
      families: [
        family("Northrop Flying Wings", "Experimental", "Flying-wing bomber or demonstrator", "N-1M|1940; YB-35|1946; YB-49|1947"),
        family("Northrop Fighters", "Fighter", "Military fighter", "P-61B Black Widow|1942; F-89D Scorpion|1948; F-5A Freedom Fighter|1959; F-5B Freedom Fighter|1964; F-5E Tiger II|1972; F-5F Tiger II|1974; F-20 Tigershark|1982|||Prototype"),
        family("T-38 Talon Family", "Trainer", "Supersonic trainer", "T-38A Talon|1959; T-38C Talon|2001"),
        family("Northrop Experimental Fighters", "Experimental", "Fighter prototype", "YF-17 Cobra|1974; YF-23 Black Widow II|1990")
      ]
    }),
    manufacturer({
      id: "grumman", name: "Grumman", country: "United States", founded: "1929", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Naval Fighter", "AEW&C", "Amphibian"],
      summary: "Grumman became synonymous with U.S. naval aviation, carrier fighters, airborne early warning, and amphibious aircraft.",
      source: { name: "U.S. Navy aircraft fact files", url: "https://www.navy.mil/Resources/Fact-Files/" },
      families: [
        family("Grumman Propeller Fighters", "Fighter", "Carrier fighter", "F3F|1935; F4F-3 Wildcat|1937; F4F-4 Wildcat|1941; F6F-3 Hellcat|1942; F6F-5 Hellcat|1944; F7F Tigercat|1943; F8F-1 Bearcat|1944; F8F-2 Bearcat|1947"),
        family("Grumman Jet Fighters", "Fighter", "Carrier fighter", "F9F-2 Panther|1947; F9F-6 Cougar|1951; F11F-1 Tiger|1954; F-14A Tomcat|1970|19.1 m,19.5 m spread,4.9 m; F-14B Tomcat|1987|19.1 m,19.5 m spread,4.9 m; F-14D Tomcat|1990|19.1 m,19.5 m spread,4.9 m"),
        family("Grumman Attack and Patrol", "Attack", "Carrier attack or patrol aircraft", "A-6A Intruder|1960; A-6E Intruder|1970; EA-6A Electric Intruder|1963; EA-6B Prowler|1968; S-2 Tracker|1952"),
        family("Grumman AEW and Utility", "ISR", "Airborne early-warning or utility aircraft", "E-1B Tracer|1956; E-2A Hawkeye|1960; C-2A Greyhound|1964; C-2A Greyhound Reprocured|1984"),
        family("Grumman Amphibians", "Amphibian", "Amphibious utility aircraft", "J2F Duck|1936; G-21 Goose|1937; G-44 Widgeon|1940; HU-16 Albatross|1947")
      ]
    }),
    manufacturer({
      id: "convair", name: "Convair", country: "United States", founded: "1943", status: "Historic manufacturer", category: "Commercial Airliner",
      aircraftFocus: ["Airliner", "Bomber", "Interceptor"],
      summary: "Convair produced piston and turboprop airliners, delta-wing interceptors, bombers, and flying boats.",
      families: [
        family("Convair Airliners", "Commercial Jet", "Commercial transport", "Convair 240|1947; Convair 340|1951; Convair 440 Metropolitan|1955; Convair 580|1960; Convair 600|1965; Convair 640|1965; Convair 880|1959; Convair 990 Coronado|1961"),
        family("Convair Fighters", "Fighter", "Interceptor", "F-102A Delta Dagger|1953; TF-102A Delta Dagger|1955; F-106A Delta Dart|1956; F-106B Delta Dart|1957"),
        family("Convair Bombers", "Bomber", "Strategic bomber", "B-36J Peacemaker|1946; B-58A Hustler|1956; XB-70A Valkyrie|1964|||Prototype"),
        family("Convair Flying Boats", "Amphibian", "Flying boat", "PBY-5 Catalina|1935; PBY-5A Catalina|1939; R3Y Tradewind|1950")
      ]
    }),
    manufacturer({
      id: "fairchild", name: "Fairchild", country: "United States", founded: "1924", status: "Historic manufacturer", category: "Regional & Utility",
      aircraftFocus: ["Regional Aircraft", "Military Transport", "Attack"],
      summary: "Fairchild built utility aircraft, regional transports, military trainers, and close-air-support designs.",
      families: [
        family("Fairchild Utility and Regional", "Regional Turboprop", "Utility or regional aircraft", "FC-2|1927; Model 24|1932; F-27|1958; FH-227|1966; Swearingen Metroliner|1969; Metro III|1980; Merlin IVC|1979"),
        family("Fairchild Military", "Military Transport", "Military aircraft", "C-82 Packet|1944; C-119 Flying Boxcar|1947; C-123 Provider|1949; T-46A|1985|||Prototype"),
        family("A-10 Thunderbolt II Family", "Attack", "Close-air-support aircraft", "YA-10A|1972; A-10A Thunderbolt II|1972; A-10C Thunderbolt II|2005")
      ]
    }),
    manufacturer({
      id: "north-american", name: "North American Aviation", country: "United States", founded: "1928", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Bomber", "Trainer"],
      summary: "North American produced landmark trainers, fighters, bombers, and research aircraft across the piston and jet eras.",
      families: [
        family("North American Trainers", "Trainer", "Military trainer", "BT-9|1936; AT-6 Texan|1938; T-28A Trojan|1949; T-28B Trojan|1953; T-2A Buckeye|1958; T-2C Buckeye|1968"),
        family("Mustang Family", "Fighter", "Piston fighter", "P-51A Mustang|1940; P-51B Mustang|1942; P-51C Mustang|1943; P-51D Mustang|1943; P-51H Mustang|1945; F-82 Twin Mustang|1945"),
        family("North American Jet Fighters", "Fighter", "Jet fighter", "F-86A Sabre|1947; F-86E Sabre|1950; F-86F Sabre|1951; F-86D Sabre Dog|1949; F-100A Super Sabre|1953; F-100C Super Sabre|1954; F-100D Super Sabre|1956"),
        family("North American Bombers", "Bomber", "Bomber", "B-25B Mitchell|1940; B-25C Mitchell|1941; B-25D Mitchell|1942; B-25G Mitchell|1942; B-25H Mitchell|1943; B-25J Mitchell|1943; B-45A Tornado|1947; B-1A|1974|||Prototype; B-1B Lancer|1984"),
        family("North American Experimental", "Experimental", "Research aircraft", "X-15A|1959; X-15A-2|1964; X-31|1990")
      ]
    }),
    manufacturer({
      id: "general-dynamics", name: "General Dynamics", country: "United States", founded: "1952", status: "Historic aircraft manufacturer", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Strike Aircraft", "Experimental"],
      summary: "General Dynamics produced the F-102 lineage, F-111 strike family, and the original F-16 program.",
      source: { name: "U.S. Air Force aircraft fact sheets", url: "https://www.af.mil/About-Us/Fact-Sheets/Aircraft-Factsheets/" },
      families: [
        family("F-111 Aardvark Family", "Attack", "Variable-sweep strike aircraft", "F-111A Aardvark|1964; F-111C Aardvark|1968; F-111D Aardvark|1968; F-111E Aardvark|1969; F-111F Aardvark|1970; FB-111A|1968; EF-111A Raven|1977"),
        family("General Dynamics F-16 Family", "Fighter", "Multirole fighter", "YF-16|1974|||Prototype; F-16A Block 1 Fighting Falcon|1976; F-16B Block 1 Fighting Falcon|1977; F-16A ADF Fighting Falcon|1988; F-16C Block 30 Fighting Falcon|1986; F-16D Block 40 Fighting Falcon|1988")
      ]
    }),
    manufacturer({
      id: "republic", name: "Republic Aviation", country: "United States", founded: "1931", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Attack", "Experimental"],
      summary: "Republic designed rugged fighters and attack aircraft including the Thunderbolt and Thunderchief lines.",
      families: [
        family("Republic Thunderbolt Family", "Fighter", "Military fighter", "P-43 Lancer|1940; P-47B Thunderbolt|1941; P-47D Thunderbolt|1941; P-47M Thunderbolt|1944; P-47N Thunderbolt|1944"),
        family("Republic Jet Fighters", "Fighter", "Jet fighter or interceptor", "F-84B Thunderjet|1946; F-84E Thunderjet|1949; F-84F Thunderstreak|1950; RF-84F Thunderflash|1952; F-105B Thunderchief|1955; F-105D Thunderchief|1959; F-105F Thunderchief|1963; F-105G Wild Weasel|1966")
      ]
    }),
    manufacturer({
      id: "vought", name: "Vought", country: "United States", founded: "1917", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Naval Fighter", "Attack", "Experimental"],
      summary: "Vought specialized in carrier aircraft from the Corsair through the Crusader and Corsair II.",
      families: [
        family("Vought Propeller Aircraft", "Fighter", "Carrier aircraft", "O2U Corsair|1926; F4U-1 Corsair|1940; F4U-1D Corsair|1943; F4U-4 Corsair|1944; F4U-5 Corsair|1945; AU-1 Corsair|1952"),
        family("Vought Jet Aircraft", "Fighter", "Carrier jet", "F7U Cutlass|1948; F-8A Crusader|1955; F-8E Crusader|1961; RF-8G Crusader|1965; A-7A Corsair II|1965; A-7D Corsair II|1968; A-7E Corsair II|1968")
      ]
    }),
    manufacturer({
      id: "curtiss", name: "Curtiss", country: "United States", founded: "1909", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Fighter", "Flying Boat", "Transport"],
      summary: "Curtiss produced pioneering aircraft, racing seaplanes, military fighters, transports, and flying boats.",
      families: [
        family("Curtiss Early Aircraft", "General Aviation", "Historic aircraft", "Model D|1911; JN-4 Jenny|1915; NC-4|1918"),
        family("Curtiss Fighters", "Fighter", "Piston fighter", "P-36 Hawk|1935; P-40B Warhawk|1938; P-40E Warhawk|1941; P-40F Warhawk|1941; P-40N Warhawk|1943; XP-55 Ascender|1943|||Prototype"),
        family("Curtiss Transports and Flying Boats", "Amphibian", "Transport or flying boat", "T-32 Condor II|1933; C-46 Commando|1940; SOC Seagull|1934; SC Seahawk|1944")
      ]
    }),
    manufacturer({
      id: "consolidated", name: "Consolidated Aircraft", country: "United States", founded: "1923", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Bomber", "Flying Boat", "Transport"],
      summary: "Consolidated created long-range bombers and patrol flying boats central to World War II aviation.",
      families: [
        family("Liberator Family", "Bomber", "Heavy bomber", "B-24D Liberator|1939; B-24H Liberator|1943; B-24J Liberator|1943; PB4Y-1 Liberator|1943; PB4Y-2 Privateer|1943"),
        family("Consolidated Patrol Aircraft", "Amphibian", "Patrol flying boat", "PBY-1 Catalina|1935; PBY-5 Catalina|1939; PBY-5A Catalina|1939; PB2Y Coronado|1937; XP4Y Corregidor|1939|||Prototype")
      ]
    }),
    manufacturer({
      id: "martin", name: "Glenn L. Martin Company", country: "United States", founded: "1912", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Bomber", "Flying Boat", "Experimental"],
      summary: "Martin produced bombers, transports, patrol flying boats, and experimental jet and VTOL aircraft.",
      families: [
        family("Martin Bombers", "Bomber", "Bomber", "B-10|1932; B-26 Marauder|1940; B-57B Canberra|1954; XB-51|1949|||Prototype"),
        family("Martin Flying Boats", "Amphibian", "Flying boat", "M-130|1934; PBM Mariner|1939; JRM Mars|1942; P5M Marlin|1948"),
        family("Martin Civil and Experimental", "Commercial Jet", "Airliner or experimental aircraft", "2-0-2|1946; 4-0-4|1950; P6M SeaMaster|1955|||Prototype")
      ]
    }),
    manufacturer({
      id: "learjet", name: "Learjet", country: "United States", founded: "1962", status: "Historic brand", category: "Business & General Aviation",
      aircraftFocus: ["Business Jet", "Light Jet", "Special Mission"],
      summary: "Learjet helped define the light business jet and expanded into midsize, high-performance corporate aircraft.",
      source: { name: "Bombardier Learjet history", url: "https://bombardier.com/en/aircraft" },
      families: [
        family("Classic Learjet Family", "Business Jet", "Business jet", "Learjet 23|1963; Learjet 24|1966; Learjet 25|1966; Learjet 28|1977; Learjet 29|1977; Learjet 31|1987; Learjet 35|1973; Learjet 36|1973"),
        family("Later Learjet Family", "Business Jet", "Business jet", "Learjet 40|2002; Learjet 45|1995; Learjet 55|1979; Learjet 60|1990; Learjet 70|2013; Learjet 75|2013")
      ]
    }),
    manufacturer({
      id: "cirrus", name: "Cirrus Aircraft", country: "United States", founded: "1984", category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Personal Jet", "Trainer"],
      summary: "Cirrus builds composite piston singles and the Vision Jet for personal and training aviation.",
      source: { name: "Cirrus aircraft", url: "https://cirrusaircraft.com/aircraft/" },
      families: [
        family("Cirrus SR Family", "General Aviation", "Single-engine piston aircraft", "SR20 G1|1995; SR20 G3|2007; SR20 G6|2017; SR22 G1|2000; SR22 G3|2007; SR22 G6|2017; SR22T G5|2010; SR22T G6|2017; SR22 G7|2023; SR22T G7|2023"),
        family("Vision Jet Family", "Business Jet", "Personal jet", "SF50 Vision Jet G1|2008; SF50 Vision Jet G2|2018; SF50 Vision Jet G2 Plus|2021")
      ]
    }),
    manufacturer({
      id: "mooney", name: "Mooney", country: "United States", founded: "1929", category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "High-Performance Piston", "Touring"],
      summary: "Mooney is known for efficient, fast, retractable-gear piston singles.",
      families: [family("Mooney M20 Family", "General Aviation", "High-performance piston aircraft", "M20A|1958; M20C Ranger|1962; M20E Chaparral|1964; M20F Executive 21|1966; M20J 201|1976; M20K 231|1978; M20M Bravo|1989; M20R Ovation|1994; M20S Eagle|1999; M20TN Acclaim|2006; M20U Ovation Ultra|2016; M20V Acclaim Ultra|2016")]
    }),
    manufacturer({
      id: "maule", name: "Maule Air", country: "United States", founded: "1941", category: "Business & General Aviation",
      aircraftFocus: ["Bush Aircraft", "Utility", "General Aviation"],
      summary: "Maule produces rugged short-field piston aircraft for bush, utility, and personal flying.",
      families: [family("Maule Utility Family", "General Aviation", "Bush and utility aircraft", "M-4|1957; M-5-210C Strata Rocket|1973; M-6-235|1981; M-7-235B Super Rocket|1984; MX-7-180A|1985; MT-7-235|1991; M-9-235|2017")]
    }),
    manufacturer({
      id: "air-tractor", name: "Air Tractor", country: "United States", founded: "1978", category: "Regional & Utility",
      aircraftFocus: ["Agricultural", "Firefighting", "Attack"],
      summary: "Air Tractor builds agricultural, firefighting, and special-mission turboprop aircraft.",
      source: { name: "Air Tractor aircraft", url: "https://airtractor.com/aircraft/" },
      families: [
        family("Air Tractor Agricultural Family", "Agricultural", "Agricultural aircraft", "AT-301|1973; AT-401|1986; AT-402B|1986; AT-502A|1987; AT-502B|1987; AT-504|2008; AT-602|1995; AT-802|1990; AT-802A|1990"),
        family("Air Tractor Fire Boss and Military", "Agricultural", "Firefighting or light attack aircraft", "AT-802F|1990; AT-802F Fire Boss|1997; AT-802U|2009; OA-1K Skyraider II|2022")
      ]
    }),
    manufacturer({
      id: "thrush", name: "Thrush Aircraft", country: "United States", founded: "2003", category: "Regional & Utility",
      aircraftFocus: ["Agricultural", "Firefighting", "Utility"],
      summary: "Thrush produces purpose-built agricultural and aerial firefighting aircraft.",
      source: { name: "Thrush aircraft", url: "https://thrushaircraft.com/" },
      families: [family("Thrush Family", "Agricultural", "Agricultural aircraft", "Thrush 510G|2012; Thrush 510P2|2019; Thrush 550P|2010; Thrush 710P|2009; S2R-T34 Turbo Thrush|1983")]
    }),
    manufacturer({
      id: "vans", name: "Van's Aircraft", country: "United States", founded: "1973", category: "Business & General Aviation",
      aircraftFocus: ["Kit Aircraft", "Sport Aircraft", "General Aviation"],
      summary: "Van's Aircraft produces one of the world's most widely flown families of kit-built sport aircraft.",
      source: { name: "Van's Aircraft models", url: "https://www.vansaircraft.com/" },
      families: [family("RV Family", "General Aviation", "Kit-built sport aircraft", "RV-3|1971; RV-4|1979; RV-6|1985; RV-6A|1986; RV-7|2001; RV-7A|2001; RV-8|1995; RV-8A|1998; RV-9|1997; RV-9A|1998; RV-10|2003; RV-12|2006; RV-12iS|2017; RV-14|2012; RV-14A|2012; RV-15|2022|||Prototype")]
    }),
    manufacturer({
      id: "scaled-composites", name: "Scaled Composites", country: "United States", founded: "1982", category: "Special Mission & Amphibious",
      aircraftFocus: ["Experimental", "Spaceplane", "Prototype"],
      summary: "Scaled Composites is known for unconventional composite research aircraft and air-launched space systems.",
      source: { name: "Scaled Composites projects", url: "https://www.scaled.com/" },
      families: [
        family("Scaled Research Aircraft", "Experimental", "Experimental aircraft", "Model 76 Voyager|1984; Model 115 Starship|1983; Model 281 Proteus|1998; Model 311 Virgin Atlantic GlobalFlyer|2002; Model 351 Stratolaunch|2019"),
        family("SpaceShip Family", "Experimental", "Suborbital spaceplane", "SpaceShipOne|2003; White Knight|2002; SpaceShipTwo VSS Enterprise|2010; SpaceShipTwo VSS Unity|2016; WhiteKnightTwo|2008")
      ]
    }),
    manufacturer({
      id: "canadair", name: "Canadair", country: "Canada", founded: "1944", status: "Historic manufacturer", category: "Regional & Utility",
      aircraftFocus: ["Regional Jet", "Firefighting", "Military Aircraft"],
      summary: "Canadair produced military aircraft, business jets, regional transports, and iconic amphibious water bombers.",
      families: [
        family("Canadair Military", "Fighter", "Military aircraft", "CL-13 Sabre Mk 5|1953; CL-13 Sabre Mk 6|1954; CF-104 Starfighter|1961; CL-84 Dynavert|1965|||Prototype"),
        family("Canadair Firefighting Family", "Amphibian", "Amphibious firefighting aircraft", "CL-215|1967; CL-215T|1989; CL-415|1993; CL-415EAF|2020"),
        family("Canadair Civil Family", "Business Jet", "Business or regional aircraft", "CL-44|1959; CL-600 Challenger|1978; CL-601 Challenger|1982; CL-604 Challenger|1994")
      ]
    }),
    manufacturer({
      id: "neiva", name: "Neiva", country: "Brazil", founded: "1954", status: "Historic manufacturer", category: "Regional & Utility",
      aircraftFocus: ["Agricultural", "Trainer", "General Aviation"],
      summary: "Neiva produced Brazilian trainers, light aircraft, and the widely used Ipanema agricultural family.",
      families: [family("Neiva Family", "Agricultural", "Agricultural or training aircraft", "Neiva Regente|1961; T-25 Universal|1966; EMB 200 Ipanema|1970; EMB 201 Ipanema|1973; EMB 202 Ipanema|1991; EMB 203 Ipanema|2015")]
    })
  ];
  const europeanManufacturers = [
    manufacturer({
      id: "wright", name: "Wright", country: "United States", founded: "1909", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Pioneer Aircraft", "Trainer", "Historical"],
      summary: "The Wright brothers' aircraft established controlled powered flight and helped define early aeroplane design.",
      families: [family("Wright Pioneer Family", "General Aviation", "Pioneer aircraft", "1902 Glider|1902; Flyer I|1903; Flyer II|1904; Flyer III|1905; Model A|1908; Model B|1910; Model C|1912")]
    }),
    manufacturer({
      id: "bleriot", name: "Blériot Aéronautique", country: "France", founded: "1909", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Pioneer Aircraft", "Trainer", "Historical"],
      summary: "Blériot produced pioneering monoplanes and the aircraft used for the first flight across the English Channel.",
      families: [family("Blériot Pioneer Family", "General Aviation", "Pioneer aircraft", "Blériot V|1907; Blériot VIII|1908; Blériot XI|1909; Blériot XII|1909; Blériot XXI|1911; Blériot-SPAD S.33|1920")]
    }),
    manufacturer({
      id: "farman", name: "Farman", country: "France", founded: "1908", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Pioneer Aircraft", "Bomber", "Airliner"],
      summary: "Farman was a major French pioneer of early aircraft, bombers, and interwar transports.",
      families: [family("Farman Family", "General Aviation", "Pioneer or transport aircraft", "Farman III|1909; HF.20|1913; F.40|1915; F.50|1918; F.60 Goliath|1919; F.190|1928; F.222|1932")]
    }),
    manufacturer({
      id: "sopwith", name: "Sopwith Aviation Company", country: "United Kingdom", founded: "1912", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Fighter", "Trainer", "Naval Aircraft"],
      summary: "Sopwith produced some of the best-known British fighter and naval aircraft of World War I.",
      families: [family("Sopwith Family", "Fighter", "World War I fighter or naval aircraft", "Tabloid|1913; Baby|1915; 1½ Strutter|1915; Pup|1916; Triplane|1916; Camel|1916; Dolphin|1917; Snipe|1917")]
    }),
    manufacturer({
      id: "nieuport", name: "Nieuport", country: "France", founded: "1902", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Fighter", "Trainer", "Racing Aircraft"],
      summary: "Nieuport created influential sesquiplane fighters and racing aircraft during early aviation and World War I.",
      families: [family("Nieuport Fighter Family", "Fighter", "World War I fighter", "Nieuport 10|1914; Nieuport 11 Bébé|1915; Nieuport 12|1915; Nieuport 16|1916; Nieuport 17|1916; Nieuport 24|1917; Nieuport 27|1917; Nieuport-Delage NiD 29|1918")]
    }),
    manufacturer({
      id: "spad", name: "SPAD", country: "France", founded: "1911", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Fighter", "World War I", "Historical"],
      summary: "SPAD produced robust high-performance French fighters used by many Allied aces.",
      families: [family("SPAD Fighter Family", "Fighter", "World War I fighter", "SPAD S.VII|1916; SPAD S.XI|1916; SPAD S.XII|1917; SPAD S.XIII|1917; SPAD S.XVI|1918; SPAD S.XX|1918")]
    }),
    manufacturer({
      id: "albatros", name: "Albatros Flugzeugwerke", country: "Germany", founded: "1909", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Fighter", "Reconnaissance", "Trainer"],
      summary: "Albatros built important German reconnaissance aircraft and fighters during World War I.",
      families: [family("Albatros Family", "Fighter", "World War I military aircraft", "Albatros B.II|1914; C.I|1915; C.III|1915; D.I|1916; D.II|1916; D.III|1916; D.V|1917; D.Va|1917")]
    }),
    manufacturer({
      id: "royal-aircraft-factory", name: "Royal Aircraft Factory", country: "United Kingdom", founded: "1911", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Fighter", "Reconnaissance", "Research"],
      summary: "The Royal Aircraft Factory developed major British reconnaissance, fighter, and research aircraft during World War I.",
      families: [family("Royal Aircraft Factory Family", "Fighter", "World War I military aircraft", "B.E.2c|1914; B.E.12|1915; F.E.2b|1914; F.E.8|1915; R.E.8|1916; S.E.5|1916; S.E.5a|1917")]
    }),
    manufacturer({
      id: "bristol", name: "Bristol Aeroplane Company", country: "United Kingdom", founded: "1910", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Bomber", "Airliner"],
      summary: "Bristol produced important fighters, bombers, transports, and the large postwar Britannia airliner.",
      families: [
        family("Bristol Fighters", "Fighter", "Military fighter", "Scout D|1914; F.2B Fighter|1916; Bulldog Mk IIA|1929; Beaufighter Mk I|1939; Beaufighter TF Mk X|1943"),
        family("Bristol Bombers and Airliners", "Commercial Jet", "Bomber or airliner", "Blenheim Mk I|1935; Beaufort Mk I|1938; Bombay|1935; Brabazon|1949|||Prototype; Britannia 100|1952; Britannia 300|1956; Type 170 Freighter|1945")
      ]
    }),
    manufacturer({
      id: "fairey", name: "Fairey Aviation", country: "United Kingdom", founded: "1915", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Naval Aircraft", "Bomber", "VTOL"],
      summary: "Fairey produced British naval aircraft, bombers, reconnaissance types, and VTOL experiments.",
      families: [family("Fairey Family", "Attack", "Naval, bomber, or experimental aircraft", "Flycatcher|1922; Fox|1925; Swordfish Mk I|1934; Battle|1936; Albacore|1938; Barracuda Mk II|1940; Firefly FR.1|1941; Gannet AS.1|1949; Delta 2|1954|||Experimental aircraft; Rotodyne|1957|||Prototype")]
    }),
    manufacturer({
      id: "blackburn", name: "Blackburn Aircraft", country: "United Kingdom", founded: "1914", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Naval Aircraft", "Transport", "Experimental"],
      summary: "Blackburn specialized in British naval aircraft and produced the unusual Beverley transport and Buccaneer strike aircraft.",
      families: [family("Blackburn Family", "Attack", "Naval or transport aircraft", "Blackburn Ripon|1926; B-2|1931; Skua|1937; Roc|1938; Firebrand|1942; Beverley C.1|1950; Buccaneer S.1|1958; Buccaneer S.2|1963")]
    }),
    manufacturer({
      id: "morane-saulnier", name: "Morane-Saulnier", country: "France", founded: "1911", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Trainer", "Fighter", "General Aviation"],
      summary: "Morane-Saulnier produced pioneering monoplanes, military trainers, fighters, and postwar touring aircraft.",
      families: [family("Morane-Saulnier Family", "Trainer", "Trainer, fighter, or touring aircraft", "Type G|1913; Type L|1913; Type N|1914; MS.230|1929; MS.315|1932; MS.406|1935; MS.500 Criquet|1944; MS.733 Alcyon|1949; MS.760 Paris|1954; MS.880 Rallye|1959")]
    }),
    manufacturer({
      id: "fiat-aviazione", name: "Fiat Aviazione", country: "Italy", founded: "1908", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Bomber", "Trainer"],
      summary: "Fiat Aviazione produced major Italian fighters, bombers, and trainers from the interwar era into the jet age.",
      families: [family("Fiat Aircraft Family", "Fighter", "Military aircraft", "CR.20|1926; CR.32|1933; CR.42 Falco|1938; G.12|1940; G.50 Freccia|1937; G.55 Centauro|1942; G.56|1944|||Prototype; G.80|1951; G.91R|1956; G.91T|1960")]
    }),
    manufacturer({
      id: "macchi", name: "Macchi", country: "Italy", founded: "1912", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Racing Seaplane", "Trainer"],
      summary: "Macchi created Schneider Trophy racers, World War II fighters, and postwar trainers.",
      families: [family("Macchi Family", "Fighter", "Fighter, racer, or trainer", "M.5|1917; M.39|1926; M.C.72|1931|||Racing aircraft; C.200 Saetta|1937; C.202 Folgore|1940; C.205 Veltro|1942; MB.308|1947; MB.320|1949")]
    }),
    manufacturer({
      id: "caproni", name: "Caproni", country: "Italy", founded: "1908", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Bomber", "Transport", "Experimental"],
      summary: "Caproni was an early Italian pioneer of large bombers, transports, and experimental aircraft.",
      families: [family("Caproni Family", "Bomber", "Bomber, transport, or experimental aircraft", "Ca.3|1916; Ca.5|1917; Ca.60 Transaereo|1921|||Prototype; Ca.101|1928; Ca.133|1934; Ca.309 Ghibli|1936; Ca.310 Libeccio|1937; Campini N.1|1940|||Experimental aircraft")]
    }),
    manufacturer({
      id: "fokker", name: "Fokker", country: "Netherlands", founded: "1912", status: "Historic manufacturer", category: "Commercial Airliner",
      aircraftFocus: ["Regional Aircraft", "Airliner", "Historic Fighter"],
      summary: "Fokker's long history spans World War I fighters, interwar transports, and successful regional airliners.",
      families: [
        family("Fokker Early Aircraft", "Fighter", "Historic military aircraft", "E.III|1915; Dr.I|1917; D.VII|1918; F.VIIb-3m|1924; F.VIII|1927; F.XII|1929; F.XXII|1935"),
        family("Fokker F27 Family", "Regional Turboprop", "Regional turboprop", "F27-100 Friendship|1955; F27-200 Friendship|1957; F27-300 Combiplane|1958; F27-400M Troopship|1961; F27-500 Friendship|1967; F27-600|1968"),
        family("Fokker F28 Family", "Commercial Jet", "Regional jet", "F28-1000 Fellowship|1967; F28-2000 Fellowship|1971; F28-3000 Fellowship|1978; F28-4000 Fellowship|1976"),
        family("Fokker 50 and 60 Family", "Regional Turboprop", "Regional turboprop", "Fokker 50|1985; Fokker 50 Utility|1987; Fokker 60|1995"),
        family("Fokker 70 and 100 Family", "Commercial Jet", "Regional jet", "Fokker 100|1986; Fokker 70|1993")
      ]
    }),
    manufacturer({
      id: "de-havilland", name: "de Havilland", country: "United Kingdom", founded: "1920", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Airliner", "Fighter", "Trainer"],
      summary: "de Havilland created famous light aircraft, airliners, fighters, and early jet designs.",
      families: [
        family("de Havilland Light Aircraft", "General Aviation", "Light civil aircraft", "DH.60 Moth|1925; DH.80A Puss Moth|1929; DH.82A Tiger Moth|1931; DH.83 Fox Moth|1932; DH.85 Leopard Moth|1933; DH.87 Hornet Moth|1934; DH.89 Dragon Rapide|1934"),
        family("de Havilland Combat Aircraft", "Fighter", "Military aircraft", "DH.98 Mosquito B Mk IV|1940; DH.98 Mosquito FB Mk VI|1942; DH.103 Hornet F.1|1944; DH.100 Vampire F.1|1943; DH.100 Vampire T.11|1950; DH.112 Venom FB.1|1949; DH.110 Sea Vixen FAW.2|1959"),
        family("Comet Family", "Commercial Jet", "Jet airliner", "DH.106 Comet 1|1949; Comet 2|1953; Comet 3|1954; Comet 4|1958; Comet 4B|1959; Comet 4C|1959; Hawker Siddeley Nimrod MR.1|1967"),
        family("de Havilland Experimental", "Experimental", "Research aircraft", "DH.108 Swallow|1946; DH.110 Prototype|1951")
      ]
    }),
    manufacturer({
      id: "avro", name: "Avro", country: "United Kingdom", founded: "1910", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Bomber", "Airliner", "Trainer"],
      summary: "Avro produced major British trainers, bombers, transports, and experimental aircraft.",
      families: [
        family("Avro Trainers and Transports", "Trainer", "Trainer or transport aircraft", "Avro 504K|1913; Avro Anson Mk I|1935; Avro York|1942; Avro Tudor|1945; Avro 748 Series 1|1960; Avro 748 Series 2A|1967"),
        family("Avro Bombers", "Bomber", "Bomber", "Avro Manchester|1939; Lancaster B Mk I|1941; Lancaster B Mk III|1941; Lincoln B.2|1944; Shackleton MR.2|1949; Shackleton AEW.2|1951; Vulcan B.1|1952; Vulcan B.2|1958"),
        family("Avro Canada Heritage", "Fighter", "Canadian fighter or airliner", "C102 Jetliner|1949; CF-100 Canuck|1950; CF-105 Arrow|1958|||Prototype")
      ]
    }),
    manufacturer({
      id: "bac", name: "British Aircraft Corporation", country: "United Kingdom", founded: "1960", status: "Historic manufacturer", category: "Commercial Airliner",
      aircraftFocus: ["Airliner", "Fighter", "Trainer"],
      summary: "BAC consolidated several British manufacturers and produced airliners, combat aircraft, and supersonic projects.",
      families: [
        family("BAC One-Eleven Family", "Commercial Jet", "Jet airliner", "BAC One-Eleven 200|1963; One-Eleven 300|1963; One-Eleven 400|1965; One-Eleven 475|1970; One-Eleven 500|1967"),
        family("BAC Military Aircraft", "Fighter", "Military aircraft", "Lightning F.1|1959; Lightning F.2A|1962; Lightning F.3|1962; Lightning F.6|1964; TSR-2|1964|||Prototype; Strikemaster Mk 80|1967"),
        family("Concorde Family", "Commercial Jet", "Supersonic airliner", "Concorde 001|1969|||Prototype; Concorde 002|1969|||Prototype; Concorde Production Aircraft|1971")
      ]
    }),
    manufacturer({
      id: "hawker-siddeley", name: "Hawker Siddeley", country: "United Kingdom", founded: "1934", status: "Historic manufacturer", category: "Commercial Airliner",
      aircraftFocus: ["Airliner", "VTOL", "Military Aircraft"],
      summary: "Hawker Siddeley produced regional airliners, military aircraft, and the pioneering Harrier family.",
      families: [
        family("Hawker Combat Aircraft", "Fighter", "Military aircraft", "Hawker Hunter F.1|1951; Hunter F.6|1954; Hunter T.7|1955; Sea Hawk F.1|1947; P.1127|1960|||Prototype; Kestrel FGA.1|1964; Harrier GR.1|1967; Harrier GR.3|1970; Sea Harrier FRS.1|1978"),
        family("Hawker Siddeley Airliners", "Regional Turboprop", "Regional or commercial transport", "HS 748 Series 2|1961; HS 748 Series 2B|1979; HS 780 Andover|1963; HS 121 Trident 1|1962; Trident 2E|1967; Trident 3B|1969"),
        family("Hawker Siddeley Military", "Military Transport", "Military aircraft", "Buccaneer S.2|1958; Nimrod MR.1|1967; Nimrod MR.2|1967; Nimrod R.1|1973")
      ]
    }),
    manufacturer({
      id: "british-aerospace", name: "British Aerospace", country: "United Kingdom", founded: "1977", status: "Historic manufacturer", category: "Commercial Airliner",
      aircraftFocus: ["Regional Jet", "Fighter", "Trainer"],
      summary: "British Aerospace developed regional jetliners, trainers, and later Harrier variants.",
      families: [
        family("BAe 146 Family", "Commercial Jet", "Regional jet", "BAe 146-100|1981; BAe 146-200|1982; BAe 146-300|1988; BAe 146-200QT|1988; BAe 146-300QT|1988"),
        family("Avro RJ Family", "Commercial Jet", "Regional jet", "Avro RJ70|1993; Avro RJ85|1992; Avro RJ100|1992"),
        family("British Aerospace Military", "Trainer", "Military trainer or fighter", "Hawk T.1|1974; Hawk 100|1987; Hawk 200|1986; Sea Harrier FA.2|1988; Harrier GR.5|1985; Harrier GR.7|1989; Harrier GR.9|2001")
      ]
    }),
    manufacturer({
      id: "bae-systems", name: "BAE Systems", country: "United Kingdom", founded: "1999", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Trainer", "Electronic Warfare"],
      summary: "BAE Systems participates in combat-aircraft programs and supports the Hawk and Typhoon families.",
      source: { name: "BAE Systems air products", url: "https://www.baesystems.com/en/sector/air" },
      families: [
        family("Hawk Family", "Trainer", "Advanced jet trainer", "Hawk T2|2005; Hawk Mk 127|1993; Hawk Mk 132|2004; T-45A Goshawk|1988; T-45C Goshawk|1994"),
        family("Eurofighter Typhoon Family", "Fighter", "Multirole fighter", "Typhoon DA1|1994|||Prototype; Typhoon FGR.4|2002; Typhoon T.3|2002; Eurofighter Typhoon Tranche 1|2003; Eurofighter Typhoon Tranche 2|2008; Eurofighter Typhoon Tranche 3A|2013")
      ]
    }),
    manufacturer({
      id: "panavia", name: "Panavia", country: "Germany / Italy / United Kingdom", founded: "1969", status: "Historic consortium", category: "Military & Defense",
      aircraftFocus: ["Strike Aircraft", "Interceptor", "Reconnaissance"],
      summary: "Panavia developed the multinational Tornado family for strike, interdiction, reconnaissance, and air-defence missions.",
      families: [family("Tornado Family", "Attack", "Variable-sweep combat aircraft", "Tornado IDS|1974; Tornado GR.1|1974; Tornado GR.1A|1988; Tornado GR.4|1997; Tornado ECR|1990; Tornado ADV F.2|1979; Tornado ADV F.3|1985")]
    }),
    manufacturer({
      id: "sepecat", name: "SEPECAT", country: "France / United Kingdom", founded: "1966", status: "Historic consortium", category: "Military & Defense",
      aircraftFocus: ["Attack", "Trainer", "Reconnaissance"],
      summary: "SEPECAT developed the Anglo-French Jaguar strike and advanced-training aircraft family.",
      families: [family("Jaguar Family", "Attack", "Strike aircraft", "Jaguar A|1968; Jaguar B|1971; Jaguar E|1971; Jaguar S|1969; Jaguar T.2|1971; Jaguar GR.1A|1983; Jaguar GR.3A|1999; Jaguar International|1976; Jaguar DARIN III|2012")]
    }),
    manufacturer({
      id: "vickers", name: "Vickers", country: "United Kingdom", founded: "1911", status: "Historic manufacturer", category: "Commercial Airliner",
      aircraftFocus: ["Airliner", "Bomber", "Military Transport"],
      summary: "Vickers built important bombers and airliners from the Wellington through the Viscount and VC10.",
      families: [
        family("Vickers Military Aircraft", "Bomber", "Military aircraft", "Vimy|1917; Wellington Mk IC|1936; Wellington Mk X|1942; Warwick|1939; Valiant B.1|1951"),
        family("Vickers Airliners", "Commercial Jet", "Commercial airliner", "Viking 1B|1945; Viscount 700|1948; Viscount 800|1956; Vanguard|1959; VC10 Type 1101|1962; Super VC10|1964")
      ]
    }),
    manufacturer({
      id: "supermarine", name: "Supermarine", country: "United Kingdom", founded: "1913", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Fighter", "Flying Boat", "Experimental"],
      summary: "Supermarine is best known for the Spitfire and its Schneider Trophy seaplane lineage.",
      families: [
        family("Supermarine Flying Boats", "Amphibian", "Flying boat or racing seaplane", "Southampton|1925; S.5|1927; S.6B|1931; Stranraer|1934; Walrus|1933; Sea Otter|1938"),
        family("Spitfire Family", "Fighter", "Piston fighter", "Spitfire Mk I|1936; Spitfire Mk Vb|1941; Spitfire Mk IX|1942; Spitfire Mk XIV|1943; Spitfire Mk XVI|1944; Spitfire Mk 22|1945; Seafire F Mk 47|1946"),
        family("Supermarine Jets", "Fighter", "Jet fighter", "Attacker|1946; Swift FR.5|1948; Scimitar F.1|1956")
      ]
    }),
    manufacturer({
      id: "handley-page", name: "Handley Page", country: "United Kingdom", founded: "1909", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Bomber", "Airliner", "Transport"],
      summary: "Handley Page produced large bombers and distinctive postwar transports and airliners.",
      families: [family("Handley Page Family", "Bomber", "Bomber or transport aircraft", "O/400|1916; H.P.42|1930; Hampden|1936; Halifax B Mk III|1939; Hermes IV|1948; Hastings C.1|1946; Victor B.1|1952; Victor B.2|1959; Victor K.2|1972; Jetstream 31|1967")]
    }),
    manufacturer({
      id: "short-brothers", name: "Short Brothers", country: "United Kingdom", founded: "1908", category: "Regional & Utility",
      aircraftFocus: ["Flying Boat", "Regional Aircraft", "Military Transport"],
      summary: "Short Brothers built pioneering flying boats, transports, commuter airliners, and utility aircraft.",
      families: [
        family("Short Flying Boats", "Amphibian", "Flying boat", "Singapore III|1934; Sunderland Mk I|1937; Sunderland Mk III|1941; Empire C-Class|1936; Seaford|1944; Solent|1946"),
        family("Short Transports", "Military Transport", "Transport aircraft", "Belfast C.1|1964; Skyvan 3|1963; SC.7 Skyvan|1963; C-23A Sherpa|1982; C-23B Sherpa|1984"),
        family("Short Regional Family", "Regional Turboprop", "Commuter aircraft", "Short 330|1974; Short 360|1981")
      ]
    }),
    manufacturer({
      id: "gloster", name: "Gloster", country: "United Kingdom", founded: "1917", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Early Jet", "Experimental"],
      summary: "Gloster built British fighters and the country's first jet-powered aircraft.",
      families: [family("Gloster Fighter Family", "Fighter", "Military fighter", "Gladiator Mk I|1934; Gladiator Mk II|1938; E.28/39|1941|||Experimental aircraft; Meteor F.1|1943; Meteor F.3|1944; Meteor F.4|1945; Meteor F.8|1948; Meteor NF.11|1950; Javelin FAW.9|1951")]
    }),
    manufacturer({
      id: "english-electric", name: "English Electric", country: "United Kingdom", founded: "1918", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Bomber", "Fighter", "Experimental"],
      summary: "English Electric developed the Canberra bomber and Lightning interceptor.",
      families: [
        family("Canberra Family", "Bomber", "Jet bomber or reconnaissance aircraft", "Canberra B.2|1949; Canberra B.6|1954; Canberra PR.9|1955; Canberra T.17|1966"),
        family("Lightning Family", "Fighter", "Supersonic interceptor", "P.1A|1954|||Prototype; P.1B|1957|||Prototype; Lightning F.1|1959; Lightning F.2|1961; Lightning F.3|1962; Lightning F.6|1964")
      ]
    }),
    manufacturer({
      id: "britten-norman", name: "Britten-Norman", country: "United Kingdom", founded: "1954", category: "Regional & Utility",
      aircraftFocus: ["Commuter Aircraft", "STOL", "Surveillance"],
      summary: "Britten-Norman builds simple, rugged island-hopping and surveillance aircraft.",
      source: { name: "Britten-Norman aircraft", url: "https://britten-norman.com/" },
      families: [family("Islander Family", "General Aviation", "STOL commuter and utility aircraft", "BN-2A Islander|1965; BN-2B Islander|1967; BN-2T Turbine Islander|1981; BN-2A Mk III Trislander|1970; Defender 4000|1994; Maritime Defender|2003")]
    }),
    manufacturer({
      id: "sud-aviation", name: "Sud Aviation", country: "France", founded: "1957", status: "Historic manufacturer", category: "Commercial Airliner",
      aircraftFocus: ["Airliner", "Helicopter", "Supersonic Transport"],
      summary: "Sud Aviation created the Caravelle and major helicopter types and co-developed Concorde.",
      families: [
        family("Caravelle Family", "Commercial Jet", "Jet airliner", "Caravelle I|1955; Caravelle III|1959; Caravelle VI-N|1960; Caravelle VI-R|1961; Caravelle 10B3|1964; Caravelle 12|1970"),
        family("Sud Aviation Historic", "Military Transport", "Transport or experimental aircraft", "SO.4050 Vautour IIA|1952; Concorde 001|1969|||Prototype")
      ]
    }),
    manufacturer({
      id: "aerospatiale", name: "Aérospatiale", country: "France", founded: "1970", status: "Historic manufacturer", category: "Regional & Utility",
      aircraftFocus: ["Airliner", "Helicopter", "Utility"],
      summary: "Aérospatiale produced transports, helicopters, missiles, and major European collaborative aircraft.",
      families: [
        family("Aérospatiale Fixed-Wing", "Regional Turboprop", "Regional or utility aircraft", "N 262|1962; Corvette 100|1970; C-160 Transall|1963; ATR 42-300|1984; Concorde Production Aircraft|1971"),
        family("Aérospatiale Helicopters", "Helicopter", "Civil or military helicopter", "Alouette II|1955; Alouette III|1959; SA 315B Lama|1969; SA 316B Alouette III|1968; SA 319B Alouette III|1967; SA 321 Super Frelon|1962; SA 330 Puma|1965; AS 332 Super Puma|1978; AS 350 B Écureuil|1974; AS 355 F Écureuil 2|1979; AS 365 N Dauphin 2|1975")
      ]
    }),
    manufacturer({
      id: "breguet", name: "Breguet Aviation", country: "France", founded: "1911", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Maritime Patrol", "Attack", "Historic Aircraft"],
      summary: "Breguet produced pioneering aircraft, military transports, attack aircraft, and Atlantic maritime patrol aircraft.",
      families: [family("Breguet Family", "ISR", "Military patrol or attack aircraft", "Breguet 14|1916; Breguet 19|1922; Br.521 Bizerte|1933; Br.763 Deux-Ponts|1949; Br.1050 Alizé|1956; Br.1150 Atlantic|1961; Jaguar A|1968")]
    }),
    manufacturer({
      id: "daher-socata", name: "Daher / SOCATA", country: "France", founded: "1911", category: "Business & General Aviation",
      aircraftFocus: ["Turboprop", "General Aviation", "Trainer"],
      summary: "SOCATA and Daher produced touring aircraft and the high-performance TBM turboprop family.",
      source: { name: "Daher aircraft", url: "https://www.daher.com/en/aircraft-manufacturer/" },
      families: [
        family("SOCATA Rallye and TB Family", "General Aviation", "Touring and training aircraft", "MS.880 Rallye|1959; MS.893 Rallye Commodore|1967; TB 9 Tampico|1977; TB 10 Tobago|1977; TB 20 Trinidad|1980; TB 21 Trinidad TC|1980; TB 200 Tobago XL|1991"),
        family("TBM Family", "General Aviation", "Single-engine turboprop", "TBM 700A|1988; TBM 700B|1999; TBM 850|2005; TBM 900|2014; TBM 910|2017; TBM 930|2016; TBM 940|2019; TBM 960|2022")]
    }),
    manufacturer({
      id: "robin", name: "Robin Aircraft", country: "France", founded: "1957", category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Trainer", "Touring"],
      summary: "Robin produces distinctive wood-and-composite touring and training aircraft.",
      source: { name: "Robin Aircraft range", url: "https://www.robin-aircraft.com/en/" },
      families: [family("Robin Family", "General Aviation", "Touring and training aircraft", "DR100|1957; DR221 Dauphin|1968; DR253 Regent|1967; DR300|1968; DR400-120 Dauphin 2+2|1972; DR400-140B Major|1972; DR400-180 Régent|1972; DR401-155CDI|2014; HR200|1971; R2160 Alpha Sport|1976")]
    }),
    manufacturer({
      id: "dornier", name: "Dornier", country: "Germany", founded: "1914", status: "Historic manufacturer", category: "Regional & Utility",
      aircraftFocus: ["Regional Aircraft", "Flying Boat", "Experimental"],
      summary: "Dornier created flying boats, military aircraft, STOL transports, and regional turboprop and jet families.",
      families: [
        family("Dornier Historic", "Amphibian", "Flying boat or military aircraft", "Do J Wal|1922; Do X|1929; Do 17Z|1934; Do 24T|1937; Do 26|1938; Do 217E|1938; Do 335A Pfeil|1943"),
        family("Dornier Utility Family", "General Aviation", "STOL utility aircraft", "Do 27|1955; Do 28A|1959; Do 28D Skyservant|1966; Do 228-100|1981; Do 228-200|1981; Do 228NG|2009"),
        family("Dornier 328 Family", "Regional Turboprop", "Regional aircraft", "Dornier 328-100|1991; Dornier 328-300 JET|1998; D328eco|In development|||Advanced development"),
        family("Dornier Experimental", "Experimental", "VTOL or research aircraft", "Do 31E|1967|||Prototype; Alpha Jet A|1973")
      ]
    }),
    manufacturer({
      id: "junkers", name: "Junkers", country: "Germany", founded: "1895", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Airliner", "Transport", "Bomber"],
      summary: "Junkers pioneered all-metal aircraft and produced influential transports and military aircraft.",
      families: [family("Junkers Family", "Commercial Jet", "Historic transport or military aircraft", "J 1|1915|||Experimental aircraft; F 13|1919; G 24|1924; W 33|1926; W 34|1926; Ju 52/3m|1932; Ju 86|1934; Ju 87B Stuka|1935; Ju 88A|1936; Ju 188A|1942; Ju 290A|1942")]
    }),
    manufacturer({
      id: "messerschmitt", name: "Messerschmitt", country: "Germany", founded: "1938", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Transport", "Experimental"],
      summary: "Messerschmitt produced some of Germany's most important piston and early jet combat aircraft.",
      families: [
        family("Bf 109 Family", "Fighter", "Piston fighter", "Bf 109B|1937; Bf 109E|1938; Bf 109F|1940; Bf 109G|1942; Bf 109K|1944"),
        family("Messerschmitt Combat Aircraft", "Fighter", "Military aircraft", "Bf 110C|1936; Me 163B Komet|1941; Me 210A|1939; Me 262A-1a Schwalbe|1942; Me 262B-1a|1944; Me 264|1942|||Prototype; Me 410A Hornisse|1942"),
        family("Messerschmitt Postwar", "General Aviation", "Light aircraft or fighter", "Me P.1101|1945|||Prototype; Bo 209 Monsun|1967; HA-200 Saeta|1955")
      ]
    }),
    manufacturer({
      id: "focke-wulf", name: "Focke-Wulf", country: "Germany", founded: "1923", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Transport", "Experimental"],
      summary: "Focke-Wulf built major German fighters and long-range transports.",
      families: [family("Focke-Wulf Family", "Fighter", "Military aircraft", "Fw 44 Stieglitz|1932; Fw 56 Stösser|1933; Fw 58 Weihe|1935; Fw 189A Uhu|1938; Fw 190A|1939; Fw 190D|1944; Fw 200 Condor|1937; Ta 152H|1944")]
    }),
    manufacturer({
      id: "heinkel", name: "Heinkel", country: "Germany", founded: "1922", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Bomber", "Fighter", "Experimental Jet"],
      summary: "Heinkel produced bombers, fighters, and the world's first turbojet aircraft.",
      families: [family("Heinkel Family", "Bomber", "Military or experimental aircraft", "He 51|1933; He 70 Blitz|1932; He 111H|1935; He 112|1935; He 115|1937; He 162A Volksjäger|1944; He 176|1939|||Experimental aircraft; He 178|1939|||Experimental aircraft; He 219A Uhu|1942")]
    }),
    manufacturer({
      id: "grob", name: "Grob Aircraft", country: "Germany", founded: "1971", category: "Business & General Aviation",
      aircraftFocus: ["Trainer", "Glider", "Special Mission"],
      summary: "Grob produces composite training, surveillance, and sailplane designs.",
      source: { name: "Grob aircraft", url: "https://grob-aircraft.com/" },
      families: [
        family("Grob Powered Aircraft", "Trainer", "Training or special-mission aircraft", "G 109B|1980; G 115|1985; G 120A|1999; G 120TP|2010; G 520 Egrett|1987; G 550|In development|||Advanced development"),
        family("Grob Sailplanes", "Glider", "Sailplane", "G 102 Astir CS|1974; G 103 Twin Astir|1976; G 103 Twin II|1980; G 104 Speed Astir|1980")
      ]
    }),
    manufacturer({
      id: "diamond", name: "Diamond Aircraft", country: "Austria", founded: "1981", category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Trainer", "Special Mission"],
      summary: "Diamond builds composite piston singles, light twins, trainers, and surveillance aircraft.",
      source: { name: "Diamond aircraft", url: "https://www.diamondaircraft.com/en/" },
      families: [
        family("Diamond Single-Engine Family", "General Aviation", "Single-engine piston aircraft", "HK36 Super Dimona|1980; DA20-A1 Katana|1991; DA20-C1|1998; DA40 TDI|2002; DA40 NG|2008; DA50 RG|2019"),
        family("Diamond Twin Family", "General Aviation", "Twin-engine piston aircraft", "DA42 Twin Star|2002; DA42 NG|2008|8.6 m,13.6 m,2.5 m; DA62|2012|9.2 m,14.6 m,2.8 m"),
        family("Diamond Special Mission", "ISR", "Special-mission aircraft", "DA42 MPP|2004; DA62 MPP|2015; DART-550|2018")
      ]
    }),
    manufacturer({
      id: "pilatus", name: "Pilatus", country: "Switzerland", founded: "1939", category: "Business & General Aviation",
      aircraftFocus: ["Trainer", "Utility", "Business Jet"],
      summary: "Pilatus produces military trainers, rugged utility turboprops, and business aircraft.",
      source: { name: "Pilatus aircraft", url: "https://www.pilatus-aircraft.com/en/fly" },
      families: [
        family("Pilatus Historic Trainers", "Trainer", "Military trainer", "P-2|1945; P-3|1953; PC-7|1966; PC-7 Mk II|1992; PC-9|1984; PC-21|2002"),
        family("Pilatus Utility Family", "General Aviation", "Utility aircraft", "PC-6 Porter|1959; PC-6/B2-H4 Turbo Porter|1964; PC-12/41|1991; PC-12/47E|2008; PC-12 NGX|2019; PC-24|2015")
      ]
    }),
    manufacturer({
      id: "piaggio", name: "Piaggio Aerospace", country: "Italy", founded: "1884", category: "Business & General Aviation",
      aircraftFocus: ["Business Aviation", "Trainer", "Special Mission"],
      summary: "Piaggio's aircraft history spans trainers, transports, amphibians, and the distinctive Avanti pusher turboprop.",
      source: { name: "Piaggio Aerospace aircraft", url: "https://www.piaggioaerospace.it/en" },
      families: [
        family("Piaggio Historic Aircraft", "General Aviation", "Historic civil or military aircraft", "P.108B|1939; P.136L Royal Gull|1948; P.149D|1953; P.166DL3|1957"),
        family("Avanti Family", "Business Jet", "Executive turboprop", "P.180 Avanti|1986; P.180 Avanti II|2005; P.180 Avanti EVO|2013; P.1HH HammerHead|2013")
      ]
    }),
    manufacturer({
      id: "tecnam", name: "Tecnam", country: "Italy", founded: "1986", category: "Business & General Aviation",
      aircraftFocus: ["General Aviation", "Trainer", "Commuter"],
      summary: "Tecnam produces light sport aircraft, piston singles and twins, trainers, and the P2012 commuter.",
      source: { name: "Tecnam aircraft", url: "https://www.tecnam.com/aircraft/" },
      families: [
        family("Tecnam Light Aircraft", "General Aviation", "Light sport or touring aircraft", "P92 Echo|1993; P92 Echo MkII|2016; P96 Golf|1993; P2002 Sierra|2002; P2008JC|2008; P2010|2012; P2010 TDI|2020"),
        family("Tecnam Twin and Commuter", "General Aviation", "Twin-engine or commuter aircraft", "P2006T|2007; P2012 Traveller|2016; P2012 Sentinel SMP|2020")
      ]
    }),
    manufacturer({
      id: "aermacchi", name: "Aermacchi", country: "Italy", founded: "1912", status: "Historic brand", category: "Military & Defense",
      aircraftFocus: ["Trainer", "Attack", "Fighter"],
      summary: "Aermacchi developed a long line of Italian jet trainers and light attack aircraft.",
      families: [family("Aermacchi Trainer Family", "Trainer", "Jet trainer or light attack aircraft", "MB-326|1957; MB-326K|1970; MB-339A|1976; MB-339CD|1993; S-211|1981; M-311|2005; M-345|2016; M-346 Master|2004; M-346FA|2017")]
    }),
    manufacturer({
      id: "siai-marchetti", name: "SIAI-Marchetti", country: "Italy", founded: "1915", status: "Historic manufacturer", category: "Business & General Aviation",
      aircraftFocus: ["Trainer", "Flying Boat", "General Aviation"],
      summary: "SIAI-Marchetti built record-setting seaplanes and widely used piston trainers.",
      families: [family("SIAI-Marchetti Family", "Trainer", "Trainer or historic seaplane", "S.55|1924; S.56|1924; S.79 Sparviero|1934; SF.260A|1964; SF.260M|1964; SF.260TP|1980; S.205-20R|1965; S.208M|1967; S.211|1981")]
    }),
    manufacturer({
      id: "casa", name: "CASA / EADS CASA", country: "Spain", founded: "1923", category: "Regional & Utility",
      aircraftFocus: ["Military Transport", "Trainer", "Maritime Patrol"],
      summary: "CASA produced trainers, utility transports, maritime patrol aircraft, and the C-212, CN-235, and C-295 families.",
      source: { name: "Airbus military aircraft", url: "https://www.airbus.com/en/products-services/defence/military-aircraft" },
      families: [
        family("CASA Historic", "Trainer", "Trainer or patrol aircraft", "C-101 Aviojet|1977; C-127|1952; C-207 Azor|1955; C-223 Flamingo|1952"),
        family("CASA Transport Family", "Military Transport", "Military transport", "C-212-100 Aviocar|1971; C-212-200 Aviocar|1979; C-212-300 Aviocar|1984; C-212-400 Aviocar|1997; CN-235-10|1983; CN-235-100|1988; CN-235-300|1998; C-295M|1997; C-295W|2013; C-295 MPA|2002; C-295 AEW|2011")]
    }),
    manufacturer({
      id: "aero-vodochody", name: "Aero Vodochody", country: "Czech Republic", founded: "1919", category: "Military & Defense",
      aircraftFocus: ["Trainer", "Light Attack", "Historic Aircraft"],
      summary: "Aero Vodochody is a major producer of jet trainers and light combat aircraft.",
      source: { name: "Aero Vodochody aircraft", url: "https://www.aero.cz/en/" },
      families: [family("Aero Trainer Family", "Trainer", "Trainer or light attack aircraft", "Aero A.11|1925; Aero A.304|1937; L-29 Delfín|1959; L-39C Albatros|1968; L-39ZA Albatros|1975; L-59 Super Albatros|1986; L-159A ALCA|1997; L-159T2|2018; L-39NG Skyfox|2018")]
    }),
    manufacturer({
      id: "let", name: "LET Aircraft Industries", country: "Czech Republic", founded: "1936", category: "Regional & Utility",
      aircraftFocus: ["Commuter", "Utility", "Glider"],
      summary: "LET builds rugged commuter aircraft and has produced important trainers and gliders.",
      source: { name: "Aircraft Industries products", url: "https://www.let.cz/en/" },
      families: [
        family("L-410 Family", "Regional Turboprop", "Commuter turboprop", "L-410A Turbolet|1969; L-410M Turbolet|1973; L-410UVP|1979; L-410UVP-E|1984; L-410UVP-E20|1996; L-410NG|2015"),
        family("LET Sailplanes", "Glider", "Sailplane", "L-13 Blaník|1956; L-23 Super Blaník|1988; L-33 Solo|1992")
      ]
    }),
    manufacturer({
      id: "zlin", name: "Zlin Aircraft", country: "Czech Republic", founded: "1934", category: "Business & General Aviation",
      aircraftFocus: ["Trainer", "Aerobatic", "General Aviation"],
      summary: "Zlin produces training, touring, and aerobatic aircraft with a long Central European heritage.",
      source: { name: "Zlin Aircraft products", url: "https://www.zlinaircraft.eu/en/" },
      families: [family("Zlin Family", "Trainer", "Training or aerobatic aircraft", "Z-26 Trener|1947; Z-126 Trener 2|1953; Z-226 Trener 6|1955; Z-326 Trener Master|1957; Z-526 Trener Master|1965; Z-42|1967; Z-43|1968; Z-50L|1975; Z-142|1978; Z-242L|1992; Z-143L|1992")]
    }),
    manufacturer({
      id: "evektor", name: "Evektor", country: "Czech Republic", founded: "1991", category: "Business & General Aviation",
      aircraftFocus: ["Light Sport", "Trainer", "Utility"],
      summary: "Evektor develops light sport, training, and utility aircraft.",
      source: { name: "Evektor aircraft", url: "https://www.evektor.com/" },
      families: [family("Evektor Family", "General Aviation", "Light sport or utility aircraft", "EV-97 Eurostar|1997; SportStar|2000; Harmony LSA|2010; Cobra|2015; VUT100 Cobra|2004; EV-55 Outback|2011|||Prototype")]
    }),
    manufacturer({
      id: "extra", name: "Extra Aircraft", country: "Germany", founded: "1980", category: "Business & General Aviation",
      aircraftFocus: ["Aerobatic", "Sport Aircraft", "Trainer"],
      summary: "Extra Aircraft builds high-performance aerobatic and touring aircraft.",
      source: { name: "Extra Aircraft models", url: "https://www.extraaircraft.com/" },
      families: [family("Extra Aerobatic Family", "General Aviation", "Aerobatic aircraft", "Extra 230|1983; Extra 260|1985; Extra 300|1988; Extra 300L|1993; Extra 300S|1992; Extra 330SC|2007; Extra 330LX|2007; Extra 330LT|2010; Extra NG|2019; Extra 500|2002")]
    }),
    manufacturer({
      id: "pzl-mielec", name: "PZL Mielec", country: "Poland", founded: "1938", category: "Regional & Utility",
      aircraftFocus: ["Utility", "Agricultural", "Military Transport"],
      summary: "PZL Mielec produces agricultural, utility, trainer, and military transport aircraft.",
      source: { name: "PZL Mielec aircraft", url: "https://pzlmielec.pl/en/" },
      families: [
        family("PZL Utility Family", "General Aviation", "Utility aircraft", "PZL M28 Bryza|1984; M28 05 Skytruck|1993; C-145A Combat Coyote|1993; M-15 Belphegor|1973; M-18 Dromader|1976; M-18B Dromader|1984"),
        family("PZL Trainers", "Trainer", "Training aircraft", "TS-8 Bies|1955; TS-11 Iskra|1960; I-22 Iryda|1985")
      ]
    }),
    manufacturer({
      id: "pzl-okecie", name: "PZL Warszawa-Okęcie", country: "Poland", founded: "1928", category: "Business & General Aviation",
      aircraftFocus: ["Trainer", "Utility", "Agricultural"],
      summary: "PZL Warszawa-Okęcie is known for trainers, utility aircraft, and agricultural designs.",
      families: [family("PZL Okęcie Family", "Trainer", "Trainer or utility aircraft", "PZL-101 Gawron|1958; PZL-104 Wilga 35|1962; PZL-104MA Wilga 2000|1998; PZL-106 Kruk|1973; PZL-130 Orlik|1984; PZL-130TC-II Orlik|2003")]
    }),
    manufacturer({
      id: "iar", name: "Industria Aeronautică Română", country: "Romania", founded: "1925", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Trainer", "Helicopter"],
      summary: "IAR has produced Romanian fighters, trainers, utility aircraft, and licensed helicopters.",
      families: [family("IAR Fixed-Wing Family", "Trainer", "Military or training aircraft", "IAR 14|1933; IAR 37|1937; IAR 80|1939; IAR 81C|1942; IAR 823|1973; IAR 825 Triumf|1982; IAR 93 Vultur|1974; IAR 99 Standard|1985; IAR 99 Șoim|1997")]
    }),
    manufacturer({
      id: "soko", name: "Soko", country: "Yugoslavia", founded: "1950", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Trainer", "Attack", "Fighter"],
      summary: "Soko produced Yugoslav trainers, light attack aircraft, and indigenous combat-aircraft projects.",
      families: [family("Soko Family", "Attack", "Military trainer or attack aircraft", "522|1955; G-2 Galeb|1961; J-21 Jastreb|1965; J-22 Orao|1974; G-4 Super Galeb|1978; Novi Avion|Cancelled|||Concept aircraft")]
    }),
    manufacturer({
      id: "utva", name: "Utva Aviation Industry", country: "Serbia", founded: "1937", category: "Business & General Aviation",
      aircraftFocus: ["Trainer", "Utility", "Light Attack"],
      summary: "Utva develops Serbian light aircraft, trainers, and utility designs.",
      families: [family("Utva Family", "Trainer", "Trainer or utility aircraft", "Utva 60|1959; Utva 65 Privrednik|1965; Utva 66|1966; Utva 75|1976; Lasta 95|2009; Kobac|2012|||Prototype")]
    })
  ];
  const easternManufacturers = [
    manufacturer({
      id: "tupolev", name: "Tupolev", country: "Russia", founded: "1922", category: "Commercial Airliner",
      aircraftFocus: ["Airliner", "Bomber", "ISR"],
      summary: "Tupolev has designed major Soviet and Russian bombers, airliners, and reconnaissance aircraft.",
      source: { name: "United Aircraft Corporation lineup", url: "https://uacrussia.ru/en/aircraft/lineup/" },
      families: [
        family("Tupolev Early Aircraft", "Bomber", "Historic bomber or transport", "ANT-4 TB-1|1925; ANT-6 TB-3|1930; ANT-20 Maxim Gorky|1934; Tu-2S|1941; Tu-4|1947"),
        family("Tupolev Strategic Bombers", "Bomber", "Strategic bomber", "Tu-16|1952; Tu-22|1959; Tu-22M0|1969; Tu-22M2|1973; Tu-22M3|1977; Tu-95M|1952; Tu-95MS|1979; Tu-142M|1968; Tu-160|1981; Tu-160M|2022"),
        family("Tupolev Early Jetliners", "Commercial Jet", "Jet airliner", "Tu-104A|1955; Tu-104B|1958; Tu-110|1957|||Prototype; Tu-114|1957; Tu-124|1960; Tu-134A|1963; Tu-134B|1969"),
        family("Tu-154 Family", "Commercial Jet", "Trijet airliner", "Tu-154|1968; Tu-154A|1974; Tu-154B|1975; Tu-154B-2|1978; Tu-154M|1982"),
        family("Tupolev Modern Airliners", "Commercial Jet", "Commercial airliner", "Tu-144S|1968; Tu-144D|1974; Tu-204-100|1989; Tu-204-120|1997; Tu-204-300|2003; Tu-204SM|2010; Tu-214|1996; Tu-334|1999|||Prototype")
      ]
    }),
    manufacturer({
      id: "ilyushin", name: "Ilyushin", country: "Russia", founded: "1933", category: "Military & Defense",
      aircraftFocus: ["Military Transport", "Airliner", "Attack"],
      summary: "Ilyushin's catalogue covers attack aircraft, airliners, military transports, tankers, and special-mission platforms.",
      source: { name: "United Aircraft Corporation lineup", url: "https://uacrussia.ru/en/aircraft/lineup/" },
      families: [
        family("Ilyushin Combat Aircraft", "Attack", "Ground-attack or bomber aircraft", "Il-2M3 Shturmovik|1939; Il-4|1939; Il-10|1944; Il-20|1948; Il-40|1953|||Prototype; Il-102|1982|||Prototype"),
        family("Ilyushin Airliners", "Commercial Jet", "Commercial airliner", "Il-12|1945; Il-14M|1950; Il-18D|1957; Il-62|1963; Il-62M|1971; Il-86|1976; Il-96-300|1988; Il-96M|1993; Il-96-400M|2023"),
        family("Ilyushin Transports", "Military Transport", "Military transport", "Il-76M|1971; Il-76MD|1981; Il-76MF|1995; Il-76MD-90A|2012; Il-112V|2019|||Prototype; Il-114-300|2020"),
        family("Il-78 Tanker Family", "Tanker", "Aerial refueling tanker", "Il-78|1983; Il-78M|1987; Il-78M-90A|2018"),
        family("Ilyushin AEW Family", "ISR", "Airborne early-warning aircraft", "A-50|1978; A-50U|2009")
      ]
    }),
    manufacturer({
      id: "yakovlev", name: "Yakovlev", country: "Russia", founded: "1934", category: "Military & Defense",
      aircraftFocus: ["Trainer", "Fighter", "Airliner"],
      summary: "Yakovlev has designed piston fighters, jet trainers, VTOL aircraft, airliners, and modern commercial programs.",
      source: { name: "United Aircraft Corporation lineup", url: "https://uacrussia.ru/en/aircraft/lineup/" },
      families: [
        family("Yakovlev Piston Aircraft", "Fighter", "Piston fighter or trainer", "UT-2|1937; Yak-1|1940; Yak-3|1943; Yak-7B|1942; Yak-9D|1943; Yak-9U|1944; Yak-11|1945; Yak-18A|1946; Yak-18T|1967"),
        family("Yakovlev Jet Trainers", "Trainer", "Jet trainer", "Yak-30|1960|||Prototype; Yak-32|1960|||Prototype; Yak-130|1996; Yak-152|2016"),
        family("Yakovlev VTOL Family", "Fighter", "VTOL combat aircraft", "Yak-36|1963|||Prototype; Yak-38|1971; Yak-38M|1982; Yak-141|1987|||Prototype"),
        family("Yakovlev Civil Aircraft", "Commercial Jet", "Commercial or regional aircraft", "Yak-40|1966; Yak-42|1975; Yak-42D|1984; Yak-58|1993|||Prototype; MC-21-300|2017; MC-21-310|2020")
      ]
    }),
    manufacturer({
      id: "mig", name: "Mikoyan-Gurevich / MiG", country: "Russia", founded: "1939", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Interceptor", "Experimental"],
      summary: "MiG has produced some of the world's most widely operated fighters and interceptors.",
      source: { name: "United Aircraft Corporation MiG", url: "https://uacrussia.ru/en/aircraft/lineup/" },
      families: [
        family("Early MiG Fighters", "Fighter", "Military fighter", "MiG-1|1940; MiG-3|1940; MiG-9|1946; MiG-15bis|1947; MiG-15UTI|1949; MiG-17F|1950; MiG-19S|1953; MiG-19P|1954"),
        family("MiG-21 Family", "Fighter", "Supersonic fighter", "MiG-21F|1955; MiG-21F-13|1958; MiG-21PF|1961; MiG-21PFM|1964; MiG-21R|1965; MiG-21S|1965; MiG-21SM|1967; MiG-21M|1968; MiG-21MF|1970; MiG-21bis|1971; MiG-21U|1960; MiG-21UM|1968; MiG-21-93|1995"),
        family("MiG-23 and MiG-27 Family", "Fighter", "Variable-sweep fighter or attack aircraft", "MiG-23S|1967; MiG-23M|1969; MiG-23MF|1970; MiG-23ML|1975; MiG-23MLD|1982; MiG-23UB|1970; MiG-27|1970; MiG-27K|1974; MiG-27M|1976"),
        family("MiG-25 and MiG-31 Family", "Fighter", "High-speed interceptor", "MiG-25P|1964; MiG-25PD|1978; MiG-25RB|1970; MiG-25PU|1969; MiG-31|1975; MiG-31B|1985; MiG-31BM|2005; MiG-31K|2018"),
        family("MiG-29 Family", "Fighter", "Multirole fighter", "MiG-29A|1977; MiG-29B|1977; MiG-29UB|1981; MiG-29S|1984; MiG-29SE|1991; MiG-29SMT|1998; MiG-29K|1988; MiG-29KUB|2007; MiG-29M|1986; MiG-29M2|2001; MiG-35|2016"),
        family("MiG Experimental", "Experimental", "Experimental fighter", "MiG-105 Spiral|1976|||Prototype; MiG 1.44|2000|||Technology demonstrator")
      ]
    }),
    manufacturer({
      id: "beriev", name: "Beriev", country: "Russia", founded: "1934", category: "Special Mission & Amphibious",
      aircraftFocus: ["Flying Boat", "Amphibian", "AEW&C"],
      summary: "Beriev specializes in flying boats, amphibians, maritime patrol, and airborne early-warning aircraft.",
      source: { name: "United Aircraft Corporation Beriev", url: "https://uacrussia.ru/en/aircraft/lineup/" },
      families: [
        family("Beriev Flying Boats", "Amphibian", "Flying boat or amphibian", "MBR-2|1931; Be-6|1949; Be-10|1956; Be-12 Chaika|1960; Be-103|1997; Be-200ES|1998; Be-200ChS|2003"),
        family("Beriev Special Mission", "ISR", "AEW or experimental aircraft", "A-40 Albatros|1986|||Prototype; A-50 Mainstay|1978; A-50U|2009; A-100 Premier|2017|||Flight-test program")
      ]
    }),
    manufacturer({
      id: "lavochkin", name: "Lavochkin", country: "Soviet Union", founded: "1937", status: "Historic aircraft manufacturer", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Interceptor", "Experimental"],
      summary: "Lavochkin produced important Soviet piston fighters and early jet and missile research aircraft.",
      families: [family("Lavochkin Family", "Fighter", "Military fighter", "LaGG-3|1940; La-5|1942; La-5FN|1943; La-7|1944; La-9|1946; La-11|1947; La-15|1948; La-150|1946|||Prototype; La-176|1948|||Experimental aircraft; La-250 Anakonda|1956|||Prototype")]
    }),
    manufacturer({
      id: "polikarpov", name: "Polikarpov", country: "Soviet Union", founded: "1923", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Fighter", "Trainer", "Experimental"],
      summary: "Polikarpov designed many of the Soviet Union's interwar fighters, trainers, and experimental aircraft.",
      families: [family("Polikarpov Family", "Fighter", "Historic fighter or trainer", "Po-2|1927; I-5|1930; I-15|1933; I-15bis|1937; I-16 Type 5|1933; I-16 Type 10|1938; I-16 Type 24|1939; I-153 Chaika|1938; I-180|1938|||Prototype; I-185|1941|||Prototype")]
    }),
    manufacturer({
      id: "petlyakov", name: "Petlyakov", country: "Soviet Union", founded: "1938", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Bomber", "Fighter", "Historical"],
      summary: "Petlyakov is best known for the Pe-2 dive bomber and related wartime aircraft.",
      families: [family("Petlyakov Family", "Bomber", "Bomber or heavy fighter", "Pe-2|1939; Pe-2FT|1942; Pe-3bis|1941; Pe-8|1936")]
    }),
    manufacturer({
      id: "myasishchev", name: "Myasishchev", country: "Russia", founded: "1951", category: "Military & Defense",
      aircraftFocus: ["Bomber", "Experimental", "High-Altitude"],
      summary: "Myasishchev designed strategic bombers, high-altitude aircraft, and unusual aerospace testbeds.",
      families: [family("Myasishchev Family", "Bomber", "Bomber or high-altitude aircraft", "M-4 Bison|1953; 3M Bison-B|1956; VM-T Atlant|1981; M-17 Stratosphera|1982; M-55 Geophysica|1988; M-50 Bounder|1959|||Prototype")]
    })
  ];
  const asiaPacificManufacturers = [
    manufacturer({
      id: "xian", name: "Xi'an Aircraft Industrial Corporation", country: "China", founded: "1958", category: "Military & Defense",
      aircraftFocus: ["Bomber", "Military Transport", "Regional Aircraft"],
      summary: "Xi'an produces Chinese bombers, transports, special-mission aircraft, and regional turboprops.",
      source: { name: "AVIC products", url: "https://www.avic.com/en/" },
      families: [
        family("Xi'an Bomber Family", "Bomber", "Bomber", "H-6A|1959; H-6D|1981; H-6H|1998; H-6K|2007; H-6N|2017"),
        family("Xi'an Transport Family", "Military Transport", "Transport aircraft", "Y-7|1970; MA60|2000; MA600|2008; MA700|2019|||Prototype; Y-20A Kunpeng|2013; Y-20B Kunpeng|2020"),
        family("Xi'an Special Mission", "ISR", "AEW or patrol aircraft", "KJ-2000|2003; KJ-500|2013; H-6U|1990")
      ]
    }),
    manufacturer({
      id: "shenyang", name: "Shenyang Aircraft Corporation", country: "China", founded: "1951", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Carrier Aircraft", "Experimental"],
      summary: "Shenyang develops Chinese fighters, interceptors, carrier aircraft, and advanced demonstrators.",
      source: { name: "AVIC products", url: "https://www.avic.com/en/" },
      families: [
        family("Shenyang Early Fighters", "Fighter", "Military fighter", "J-5|1956; JJ-5|1966; J-6|1958; JJ-6|1964; J-8|1969; J-8II|1984; J-8F|2000"),
        family("Shenyang Flanker Family", "Fighter", "Multirole fighter", "J-11A|1998; J-11B|2004; J-11BS|2007; J-15|2009; J-15D|2018; J-16|2012; J-16D|2015"),
        family("Shenyang Future Fighters", "Experimental", "Advanced fighter demonstrator", "FC-31 Gyrfalcon|2012; J-35|2021|||Flight-test program")
      ]
    }),
    manufacturer({
      id: "chengdu", name: "Chengdu Aircraft Industry Group", country: "China", founded: "1958", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Trainer", "Uncrewed Aircraft"],
      summary: "Chengdu develops Chinese fighter aircraft and advanced uncrewed systems.",
      source: { name: "AVIC products", url: "https://www.avic.com/en/" },
      families: [
        family("Chengdu Fighter Family", "Fighter", "Military fighter", "J-7I|1966; J-7II|1978; J-7E|1990; J-7G|2002; JJ-7|1985; J-9|Cancelled|||Prototype; J-10A|1998; J-10B|2008; J-10C|2013; J-10S|2003; J-20A Mighty Dragon|2011; J-20S|2021"),
        family("Chengdu Export Fighters", "Fighter", "Multirole fighter", "FC-1 Xiaolong|2003; JF-17 Block I Thunder|2003; JF-17 Block II Thunder|2013; JF-17 Block III Thunder|2019; JF-17B Thunder|2017"),
        family("Chengdu Uncrewed Family", "ISR", "Uncrewed aircraft", "Wing Loong I|2009; Wing Loong II|2017; Wing Loong 3|2022")
      ]
    }),
    manufacturer({
      id: "harbin", name: "Harbin Aircraft Industry Group", country: "China", founded: "1952", category: "Regional & Utility",
      aircraftFocus: ["Utility", "Trainer", "Helicopter"],
      summary: "Harbin produces utility aircraft, trainers, maritime patrol derivatives, and helicopters.",
      source: { name: "AVIC products", url: "https://www.avic.com/en/" },
      families: [
        family("Harbin Fixed-Wing Family", "General Aviation", "Utility or patrol aircraft", "Y-11|1975; Y-12-I|1982; Y-12-II|1984; Y-12-IV|1993; Y-12E|2001; Y-12F|2010; SH-5|1976; PS-5|2017"),
        family("Harbin Helicopters", "Helicopter", "Military or civil helicopter", "Z-5|1958; Z-9A|1981; Z-9W|1987; Z-19|2010; H410|1991; HC120|1995")
      ]
    }),
    manufacturer({
      id: "hongdu", name: "Hongdu Aviation Industry", country: "China", founded: "1951", category: "Military & Defense",
      aircraftFocus: ["Trainer", "Light Attack", "Experimental"],
      summary: "Hongdu specializes in Chinese military trainers and light combat aircraft.",
      source: { name: "AVIC products", url: "https://www.avic.com/en/" },
      families: [family("Hongdu Trainer Family", "Trainer", "Military trainer or light attack aircraft", "CJ-6A|1958; JL-8|1990; K-8E Karakorum|1993; JL-10|2005; L-15B|2017; Q-5A Fantan|1965; Q-5D Fantan|1991")]
    }),
    manufacturer({
      id: "shaanxi", name: "Shaanxi Aircraft Corporation", country: "China", founded: "1969", category: "Military & Defense",
      aircraftFocus: ["Military Transport", "AEW&C", "Maritime Patrol"],
      summary: "Shaanxi builds medium transports and numerous airborne surveillance and special-mission variants.",
      source: { name: "AVIC products", url: "https://www.avic.com/en/" },
      families: [family("Shaanxi Y-8 and Y-9 Family", "Military Transport", "Military transport or special-mission aircraft", "Y-8A|1974; Y-8C|1985; Y-8F-200|1990; Y-8F-600|2001; Y-8J|1998; KJ-200|2005; GX-3|2007; GX-8|2011; Y-9|2010; KJ-500|2013")]
    }),
    manufacturer({
      id: "mitsubishi", name: "Mitsubishi Aircraft", country: "Japan", founded: "1928", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Regional Aircraft", "Business Jet"],
      summary: "Mitsubishi's aircraft history spans famous wartime fighters, postwar business aircraft, fighters, and regional-jet development.",
      source: { name: "Mitsubishi Heavy Industries aviation", url: "https://www.mhi.com/products/aviation" },
      families: [
        family("Mitsubishi Historic Aircraft", "Fighter", "Military aircraft", "A5M4|1935; A6M2 Zero|1939; A6M3 Zero|1941; A6M5 Zero|1943; J2M Raiden|1942; G3M Nell|1935; G4M Betty|1939; Ki-21 Sally|1936; Ki-46 Dinah|1939; Ki-67 Peggy|1942"),
        family("Mitsubishi Postwar Aircraft", "Fighter", "Military or business aircraft", "MU-2B|1956; MU-300 Diamond|1978; F-1|1975; T-2|1971; F-2A|1995; F-2B|1996; X-2 Shinshin|2016|||Technology demonstrator"),
        family("SpaceJet Family", "Commercial Jet", "Regional jet", "MRJ90|2015|||Prototype; MRJ70|Cancelled|||Prototype; SpaceJet M90|2015|||Program cancelled")
      ]
    }),
    manufacturer({
      id: "kawasaki", name: "Kawasaki Aerospace", country: "Japan", founded: "1918", category: "Military & Defense",
      aircraftFocus: ["Military Transport", "Maritime Patrol", "Trainer"],
      summary: "Kawasaki produces Japanese transports, maritime patrol aircraft, trainers, and helicopters.",
      source: { name: "Kawasaki aerospace systems", url: "https://global.kawasaki.com/en/mobility/air/" },
      families: [
        family("Kawasaki Historic Aircraft", "Fighter", "Military aircraft", "Ki-10 Perry|1935; Ki-45 Toryu|1941; Ki-48 Lily|1939; Ki-61 Hien|1941; Ki-100|1945"),
        family("Kawasaki Postwar Fixed-Wing", "Military Transport", "Military aircraft", "T-4|1985; C-1|1970; C-2|2010; P-2J|1966; P-3C Orion|1978; P-1|2007"),
        family("Kawasaki Helicopters", "Helicopter", "Military helicopter", "KV-107II|1962; OH-1 Ninja|1996; BK117 C-2|1999")
      ]
    }),
    manufacturer({
      id: "nakajima", name: "Nakajima Aircraft Company", country: "Japan", founded: "1917", status: "Historic manufacturer", category: "Historic Aircraft",
      aircraftFocus: ["Fighter", "Bomber", "Reconnaissance"],
      summary: "Nakajima produced major Japanese fighters, bombers, reconnaissance aircraft, and carrier aircraft.",
      families: [family("Nakajima Family", "Fighter", "Military aircraft", "A2N|1930; B5N Kate|1937; B6N Tenzan|1941; C6N Saiun|1943; J1N Gekko|1941; Ki-27 Nate|1936; Ki-43 Hayabusa|1939; Ki-44 Shoki|1940; Ki-49 Donryu|1939; Ki-84 Hayate|1943; Kikka|1945|||Prototype")]
    }),
    manufacturer({
      id: "subaru", name: "Subaru / Fuji Heavy Industries", country: "Japan", founded: "1953", category: "Business & General Aviation",
      aircraftFocus: ["Trainer", "Utility", "Helicopter"],
      summary: "Fuji and Subaru have produced trainers, utility aircraft, business aircraft, and military helicopters.",
      source: { name: "Subaru Aerospace Company", url: "https://www.subaru.co.jp/en/outline/aerospace/" },
      families: [
        family("Fuji Fixed-Wing Family", "Trainer", "Trainer or utility aircraft", "T-1A|1958; T-1B|1960; T-3|1974; T-5|1984; T-7|2002; FA-200 Aero Subaru|1965; FA-300|1975; LM-1 Nikko|1955"),
        family("Subaru Helicopters", "Helicopter", "Utility helicopter", "UH-2|2022; Bell 412EPX|2018")
      ]
    }),
    manufacturer({
      id: "honda-aircraft", name: "Honda Aircraft Company", country: "Japan / United States", founded: "2006", category: "Business & General Aviation",
      aircraftFocus: ["Business Jet", "Light Jet", "Experimental"],
      summary: "Honda Aircraft produces the over-the-wing-engine-mounted HondaJet light business jet family.",
      source: { name: "HondaJet models", url: "https://www.hondajet.com/" },
      families: [family("HondaJet Family", "Business Jet", "Light business jet", "HA-420 HondaJet|2003; HondaJet Elite|2018; HondaJet Elite S|2021; HondaJet Elite II|2022; HondaJet Echelon|In development|||Advanced development")]
    }),
    manufacturer({
      id: "hal", name: "Hindustan Aeronautics Limited", country: "India", founded: "1940", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Trainer", "Helicopter"],
      summary: "HAL builds Indian fighters, trainers, transports, and a broad family of civil and military helicopters.",
      source: { name: "HAL products", url: "https://hal-india.co.in/" },
      families: [
        family("HAL Fighters", "Fighter", "Military fighter", "HF-24 Marut Mk 1|1961; Tejas Mk 1|2001; Tejas Mk 1A|2022; Tejas Mk 2|In development|||Advanced development; Su-30MKI|1997"),
        family("HAL Trainers and Utility", "Trainer", "Trainer or utility aircraft", "HT-2|1951; HJT-16 Kiran Mk I|1964; HJT-16 Kiran Mk II|1976; HJT-36 Sitara|2003; HTT-40|2016; Do 228-201|1983; Saras Mk 1|2004|||Prototype"),
        family("HAL Helicopters", "Helicopter", "Civil or military helicopter", "Chetak|1962; Cheetah|1971; Dhruv Mk I|1992; Dhruv Mk III|2007; Dhruv Mk IV Rudra|2007; LCH Prachand|2010; LUH|2016")
      ]
    }),
    manufacturer({
      id: "kai", name: "Korea Aerospace Industries", country: "South Korea", founded: "1999", category: "Military & Defense",
      aircraftFocus: ["Trainer", "Fighter", "Helicopter"],
      summary: "KAI develops South Korean trainers, light fighters, helicopters, and the KF-21 combat-aircraft program.",
      source: { name: "KAI products", url: "https://www.koreaaero.com/EN/" },
      families: [
        family("KAI Trainer and Fighter Family", "Trainer", "Trainer or light fighter", "KT-1 Woongbi|1991; KA-1|2000; T-50 Golden Eagle|2002; TA-50|2011; FA-50 Fighting Eagle|2011; KF-21 Boramae|2022"),
        family("KAI Helicopters", "Helicopter", "Utility helicopter", "KUH-1 Surion|2010; LAH-1 Miron|2019; LCH|2018")
      ]
    }),
    manufacturer({
      id: "indonesian-aerospace", name: "Indonesian Aerospace / IPTN", country: "Indonesia", founded: "1976", category: "Regional & Utility",
      aircraftFocus: ["Regional Aircraft", "Military Transport", "Trainer"],
      summary: "Indonesian Aerospace produces transports, commuter aircraft, maritime patrol variants, and collaborative programs.",
      source: { name: "Indonesian Aerospace products", url: "https://www.indonesian-aerospace.com/" },
      families: [family("IPTN Fixed-Wing Family", "Regional Turboprop", "Regional or military transport", "NC212-100|1976; NC212-200|1984; NC212i|2014; CN-235-10|1983; CN-235-220|1991; CN-235 MPA|1996; N-250-100|1995|||Prototype; N-250-200|1996|||Prototype; N-219 Nurtanio|2017")]
    }),
    manufacturer({
      id: "pac", name: "Pakistan Aeronautical Complex", country: "Pakistan", founded: "1971", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Trainer", "Uncrewed Aircraft"],
      summary: "PAC manufactures and supports Pakistani fighters, trainers, and aerospace programs.",
      source: { name: "Pakistan Aeronautical Complex products", url: "https://www.pac.org.pk/" },
      families: [family("PAC Aircraft Family", "Trainer", "Trainer or fighter", "MFI-17 Mushshak|1974; Super Mushshak|1995; K-8P Karakorum|1994; JF-17 Block I Thunder|2003; JF-17 Block II Thunder|2013; JF-17 Block III Thunder|2019; JF-17B Thunder|2017")]
    }),
    manufacturer({
      id: "aidc", name: "Aerospace Industrial Development Corporation", country: "Taiwan", founded: "1969", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Trainer", "Utility"],
      summary: "AIDC develops and produces Taiwanese fighters, trainers, and utility aircraft.",
      source: { name: "AIDC products", url: "https://www.aidc.com.tw/en" },
      families: [family("AIDC Family", "Fighter", "Military fighter or trainer", "T-CH-1 Chung-Hsing|1973; AT-3 Tzu Chung|1980; F-CK-1A Ching-kuo|1989; F-CK-1B Ching-kuo|1990; F-CK-1C Hsiung Ying|2006; T-5 Brave Eagle|2020")]
    }),
    manufacturer({
      id: "cac-australia", name: "Commonwealth Aircraft Corporation", country: "Australia", founded: "1936", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Trainer", "Historical"],
      summary: "CAC produced Australian trainers, fighters, bombers, and licensed jet aircraft.",
      families: [family("CAC Family", "Fighter", "Military aircraft", "CA-1 Wirraway|1939; CA-12 Boomerang|1942; CA-15 Kangaroo|1946|||Prototype; CA-16 Wirraway|1943; CA-27 Sabre Mk 30|1953; CA-27 Sabre Mk 31|1955; CA-27 Sabre Mk 32|1956; CA-30 Macchi|1967")]
    }),
    manufacturer({
      id: "gaf", name: "Government Aircraft Factories", country: "Australia", founded: "1939", status: "Historic manufacturer", category: "Regional & Utility",
      aircraftFocus: ["Military Transport", "Trainer", "Utility"],
      summary: "GAF produced Australian military aircraft and the rugged Nomad utility transport.",
      families: [family("GAF Family", "Military Transport", "Military or utility aircraft", "GAF Lincoln|1946; Jindivik Mk 2|1952; Canberra B.20|1953; Mirage IIIO|1963; N-22B Nomad|1971; N-24A Nomad|1975")]
    }),
    manufacturer({
      id: "gippsaero", name: "GippsAero", country: "Australia", founded: "1977", category: "Business & General Aviation",
      aircraftFocus: ["Utility", "Bush Aircraft", "Trainer"],
      summary: "GippsAero developed rugged utility and touring aircraft for regional and remote operations.",
      families: [family("GippsAero Family", "General Aviation", "Utility aircraft", "GA200 Fatman|1991; GA8 Airvan|1995; GA8-TC 320 Airvan|2009; GA10 Airvan|2012; GA18|2011|||Prototype")]
    }),
    manufacturer({
      id: "jabiru", name: "Jabiru Aircraft", country: "Australia", founded: "1988", category: "Business & General Aviation",
      aircraftFocus: ["Light Sport", "Trainer", "Kit Aircraft"],
      summary: "Jabiru produces light sport aircraft, kits, and aircraft engines.",
      source: { name: "Jabiru aircraft", url: "https://jabiru.net.au/" },
      families: [family("Jabiru Family", "General Aviation", "Light sport aircraft", "Jabiru LSA|1991; Jabiru UL|1991; Jabiru J160|2004; Jabiru J170|2006; Jabiru J230|2002; Jabiru J250|2004; Jabiru J430|2002")]
    }),
    manufacturer({
      id: "pacific-aerospace", name: "Pacific Aerospace", country: "New Zealand", founded: "1966", category: "Regional & Utility",
      aircraftFocus: ["Utility", "Agricultural", "Trainer"],
      summary: "Pacific Aerospace produces rugged utility, agricultural, and training aircraft.",
      source: { name: "Pacific Aerospace aircraft", url: "https://www.aerospace.co.nz/" },
      families: [family("Pacific Aerospace Family", "General Aviation", "Utility or agricultural aircraft", "CT-4A Airtrainer|1972; CT-4B Airtrainer|1974; PAC Cresco 08-600|1979; PAC 750XL|2001; P-750 XSTOL|2001; E-350 Expedition|2017")]
    })
  ];
  const globalManufacturers = [
    manufacturer({
      id: "iai", name: "Israel Aerospace Industries", country: "Israel", founded: "1953", category: "Military & Defense",
      aircraftFocus: ["Business Jet", "Fighter", "Uncrewed Aircraft"],
      summary: "IAI produces business jets, special-mission aircraft, uncrewed systems, and historical combat aircraft.",
      source: { name: "IAI aerospace products", url: "https://www.iai.co.il/" },
      families: [
        family("IAI Fighters", "Fighter", "Military fighter", "Nesher|1971; Kfir C.1|1973; Kfir C.2|1974; Kfir C.7|1983; Kfir C.10|1991; Lavi|1986|||Prototype; Nammer|1991|||Prototype"),
        family("IAI Business Jets", "Business Jet", "Business jet", "Westwind I|1965; Westwind II|1979; Astra SP|1984; Astra SPX|1994; Galaxy|1997; Gulfstream G150|2005; Gulfstream G200|1997; Gulfstream G280|2009"),
        family("IAI Special Mission", "ISR", "Surveillance or uncrewed aircraft", "Arava 201|1969; Arava 202|1971; Eitam CAEW|2006; Sea Scan 1124N|1976; Scout|1979; Heron 1|1994; Heron TP|2006; Eitan|2006")
      ]
    }),
    manufacturer({
      id: "turkish-aerospace", name: "Turkish Aerospace", country: "Türkiye", founded: "1973", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Trainer", "Helicopter"],
      summary: "Turkish Aerospace develops fighters, trainers, helicopters, uncrewed aircraft, and special-mission platforms.",
      source: { name: "Turkish Aerospace products", url: "https://www.tusas.com/en/products" },
      families: [
        family("Turkish Aerospace Fixed-Wing", "Trainer", "Trainer or fighter", "Hürkuş-A|2013; Hürkuş-B|2018; Hürkuş-C|2017; Hürjet|2023; KAAN|2024|||Flight-test program"),
        family("Turkish Aerospace Uncrewed", "ISR", "Uncrewed aircraft", "Anka-A|2010; Anka-S|2016; Aksungur|2019; Anka-3|2023"),
        family("Turkish Aerospace Helicopters", "Helicopter", "Military helicopter", "T129 ATAK|2009; T625 Gökbey|2018; T929 ATAK 2|2023|||Flight-test program")
      ]
    }),
    manufacturer({
      id: "fma-fadea", name: "FMA / FAdeA", country: "Argentina", founded: "1927", category: "Military & Defense",
      aircraftFocus: ["Trainer", "Attack", "Transport"],
      summary: "Argentina's FMA and FAdeA produced trainers, transports, experimental fighters, and the Pucará and Pampa.",
      source: { name: "FAdeA aircraft", url: "https://www.fadeasa.com.ar/" },
      families: [
        family("FMA Historic Aircraft", "Fighter", "Military or experimental aircraft", "Ae.C.3|1934; I.Ae. 22 DL|1944; I.Ae. 24 Calquín|1946; I.Ae. 27 Pulqui I|1947|||Prototype; I.Ae. 33 Pulqui II|1950|||Prototype; I.Ae. 35 Huanquero|1953"),
        family("FMA Modern Aircraft", "Attack", "Attack or trainer aircraft", "IA 46 Ranquel|1957; IA 50 Guaraní II|1963; IA 58A Pucará|1969; IA 58D Pucará|1974; IA 63 Pampa I|1984; IA 63 Pampa II|2005; IA 63 Pampa III|2015; IA 100 Malvina|2016|||Prototype")
      ]
    }),
    manufacturer({
      id: "atlas-denel", name: "Atlas / Denel Aviation", country: "South Africa", founded: "1965", category: "Military & Defense",
      aircraftFocus: ["Fighter", "Helicopter", "Trainer"],
      summary: "Atlas and Denel developed South African trainers, combat aircraft, helicopters, and upgrade programs.",
      source: { name: "Denel Aeronautics", url: "https://www.denel.co.za/" },
      families: [
        family("Atlas Fixed-Wing Family", "Fighter", "Military fighter or trainer", "Impala Mk I|1966; Impala Mk II|1974; Cheetah C|1986; Cheetah D|1986; Cheetah E|1986; Carver|Cancelled|||Prototype; AHRLAC|2014"),
        family("Denel Helicopters", "Helicopter", "Military helicopter", "Oryx|1987; AH-2 Rooivalk|1990")
      ]
    }),
    manufacturer({
      id: "enaer", name: "ENAER", country: "Chile", founded: "1984", category: "Military & Defense",
      aircraftFocus: ["Trainer", "Light Attack", "Utility"],
      summary: "ENAER produces and supports Chilean trainers and light attack aircraft.",
      source: { name: "ENAER aircraft", url: "https://www.enaer.cl/" },
      families: [family("ENAER Family", "Trainer", "Trainer or light attack aircraft", "T-35A Pillán|1981; T-35B Pillán|1985; T-35D Pillán|1991; T-35DT Turbo Pillán|1986; A-36 Halcón|1984; Pillán II|2022|||Prototype")]
    }),
    manufacturer({
      id: "valmet", name: "Valmet", country: "Finland", founded: "1951", status: "Historic manufacturer", category: "Military & Defense",
      aircraftFocus: ["Trainer", "Utility", "Historical"],
      summary: "Valmet produced Finnish military trainers and utility aircraft.",
      families: [family("Valmet Family", "Trainer", "Military trainer or utility aircraft", "Vihuri|1951; L-70 Vinka|1975; L-80 TP Turbo Vinha|1985|||Prototype; L-90 Redigo|1985")]
    }),
    manufacturer({
      id: "hawker-beechcraft", name: "Hawker", country: "United Kingdom / United States", founded: "1920", status: "Historic brand", category: "Business & General Aviation",
      aircraftFocus: ["Business Jet", "Trainer", "Historic Fighter"],
      summary: "The Hawker name covers classic British fighters and a long-running family of midsize business jets.",
      source: { name: "Textron Aviation Hawker support", url: "https://txtav.com/" },
      families: [
        family("Hawker Piston Fighters", "Fighter", "Piston fighter", "Hart|1928; Fury Mk I|1931; Hurricane Mk I|1935; Hurricane Mk IIB|1940; Hurricane Mk IIC|1941; Tempest Mk V|1942; Sea Fury FB.11|1945"),
        family("Hawker Business Jet Family", "Business Jet", "Business jet", "Hawker 125-1|1962; Hawker 125-3|1964; HS 125-400|1965; HS 125-600|1971; BAe 125-800|1983; Hawker 800XP|1995; Hawker 850XP|2005; Hawker 900XP|2006; Hawker 1000|1990; Hawker 4000|2001")
      ]
    }),
    manufacturer({
      id: "eclipse-aerospace", name: "Eclipse Aerospace", country: "United States", founded: "1998", category: "Business & General Aviation",
      aircraftFocus: ["Very Light Jet", "Personal Aircraft", "Business Aviation"],
      summary: "Eclipse developed compact very-light jets for owner-flown and air-taxi missions.",
      families: [family("Eclipse Jet Family", "Business Jet", "Very light jet", "Eclipse 500|2002; Eclipse 550|2013; Eclipse 700 Canada|In development|||Advanced development")]
    }),
    manufacturer({
      id: "daher-kodiak", name: "Kodiak Aircraft / Daher", country: "United States / France", founded: "1999", category: "Regional & Utility",
      aircraftFocus: ["Bush Aircraft", "Utility", "Turboprop"],
      summary: "Kodiak produces rugged single-engine turboprops for utility, humanitarian, and special-mission work.",
      source: { name: "Daher Kodiak aircraft", url: "https://www.daher.com/en/aircraft-manufacturer/kodiak/" },
      families: [family("Kodiak Family", "General Aviation", "Single-engine turboprop utility aircraft", "Kodiak 100 Series I|2004; Kodiak 100 Series II|2018; Kodiak 100 Series III|2021; Kodiak 900|2022")]
    }),
    manufacturer({
      id: "quest", name: "Quest Aircraft", country: "United States", founded: "2001", status: "Historic manufacturer", category: "Regional & Utility",
      aircraftFocus: ["Bush Aircraft", "Utility", "Humanitarian"],
      summary: "Quest created the Kodiak utility turboprop for remote, humanitarian, and bush operations.",
      families: [family("Quest Kodiak Family", "General Aviation", "Single-engine turboprop utility aircraft", "Kodiak 100|2004; Kodiak 100 Series II|2018")]
    }),
    manufacturer({
      id: "brm-aero", name: "Bristell / BRM Aero", country: "Czech Republic", founded: "2009", category: "Business & General Aviation",
      aircraftFocus: ["Light Sport", "Trainer", "Touring"],
      summary: "BRM Aero produces Bristell light sport and training aircraft.",
      source: { name: "Bristell aircraft", url: "https://www.bristell.com/" },
      families: [family("Bristell Family", "General Aviation", "Light sport aircraft", "Bristell Classic|2011; Bristell NG5|2011; Bristell B23|2019; Bristell B8|2022")]
    }),
    manufacturer({
      id: "glasair", name: "Glasair Aviation", country: "United States", founded: "1979", category: "Business & General Aviation",
      aircraftFocus: ["Kit Aircraft", "Bush Aircraft", "Sport Aircraft"],
      summary: "Glasair produces composite kit aircraft and the Sportsman utility family.",
      families: [family("Glasair Family", "General Aviation", "Kit-built sport or utility aircraft", "Glasair I|1980; Glasair II|1986; Glasair III|1986; GlaStar|1994; Sportsman 2+2|2003; Sportsman Diesel|2014")]
    }),
    manufacturer({
      id: "lancair", name: "Lancair", country: "United States", founded: "1981", category: "Business & General Aviation",
      aircraftFocus: ["Kit Aircraft", "High-Performance Piston", "Personal Aircraft"],
      summary: "Lancair is known for fast composite kit aircraft and certified high-performance piston designs.",
      families: [family("Lancair Family", "General Aviation", "Composite kit or personal aircraft", "Lancair 200|1984; Lancair 235|1985; Lancair 320|1988; Lancair 360|1990; Lancair IV|1990; Lancair IV-P|1991; Lancair ES|1993; Columbia 300|1996; Columbia 350|2003; Columbia 400|2000; Evolution|2008")]
    }),
    manufacturer({
      id: "pipistrel", name: "Pipistrel", country: "Slovenia", founded: "1989", category: "Business & General Aviation",
      aircraftFocus: ["Electric Aircraft", "Motor Glider", "Trainer"],
      summary: "Pipistrel produces efficient light aircraft, motor gliders, trainers, and electric aircraft.",
      source: { name: "Pipistrel aircraft", url: "https://www.pipistrel-aircraft.com/" },
      families: [
        family("Pipistrel Light Aircraft", "General Aviation", "Light aircraft", "Virus 912|1999; Virus SW 121|2016; Sinus 912|1995; Alpha Trainer|2011; Panthera|2013; Panthera Hybrid|2015|||Prototype"),
        family("Pipistrel Electric Family", "General Aviation", "Electric aircraft", "Taurus Electro G2|2011; Alpha Electro|2014; Velis Electro|2016; Nuuva V300|2020|||Prototype")
      ]
    })
  ];
  const rotorcraftManufacturers = [
    manufacturer({
      id: "airbus-helicopters", name: "Airbus Helicopters", country: "Europe", founded: "1992", category: "Rotorcraft",
      aircraftFocus: ["Civil Helicopter", "Military Helicopter", "Utility"],
      summary: "Airbus Helicopters offers light singles, twin-engine civil rotorcraft, and military utility and attack helicopters.",
      source: { name: "Airbus Helicopters portfolio", url: "https://www.airbus.com/en/products-services/helicopters" },
      families: [
        family("Airbus Light Helicopters", "Helicopter", "Light civil helicopter", "H120 Colibri|1995; H125|1974; H130|1999; H135|1994; H140|2025|||Flight-test program; H145|1999"),
        family("Airbus Medium and Heavy Helicopters", "Helicopter", "Civil or utility helicopter", "H155|1997; H160|2015; H175|2009; H215|1978; H225|2000"),
        family("Airbus Military Helicopters", "Helicopter", "Military helicopter", "H145M|2014; H215M|1978; H225M Caracal|2000; Tiger HAP|1991; Tiger HAD|2003; NH90 TTH|1995; NH90 NFH|1995")
      ]
    }),
    manufacturer({
      id: "eurocopter", name: "Eurocopter", country: "Europe", founded: "1992", status: "Historic brand", category: "Rotorcraft",
      aircraftFocus: ["Civil Helicopter", "Military Helicopter", "Utility"],
      summary: "Eurocopter consolidated French and German rotorcraft lines before becoming Airbus Helicopters.",
      families: [
        family("Eurocopter Light Family", "Helicopter", "Light helicopter", "EC120B Colibri|1995; AS350 B2 Écureuil|1974; AS350 B3 Écureuil|1997; AS355 NP Écureuil 2|1979; EC130 B4|1999; EC135 T2|1994; EC145|1999"),
        family("Eurocopter Medium Family", "Helicopter", "Medium helicopter", "AS365 N3 Dauphin|1975; EC155 B1|1997; AS332 L1 Super Puma|1978; AS332 L2 Super Puma|1987; EC225 LP Super Puma|2000; AS565 Panther|1984"),
        family("Eurocopter Military Family", "Helicopter", "Military helicopter", "EC635|1998; AS532 Cougar|1977; EC725 Caracal|2000; Tiger UHT|1991; Tiger HAP|1991")
      ]
    }),
    manufacturer({
      id: "bell", name: "Bell", country: "United States", founded: "1935", category: "Rotorcraft",
      aircraftFocus: ["Civil Helicopter", "Military Helicopter", "Tiltrotor"],
      summary: "Bell has produced landmark civil and military helicopters and pioneering tiltrotor aircraft.",
      source: { name: "Bell aircraft", url: "https://www.bellflight.com/products" },
      families: [
        family("Bell 47 Family", "Helicopter", "Light helicopter", "Bell 47B|1945; Bell 47D|1947; Bell 47G|1953; Bell 47G-2|1954; Bell 47G-3B|1962; Bell 47J Ranger|1956"),
        family("Huey Family", "Helicopter", "Utility helicopter", "Bell 204B|1956; UH-1B Iroquois|1960; UH-1C Iroquois|1965; UH-1D Iroquois|1961; UH-1H Iroquois|1966; Bell 205A-1|1961; Bell 212|1968; Bell 214A|1970; Bell 214ST|1977; UH-1Y Venom|2001"),
        family("Cobra Family", "Helicopter", "Attack helicopter", "AH-1G Cobra|1965; AH-1J SeaCobra|1969; AH-1S Cobra|1976; AH-1T Improved SeaCobra|1976; AH-1W SuperCobra|1983; AH-1Z Viper|2000"),
        family("Bell Civil Singles", "Helicopter", "Civil helicopter", "Bell 206A JetRanger|1962; Bell 206B-3 JetRanger III|1977; Bell 206L LongRanger|1974; Bell 407|1995; Bell 407GXi|2018; Bell 505 Jet Ranger X|2014; Bell 525 Relentless|2015"),
        family("Bell Civil Twins", "Helicopter", "Civil helicopter", "Bell 222|1976; Bell 230|1991; Bell 412|1979; Bell 412EP|1991; Bell 412EPI|2013; Bell 429 GlobalRanger|2007"),
        family("Bell Tiltrotors", "Tiltrotor", "Tiltrotor aircraft", "XV-3|1955|||Experimental aircraft; XV-15|1977|||Experimental aircraft; V-22A Osprey|1989; MV-22B Osprey|1999; CV-22B Osprey|2000; CMV-22B Osprey|2016; V-280 Valor|2017|||Technology demonstrator")
      ]
    }),
    manufacturer({
      id: "sikorsky", name: "Sikorsky", country: "United States", founded: "1923", category: "Rotorcraft",
      aircraftFocus: ["Military Helicopter", "Civil Helicopter", "Heavy Lift"],
      summary: "Sikorsky is one of the foundational helicopter manufacturers, with major civil, military, and heavy-lift families.",
      source: { name: "Sikorsky aircraft", url: "https://www.lockheedmartin.com/en-us/who-we-are/business-areas/sikorsky.html" },
      families: [
        family("Early Sikorsky Helicopters", "Helicopter", "Historic helicopter", "VS-300|1939|||Experimental aircraft; R-4B Hoverfly|1942; S-51|1946; S-52|1947; S-55|1949; S-58|1954"),
        family("Sikorsky Sea and Heavy Lift", "Helicopter", "Military helicopter", "S-61N|1959; SH-3A Sea King|1959; SH-3H Sea King|1967; S-62|1958; S-64 Skycrane|1962; CH-54A Tarhe|1962; S-65|1964; CH-53D Sea Stallion|1964; MH-53J Pave Low III|1967; CH-53E Super Stallion|1974; CH-53K King Stallion|2015"),
        family("Black Hawk Family", "Helicopter", "Military utility helicopter", "YUH-60A|1974; UH-60A Black Hawk|1974; UH-60L Black Hawk|1987; UH-60M Black Hawk|2003; HH-60G Pave Hawk|1982; HH-60W Jolly Green II|2019; SH-60B Seahawk|1979; MH-60R Seahawk|1999; MH-60S Seahawk|2000; S-70i Black Hawk|2010"),
        family("Sikorsky Civil Family", "Helicopter", "Civil helicopter", "S-76A|1977; S-76B|1984; S-76C++|2005; S-76D|2009; S-92A|1998"),
        family("Sikorsky Experimental", "Experimental", "Compound helicopter demonstrator", "S-69 XH-59A|1973; X2|2008; S-97 Raider|2015; SB>1 Defiant|2019")
      ]
    }),
    manufacturer({
      id: "robinson", name: "Robinson Helicopter", country: "United States", founded: "1973", category: "Rotorcraft",
      aircraftFocus: ["Civil Helicopter", "Trainer", "Utility"],
      summary: "Robinson produces widely used light piston and turbine helicopters for training, private, and utility flying.",
      source: { name: "Robinson helicopters", url: "https://www.robinsonheli.com/" },
      families: [
        family("Robinson R22 Family", "Helicopter", "Light piston helicopter", "R22|1975; R22 HP|1981; R22 Alpha|1983; R22 Beta|1985; R22 Beta II|1996"),
        family("Robinson R44 Family", "Helicopter", "Light piston helicopter", "R44 Astro|1990; R44 Raven I|2000; R44 Raven II|2002; R44 Clipper II|2003; R44 Cadet|2015"),
        family("Robinson R66 Family", "Helicopter", "Light turbine helicopter", "R66 Turbine|2007; R66 Police|2012; R66 Marine|2014; R66 NxG|2025")
      ]
    }),
    manufacturer({
      id: "leonardo-helicopters", name: "Leonardo / AgustaWestland", country: "Italy / United Kingdom", founded: "2000", category: "Rotorcraft",
      aircraftFocus: ["Civil Helicopter", "Military Helicopter", "Tiltrotor"],
      summary: "Leonardo's helicopter range spans light twins, offshore transports, military rotorcraft, and tiltrotor development.",
      source: { name: "Leonardo helicopters", url: "https://helicopters.leonardo.com/en/home" },
      families: [
        family("Leonardo Light and Medium Twins", "Helicopter", "Civil helicopter", "A109E Power|1995; AW109 Grand|2005; AW109 Trekker|2016; AW119 Koala|1995; AW119Kx|2012; AW169|2012; AW139|2001; AW189|2011"),
        family("Leonardo Military Helicopters", "Helicopter", "Military helicopter", "AW101 Merlin|1987; AW101 SAR Queen|2017; AW129 Mangusta|1983; AW149|2009; AW159 Wildcat|2009; AW249 Fenice|2022|||Flight-test program"),
        family("Leonardo Tiltrotors", "Tiltrotor", "Civil tiltrotor", "AW609|2003|||Flight-test program")
      ]
    }),
    manufacturer({
      id: "agusta", name: "Agusta", country: "Italy", founded: "1923", status: "Historic manufacturer", category: "Rotorcraft",
      aircraftFocus: ["Civil Helicopter", "Military Helicopter", "Experimental"],
      summary: "Agusta developed influential Italian light and military helicopters before forming AgustaWestland.",
      families: [family("Agusta Helicopter Family", "Helicopter", "Civil or military helicopter", "A101|1964|||Prototype; A106|1965|||Prototype; A109A Hirundo|1971; A109K2|1988; A119 Koala|1995; A129 Mangusta|1983; AB 204B|1961; AB 205A-1|1965; AB 206B|1967; AB 212|1969; AB 412|1981")]
    }),
    manufacturer({
      id: "westland", name: "Westland Helicopters", country: "United Kingdom", founded: "1915", status: "Historic manufacturer", category: "Rotorcraft",
      aircraftFocus: ["Military Helicopter", "Naval Helicopter", "Utility"],
      summary: "Westland produced British military and naval helicopters and developed the Lynx family.",
      families: [
        family("Westland Historic Helicopters", "Helicopter", "Military helicopter", "Dragonfly HR.3|1947; Whirlwind HAR.10|1953; Widgeon|1955; Wessex HAS.1|1958; Wessex HC.2|1962; Sea King HAS.1|1969; Sea King HAR.3|1977"),
        family("Lynx Family", "Helicopter", "Naval or battlefield helicopter", "Lynx AH.1|1971; Lynx HAS.2|1972; Lynx AH.7|1985; Lynx HMA.8|1988; Super Lynx 300|1999")
      ]
    }),
    manufacturer({
      id: "boeing-vertol", name: "Boeing Vertol", country: "United States", founded: "1960", category: "Rotorcraft",
      aircraftFocus: ["Military Helicopter", "Heavy Lift", "Tandem Rotor"],
      summary: "Boeing Vertol specializes in tandem-rotor military transport and heavy-lift helicopters.",
      source: { name: "Boeing military rotorcraft", url: "https://www.boeing.com/defense" },
      families: [
        family("Sea Knight Family", "Helicopter", "Tandem-rotor transport helicopter", "Model 107|1958; CH-46A Sea Knight|1962; CH-46D Sea Knight|1966; CH-46E Sea Knight|1967; CH-113 Labrador|1962"),
        family("Chinook Family", "Helicopter", "Heavy-lift transport helicopter", "CH-47A Chinook|1961; CH-47B Chinook|1967; CH-47C Chinook|1969; CH-47D Chinook|1979; MH-47E Chinook|1991; CH-47F Chinook|2001; MH-47G Chinook|2004; Chinook HC.6A|2019")
      ]
    }),
    manufacturer({
      id: "md-helicopters", name: "MD Helicopters", country: "United States", founded: "1999", category: "Rotorcraft",
      aircraftFocus: ["Civil Helicopter", "Light Attack", "Utility"],
      summary: "MD Helicopters continues the Hughes light-helicopter line for civil, utility, and military roles.",
      source: { name: "MD Helicopters products", url: "https://www.mdhelicopters.com/" },
      families: [
        family("MD 500 Family", "Helicopter", "Light civil or military helicopter", "MD 500D|1976; MD 500E|1982; MD 500F|1985; MD 520N|1991; MD 530F|1982; MD 530G|2014"),
        family("MD Twin Family", "Helicopter", "Twin-engine helicopter", "MD 600N|1994; MD Explorer 900|1992; MD 902 Explorer|1996")
      ]
    }),
    manufacturer({
      id: "hughes-helicopters", name: "Hughes Helicopters", country: "United States", founded: "1947", status: "Historic manufacturer", category: "Rotorcraft",
      aircraftFocus: ["Military Helicopter", "Civil Helicopter", "Attack"],
      summary: "Hughes created important light helicopters and the Apache attack-helicopter program.",
      families: [
        family("Hughes Light Helicopters", "Helicopter", "Light helicopter", "Model 269A|1956; TH-55A Osage|1964; Model 300C|1969; Model 369 OH-6A Cayuse|1963; Model 500C|1968; Model 500D|1976"),
        family("Hughes Attack Helicopters", "Helicopter", "Attack helicopter", "OH-6A Cayuse|1963; YAH-64|1975; AH-64A Apache|1975")
      ]
    }),
    manufacturer({
      id: "mil", name: "Mil Moscow Helicopter Plant", country: "Russia", founded: "1947", category: "Rotorcraft",
      aircraftFocus: ["Military Helicopter", "Heavy Lift", "Civil Helicopter"],
      summary: "Mil designed many of the Soviet Union's and Russia's most widely used transport, utility, attack, and heavy-lift helicopters.",
      source: { name: "Russian Helicopters products", url: "https://www.rhc.aero/en/catalog" },
      families: [
        family("Mil Early Helicopters", "Helicopter", "Utility helicopter", "Mi-1|1948; Mi-2|1961; Mi-4|1952; Mi-6|1957; Mi-10|1960"),
        family("Mi-8 and Mi-17 Family", "Helicopter", "Medium transport helicopter", "Mi-8T|1961; Mi-8MT|1975; Mi-8MTV-1|1987; Mi-8AMT|1991; Mi-17|1975; Mi-17-1V|1985; Mi-17V-5|1996; Mi-171A2|2014; Mi-171Sh|1999"),
        family("Mi-24 and Mi-35 Family", "Helicopter", "Attack and transport helicopter", "Mi-24A|1969; Mi-24D|1972; Mi-24V|1976; Mi-24P|1975; Mi-24VP|1985; Mi-35M|1995; Mi-35P Phoenix|2019"),
        family("Mil Heavy-Lift Family", "Helicopter", "Heavy-lift helicopter", "Mi-26|1977; Mi-26T|1985; Mi-26T2|2011; Mi-12 V-12|1968|||Prototype"),
        family("Mil Modern Combat Helicopters", "Helicopter", "Attack helicopter", "Mi-28A|1982; Mi-28N Night Hunter|1996; Mi-28NM|2016; Mi-38|2003")
      ]
    }),
    manufacturer({
      id: "kamov", name: "Kamov", country: "Russia", founded: "1948", category: "Rotorcraft",
      aircraftFocus: ["Coaxial Helicopter", "Naval Helicopter", "Attack"],
      summary: "Kamov specializes in coaxial-rotor helicopters for naval, utility, and combat roles.",
      source: { name: "Russian Helicopters products", url: "https://www.rhc.aero/en/catalog" },
      families: [
        family("Kamov Naval Family", "Helicopter", "Naval helicopter", "Ka-15|1952; Ka-18|1956; Ka-25PL|1961; Ka-27PL|1973; Ka-28|1982; Ka-29|1976; Ka-31|1987"),
        family("Kamov Civil and Utility", "Helicopter", "Civil or utility helicopter", "Ka-26|1965; Ka-32A|1973; Ka-32A11BC|1985; Ka-62|2012"),
        family("Kamov Attack Family", "Helicopter", "Attack helicopter", "Ka-50 Black Shark|1982; Ka-52 Alligator|1997; Ka-52K Katran|2015")
      ]
    }),
    manufacturer({
      id: "kaman", name: "Kaman Aircraft", country: "United States", founded: "1945", category: "Rotorcraft",
      aircraftFocus: ["Utility Helicopter", "Naval Helicopter", "Uncrewed Aircraft"],
      summary: "Kaman is known for intermeshing-rotor helicopters, naval rotorcraft, and external-lift aircraft.",
      source: { name: "Kaman Air Vehicles", url: "https://www.kaman.com/air-vehicles" },
      families: [family("Kaman Helicopter Family", "Helicopter", "Utility or naval helicopter", "K-125|1947|||Prototype; HTK-1|1949; HOK-1|1953; HH-43B Huskie|1953; SH-2F Seasprite|1959; SH-2G Super Seasprite|1985; K-MAX|1991; K-MAX Unmanned|2011")]
    }),
    manufacturer({
      id: "enstrom", name: "Enstrom Helicopter", country: "United States", founded: "1959", category: "Rotorcraft",
      aircraftFocus: ["Civil Helicopter", "Trainer", "Utility"],
      summary: "Enstrom builds light piston and turbine helicopters for training, private, and utility use.",
      source: { name: "Enstrom helicopters", url: "https://enstromhelicopter.com/" },
      families: [family("Enstrom Family", "Helicopter", "Light helicopter", "F-28A|1965; F-28C|1975; F-28F|1980; 280 Shark|1973; 280FX Shark|1980; 480|1989; 480B|2001")]
    }),
    manufacturer({
      id: "schweizer", name: "Schweizer Aircraft", country: "United States", founded: "1939", status: "Historic manufacturer", category: "Rotorcraft",
      aircraftFocus: ["Trainer", "Civil Helicopter", "Glider"],
      summary: "Schweizer produced gliders, agricultural aircraft, and widely used piston training helicopters.",
      families: [
        family("Schweizer Helicopter Family", "Helicopter", "Light helicopter", "S-300C|1969; S-300CB|1993; S-300CBi|2002; S-333|1992; S-434|2008"),
        family("Schweizer Sailplanes", "Glider", "Sailplane", "SGS 1-26A|1954; SGS 1-26E|1969; SGS 2-32|1962; SGS 2-33A|1965")
      ]
    }),
    manufacturer({
      id: "guimbal", name: "Hélicoptères Guimbal", country: "France", founded: "2000", category: "Rotorcraft",
      aircraftFocus: ["Civil Helicopter", "Trainer", "Light Helicopter"],
      summary: "Guimbal produces the compact Cabri light helicopter for training and private use.",
      source: { name: "Guimbal Cabri", url: "https://www.guimbal.com/" },
      families: [family("Cabri Family", "Helicopter", "Light piston helicopter", "Cabri G2|2005")]
    }),
    manufacturer({
      id: "brantly-helicopter", name: "Brantly Helicopter", country: "United States", founded: "1945", status: "Historic manufacturer", category: "Rotorcraft",
      aircraftFocus: ["Civil Helicopter", "Trainer", "Light Helicopter"],
      summary: "Brantly produced compact light helicopters for private and training use.",
      families: [family("Brantly Family", "Helicopter", "Light helicopter", "B-2|1953; B-2A|1955; B-2B|1963; 305|1964")]
    })
  ];
  const sailplaneManufacturers = [
    manufacturer({
      id: "schleicher", name: "Alexander Schleicher", country: "Germany", founded: "1927", category: "Sailplanes & Sport Aviation",
      aircraftFocus: ["Glider", "Motor Glider", "Trainer"],
      summary: "Alexander Schleicher is one of the world's most important sailplane manufacturers, spanning trainers to open-class racers.",
      source: { name: "Alexander Schleicher sailplanes", url: "https://www.alexander-schleicher.de/en/" },
      families: [
        family("Schleicher Classic Sailplanes", "Glider", "Sailplane", "Ka 2 Rhönschwalbe|1952; Ka 4 Rhönlerche II|1953; Ka 6CR|1955; K 7 Rhönadler|1957; K 8B|1957; ASK 13|1966; ASK 14|1967"),
        family("ASK Training Family", "Glider", "Training sailplane", "ASK 18|1974; ASK 21|1978|8.4 m,17.0 m,1.6 m; ASK 21 Mi|2004; ASK 23B|1983; ASK 33|In development|||Advanced development"),
        family("ASW Racing Family", "Glider", "Competition sailplane", "ASW 12|1965; ASW 15|1968; ASW 17|1971; ASW 19B|1975; ASW 20|1977; ASW 22|1981; ASW 24|1987; ASW 27|1995; ASW 28|2000; ASW 28-18|2000"),
        family("ASG and ASH Family", "Glider", "High-performance or motor sailplane", "ASH 25|1986; ASH 26|1993; ASH 30 Mi|2011; ASH 31 Mi|2009; ASG 29|2005; ASG 32 Mi|2014; AS 33 Me|2020")
      ]
    }),
    manufacturer({
      id: "schempp-hirth", name: "Schempp-Hirth", country: "Germany", founded: "1935", category: "Sailplanes & Sport Aviation",
      aircraftFocus: ["Glider", "Motor Glider", "Competition"],
      summary: "Schempp-Hirth builds high-performance competition, cross-country, and self-launching sailplanes.",
      source: { name: "Schempp-Hirth sailplanes", url: "https://www.schempp-hirth.com/en/" },
      families: [
        family("Schempp-Hirth Classic Family", "Glider", "Sailplane", "Göppingen Gö 3 Minimoa|1935; Gö 4|1937; Standard Cirrus|1969; Nimbus 1|1969; Nimbus 2|1971; Janus|1974; Mini-Nimbus|1976"),
        family("Discus Family", "Glider", "Competition sailplane", "Discus a|1984; Discus b|1984; Discus 2a|1998; Discus 2b|1998; Discus 2c|2004; Discus 2cT|2005; Discus 2c FES|2018"),
        family("Ventus Family", "Glider", "Competition sailplane", "Ventus a|1980; Ventus b|1980; Ventus 2a|1994; Ventus 2c|1995; Ventus 2cxT|2003; Ventus 3T|2016; Ventus 3M|2016"),
        family("Nimbus and Duo Family", "Glider", "Open-class or two-seat sailplane", "Nimbus 3|1981; Nimbus 3D|1983; Nimbus 4|1990; Nimbus 4D|1990; Duo Discus|1993; Duo Discus T|1997; Duo Discus XL|2005; Arcus T|2009; Arcus M|2009")
      ]
    }),
    manufacturer({
      id: "dg-flugzeugbau", name: "DG Flugzeugbau", country: "Germany", founded: "1973", category: "Sailplanes & Sport Aviation",
      aircraftFocus: ["Glider", "Motor Glider", "Trainer"],
      summary: "DG Flugzeugbau produces composite sailplanes, motor gliders, and trainers and supports the LS line.",
      source: { name: "DG Flugzeugbau aircraft", url: "https://www.dg-aviation.de/en/" },
      families: [
        family("DG Single-Seat Family", "Glider", "Sailplane", "DG-100|1974; DG-200|1977; DG-300|1983; DG-400|1981; DG-600|1987; DG-800|1991; DG-808C|2001; DG-1000S|2000; DG-1001M|2010"),
        family("DG Two-Seat and Motor Family", "Glider", "Training or motor sailplane", "DG-500|1987; DG-505|1987; DG-1000T|2003; DG-1001Club|2009; DG-300 Elan|1983")
      ]
    }),
    manufacturer({
      id: "rolladen-schneider", name: "Rolladen-Schneider", country: "Germany", founded: "1967", status: "Historic manufacturer", category: "Sailplanes & Sport Aviation",
      aircraftFocus: ["Glider", "Competition", "Motor Glider"],
      summary: "Rolladen-Schneider produced the influential LS series of competition sailplanes.",
      families: [family("LS Sailplane Family", "Glider", "Competition sailplane", "LS1-f|1967; LS2|1973; LS3|1976; LS4|1980; LS4-a|1982; LS4-b|1992; LS5|1988|||Prototype; LS6|1983; LS7|1987; LS8|1994; LS9|1995; LS10|2003")]
    }),
    manufacturer({
      id: "jonker-sailplanes", name: "Jonker Sailplanes", country: "South Africa", founded: "2004", category: "Sailplanes & Sport Aviation",
      aircraftFocus: ["Glider", "Competition", "Self Launch"],
      summary: "Jonker Sailplanes develops modern high-performance racing and self-launching sailplanes in South Africa.",
      source: { name: "Jonker Sailplanes", url: "https://jonkersailplanes.co.za/" },
      families: [family("JS Sailplane Family", "Glider", "Competition sailplane", "JS1 Revelation|2006; JS1C Revelation|2012; JS2 Revenant|2019; JS3 Rapture|2016; JS3 RES|2019; JS4 Rengeti|2024|||Flight-test program; JS5 Rey|In development|||Advanced development")]
    }),
    manufacturer({
      id: "szd", name: "SZD", country: "Poland", founded: "1948", category: "Sailplanes & Sport Aviation",
      aircraftFocus: ["Glider", "Trainer", "Competition"],
      summary: "SZD created a broad range of Polish training and competition sailplanes.",
      source: { name: "Allstar PZL Glider aircraft", url: "https://www.szd.com.pl/en/" },
      families: [family("SZD Sailplane Family", "Glider", "Sailplane", "SZD-9 Bocian|1952; SZD-12 Mucha 100|1953; SZD-15 Sroka|1956; SZD-22 Mucha Standard|1958; SZD-24 Foka|1960; SZD-30 Pirat|1966; SZD-36 Cobra 15|1969; SZD-41 Jantar Standard|1973; SZD-42 Jantar 2|1976; SZD-48-3 Jantar Standard 3|1982; SZD-50-3 Puchacz|1979; SZD-51-1 Junior|1980; SZD-54 Perkoz|1991; SZD-55-1|1988; SZD-56-2 Diana 2|2005")]
    }),
    manufacturer({
      id: "glasflugel", name: "Glasflügel", country: "Germany", founded: "1962", status: "Historic manufacturer", category: "Sailplanes & Sport Aviation",
      aircraftFocus: ["Glider", "Competition", "Historical"],
      summary: "Glasflügel pioneered fiberglass sailplanes and produced several influential competition designs.",
      families: [family("Glasflügel Sailplane Family", "Glider", "Competition sailplane", "H-301 Libelle|1964; H-201 Standard Libelle|1967; H-205 Club Libelle|1974; H-206 Hornet|1974; H-303 Mosquito|1976; H-304|1980; H-401 Kestrel|1968; H-604|1970")]
    }),
    manufacturer({
      id: "hph-sailplanes", name: "HpH Sailplanes", country: "Czech Republic", founded: "1997", category: "Sailplanes & Sport Aviation",
      aircraftFocus: ["Glider", "Motor Glider", "Competition"],
      summary: "HpH produces high-performance composite sailplanes and modern developments of the 304 family.",
      source: { name: "HpH Sailplanes", url: "https://www.hph.cz/" },
      families: [family("HpH 304 Family", "Glider", "Competition or self-launching sailplane", "304CZ|1997; 304C|2000; 304S|2006; 304SJ|2006; 304MS|2011; TwinShark|2017")]
    }),
    manufacturer({
      id: "stemme", name: "Stemme", country: "Germany", founded: "1984", category: "Sailplanes & Sport Aviation",
      aircraftFocus: ["Motor Glider", "Surveillance", "Touring"],
      summary: "Stemme produces high-performance self-launching motor gliders and special-mission derivatives.",
      source: { name: "Stemme aircraft", url: "https://www.stemme.com/" },
      families: [family("Stemme Motor Glider Family", "Glider", "Self-launching motor glider", "S10|1986; S10-VT|1994; S10-VTX|2014; S12|2015; ASP S15|2015")]
    }),
    manufacturer({
      id: "slingsby", name: "Slingsby", country: "United Kingdom", founded: "1930", status: "Historic manufacturer", category: "Sailplanes & Sport Aviation",
      aircraftFocus: ["Glider", "Trainer", "Motor Glider"],
      summary: "Slingsby was Britain's principal sailplane manufacturer and later produced composite trainers.",
      families: [family("Slingsby Sailplane Family", "Glider", "Sailplane or motor glider", "T.21B Sedbergh|1944; T.31B Tandem Tutor|1950; T.34 Sky|1950; T.41 Skylark 2|1953; T.43 Skylark 3|1955; T.45 Swallow|1957; T.49 Capstan|1961; T.50 Skylark 4|1961; T.59 Kestrel|1970; T.61 Venture|1971; T.67 Firefly|1981")]
    }),
    manufacturer({
      id: "centrair", name: "Centrair", country: "France", founded: "1970", status: "Historic manufacturer", category: "Sailplanes & Sport Aviation",
      aircraftFocus: ["Glider", "Trainer", "Competition"],
      summary: "Centrair produced French composite club and competition sailplanes.",
      families: [family("Centrair Sailplane Family", "Glider", "Sailplane", "C101 Pégase|1981; C201 Marianne|1985; C301 Edelweiss|1962; C310 Edelweiss|1965")]
    }),
    manufacturer({
      id: "ams-flight", name: "AMS Flight", country: "Slovenia", founded: "1999", category: "Sailplanes & Sport Aviation",
      aircraftFocus: ["Glider", "Trainer", "Motor Glider"],
      summary: "AMS Flight produces the DG-derived Carat motor glider and supports composite sailplanes.",
      families: [family("AMS Flight Family", "Glider", "Sailplane or motor glider", "Carat A|1997; DG-500 ELAN Orion|1987; DG-505 Orion|1987")]
    })
  ];

  window.AviationWorldCatalog = [
    ...establishedManufacturers,
    ...westernManufacturers,
    ...europeanManufacturers,
    ...easternManufacturers,
    ...asiaPacificManufacturers,
    ...globalManufacturers,
    ...rotorcraftManufacturers,
    ...sailplaneManufacturers
  ];
})();
