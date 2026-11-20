// ============================================================================
// PROMESA DE BARRIO v.0.1.10 — UI PRO LIMPIA + MOTOR DE PARTIDO EQUILIBRADO
// ============================================================================

const STORAGE_KEY = "promesa_de_barrio_save_v0110";

const PORTRAIT_DEFS = [
  { id: 0, label: "Rizos",   pos: "0% 0%" },
  { id: 1, label: "Fade",    pos: "50% 0%" },
  { id: 2, label: "Ondas",   pos: "100% 0%" },
  { id: 3, label: "Cinta",   pos: "0% 100%" },
  { id: 4, label: "Clásico", pos: "50% 100%" },
  { id: 5, label: "Rubio",   pos: "100% 100%" }
];

function renderPortraitBox(portraitId, sizePx = 56, extraClass = "") {
  const pt = PORTRAIT_DEFS[portraitId] || PORTRAIT_DEFS[0];
  return `<div class="sprite-frame sh-portraits ${extraClass}" style="width:${sizePx}px; height:${sizePx}px; background-position:${pt.pos};"></div>`;
}

const SPRITE_REGISTRY = {
  control:       { sheet: "sh-actions",  pos: "0% 0%" },
  pase_seg:      { sheet: "sh-actions",  pos: "33.333% 0%" },
  desmarque:     { sheet: "sh-actions",  pos: "66.666% 0%" },
  bicicleta:     { sheet: "sh-actions",  pos: "100% 0%" },
  pared:         { sheet: "sh-actions",  pos: "0% 33.333%" },
  cambio_ritmo:  { sheet: "sh-actions",  pos: "33.333% 33.333%" },
  tiro_interior: { sheet: "sh-actions",  pos: "66.666% 33.333%" },
  zurdazo:       { sheet: "sh-actions",  pos: "100% 33.333%" },
  presion:       { sheet: "sh-actions",  pos: "0% 66.666%" },
  entrada:       { sheet: "sh-actions",  pos: "33.333% 66.666%" },
  falta_rosca:   { sheet: "sh-actions",  pos: "66.666% 66.666%" },
  signature:     { sheet: "sh-actions",  pos: "100% 66.666%" },
  act_duel_def:  { sheet: "sh-actions",  pos: "0% 100%" },
  act_duel_gk:   { sheet: "sh-actions",  pos: "33.333% 100%" },
  act_freekick:  { sheet: "sh-actions",  pos: "66.666% 100%" },
  curse:         { sheet: "sh-actions",  pos: "100% 100%" },

  blue_ano:      { sheet: "sh-training", pos: "0% 0%" },
  blue_lat:      { sheet: "sh-training", pos: "33.333% 0%" },
  blue_jug:      { sheet: "sh-training", pos: "66.666% 0%" },
  blue_pas:      { sheet: "sh-training", pos: "100% 0%" },
  blue_def:      { sheet: "sh-training", pos: "0% 33.333%" },
  blue_bp:       { sheet: "sh-training", pos: "33.333% 33.333%" },
  blue_cond:     { sheet: "sh-training", pos: "66.666% 33.333%" },
  role_physio:   { sheet: "sh-training", pos: "100% 33.333%" },
  role_video:    { sheet: "sh-training", pos: "0% 100%" },
  role_mental:   { sheet: "sh-training", pos: "33.333% 100%" },
  role_agent:    { sheet: "sh-training", pos: "66.666% 100%" },
  role_barrio:   { sheet: "sh-training", pos: "100% 100%" },

  duel_att:      { sheet: "sh-scenes",   pos: "0% 0%" },
  duel_gk:       { sheet: "sh-scenes",   pos: "33.333% 0%" },
  duel_def:      { sheet: "sh-scenes",   pos: "66.666% 0%" },
  duel_pen:      { sheet: "sh-scenes",   pos: "100% 0%" },
  ref_yellow:    { sheet: "sh-scenes",   pos: "0% 50%" },
  ref_red:       { sheet: "sh-scenes",   pos: "33.333% 50%" },
  player_inj:    { sheet: "sh-scenes",   pos: "66.666% 50%" },
  trophy_mvp:    { sheet: "sh-scenes",   pos: "100% 50%" },
  trophy_boot:   { sheet: "sh-scenes",   pos: "0% 100%" },
  loan_deal:     { sheet: "sh-scenes",   pos: "33.333% 100%" },
  cup_promo:     { sheet: "sh-scenes",   pos: "66.666% 100%" },
  crest_youth:   { sheet: "sh-scenes",   pos: "100% 100%" },

  ui_energy:     { sheet: "sh-ui",       pos: "0% 0%" },
  ui_form:       { sheet: "sh-ui",       pos: "33.333% 0%" },
  ui_shoe:       { sheet: "sh-ui",       pos: "66.666% 0%" },
  ui_medkit:     { sheet: "sh-ui",       pos: "100% 0%" },
  ui_yellow:     { sheet: "sh-ui",       pos: "0% 50%" },
  ui_red:        { sheet: "sh-ui",       pos: "33.333% 50%" },
  ui_mvp:        { sheet: "sh-ui",       pos: "66.666% 50%" },
  ui_boot:       { sheet: "sh-ui",       pos: "100% 50%" },
  ui_contract:   { sheet: "sh-ui",       pos: "0% 100%" },
  ui_loan:       { sheet: "sh-ui",       pos: "33.333% 100%" },
  ui_cup:        { sheet: "sh-ui",       pos: "66.666% 100%" },
  ui_crest:      { sheet: "sh-ui",       pos: "100% 100%" }
};

function renderSprite(key, sizePx = 44, clean = false) {
  const sp = SPRITE_REGISTRY[key] || SPRITE_REGISTRY.ui_crest;
  return `<div class="sprite-frame ${sp.sheet} ${clean ? "clean" : ""}" style="width:${sizePx}px; height:${sizePx}px; background-position:${sp.pos};"></div>`;
}

// ----------------------------------------------------------------------------
// PAÍSES, LIGAS, TÁCTICAS Y HABILIDADES
// ----------------------------------------------------------------------------

const COUNTRIES = {
  ARG: {
    code: "ARG", flag: "🇦🇷", name: "Argentina", currency: "USD",
    divs: [
      { id: 5, name: "Primera D · Metropolitana", skillMin: 3, skillMax: 6, gkSkill: 5, wageBase: 130, valScale: 2.6 },
      { id: 4, name: "Primera C · Ascenso", skillMin: 6, skillMax: 9, gkSkill: 8, wageBase: 388, valScale: 7.28 },
      { id: 3, name: "Primera B · Nacional", skillMin: 9, skillMax: 12, gkSkill: 11, wageBase: 1147, valScale: 22.1 },
      { id: 2, name: "Primera Nacional", skillMin: 12, skillMax: 15, gkSkill: 15, wageBase: 3238, valScale: 67.6 },
      { id: 1, name: "Liga Profesional · Élite", skillMin: 15, skillMax: 19, gkSkill: 18, wageBase: 8510, valScale: 221.0 }
    ],
    clubs: {
      5: ["Defensores del Riachuelo", "Atlético Villa Sur", "Sportivo Barracas del Oeste", "Deportivo Dock", "Club Atlético Mataderos", "Social Parque Patricios", "Juventud Boedo", "Ferroviario del Sur"],
      4: ["Club Atlético Lanús Oeste", "Deportivo Quilmes Norte", "Sportivo Avellaneda", "Almirante del Plata", "Chacarita del Valle", "Temperley Sur", "Nueva Chicago Viejo", "Talleres de Remedios"],
      3: ["Atlético Tucumán Norte", "Belgrano de Córdoba Sur", "Rosario Central Oeste", "Gimnasia de La Plata", "Colón del Litoral", "Unión de Santa Fe", "Banfield del Sur", "Godoy Cruz Andino"],
      2: ["Independiente de Avellaneda Sur", "Racing del Cilindro", "San Lorenzo de Almagro", "Vélez de Liniers", "Estudiantes de La Plata", "Newell's del Parque", "Huracán de Parque", "Argentinos de La Paternal"],
      1: ["Atlético Boca del Puerto", "Club Atlético River Plateado", "Academia de Avellaneda", "Diablos Rojos del Sur", "Ciclón de Boedo", "Fortín de Liniers", "Pincha de La Plata", "Canalla de Rosario"]
    }
  },
  ESP: {
    code: "ESP", flag: "🇪🇸", name: "España", currency: "€",
    divs: [
      { id: 5, name: "Regional Preferente", skillMin: 3, skillMax: 6, gkSkill: 5, wageBase: 139, valScale: 2.86 },
      { id: 4, name: "Tercera Federación", skillMin: 6, skillMax: 9, gkSkill: 8, wageBase: 407, valScale: 8.06 },
      { id: 3, name: "Primera Federación", skillMin: 9, skillMax: 12, gkSkill: 11, wageBase: 1202, valScale: 24.7 },
      { id: 2, name: "Segunda División", skillMin: 12, skillMax: 15, gkSkill: 15, wageBase: 3422, valScale: 78.0 },
      { id: 1, name: "Primera División · Élite", skillMin: 15, skillMax: 19, gkSkill: 18, wageBase: 9065, valScale: 260.0 }
    ],
    clubs: {
      5: ["AD Vallecas Sur", "CD Carabanchel", "UD Hortaleza", "CF Moratalaz", "Atlético Usera", "Rayo del Manzanares", "Unión Tetuán", "Sporting Chamberí"],
      4: ["CF Alcalá de Henares", "Real Aranjuez", "CD Móstoles", "UD San Sebastián", "Rayo Majadahonda", "RSD Alcalá", "CD Leganés B", "Getafe Promesas"],
      3: ["Real Murcia CF", "Hércules de Alicante", "CD Castellón", "Gimnàstic Tarragona", "Cultural Leonesa", "Racing de Ferrol", "Córdoba CF", "Recreativo de Huelva"],
      2: ["Real Zaragoza", "Sporting de Gijón", "Real Oviedo", "Deportivo de La Coruña", "CD Tenerife", "UD Las Palmas", "Levante UD", "RCD Espanyol"],
      1: ["Real Madrid Castilla Élite", "FC Barcelona Condal", "Atlético Metropolitano", "Athletic de Bilbao", "Real Sociedad", "Real Betis Balompié", "Sevilla Nervión", "Villarreal Submarino"]
    }
  },
  ENG: {
    code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "Inglaterra", currency: "£",
    divs: [
      { id: 5, name: "National League · Non-League", skillMin: 3, skillMax: 6, gkSkill: 5, wageBase: 148, valScale: 3.12 },
      { id: 4, name: "EFL League Two", skillMin: 6, skillMax: 9, gkSkill: 8, wageBase: 444, valScale: 8.84 },
      { id: 3, name: "EFL League One", skillMin: 9, skillMax: 12, gkSkill: 11, wageBase: 1295, valScale: 27.3 },
      { id: 2, name: "EFL Championship", skillMin: 12, skillMax: 15, gkSkill: 15, wageBase: 3700, valScale: 88.4 },
      { id: 1, name: "Premier League · Élite", skillMin: 15, skillMax: 19, gkSkill: 18, wageBase: 9990, valScale: 299.0 }
    ],
    clubs: {
      5: ["Hackney Wick FC", "Dulwich Hamlet", "Brixton Rovers", "Camden Town United", "Peckham Athletic", "Islington Borough", "Greenwich Albion", "Croydon Vale"],
      4: ["Wimbledon AFC", "Bradford City", "Notts County", "Stockport County", "Wrexham Town", "Swindon Rovers", "Carlisle United", "Grimsby Mariners"],
      3: ["Bolton Wanderers", "Portsmouth Pompey", "Derby County", "Barnsley Tykes", "Charlton Athletic", "Reading Royals", "Blackpool Seasiders", "Wigan Latics"],
      2: ["Leeds United", "Leicester Foxes", "Southampton Saints", "Norwich Canaries", "West Brom Albion", "Sunderland Black Cats", "Middlesbrough Boro", "Coventry Sky Blues"],
      1: ["Manchester Red Devils", "Manchester Sky City", "Liverpool Merseyside", "Arsenal North London", "Chelsea Stamford", "Tottenham Hotspur", "Newcastle Magpies", "Aston Villa Lions"]
    }
  },
  ITA: {
    code: "ITA", flag: "🇮🇹", name: "Italia", currency: "€",
    divs: [
      { id: 5, name: "Serie D · Dilettanti", skillMin: 3, skillMax: 6, gkSkill: 5, wageBase: 139, valScale: 2.86 },
      { id: 4, name: "Serie C · Lega Pro", skillMin: 6, skillMax: 9, gkSkill: 8, wageBase: 407, valScale: 7.8 },
      { id: 3, name: "Serie B · Cadetteria", skillMin: 9, skillMax: 12, gkSkill: 11, wageBase: 1184, valScale: 23.92 },
      { id: 2, name: "Serie A · Zona Media", skillMin: 12, skillMax: 15, gkSkill: 15, wageBase: 3330, valScale: 75.4 },
      { id: 1, name: "Serie A · Scudetto Élite", skillMin: 15, skillMax: 19, gkSkill: 18, wageBase: 8880, valScale: 249.6 }
    ],
    clubs: {
      5: ["Trastevere Calcio", "Ostia Mare", "Sestri Levante", "Campobasso FC", "Livorno Amaranto", "Piacenza Biancorossa", "Prato Calcio", "Ravenna FC"],
      4: ["Vicenza Virtus", "Padova Calcio", "Triestina Alabarda", "Perugia Grifo", "Pescara Delfino", "Avellino Lupi", "Catania Rossazzurra", "Foggia Satanelli"],
      3: ["Palermo Rosanero", "Sampdoria Blucerchiata", "Bari Galletti", "Parma Crociati", "Venezia Lagunari", "Cremonese Grigiorossa", "Modena Canarini", "Brescia Rondinelle"],
      2: ["Torino Granata", "Bologna Felsinei", "Udinese Friuli", "Genoa Grifone", "Cagliari Isolani", "Hellas Verona", "Empoli Azzurri", "Sassuolo Neroverdi"],
      1: ["Inter Milano Nerazzurra", "AC Milan Rossonera", "Juventus Piemonte", "SSC Napoli Partenopea", "AS Roma Lupa", "SS Lazio Aquile", "Atalanta Dea", "ACF Fiorentina Viola"]
    }
  },
  FRA: {
    code: "FRA", flag: "🇫🇷", name: "Francia", currency: "€",
    divs: [
      { id: 5, name: "National 3 · Régional", skillMin: 3, skillMax: 6, gkSkill: 5, wageBase: 139, valScale: 2.86 },
      { id: 4, name: "National 2", skillMin: 6, skillMax: 9, gkSkill: 8, wageBase: 416, valScale: 8.06 },
      { id: 3, name: "National 1", skillMin: 9, skillMax: 12, gkSkill: 11, wageBase: 1202, valScale: 24.7 },
      { id: 2, name: "Ligue 2", skillMin: 12, skillMax: 15, gkSkill: 15, wageBase: 3330, valScale: 76.7 },
      { id: 1, name: "Ligue 1 · Élite", skillMin: 15, skillMax: 19, gkSkill: 18, wageBase: 8972, valScale: 254.8 }
    ],
    clubs: {
      5: ["Racing Strasbourg Meinau", "FC Mulhouse Alsace", "US Sarre-Union", "SR Colmar", "ASC Biesheim", "FC Saint-Louis", "AS Illzach", "Vauban Strasbourg"],
      4: ["FC Rouen", "AS Cannes", "CS Sedan Ardennes", "US Créteil", "FC Fleury", "GOAL FC", "Blois Foot", "Étoile Fréjus"],
      3: ["Red Star Paris", "FC Sochaux-Montbéliard", "AS Nancy-Lorraine", "Le Mans FC", "US Orléans", "LB Châteauroux", "Nîmes Olympique", "FC Versailles"],
      2: ["AS Saint-Étienne", "Girondins de Bordeaux", "SM Caen", "AJ Auxerre", "Angers SCO", "FC Metz", "ESTAC Troyes", "SC Bastia"],
      1: ["Paris Saint-Germain", "Olympique de Marseille", "Olympique Lyonnais", "AS Monaco", "LOSC Lille", "RC Lens Sang et Or", "OGC Nice", "Stade Rennais"]
    }
  }
};

const TEAM_TACTICS = [
  { id: "normal", name: "Normal / Equilibrado", short: "Normal", desc: "Sin bonificaciones ni penalizaciones extremas.", bonusCardTypes: [], penaltyCardTypes: [] },
  { id: "wings", name: "Ataque por las Bandas", short: "Bandas", desc: "Potencia +25% Desborde y Físico; reduce -15% juego interior.", bonusCardTypes: ["Desborde", "Físico"], penaltyCardTypes: ["Asociación"] },
  { id: "aim", name: "Jugar por el Centro", short: "Centro", desc: "Potencia +25% Asociación y Construcción; reduce -15% Desborde.", bonusCardTypes: ["Asociación", "Construcción"], penaltyCardTypes: ["Desborde"] },
  { id: "ca", name: "Contraataque", short: "Contra", desc: "+25% en Defensa y tras robar balón; -15% en posesión estática.", bonusCardTypes: ["Defensa", "Desborde"], penaltyCardTypes: ["Construcción"] },
  { id: "pressing", name: "Presión Total", short: "Presión", desc: "Frena ataques rivales (+20% Defensa) pero exige más condición física.", bonusCardTypes: ["Defensa"], penaltyCardTypes: [] }
];

const SPECIALTIES = [
  { id: "quick", name: "Rápido", desc: "+25% eficacia en desbordes, contras y bandas." },
  { id: "technical", name: "Técnico", desc: "+25% en asociaciones, pases y multiplicador de combo." },
  { id: "powerful", name: "Potente", desc: "+25% en remates potentes, entradas físicas y balón parado." },
  { id: "composed", name: "Cabeza Fría", desc: "Menos presión en penaltis, manos a mano y minutos finales." }
];

const SKILL_DEFS = [
  { key: "jugadas", label: "Jugadas", short: "JUG", declineAge: 29, decay: [0.20, 0.45, 0.75] },
  { key: "pases", label: "Pases", short: "PAS", declineAge: 29, decay: [0.20, 0.45, 0.75] },
  { key: "anotacion", label: "Anotación", short: "ANO", declineAge: 28, decay: [0.35, 0.65, 0.95] },
  { key: "lateral", label: "Lateral", short: "LAT", declineAge: 28, decay: [0.35, 0.65, 0.95] },
  { key: "defensa", label: "Defensa", short: "DEF", declineAge: 30, decay: [0.10, 0.30, 0.55] },
  { key: "balonParado", label: "Balón Parado", short: "BP", declineAge: 33, decay: [0.00, 0.05, 0.15] }
];

function getSkillLevelLabel(lvl) {
  if (lvl >= 20) return "20+ · Divino";
  if (lvl >= 17) return "Mítico";
  if (lvl >= 14) return "Sobrenatural";
  if (lvl >= 11) return "Formidable";
  if (lvl >= 8) return "Destacado";
  if (lvl >= 6) return "Bueno";
  if (lvl >= 4) return "Aceptable";
  if (lvl >= 2) return "Débil";
  return "Desastroso";
}

function getPeRequiredForLevel(currentIntLevel) {
  const n = Math.max(0, currentIntLevel);
  const highPenalty = n > 10 ? Math.pow(n - 10, 2) * 0.45 : 0;
  return 10 + n * 2.2 + highPenalty;
}

function getAgeTrainingFactor(age) {
  if (age <= 16) return 1.25;
  if (age <= 19) return 1.15;
  if (age <= 23) return 0.95;
  if (age <= 27) return 0.72;
  if (age <= 31) return 0.45;
  return 0.25;
}

function addSkillPe(skillKey, peAmount) {
  const p = state.player;
  const specBonus = (p.specialty === "none") ? 1.12 : 1.0;
  let remainingPe = peAmount * specBonus;
  let levelUps = 0;

  while (remainingPe > 0 && p.skills[skillKey] < 20.99) {
    const curInt = Math.floor(p.skills[skillKey]);
    const frac = p.skills[skillKey] - curInt;
    const reqForThisLevel = getPeRequiredForLevel(curInt);
    const peNeededToNext = (1 - frac) * reqForThisLevel;

    if (remainingPe >= peNeededToNext) {
      p.skills[skillKey] = curInt + 1.0;
      remainingPe -= peNeededToNext;
      levelUps += 1;
    } else {
      p.skills[skillKey] += remainingPe / reqForThisLevel;
      remainingPe = 0;
    }
  }
  return levelUps;
}

function getEffectivePlayerRating() {
  const s = state.player.skills;
  const pos = state.player.pos;
  if (pos === "DEL") return (s.anotacion * 0.40 + s.lateral * 0.20 + s.jugadas * 0.15 + s.pases * 0.15 + s.balonParado * 0.10);
  if (pos === "EXT") return (s.lateral * 0.35 + s.pases * 0.25 + s.anotacion * 0.20 + s.jugadas * 0.15 + s.defensa * 0.05);
  if (pos === "MED") return (s.jugadas * 0.38 + s.pases * 0.30 + s.anotacion * 0.12 + s.defensa * 0.10 + s.balonParado * 0.10);
  return Object.values(s).reduce((a, b) => a + b, 0) / 6;
}

function computeMarketValue() {
  const p = state.player;
  const divObj = getDivObj(p.div);
  if (p.isYouth) return 15000;

  const effSkill = getEffectivePlayerRating();
  const rawVal = Math.pow(effSkill, 2.38) * 1450 * divObj.valScale;

  let ageFactor = 1.0;
  if (p.age <= 18) ageFactor = 1.35;
  else if (p.age <= 22) ageFactor = 1.25;
  else if (p.age <= 26) ageFactor = 1.12;
  else if (p.age <= 29) ageFactor = 0.92;
  else if (p.age <= 32) ageFactor = 0.58;
  else ageFactor = 0.30;

  const avgNote = p.matchesPlayed > 0 ? (p.ratingSum / p.matchesPlayed) : 6.4;
  const formPerfMult = 0.85 + Math.max(0, (avgNote - 5.5)) * 0.15;
  const impactBonus = (p.mvpCount * 2200 + p.seasonGoals * 1800) * Math.pow(divObj.valScale, 0.65);

  const total = Math.round((rawVal * ageFactor * formPerfMult + impactBonus) / 1000) * 1000;
  return Math.max(5000, total);
}

function formatMoney(amount) {
  const cObj = getCountryObj();
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(2)}M ${cObj.currency}`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(1)}k ${cObj.currency}`;
  return `${amount} ${cObj.currency}`;
}

// ----------------------------------------------------------------------------
// CARTAS AZULES, ROLERAS Y DE PARTIDO
// ----------------------------------------------------------------------------

const BLUE_TRAINING_CARDS = [
  { id: "blue_ano", icon: "blue_ano", name: "Definición y Área", primarySkill: "anotacion", secondarySkill: "balonParado", desc: "Foco en Anotación (+6.5 PE base) y Balón Parado (+1.2 PE)." },
  { id: "blue_lat", icon: "blue_lat", name: "Desborde y Banda", primarySkill: "lateral", secondarySkill: "pases", desc: "Foco en Lateral (+6.5 PE base) y Pases (+1.2 PE)." },
  { id: "blue_jug", icon: "blue_jug", name: "Creación y Visión", primarySkill: "jugadas", secondarySkill: "pases", desc: "Foco en Jugadas (+6.5 PE base) y Pases (+1.2 PE)." },
  { id: "blue_pas", icon: "blue_pas", name: "Asociación y Toque", primarySkill: "pases", secondarySkill: "jugadas", desc: "Foco en Pases (+6.5 PE base) y Jugadas (+1.2 PE)." },
  { id: "blue_def", icon: "blue_def", name: "Repliegue y Marcaje", primarySkill: "defensa", secondarySkill: "jugadas", desc: "Foco en Defensa (+6.5 PE base) y Jugadas (+1.2 PE)." },
  { id: "blue_bp", icon: "blue_bp", name: "Estrategia y Faltas", primarySkill: "balonParado", secondarySkill: "anotacion", desc: "Foco en Balón Parado (+7.5 PE base) y Anotación (+1.2 PE)." },
  { id: "blue_cond", icon: "blue_cond", name: "Condición y Recuperación", primarySkill: null, secondarySkill: "defensa", desc: "Recupera +2 Condición, +1 Forma y reduce 1J de lesión." }
];

const AMBER_ROLE_CARDS = [
  {
    id: "role_physio",
    icon: "role_physio",
    title: "Descanso y Fisioterapia",
    summary: "+2 Condición, +1 Forma · Limpia Piernas Pesadas y reduce riesgo lesión",
    apply: () => {
      const bonus = state.player.gear.some(g => g.id === "physio_1") ? 1 : 0;
      state.player.condition = Math.min(10, state.player.condition + 2 + bonus);
      state.player.form = Math.min(10, state.player.form + 1 + bonus);
      state.player.overloadWeeks = Math.max(0, state.player.overloadWeeks - 2);
      removeCurseCard("fatiga");
    }
  },
  {
    id: "role_video",
    icon: "role_video",
    title: "Sesión de Vídeo Táctico",
    summary: "Mejora +1 Nivel a una carta de partido · -1 Condición",
    apply: () => {
      state.player.condition = Math.max(1, state.player.condition - 1);
      upgradeRandomCard(["Remate", "Desborde", "Construcción", "Asociación", "Defensa", "Balón Parado"]);
    }
  },
  {
    id: "role_mental",
    icon: "role_mental",
    title: "Psicología y Control Emocional",
    summary: "+1 Forma · Limpia Nervios · +5 Carácter (menos riesgo de tarjetas)",
    apply: () => {
      state.player.form = Math.min(10, state.player.form + 1);
      state.player.character = Math.min(100, state.player.character + 5);
      removeCurseCard("nervios");
    }
  },
  {
    id: "role_agent",
    icon: "role_agent",
    title: "Ojeadores, Prensa y Mercado",
    summary: "+4 Carácter · Sondea traspasos o cesiones · -1 Condición",
    apply: () => {
      state.player.character = Math.min(100, state.player.character + 4);
      state.player.condition = Math.max(1, state.player.condition - 1);
      maybeGenerateRealisticOffer(true);
    }
  },
  {
    id: "role_barrio",
    icon: "role_barrio",
    title: "Vida Social en el Barrio",
    summary: "+2 Forma (ánimo/confianza) · +4 Lealtad · -1 Condición",
    apply: () => {
      state.player.form = Math.min(10, state.player.form + 2);
      state.player.loyalty = Math.min(100, state.player.loyalty + 4);
      state.player.condition = Math.max(1, state.player.condition - 1);
    }
  }
];

const CARD_TEMPLATES = {
  control: { id: "control", icon: "control", name: "Control Orientado", type: "Construcción", cost: 1, skill: "lateral", base: 1.8, mult: 0.72, desc: "Asegura el balón. Siguiente carta cuesta -1⚡ (mín. 0).", effect: "discountNext" },
  pase_seg: { id: "pase_seg", icon: "pase_seg", name: "Pase de Seguridad", type: "Asociación", cost: 1, skill: "pases", base: 1.8, mult: 0.75, desc: "Circula con precisión y roba 1 carta extra.", effect: "draw1" },
  desmarque: { id: "desmarque", icon: "desmarque", name: "Desmarque al Espacio", type: "Construcción", cost: 1, skill: "jugadas", base: 1.6, mult: 0.75, desc: "Ataca el hueco. +25% si la siguiente es Remate.", effect: "boostShot" },
  bicicleta: { id: "bicicleta", icon: "bicicleta", name: "Bicicleta de Banda", type: "Desborde", cost: 1, skill: "lateral", base: 2.3, mult: 0.90, desc: "Encara por fuera. Muy fuerte contra defensas lentos.", effect: "none" },
  pared: { id: "pared", icon: "pared", name: "Pared Rápida", type: "Asociación", cost: 2, skill: "pases", base: 3.3, mult: 1.00, desc: "Toca y va. Cuenta doble para el multiplicador de combo.", effect: "doubleCombo" },
  cambio_ritmo: { id: "cambio_ritmo", icon: "cambio_ritmo", name: "Arrancada Corta", type: "Físico", cost: 1, skill: "lateral", base: 2.2, mult: 0.85, desc: "Cambio de paso seco para ganar metros.", effect: "none" },
  tiro_interior: { id: "tiro_interior", icon: "tiro_interior", name: "Disparo con Interior", type: "Remate", cost: 1, skill: "anotacion", base: 2.8, mult: 0.98, desc: "Remate colocado. +15% eficacia ante el arquero.", effect: "gkEdge" },
  zurdazo: { id: "zurdazo", icon: "zurdazo", name: "Remate Potente", type: "Remate", cost: 2, skill: "anotacion", base: 4.3, mult: 1.18, desc: "Golpeo seco buscando romper la portería.", effect: "none" },
  presion: { id: "presion", icon: "presion", name: "Presión Tras Pérdida", type: "Defensa", cost: 1, skill: "defensa", base: 2.7, mult: 0.90, desc: "Aprieta la salida rival. +0.3 extra de nota del míster.", effect: "coachLove" },
  entrada: { id: "entrada", icon: "entrada", name: "Entrada Limpia", type: "Defensa", cost: 1, skill: "defensa", base: 3.1, mult: 0.95, desc: "Corte al ras del suelo. Riesgo de tarjeta si hay poca Condición.", effect: "riskyTackle" },
  falta_rosca: { id: "falta_rosca", icon: "falta_rosca", name: "Golpeo a Balón Parado", type: "Balón Parado", cost: 1, skill: "balonParado", base: 3.1, mult: 1.08, desc: "Especialista en faltas, córners y centros medidos.", effect: "gkEdge" },

  instinto_gol: { id: "instinto_gol", icon: "signature", name: "Instinto de Área", type: "Remate", cost: 1, skill: "anotacion", base: 3.4, mult: 1.08, signature: true, desc: "Bonus Cantera: Remate rápido al primer toque dentro del área.", effect: "gkEdge" },
  brujula_medio: { id: "brujula_medio", icon: "signature", name: "Brújula del Mediocampo", type: "Asociación", cost: 1, skill: "jugadas", base: 3.1, mult: 1.05, signature: true, desc: "Bonus Cantera: Orienta la jugada y roba 1 carta extra.", effect: "draw1" },
  pulmon_acero: { id: "pulmon_acero", icon: "signature", name: "Pulmón de Hierro", type: "Defensa", cost: 1, skill: "defensa", base: 3.4, mult: 1.05, signature: true, desc: "Bonus Cantera: Cobertura incansable sin riesgo de falta.", effect: "coachLove" },

  ruleta_firma: { id: "ruleta_firma", icon: "signature", name: "Ruleta de Barrio", type: "Desborde", cost: 1, skill: "lateral", base: 3.8, mult: 1.16, signature: true, desc: "Firma (Lateral 7+): Deja clavado al defensa y rebaja -1⚡.", effect: "discountNext" },
  pase_genio: { id: "pase_genio", icon: "signature", name: "Pase sin Mirar", type: "Asociación", cost: 1, skill: "jugadas", base: 3.6, mult: 1.16, signature: true, desc: "Firma (Jugadas 7+): Filtra entre líneas y roba 1 carta.", effect: "draw1" },
  latigo_bp: { id: "latigo_bp", icon: "signature", name: "Látigo a la Escuadra", type: "Balón Parado", cost: 2, skill: "balonParado", base: 5.0, mult: 1.28, signature: true, desc: "Firma (Balón Parado 7+): Falta directa de altísima precisión.", effect: "gkEdge" },

  nervios: { id: "nervios", icon: "curse", name: "Nervios de Canterano", type: "Estado", cost: 1, skill: "jugadas", base: 0.2, mult: 0.05, curse: true, desc: "Juégala para quitártela o trabaja Psicología.", effect: "purgeSelfTemp" },
  fatiga: { id: "fatiga", icon: "curse", name: "Piernas Pesadas", type: "Estado", cost: 1, skill: "defensa", base: 0.0, mult: 0.0, curse: true, tempMatch: true, desc: "Baja condición física. Descansa o entrena Condición.", effect: "none" }
};

const GEAR_SHOP = [
  { id: "staff_1", icon: "blue_jug", slot: "Preparador", name: "Preparador Técnico Nv. 1", price: 240, desc: "+15% Puntos de Entrenamiento (PE) en tu Carta Azul.", skillMatch: [], bonus: 0 },
  { id: "staff_2", icon: "trophy_mvp", slot: "Preparador", name: "Preparador Élite Nv. 2", price: 750, desc: "+30% Puntos de Entrenamiento (PE) en tu Carta Azul.", skillMatch: [], bonus: 0 },
  { id: "boots_1", icon: "ui_shoe", slot: "Botas", name: "Botas Clásicas de Cuero", price: 180, desc: "+0.8 pts base a Pases y Balón Parado.", skillMatch: ["pases", "balonParado"], bonus: 0.8 },
  { id: "boots_2", icon: "trophy_boot", slot: "Botas", name: "Botas Ligeras de Banda", price: 420, desc: "+1.1 pts base a Lateral y Anotación.", skillMatch: ["lateral", "anotacion"], bonus: 1.1 },
  { id: "physio_1", icon: "ui_medkit", slot: "Entorno", name: "Fisioterapeuta Privado", price: 520, desc: "+1 extra de Condición/Forma y reduce riesgo de lesión.", skillMatch: [], bonus: 0 }
];

// ----------------------------------------------------------------------------
// ESTADO GLOBAL Y PERSISTENCIA
// ----------------------------------------------------------------------------

let state = {
  selectedPortrait: 0,
  selectedCountry: "ARG",
  selectedOrigin: "street_tech",
  activeTab: "week",
  careerSubtab: "league",
  deckFilter: "MATCH",
  player: {
    name: "Mateo Vargas",
    portraitId: 0,
    country: "ARG",
    pos: "JUV",
    age: 15,
    days: 14,
    isYouth: true,
    youthWeek: 1,
    youthMaxWeeks: 5,
    youthBonusClaimed: false,
    specialtyRevealed: false,
    specialty: null,
    season: 1,
    week: 1,
    maxWeeks: 14,
    div: 5,
    club: "Juveniles",
    seniorClub: "Defensores del Riachuelo",
    isOnLoan: false,
    parentClub: null,
    parentDiv: null,
    parentCountry: null,
    myTactic: "normal",
    role: "Juvenil de Prueba",
    wage: 0,
    money: 50,
    form: 8,
    condition: 8,
    exp: 1.0,
    character: 55,
    loyalty: 65,
    coachTrust: 55,
    yellowCards: 0,
    redCardsTotal: 0,
    suspendedWeeks: 0,
    injuryWeeks: 0,
    injuryName: "",
    overloadWeeks: 0,
    skills: { jugadas: 3.0, pases: 3.0, anotacion: 3.0, lateral: 3.0, defensa: 2.5, balonParado: 2.5 },
    gear: [],
    unlockedSignatures: [],
    matchesPlayed: 0,
    goals: 0,
    seasonGoals: 0,
    mvpCount: 0,
    goldenBoots: 0,
    ratingSum: 0
  },
  deck: [],
  blueSlot: null,
  amberSlots: [null, null],
  league: [],
  scorers: [],
  fixtures: [],
  press: [],
  offers: [],
  match: null
};

function getCountryObj() {
  return COUNTRIES[state.player.country] || COUNTRIES.ARG;
}

function getDivObj(divId) {
  const cObj = getCountryObj();
  return cObj.divs.find(d => d.id === divId) || cObj.divs[0];
}

function saveGame() {
  try {
    const toSave = {
      player: state.player,
      deck: state.deck,
      blueSlotId: state.blueSlot ? state.blueSlot.id : null,
      amberSlotIds: state.amberSlots.map(s => s ? s.id : null),
      league: state.league,
      scorers: state.scorers,
      fixtures: state.fixtures,
      press: state.press,
      offers: state.offers
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {}
}

function initStaticIcons() {
  document.getElementById("nav-ico-week").innerHTML = renderSprite("ui_crest", 24, true);
  document.getElementById("nav-ico-player").innerHTML = renderSprite("ui_shoe", 24, true);
  document.getElementById("nav-ico-deck").innerHTML = renderSprite("ui_contract", 24, true);
  document.getElementById("nav-ico-career").innerHTML = renderSprite("ui_cup", 24, true);

  const pSel = document.getElementById("portrait-selector");
  pSel.innerHTML = PORTRAIT_DEFS.map(pt => `
    <div class="portrait-opt ${state.selectedPortrait === pt.id ? "selected" : ""}" data-pid="${pt.id}" onclick="selectPortrait(${pt.id})">
      ${renderPortraitBox(pt.id, 62)}
      <span style="font-size:10px; font-weight:900; margin-top:3px;">${pt.label}</span>
    </div>
  `).join("");
}

function selectPortrait(pid) {
  state.selectedPortrait = pid;
  document.querySelectorAll(".portrait-opt").forEach(el => {
    el.classList.toggle("selected", Number(el.dataset.pid) === pid);
  });
}

function checkSavedGameOnBoot() {
  initStaticIcons();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.player) {
      const p = parsed.player;
      const cObj = COUNTRIES[p.country] || COUNTRIES.ARG;
      const stageTxt = p.isYouth ? `Juveniles · Sem. ${p.youthWeek}/${p.youthMaxWeeks}` : `${p.club} · Temp. ${p.season} J.${p.week}`;
      document.getElementById("saved-game-box").style.display = "block";
      document.getElementById("saved-game-info").textContent = `${cObj.flag} ${p.name} (${p.age}a) · ${stageTxt}`;
    }
  } catch (e) {}
}

function loadSavedGame() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    state.player = Object.assign(state.player, parsed.player);
    state.deck = parsed.deck || [];
    state.league = parsed.league || [];
    state.scorers = parsed.scorers || [];
    state.fixtures = parsed.fixtures || [];
    state.press = parsed.press || [];
    state.offers = parsed.offers || [];

    state.blueSlot = parsed.blueSlotId ? BLUE_TRAINING_CARDS.find(c => c.id === parsed.blueSlotId) || null : null;
    state.amberSlots = (parsed.amberSlotIds || [null, null]).map(id => id ? AMBER_ROLE_CARDS.find(c => c.id === id) || null : null);

    document.getElementById("creation-screen").style.display = "none";
    updateTopBar();
    renderCurrentTab();
  } catch (e) {
    alert("Error al cargar la partida guardada.");
  }
}

function resetCareerConfirm() {
  openModal(`
    <h3 class="press-title" style="margin-top:0; color:var(--red);">Reiniciar Carrera</h3>
    <p style="font-size:13px;">Se borrará la partida guardada y volverás a crear tu juvenil desde cero.</p>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
      <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn-primary" style="background:var(--red);" onclick="hardResetCareer()">Reiniciar</button>
    </div>
  `, true);
}

function hardResetCareer() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// ----------------------------------------------------------------------------
// LIGA, CALENDARIO Y GOLEADORES
// ----------------------------------------------------------------------------

function buildClubRoster(divId, clubName) {
  const divObj = getDivObj(divId);
  const randSkill = () => {
    const base = divObj.skillMin + Math.random() * (divObj.skillMax - divObj.skillMin);
    return Math.max(2, Math.round(base * 10) / 10);
  };
  const pickSpec = () => (Math.random() < 0.45 ? null : SPECIALTIES[Math.floor(Math.random() * SPECIALTIES.length)]);
  const tacticObj = TEAM_TACTICS[Math.floor(Math.random() * TEAM_TACTICS.length)];

  const gk = {
    name: "Arquero " + clubName.split(" ").pop(),
    pos: "ARQ",
    porteria: Math.max(3.5, Math.round((divObj.gkSkill + (Math.random() * 2.5 - 1.0)) * 10) / 10)
  };

  const defenders = [
    { name: "Central " + clubName.slice(0, 5), pos: "DEF", defensa: randSkill() + 0.9, spec: pickSpec(), trait: "slow" },
    { name: "Marcador Rival", pos: "DEF", defensa: randSkill() + 0.7, spec: pickSpec(), trait: "sticky" }
  ];

  const attackers = [
    { name: "9 de " + clubName.split(" ")[0], pos: "DEL", anotacion: randSkill() + 0.8, intent: "sprint" },
    { name: "Enganche " + clubName.split(" ").pop(), pos: "MED", jugadas: randSkill() + 0.7, intent: "longshot" }
  ];

  const zoneMid = attackers[1].jugadas;
  const zoneAtt = attackers[0].anotacion;
  const zoneDef = (defenders[0].defensa + defenders[1].defensa + gk.porteria) / 3;

  return { gk, defenders, attackers, zoneMid, zoneAtt, zoneDef, tactic: tacticObj.id };
}

function generateRoundRobinFixtures(numTeams) {
  const teams = [];
  for (let i = 0; i < numTeams; i++) teams.push(i);
  const firstLeg = [];
  const half = numTeams / 2;
  for (let round = 0; round < numTeams - 1; round++) {
    const pairs = [];
    for (let i = 0; i < half; i++) {
      const h = teams[i];
      const a = teams[numTeams - 1 - i];
      pairs.push(round % 2 === 0 ? [h, a] : [a, h]);
    }
    firstLeg.push(pairs);
    const last = teams.pop();
    teams.splice(1, 0, last);
  }
  const secondLeg = firstLeg.map(rp => rp.map(([h, a]) => [a, h]));
  return [...firstLeg, ...secondLeg];
}

function initLeague(divId, myClub) {
  const cObj = getCountryObj();
  const clubs = cObj.clubs[divId];
  state.league = clubs.map(c => ({
    name: c,
    pj: 0, pg: 0, pe: 0, pp: 0, pts: 0, gf: 0, gc: 0,
    isMe: c === myClub,
    roster: buildClubRoster(divId, c)
  }));
  state.fixtures = generateRoundRobinFixtures(clubs.length);

  state.player.seasonGoals = 0;
  state.scorers = [{ name: state.player.name, club: myClub, goals: 0, isMe: true }];
  state.league.forEach(t => {
    if (!t.isMe) {
      state.scorers.push({ name: t.roster.attackers[0].name, club: t.name, goals: 0, isMe: false });
    }
  });
}

// ----------------------------------------------------------------------------
// CREACIÓN DE PERSONAJE Y CABECERA
// ----------------------------------------------------------------------------

function selectCountry(cCode) {
  state.selectedCountry = cCode;
  document.querySelectorAll(".country-btn").forEach(el => {
    el.classList.toggle("selected", el.dataset.country === cCode);
  });
}

function selectOrigin(origId) {
  state.selectedOrigin = origId;
  document.querySelectorAll(".origin-card").forEach(el => {
    el.classList.toggle("selected", el.dataset.orig === origId);
  });
}

function startNewGame() {
  const nameVal = document.getElementById("inp-name").value.trim() || "Mateo Vargas";
  const orig = state.selectedOrigin;
  const cCode = state.selectedCountry;
  const cObj = COUNTRIES[cCode];
  const p = state.player;

  p.name = nameVal;
  p.portraitId = state.selectedPortrait;
  p.country = cCode;
  p.pos = "JUV";
  p.age = 15;
  p.days = 10 + Math.floor(Math.random() * 18);
  p.isYouth = true;
  p.youthWeek = 1;
  p.youthMaxWeeks = 5;
  p.youthBonusClaimed = false;
  p.specialtyRevealed = false;
  p.specialty = null;
  p.season = 1;
  p.week = 1;
  p.div = 5;

  const starterClub = cObj.clubs[5][0];
  p.seniorClub = starterClub;
  p.club = `Juv. ${starterClub}`;
  p.isOnLoan = false;
  p.parentClub = null;
  p.parentDiv = null;
  p.parentCountry = null;
  p.myTactic = "normal";
  p.role = "Juvenil de Prueba";
  p.wage = 0;
  p.money = 50;
  p.form = 8;
  p.condition = 8;
  p.exp = 1.0;
  p.yellowCards = 0;
  p.redCardsTotal = 0;
  p.suspendedWeeks = 0;
  p.injuryWeeks = 0;
  p.injuryName = "";
  p.overloadWeeks = 0;
  p.gear = [];
  p.unlockedSignatures = [];
  p.matchesPlayed = 0;
  p.goals = 0;
  p.seasonGoals = 0;
  p.mvpCount = 0;
  p.goldenBoots = 0;
  p.ratingSum = 0;

  if (orig === "street_tech") {
    p.skills = { jugadas: 3.4, pases: 3.8, anotacion: 2.8, lateral: 4.3, defensa: 2.2, balonParado: 2.5 };
    p.character = 66;
    p.loyalty = 68;
  } else if (orig === "lot_power") {
    p.skills = { jugadas: 2.6, pases: 2.5, anotacion: 4.1, lateral: 3.0, defensa: 4.2, balonParado: 3.4 };
    p.character = 42;
    p.loyalty = 74;
  } else {
    p.skills = { jugadas: 3.9, pases: 3.8, anotacion: 3.0, lateral: 2.6, defensa: 2.6, balonParado: 4.4 };
    p.character = 55;
    p.loyalty = 62;
  }

  const starterIds = [
    "control", "pase_seg", "desmarque", "bicicleta",
    "pared", "cambio_ritmo", "tiro_interior", "zurdazo",
    "presion", "entrada", "falta_rosca", "nervios"
  ];
  state.deck = starterIds.map((id, idx) => ({
    uid: "c_" + idx + "_" + Math.random().toString(36).slice(2, 6),
    templateId: id,
    level: 1
  }));

  state.blueSlot = BLUE_TRAINING_CARDS[0];
  state.amberSlots = [null, null];

  initLeague(5, starterClub);
  state.press = [
    {
      title: `${cObj.flag} ${nameVal} (15 años) ingresa en la cantera de ${starterClub}`,
      body: `Comienza su etapa formativa en ${cObj.name}. En 5 semanas dará el salto al primer equipo en ${cObj.divs[0].name}.`
    }
  ];

  saveGame();
  document.getElementById("creation-screen").style.display = "none";
  updateTopBar();
  renderCurrentTab();
}

function updateTopBar() {
  const p = state.player;
  const cObj = getCountryObj();
  document.getElementById("hdr-avatar-box").innerHTML = renderPortraitBox(p.portraitId, 44, "hdr-avatar");
  document.getElementById("hdr-name").textContent = `${cObj.flag} ${p.name} · ${p.pos}`;

  if (p.isYouth) {
    document.getElementById("hdr-meta").textContent = `${p.age}a ${p.days}d · Juveniles · Sem. ${p.youthWeek}/${p.youthMaxWeeks}`;
    document.getElementById("hdr-div").textContent = `Cantera · ${cObj.name}`;
    document.getElementById("hdr-club").textContent = p.club;
  } else {
    const divObj = getDivObj(p.div);
    document.getElementById("hdr-meta").textContent = `${p.age}a · Temp. ${p.season} · J.${p.week}/${p.maxWeeks}${p.isOnLoan ? " · Cedido" : ""}`;
    document.getElementById("hdr-div").textContent = divObj.name;
    document.getElementById("hdr-club").textContent = p.club;
  }

  const formEl = document.getElementById("hdr-form");
  formEl.textContent = `${p.form}/10`;
  formEl.style.color = p.form >= 7 ? "#6EE7B7" : (p.form >= 5 ? "#FCD34D" : "#FCA5A5");

  const condEl = document.getElementById("hdr-cond");
  condEl.textContent = `${p.condition}/10`;
  condEl.style.color = p.condition >= 7 ? "#6EE7B7" : (p.condition >= 4 ? "#FCD34D" : "#FCA5A5");

  document.getElementById("hdr-money").textContent = `${p.money} ${cObj.currency}`;

  const discEl = document.getElementById("hdr-disc");
  if (p.injuryWeeks > 0) {
    discEl.textContent = `🏥${p.injuryWeeks}J`;
    discEl.style.color = "#FCA5A5";
  } else if (p.suspendedWeeks > 0) {
    discEl.textContent = `🟥${p.suspendedWeeks}J`;
    discEl.style.color = "#FCA5A5";
  } else {
    discEl.textContent = `🟨${p.yellowCards}/3`;
    discEl.style.color = p.yellowCards === 2 ? "#FCA5A5" : "#FCD34D";
  }

  const badge = document.getElementById("offer-badge");
  if (!p.isYouth && state.offers.length > 0) {
    badge.style.display = "inline-block";
    badge.textContent = state.offers.length;
  } else {
    badge.style.display = "none";
  }
}

function switchTab(tab) {
  state.activeTab = tab;
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("nav-" + tab).classList.add("active");
  renderCurrentTab();
}

function renderCurrentTab() {
  const container = document.getElementById("main-view");
  if (state.activeTab === "week") renderWeekTab(container);
  else if (state.activeTab === "player") renderPlayerTab(container);
  else if (state.activeTab === "deck") renderDeckTab(container);
  else if (state.activeTab === "career") renderCareerTab(container);
}

// ----------------------------------------------------------------------------
// PESTAÑA SEMANA
// ----------------------------------------------------------------------------

function getStaffMultiplier() {
  if (state.player.gear.some(g => g.id === "staff_2")) return 1.30;
  if (state.player.gear.some(g => g.id === "staff_1")) return 1.15;
  return 1.00;
}

function previewWeeklyPe() {
  const ageMult = getAgeTrainingFactor(state.player.age);
  const staffMult = getStaffMultiplier();
  return (6.5 * ageMult * staffMult).toFixed(1);
}

function getNextOpponentPreview() {
  const p = state.player;
  const cObj = getCountryObj();
  if (p.isYouth) {
    const rivalClubs = cObj.clubs[5].slice(1, 6);
    const rName = `Juv. ${rivalClubs[(p.youthWeek - 1) % rivalClubs.length]}`;
    const tac = TEAM_TACTICS[(p.youthWeek) % TEAM_TACTICS.length];
    return { name: rName, isHome: true, diffTxt: "Cantera Sub-16", tacticObj: tac };
  }
  const roundIdx = Math.min(state.fixtures.length - 1, Math.max(0, p.week - 1));
  const pairs = state.fixtures[roundIdx] || [];
  const myIdx = state.league.findIndex(t => t.isMe);
  for (const [h, a] of pairs) {
    if (h === myIdx) {
      const oppClub = state.league[a];
      const tac = TEAM_TACTICS.find(t => t.id === oppClub.roster.tactic) || TEAM_TACTICS[0];
      return { name: oppClub.name, isHome: true, diffTxt: getDivObj(p.div).name, tacticObj: tac };
    }
    if (a === myIdx) {
      const oppClub = state.league[h];
      const tac = TEAM_TACTICS.find(t => t.id === oppClub.roster.tactic) || TEAM_TACTICS[0];
      return { name: oppClub.name, isHome: false, diffTxt: getDivObj(p.div).name, tacticObj: tac };
    }
  }
  return { name: "Rival de Liga", isHome: true, diffTxt: getDivObj(p.div).name, tacticObj: TEAM_TACTICS[0] };
}

function computeInjuryRiskPercent() {
  const p = state.player;
  if (p.injuryWeeks > 0) return 0;
  let risk = 1.5;
  if (p.condition <= 3) risk += 12;
  else if (p.condition <= 5) risk += 4.5;
  if (p.overloadWeeks >= 4) risk += (p.overloadWeeks - 3) * 3.5;
  if (p.age >= 30) risk += (p.age - 29) * 2.0;
  if (p.gear.some(g => g.id === "physio_1")) risk = Math.max(1.0, risk * 0.60);
  return Math.min(28, Math.round(risk * 10) / 10);
}

function renderWeekTab(container) {
  const p = state.player;
  const opp = getNextOpponentPreview();
  const blue = state.blueSlot;
  const peEst = previewWeeklyPe();
  const injRisk = computeInjuryRiskPercent();
  const myTac = TEAM_TACTICS.find(t => t.id === p.myTactic) || TEAM_TACTICS[0];

  let statusAlertHtml = "";
  if (p.injuryWeeks > 0) {
    statusAlertHtml = `
      <div class="alert-box">
        ${renderSprite("player_inj", 48)}
        <div>
          <strong>PARTE MÉDICO: ${p.injuryName} (${p.injuryWeeks}J baja)</strong><br>
          Usa tu <strong>Plan Azul de Recuperación</strong> y <strong>Fisioterapia</strong>.
        </div>
      </div>
    `;
  } else if (p.suspendedWeeks > 0) {
    statusAlertHtml = `
      <div class="alert-box warn">
        ${renderSprite("ref_red", 48)}
        <div>
          <strong>SANCIONADO (${p.suspendedWeeks} partido(s) de suspensión)</strong><br>
          Verás el encuentro desde la grada. Aprovecha para entrenar.
        </div>
      </div>
    `;
  } else if (p.isOnLoan) {
    statusAlertHtml = `
      <div class="alert-box warn" style="border-color:var(--purple); background:var(--purple-light);">
        ${renderSprite("loan_deal", 46)}
        <div>
          <strong>EN CESIÓN FORMATIVA (${p.parentClub})</strong><br>
          Suma minutos, goles y MVPs para regresar más fuerte.
        </div>
      </div>
    `;
  }

  const blueHtml = `
    <div class="tactical-slot blue" onclick="openBluePicker()">
      <div class="tactical-slot-hdr">
        <span>🔷 Plan Azul Semanal (1/1)</span>
        <span>Entrenamiento</span>
      </div>
      <div class="tactical-slot-body">
        <div style="display:flex; align-items:center; gap:9px; min-width:0;">
          ${renderSprite(blue ? blue.icon : "blue_jug", 50)}
          <div style="min-width:0;">
            <div class="slot-title">${blue ? blue.name : "Seleccionar enfoque semanal"}</div>
            <div class="slot-desc">
              ${blue ? (blue.primarySkill ? `Estimado: +${peEst} PE (Factor edad x${getAgeTrainingFactor(p.age)})` : blue.desc) : "Toca para asignar entrenamiento"}
            </div>
          </div>
        </div>
        <span class="slot-action-pill">${blue ? "Cambiar" : "+ Elegir"}</span>
      </div>
    </div>
  `;

  const amberHeaders = ["🔶 Acción Rolera 1 · Entre Semana", "🔶 Acción Rolera 2 · Previa"];
  const amberHtml = state.amberSlots.map((act, idx) => `
    <div class="tactical-slot amber" onclick="openAmberPicker(${idx})">
      <div class="tactical-slot-hdr">
        <span>${amberHeaders[idx]}</span>
        <span>${act ? "Asignada" : "Libre"}</span>
      </div>
      <div class="tactical-slot-body">
        <div style="display:flex; align-items:center; gap:9px; min-width:0;">
          ${renderSprite(act ? act.icon : "role_barrio", 48)}
          <div style="min-width:0;">
            <div class="slot-title">${act ? act.title : "Ranura libre · Sin asignar"}</div>
            <div class="slot-desc" style="${act ? "color:var(--green);" : ""}">${act ? act.summary : "Toca para elegir actividad semanal"}</div>
          </div>
        </div>
        <span class="slot-action-pill">${act ? "Cambiar" : "+ Elegir"}</span>
      </div>
    </div>
  `).join("");

  const isUnavailable = p.injuryWeeks > 0 || p.suspendedWeeks > 0;
  const mainBtnHtml = isUnavailable
    ? `<button class="btn-primary sim-mode" onclick="simulateMissedMatchWeek()">
         ⏭ Simular Jornada (${p.injuryWeeks > 0 ? "Baja Médica" : "Sancionado"})
       </button>`
    : `<button class="btn-primary" onclick="startMatch()">
         ${renderSprite("blue_bp", 24, true)} ${p.isYouth ? "Jugar Partido de Cantera" : "Jugar Partido del Domingo"}
       </button>`;

  container.innerHTML = `
    <div class="section-banner">
      <h2 class="press-title">${p.isYouth ? "Semana de Cantera" : "Planificación Semanal"}</h2>
      <span class="sub">Riesgo lesión: ${injRisk}%</span>
    </div>

    ${statusAlertHtml}

    <div class="slot-list">
      ${blueHtml}
      ${amberHtml}
    </div>

    <div class="notebook-card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <span style="font-size:10px; font-weight:900; text-transform:uppercase; color:var(--ink-muted);">
          Próximo Rival · ${opp.isHome ? "Local" : "Visitante"}
        </span>
        <span class="tactic-pill">Rival: ${opp.tacticObj.short}</span>
      </div>

      <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
        <div class="rival-crest">${opp.name.slice(0, 2).toUpperCase()}</div>
        <div>
          <div style="font-size:14.5px; font-weight:900;">vs. ${opp.name}</div>
          <div style="font-size:11px; color:var(--ink-muted);">${opp.diffTxt} · EXP: ${p.exp.toFixed(1)}</div>
        </div>
      </div>

      <div style="border-top:1.5px solid var(--line); padding-top:7px; display:flex; justify-content:space-between; align-items:center;">
        <div style="font-size:11px;">
          <strong>Tu Táctica:</strong> ${myTac.name}<br>
          <span style="color:var(--ink-muted); font-size:10px;">${myTac.desc}</span>
        </div>
        <button class="btn-secondary" style="padding:5px 8px; font-size:11px;" onclick="openTacticPicker()">Táctica</button>
      </div>
    </div>

    ${mainBtnHtml}
  `;
}

function openTacticPicker() {
  const html = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <h3 class="press-title" style="margin:0; font-size:18px;">Táctica de Equipo</h3>
      <button class="btn-secondary" style="padding:5px 10px;" onclick="closeModal()">Cerrar</button>
    </div>
    ${TEAM_TACTICS.map(t => `
      <div class="action-option" onclick="selectTeamTactic('${t.id}')">
        <div>
          <div style="font-size:13px; font-weight:900;">${t.name}</div>
          <div style="font-size:11px; color:var(--blue); font-weight:700; margin-top:2px;">${t.desc}</div>
        </div>
        <span style="font-weight:900;">→</span>
      </div>
    `).join("")}
  `;
  openModal(html, false);
}

function selectTeamTactic(tacId) {
  state.player.myTactic = tacId;
  saveGame();
  closeModal();
  renderCurrentTab();
}

function openBluePicker() {
  const p = state.player;
  const html = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <h3 class="press-title" style="margin:0; font-size:18px; color:var(--blue);">Plan Azul Semanal</h3>
      <button class="btn-secondary" style="padding:5px 10px;" onclick="closeModal()">Cerrar</button>
    </div>
    ${BLUE_TRAINING_CARDS.map(c => {
      let lvlHint = "";
      if (c.primarySkill) {
        const curLvl = Math.floor(p.skills[c.primarySkill]);
        const req = getPeRequiredForLevel(curLvl).toFixed(0);
        lvlHint = `Nivel actual: ${curLvl} (cuesta ${req} PE subir al ${curLvl + 1})`;
      } else {
        lvlHint = `Condición actual: ${p.condition}/10`;
      }
      return `
        <div class="action-option blue-opt" onclick="selectBlueCard('${c.id}')">
          <div style="display:flex; align-items:center; gap:9px;">
            ${renderSprite(c.icon, 48)}
            <div>
              <div style="font-size:13px; font-weight:900; color:var(--blue);">${c.name}</div>
              <div style="font-size:11px; color:var(--ink); margin-top:2px;">${c.desc}</div>
              <div style="font-size:10px; font-weight:800; color:var(--ink-muted); margin-top:2px;">${lvlHint}</div>
            </div>
          </div>
          <span style="font-weight:900; color:var(--blue);">→</span>
        </div>
      `;
    }).join("")}
  `;
  openModal(html, false);
}

function selectBlueCard(cardId) {
  state.blueSlot = BLUE_TRAINING_CARDS.find(c => c.id === cardId) || null;
  saveGame();
  closeModal();
  renderCurrentTab();
}

function openAmberPicker(slotIdx) {
  const html = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <h3 class="press-title" style="margin:0; font-size:18px; color:var(--amber);">Acción Rolera / Entorno</h3>
      <button class="btn-secondary" style="padding:5px 10px;" onclick="closeModal()">Cerrar</button>
    </div>
    ${AMBER_ROLE_CARDS.map(c => `
      <div class="action-option amber-opt" onclick="selectAmberCard(${slotIdx}, '${c.id}')">
        <div style="display:flex; align-items:center; gap:9px;">
          ${renderSprite(c.icon, 48)}
          <div>
            <div style="font-size:13px; font-weight:800;">${c.title}</div>
            <div style="font-size:11px; color:var(--green); font-weight:700; margin-top:2px;">${c.summary}</div>
          </div>
        </div>
        <span style="font-weight:900;">→</span>
      </div>
    `).join("")}
  `;
  openModal(html, false);
}

function selectAmberCard(slotIdx, cardId) {
  state.amberSlots[slotIdx] = AMBER_ROLE_CARDS.find(c => c.id === cardId) || null;
  saveGame();
  closeModal();
  renderCurrentTab();
}

function upgradeRandomCard(preferredTypes) {
  const candidates = state.deck.filter(c => {
    const tpl = CARD_TEMPLATES[c.templateId];
    return !tpl.curse && c.level < 3 && preferredTypes.includes(tpl.type);
  });
  const pool = candidates.length > 0
    ? candidates
    : state.deck.filter(c => !CARD_TEMPLATES[c.templateId].curse && c.level < 3);
  if (pool.length > 0) {
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    chosen.level += 1;
  }
}

function removeCurseCard(templateId) {
  const idx = state.deck.findIndex(c => c.templateId === templateId);
  if (idx !== -1) state.deck.splice(idx, 1);
}

// ----------------------------------------------------------------------------
// PESTAÑA JUGADOR
// ----------------------------------------------------------------------------

function getPersonalityLabels(p) {
  let charLabel = "Equilibrado";
  if (p.character >= 75) charLabel = "Carismático";
  else if (p.character >= 58) charLabel = "Agradable";
  else if (p.character <= 30) charLabel = "Temperamental";
  else if (p.character <= 45) charLabel = "Polémico";

  let ambLabel = "Equilibrado";
  if (p.loyalty >= 75) ambLabel = "Leal / De Casa";
  else if (p.loyalty >= 58) ambLabel = "Comprometido";
  else if (p.loyalty <= 30) ambLabel = "Ambicioso";
  else if (p.loyalty <= 45) ambLabel = "Calculador";

  return { charLabel, ambLabel };
}

function renderPlayerTab(container) {
  const p = state.player;
  const cObj = getCountryObj();
  const pers = getPersonalityLabels(p);
  const mktVal = computeMarketValue();
  const avgNote = p.matchesPlayed > 0 ? (p.ratingSum / p.matchesPlayed).toFixed(1) : "—";

  const specObj = p.specialtyRevealed
    ? (p.specialty === "none" ? { name: "Sin Especialidad", desc: "Asimila un +12% extra de PE en cada entrenamiento semanal." } : SPECIALTIES.find(s => s.id === p.specialty))
    : { name: "Oculta (Cantera)", desc: "Se revelará en los partidos 3, 4 o 5 de juveniles." };

  const skillsHtml = SKILL_DEFS.map(sd => {
    const raw = p.skills[sd.key] || 0;
    const lvl = Math.floor(raw);
    const pct = Math.round((raw - lvl) * 100);
    const labelTxt = getSkillLevelLabel(lvl);
    const decayNote = p.age >= sd.declineAge ? `⚠ Declive (${sd.declineAge}+)` : `Req: ${getPeRequiredForLevel(lvl).toFixed(0)} PE`;
    return `
      <div class="skill-box">
        <div class="skill-top">
          <span class="skill-name">${sd.label}</span>
          <span class="skill-lvl">${lvl >= 20 ? "20+" : lvl}</span>
        </div>
        <div class="skill-subtxt">
          <span>${labelTxt}</span>
          <span class="mono">${pct}%</span>
        </div>
        <div class="skill-bar-bg">
          <div class="skill-bar-fill" style="width:${pct}%;"></div>
        </div>
        <div style="font-size:9.5px; color:${p.age >= sd.declineAge ? "var(--red)" : "var(--ink-muted)"}; margin-top:3px; font-weight:700;">
          ${decayNote}
        </div>
      </div>
    `;
  }).join("");

  const shopHtml = GEAR_SHOP.map(item => {
    const owned = p.gear.some(g => g.id === item.id);
    return `
      <div class="notebook-card" style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
        <div style="display:flex; align-items:center; gap:9px;">
          ${renderSprite(item.icon, 44)}
          <div>
            <span style="font-size:9px; font-weight:800; text-transform:uppercase; color:var(--amber);">${item.slot}</span>
            <div style="font-size:12.5px; font-weight:900;">${item.name}</div>
            <div style="font-size:10.5px; color:var(--ink-muted);">${item.desc}</div>
          </div>
        </div>
        ${owned
          ? `<span class="stamp-badge" style="border-color:var(--green); color:var(--green);">Equipado</span>`
          : `<button class="btn-secondary" style="white-space:nowrap;" onclick="buyGear('${item.id}')">${item.price} ${cObj.currency}</button>`
        }
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="section-banner">
      <h2 class="press-title">Ficha y Valor</h2>
      <span class="sub" style="color:var(--green);">Valor: ${formatMoney(mktVal)}</span>
    </div>

    <div class="notebook-card">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:9px;">
        <div style="display:flex; gap:10px; align-items:center;">
          ${renderPortraitBox(p.portraitId, 66)}
          <div>
            <div style="font-size:14.5px; font-weight:900;">${cObj.flag} ${p.name} · ${p.age}a</div>
            <div style="font-size:11px; color:var(--purple); font-weight:800; margin-top:1px;">
              Especialidad: ${specObj.name}
            </div>
            <div style="font-size:10.5px; color:var(--ink-muted); margin-top:1px;">${specObj.desc}</div>
          </div>
        </div>
        <span class="stamp-badge" style="border-color:var(--blue); color:var(--blue);">${p.pos}</span>
      </div>

      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:4px; margin-top:8px; padding-top:7px; border-top:1.5px solid var(--line); text-align:center; font-size:11px;">
        <div><strong>${p.goals}</strong><br><span style="color:var(--ink-muted);font-size:9.5px;">Goles Tot.</span></div>
        <div><strong>${p.mvpCount}</strong><br><span style="color:var(--ink-muted);font-size:9.5px;">MVPs</span></div>
        <div><strong>${avgNote}</strong><br><span style="color:var(--ink-muted);font-size:9.5px;">Nota Med.</span></div>
        <div><strong>${p.goldenBoots}</strong><br><span style="color:var(--ink-muted);font-size:9.5px;">Goleador</span></div>
      </div>

      <div style="margin-top:7px; padding-top:7px; border-top:1.5px solid var(--line); display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:11px;">
        <div><strong>Carácter:</strong> ${pers.charLabel} (${p.character})</div>
        <div><strong>Actitud:</strong> ${pers.ambLabel} (${p.loyalty})</div>
        <div><strong>Disciplina:</strong> 🟨 ${p.yellowCards}/3 · 🟥 ${p.redCardsTotal}</div>
        <div><strong>EXP:</strong> ${p.exp.toFixed(1)} · ${p.isOnLoan ? `Cedido (${p.parentClub})` : "En propiedad"}</div>
      </div>
    </div>

    <div class="skills-grid">
      ${skillsHtml}
    </div>

    <div class="section-banner">
      <h2 class="press-title">Staff y Equipamiento</h2>
      <span class="sub">Caja: ${p.money} ${cObj.currency}</span>
    </div>
    ${shopHtml}

    <div style="margin-top:12px; text-align:center;">
      <button class="btn-secondary" style="font-size:11px; color:var(--red); border-color:var(--red);" onclick="resetCareerConfirm()">
        Borrar partida y empezar nueva carrera
      </button>
    </div>
  `;
}

function buyGear(itemId) {
  const item = GEAR_SHOP.find(g => g.id === itemId);
  const cObj = getCountryObj();
  if (!item) return;
  if (state.player.money < item.price) {
    openModal(`
      <h3 class="press-title" style="margin-top:0;">Fondos insuficientes</h3>
      <p style="font-size:13px;">Necesitas <strong>${item.price} ${cObj.currency}</strong> para adquirir <em>${item.name}</em>.</p>
      <button class="btn-primary" onclick="closeModal()">Entendido</button>
    `, true);
    return;
  }
  state.player.money -= item.price;
  state.player.gear.push(item);
  saveGame();
  updateTopBar();
  renderCurrentTab();
}

// ----------------------------------------------------------------------------
// PESTAÑA MAZOS
// ----------------------------------------------------------------------------

function computeCardPower(cardInstance) {
  const tpl = CARD_TEMPLATES[cardInstance.templateId];
  const p = state.player;
  const skillVal = p.skills[tpl.skill] || 0;
  const lvlMult = 1 + (cardInstance.level - 1) * 0.22;
  let gearBonus = 0;
  p.gear.forEach(g => {
    if (g.skillMatch && g.skillMatch.includes(tpl.skill)) gearBonus += g.bonus;
  });

  let specMult = 1.0;
  if (p.specialtyRevealed) {
    if (p.specialty === "quick" && tpl.type === "Desborde") specMult = 1.25;
    if (p.specialty === "technical" && (tpl.type === "Asociación" || tpl.type === "Construcción")) specMult = 1.25;
    if (p.specialty === "powerful" && (tpl.type === "Remate" || tpl.type === "Balón Parado" || tpl.type === "Defensa")) specMult = 1.22;
  }

  return ((tpl.base + skillVal * tpl.mult) * lvlMult + gearBonus) * specMult;
}

function checkSignatureUnlocks() {
  const p = state.player;
  const rules = [
    { skill: "lateral", req: 7, cardId: "ruleta_firma", title: "Ruleta de Barrio" },
    { skill: "jugadas", req: 7, cardId: "pase_genio", title: "Pase sin Mirar" },
    { skill: "balonParado", req: 7, cardId: "latigo_bp", title: "Látigo a la Escuadra" }
  ];
  const unlocked = [];
  rules.forEach(r => {
    if (Math.floor(p.skills[r.skill]) >= r.req && !p.unlockedSignatures.includes(r.cardId)) {
      p.unlockedSignatures.push(r.cardId);
      state.deck.push({
        uid: "sig_" + r.cardId + "_" + Math.random().toString(36).slice(2, 5),
        templateId: r.cardId,
        level: 1
      });
      unlocked.push(r.title);
    }
  });
  return unlocked;
}

function renderDeckTab(container) {
  const filters = [
    { id: "MATCH", label: `Partido (${state.deck.length})` },
    { id: "BLUE", label: `Entreno Azul (${BLUE_TRAINING_CARDS.length})` },
    { id: "AMBER", label: `Roleras (${AMBER_ROLE_CARDS.length})` }
  ];

  let contentHtml = "";
  if (state.deckFilter === "BLUE") {
    contentHtml = `
      <div class="deck-grid">
        ${BLUE_TRAINING_CARDS.map(b => `
          <div class="card-item blue-card">
            <div>
              <div class="card-lvl" style="color:var(--blue);">CARTA AZUL</div>
              <div class="card-art-wrap">${renderSprite(b.icon, 68)}</div>
              <div class="card-title">${b.name}</div>
            </div>
            <div class="card-desc" style="color:var(--ink);">${b.desc}</div>
          </div>
        `).join("")}
      </div>
    `;
  } else if (state.deckFilter === "AMBER") {
    contentHtml = `
      <div class="deck-grid">
        ${AMBER_ROLE_CARDS.map(a => `
          <div class="card-item">
            <div>
              <div class="card-lvl" style="color:var(--amber);">CARTA ROLERA</div>
              <div class="card-art-wrap">${renderSprite(a.icon, 68)}</div>
              <div class="card-title">${a.title}</div>
            </div>
            <div class="card-desc" style="color:var(--green); font-weight:700;">${a.summary}</div>
          </div>
        `).join("")}
      </div>
    `;
  } else {
    contentHtml = `
      <div class="deck-grid">
        ${state.deck.map(c => {
          const tpl = CARD_TEMPLATES[c.templateId];
          const pwr = computeCardPower(c).toFixed(1);
          const sDef = SKILL_DEFS.find(s => s.key === tpl.skill);
          return `
            <div class="card-item ${tpl.curse ? "curse" : (tpl.signature ? "signature" : "")}" onclick="inspectCard('${c.uid}')">
              <div class="card-cost">${tpl.cost}</div>
              <div>
                <div class="card-lvl">${tpl.curse ? "LASTRE" : (tpl.signature ? "★ FIRMA · NV." + c.level : "NV. " + c.level)}</div>
                <div class="card-art-wrap">${renderSprite(tpl.icon, 72)}</div>
                <div class="card-title">${tpl.name}</div>
                <span class="card-type-tag">${tpl.type} · ${sDef ? sDef.short : ""}</span>
              </div>
              <div>
                <div class="card-power">${tpl.curse ? "Lastre" : "+" + pwr + " pts"}</div>
                <div class="card-desc">${tpl.desc}</div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="section-banner">
      <h2 class="press-title">Colección de Cartas</h2>
      <span class="sub">3 familias</span>
    </div>
    <div class="filter-row">
      ${filters.map(f => `<button class="filter-chip ${state.deckFilter === f.id ? "active" : ""}" onclick="setDeckFilter('${f.id}')">${f.label}</button>`).join("")}
    </div>
    ${contentHtml}
  `;
}

function setDeckFilter(f) {
  state.deckFilter = f;
  renderCurrentTab();
}

function inspectCard(uid) {
  const c = state.deck.find(item => item.uid === uid) || (state.match && state.match.hand.find(item => item.uid === uid));
  if (!c) return;
  const tpl = CARD_TEMPLATES[c.templateId];
  const sDef = SKILL_DEFS.find(s => s.key === tpl.skill);
  const sVal = (state.player.skills[tpl.skill] || 0).toFixed(2);
  const pwr = computeCardPower(c).toFixed(1);

  openModal(`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <span class="stamp-badge">${tpl.type}</span>
      <span class="mono">Coste: ⚡ ${tpl.cost}</span>
    </div>
    <div style="display:flex; align-items:center; gap:11px; margin-bottom:8px;">
      ${renderSprite(tpl.icon, 72)}
      <h3 class="press-title" style="margin:0; font-size:20px;">${tpl.name}</h3>
    </div>
    <p style="font-size:13px; line-height:1.4; margin:0 0 10px 0;">${tpl.desc}</p>
    <div class="notebook-card" style="font-size:12px;">
      Habilidad vinculada: <strong>${sDef ? sDef.label : tpl.skill} (${sVal})</strong> · Nivel carta: <strong>${c.level}</strong><br>
      Potencia actual: <strong>${pwr} pts</strong>
    </div>
    <button class="btn-primary" onclick="closeModal()">Cerrar</button>
  `, true);
}

// ----------------------------------------------------------------------------
// PESTAÑA CARRERA
// ----------------------------------------------------------------------------

function renderCareerTab(container) {
  const p = state.player;
  const cObj = getCountryObj();

  if (p.isYouth) {
    container.innerHTML = `
      <div class="section-banner">
        <h2 class="press-title">Etapa de Cantera · ${cObj.flag}</h2>
        <span class="sub">Sem. ${p.youthWeek}/${p.youthMaxWeeks}</span>
      </div>
      <div class="notebook-card" style="display:flex; align-items:center; gap:10px;">
        ${renderSprite("crest_youth", 56)}
        <div>
          <div style="font-size:14px; font-weight:900; margin-bottom:3px;">Juveniles · ${p.seniorClub}</div>
          <p style="font-size:12px; color:var(--ink-muted); margin:0; line-height:1.35;">
            Completa tus 5 semanas de formación en ${cObj.name} para firmar tu primer contrato en ${cObj.divs[0].name} al cumplir 16 años.
          </p>
        </div>
      </div>
      ${state.press.map(item => `
        <div class="press-clip"><h4>${item.title}</h4><p>${item.body}</p></div>
      `).join("")}
    `;
    return;
  }

  const sub = state.careerSubtab;
  let bodyHtml = "";

  if (sub === "league") {
    const sorted = [...state.league].sort((a, b) =>
      (b.pts - a.pts) || ((b.gf - b.gc) - (a.gf - a.gc)) || (b.gf - a.gf)
    );
    const topScorers = [...state.scorers].sort((a, b) => b.goals - a.goals).slice(0, 5);

    bodyHtml = `
      <table class="league-table">
        <thead>
          <tr><th>#</th><th>Club (Táctica)</th><th>PJ</th><th>G-E-P</th><th>DG</th><th>PTS</th></tr>
        </thead>
        <tbody>
          ${sorted.map((t, i) => {
            const tacObj = TEAM_TACTICS.find(x => x.id === (t.isMe ? p.myTactic : t.roster.tactic)) || TEAM_TACTICS[0];
            return `
              <tr class="${t.isMe ? "my-club" : ""}">
                <td>${i + 1}</td>
                <td>${t.name} <span style="font-size:9.5px; color:var(--blue); font-weight:700;">[${tacObj.short}]</span></td>
                <td>${t.pj}</td>
                <td>${t.pg}-${t.pe}-${t.pp}</td>
                <td>${t.gf - t.gc >= 0 ? "+" + (t.gf - t.gc) : (t.gf - t.gc)}</td>
                <td><strong>${t.pts}</strong></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>

      <div class="notebook-card" style="margin-top:10px;">
        <div style="font-size:10px; font-weight:900; text-transform:uppercase; color:var(--ink-muted); margin-bottom:5px;">
          ⚽ Tabla de Goleadores · ${getDivObj(p.div).name}
        </div>
        ${topScorers.map((sc, idx) => `
          <div style="display:flex; justify-content:space-between; font-size:11.5px; padding:3px 0; border-bottom:1px solid var(--line); ${sc.isMe ? "font-weight:900; color:var(--green);" : ""}">
            <span>${idx + 1}. ${sc.name} <span style="font-size:10px; color:var(--ink-muted);">(${sc.club})</span></span>
            <span class="mono">${sc.goals} G</span>
          </div>
        `).join("")}
      </div>
    `;
  } else if (sub === "press") {
    bodyHtml = state.press.map(item => `
      <div class="press-clip"><h4>${item.title}</h4><p>${item.body}</p></div>
    `).join("");
  } else {
    const mktVal = computeMarketValue();
    bodyHtml = `
      <div class="notebook-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:10px; font-weight:900; color:var(--ink-muted);">SITUACIÓN CONTRACTUAL</span>
          <span class="mono" style="font-size:12px; color:var(--green);">Valor: ${formatMoney(mktVal)}</span>
        </div>
        <div style="font-size:15px; font-weight:900; margin-top:2px;">${cObj.flag} ${p.club} (${getDivObj(p.div).name})</div>
        <div style="font-size:12px;">
          Rol: <strong>${p.role}</strong> · Sueldo: <strong>${p.wage} ${cObj.currency}/sem</strong>
          ${p.isOnLoan ? `<br><span style="color:var(--purple); font-weight:800;">Cedido por ${p.parentClub} (regresa al fin de temporada)</span>` : ""}
        </div>
      </div>
    `;
    if (state.offers.length === 0) {
      bodyHtml += `
        <div class="notebook-card" style="text-align:center;">
          <p style="font-size:12px; color:var(--ink-muted); margin:0 0 8px 0;">
            Los clubes solo ofertan si tu nivel, rendimiento (goles/MVP) y división encajan con su proyecto.
          </p>
          <button class="btn-secondary" onclick="askAgentForOffers()">Pedir informe al representante</button>
        </div>
      `;
    } else {
      bodyHtml += state.offers.map((off, idx) => {
        const offCountry = COUNTRIES[off.country] || cObj;
        const isLoan = off.offerType === "loan";
        return `
          <div class="notebook-card" style="border-left:5px solid ${isLoan ? "var(--purple)" : "var(--amber)"};">
            <div style="display:flex; align-items:center; gap:9px; margin-bottom:6px;">
              ${renderSprite(isLoan ? "loan_deal" : "ui_contract", 50)}
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span class="${isLoan ? "loan-badge" : "tactic-pill"}">${isLoan ? "CESIÓN (1 TEMP.)" : "TRASPASO DEFINITIVO"}</span>
                  <span class="mono" style="font-size:11.5px;">${off.wage} ${offCountry.currency}/sem</span>
                </div>
                <div style="font-size:14.5px; font-weight:900; margin:2px 0;">${offCountry.flag} ${off.club}</div>
                <div style="font-size:11px; color:var(--ink-muted);">
                  Categoría: <strong>${off.divName}</strong> · Rol: <strong>${off.role}</strong>
                </div>
              </div>
            </div>
            <div style="font-size:11px; color:var(--ink); margin-bottom:8px;">
              ${isLoan
                ? `Te ficha <strong>${off.parentClub}</strong> (Div. ${off.parentDiv}) y te cede 1 temporada a <strong>${off.club}</strong> para garantizar minutos de titular.`
                : `Traspaso directo valorado en <strong>${formatMoney(off.fee || mktVal)}</strong>.`}
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <button class="btn-secondary" onclick="rejectOffer(${idx})">Rechazar</button>
              <button class="btn-primary" style="padding:8px; font-size:12px;" onclick="acceptOffer(${idx})">${isLoan ? "Aceptar Cesión" : "Firmar Traspaso"}</button>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  container.innerHTML = `
    <div class="section-banner">
      <h2 class="press-title">Trayectoria · ${cObj.flag} ${cObj.name}</h2>
      <span class="sub">Temp. ${p.season}</span>
    </div>
    <div class="subtabs">
      <button class="subtab-btn ${sub === "league" ? "active" : ""}" onclick="setCareerSubtab('league')">Liga</button>
      <button class="subtab-btn ${sub === "press" ? "active" : ""}" onclick="setCareerSubtab('press')">Prensa (${state.press.length})</button>
      <button class="subtab-btn ${sub === "transfers" ? "active" : ""}" onclick="setCareerSubtab('transfers')">Mercado (${state.offers.length})</button>
    </div>
    ${bodyHtml}
  `;
}

function setCareerSubtab(sub) {
  state.careerSubtab = sub;
  renderCurrentTab();
}

function askAgentForOffers() {
  maybeGenerateRealisticOffer(true);
  saveGame();
  renderCurrentTab();
}

function maybeGenerateRealisticOffer(forced = false) {
  const p = state.player;
  if (p.isYouth || p.isOnLoan) return;
  if (!forced && Math.random() > 0.35) return;
  if (state.offers.length >= 2) return;

  const effSkill = getEffectivePlayerRating();
  const avgNote = p.matchesPlayed > 0 ? (p.ratingSum / p.matchesPlayed) : 6.0;
  const mktVal = computeMarketValue();

  const reqToClimb = { 5: 5.5, 4: 8.3, 3: 11.4, 2: 14.5, 1: 99 };
  const perfDiscount = (avgNote >= 7.5 || p.mvpCount >= 2 || p.seasonGoals >= 5) ? 0.5 : 0;
  const canClimbOneDiv = (p.div > 1) && (effSkill + perfDiscount >= reqToClimb[p.div]);

  if (p.age <= 21 && p.div >= 3 && effSkill >= (reqToClimb[p.div] - 0.8) && Math.random() < 0.42) {
    const parentDiv = p.div - 1;
    const loanDestDiv = p.div;
    const countryObj = getCountryObj();

    const parentClubs = countryObj.clubs[parentDiv];
    const parentClub = parentClubs[Math.floor(Math.random() * parentClubs.length)];

    const destClubs = countryObj.clubs[loanDestDiv].filter(c => c !== p.club);
    const destClub = destClubs[Math.floor(Math.random() * destClubs.length)];
    const destDivObj = countryObj.divs.find(d => d.id === loanDestDiv);
    const parentDivObj = countryObj.divs.find(d => d.id === parentDiv);

    const wage = Math.round(parentDivObj.wageBase * 0.65);
    const tac = TEAM_TACTICS[Math.floor(Math.random() * TEAM_TACTICS.length)];

    state.offers.push({
      offerType: "loan",
      country: p.country,
      parentClub,
      parentDiv,
      club: destClub,
      div: loanDestDiv,
      divName: destDivObj.name,
      role: "Titular",
      wage,
      tacticId: tac.id,
      tacticName: tac.name
    });
    updateTopBar();
    return;
  }

  const targetDiv = canClimbOneDiv ? (p.div - 1) : p.div;
  const countryKeys = Object.keys(COUNTRIES);
  const targetCountryCode = (targetDiv <= 2 && Math.random() < 0.30)
    ? countryKeys[Math.floor(Math.random() * countryKeys.length)]
    : p.country;

  const targetCountry = COUNTRIES[targetCountryCode];
  const divObj = targetCountry.divs.find(d => d.id === targetDiv);
  const clubs = targetCountry.clubs[targetDiv].filter(c => c !== p.club);
  const club = clubs[Math.floor(Math.random() * clubs.length)];

  let role = "Titular";
  if (targetDiv < p.div) {
    role = effSkill >= (reqToClimb[p.div] + 1.2) ? "Titular" : "Canterano Suplente";
  } else {
    role = effSkill >= (divObj.skillMin + 2.2) ? "Estrella" : "Titular";
  }

  const wage = Math.round(divObj.wageBase * (role === "Estrella" ? 1.35 : (role === "Titular" ? 1.0 : 0.78)));
  const tac = TEAM_TACTICS[Math.floor(Math.random() * TEAM_TACTICS.length)];

  state.offers.push({
    offerType: "transfer",
    country: targetCountryCode,
    club,
    div: targetDiv,
    divName: divObj.name,
    role,
    wage,
    fee: mktVal,
    tacticId: tac.id,
    tacticName: tac.name
  });
  updateTopBar();
}

function rejectOffer(idx) {
  state.offers.splice(idx, 1);
  saveGame();
  updateTopBar();
  renderCurrentTab();
}

function acceptOffer(idx) {
  const off = state.offers[idx];
  const p = state.player;

  if (off.offerType === "loan") {
    p.isOnLoan = true;
    p.parentClub = off.parentClub;
    p.parentDiv = off.parentDiv;
    p.parentCountry = off.country;
    p.country = off.country;
    p.club = off.club;
    p.div = off.div;
    p.role = off.role;
    p.wage = off.wage;
    p.myTactic = off.tacticId || "normal";
    state.offers = [];
    initLeague(p.div, p.club);

    state.press.unshift({
      title: `📋 CESIÓN: ${off.parentClub} ficha a ${p.name} y lo cede a ${p.club}`,
      body: `El joven talento jugará esta temporada cedido en ${off.divName} para ganar experiencia como ${off.role}.`
    });
  } else {
    p.isOnLoan = false;
    p.parentClub = null;
    p.parentDiv = null;
    p.country = off.country;
    p.club = off.club;
    p.div = off.div;
    p.role = off.role;
    p.wage = off.wage;
    p.myTactic = off.tacticId || "normal";
    state.offers = [];
    initLeague(p.div, p.club);

    const cObj = getCountryObj();
    state.press.unshift({
      title: `¡TRASPASO OFICIAL! ${p.name} ficha por ${p.club} (${cObj.flag})`,
      body: `Operación cerrada en ${formatMoney(off.fee || computeMarketValue())}. Aterriza en ${off.divName} como ${off.role}.`
    });
  }

  saveGame();
  updateTopBar();
  renderCurrentTab();
}

// ----------------------------------------------------------------------------
// MOTOR DE PARTIDO REEQUILIBRADO (MÁS REALISTA: DEFENSORES Y PORTEROS EXIGENTES)
// ----------------------------------------------------------------------------

function simulateMissedMatchWeek() {
  const p = state.player;
  const wasInjured = p.injuryWeeks > 0;
  const wasSuspended = p.suspendedWeeks > 0;

  state.amberSlots.forEach(act => {
    if (act && act.apply) act.apply();
  });
  state.amberSlots = [null, null];

  let trainingReport = "";
  const blue = state.blueSlot;
  if (blue) {
    if (blue.id === "blue_cond") {
      p.condition = Math.min(10, p.condition + 2);
      p.form = Math.min(10, p.form + 1);
      if (p.injuryWeeks > 0) p.injuryWeeks = Math.max(0, p.injuryWeeks - 1);
      trainingReport = "Plan Azul de Recuperación: mejora física acelerada.";
    } else {
      const ageMult = getAgeTrainingFactor(p.age);
      const staffMult = getStaffMultiplier();
      const availMult = wasInjured ? 0.50 : 0.95;
      const totalPe = 6.5 * ageMult * staffMult * availMult;
      const ups = addSkillPe(blue.primarySkill, totalPe);
      const sLabel = SKILL_DEFS.find(s => s.key === blue.primarySkill).label;
      trainingReport = `${blue.name}: +${totalPe.toFixed(1)} PE en ${sLabel}` + (ups > 0 ? ` (¡SUBE A ${Math.floor(p.skills[blue.primarySkill])}!)` : ".");
    }
  }

  if (wasSuspended) p.suspendedWeeks = Math.max(0, p.suspendedWeeks - 1);
  if (wasInjured && p.injuryWeeks > 0) {
    p.injuryWeeks = Math.max(0, p.injuryWeeks - 1);
    if (p.injuryWeeks === 0) {
      p.injuryName = "";
      p.form = Math.max(4, p.form - 1);
    }
  }

  let matchSimText = "";
  if (p.isYouth) {
    if (p.youthWeek < p.youthMaxWeeks) {
      p.youthWeek += 1;
    } else {
      p.isYouth = false;
      p.age = 16;
      p.week = 1;
      p.club = p.seniorClub;
      p.role = "Canterano Suplente";
      p.wage = getDivObj(5).wageBase;
    }
    matchSimText = "El equipo juvenil disputó su amistoso semanal sin ti.";
  } else {
    simulateRoundFixtures(null, 0, 0);
    const myClubObj = state.league.find(t => t.isMe);
    matchSimText = `Tu club (${myClubObj.name}) disputó la jornada sin ti.`;

    p.money += p.wage;
    if (p.week >= p.maxWeeks) {
      handleEndOfSeason();
    } else {
      p.week += 1;
    }
  }

  saveGame();
  updateTopBar();
  renderCurrentTab();

  openModal(`
    <span class="stamp-badge" style="border-color:var(--amber); color:var(--amber);">JORNADA DESDE LA GRADA</span>
    <h3 class="press-title" style="margin:8px 0 6px 0; font-size:20px;">Semana completada</h3>
    <p style="font-size:13px; margin:0 0 10px 0;">${matchSimText}</p>
    <div class="notebook-card" style="font-size:12.5px;">
      ${trainingReport ? `<div style="color:var(--blue); font-weight:800;">🔷 ${trainingReport}</div>` : ""}
      <div style="margin-top:4px;">Estado actual: <strong>${p.injuryWeeks > 0 ? `Baja médica (${p.injuryWeeks}J restantes)` : (p.suspendedWeeks > 0 ? `Sancionado (${p.suspendedWeeks}J)` : "✅ Disponible")}</strong></div>
    </div>
    <button class="btn-primary" onclick="closeModal()">Continuar</button>
  `, true);
}

function startMatch() {
  const p = state.player;
  const oppInfo = getNextOpponentPreview();

  state.amberSlots.forEach(act => {
    if (act && act.apply) act.apply();
  });
  state.amberSlots = [null, null];

  let matchDeck = state.deck.map(c => ({ ...c }));
  if (p.condition <= 3) {
    matchDeck.push({ uid: "temp_fatiga", templateId: "fatiga", level: 1 });
  }
  matchDeck = shuffle(matchDeck);

  const momentsCount = p.isYouth ? 3 : (p.role === "Canterano Suplente" ? 3 : (p.role === "Titular" ? 4 : 5));
  const maxStam = 3 + (p.condition >= 8 ? 1 : 0);

  const leagueClub = state.league.find(t => t.name === oppInfo.name);
  const roster = leagueClub ? leagueClub.roster : buildClubRoster(5, oppInfo.name);
  const myTacObj = TEAM_TACTICS.find(t => t.id === p.myTactic) || TEAM_TACTICS[0];

  state.match = {
    rivalName: oppInfo.name,
    roster,
    myTacticObj: myTacObj,
    oppTacticObj: oppInfo.tacticObj,
    myGoals: 0,
    rivalGoals: 0,
    momentsTotal: momentsCount,
    momentIndex: 0,
    maxStamina: maxStam,
    stamina: maxStam,
    drawPile: matchDeck,
    hand: [],
    sequence: [],
    note: 6.0,
    goalsScored: 0,
    matchYellows: 0,
    sentOff: false,
    momentType: "attack",
    phase: "cards",
    duelActor: null,
    targetThreshold: 11.5,
    surplusPts: 0,
    hasGkEdgeCard: false,
    minute: 60
  };

  updateTopBar();
  document.getElementById("match-overlay").classList.add("active");
  setupNextMoment();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function drawCards(n) {
  const m = state.match;
  for (let i = 0; i < n; i++) {
    if (m.drawPile.length === 0) {
      m.drawPile = shuffle(state.deck.map(c => ({ ...c, uid: c.uid + "_" + Math.random().toString(36).slice(2, 4) })));
    }
    if (m.drawPile.length > 0 && m.hand.length < 6) {
      m.hand.push(m.drawPile.pop());
    }
  }
}

function setupNextMoment() {
  const m = state.match;
  const p = state.player;
  const divObj = getDivObj(p.div);

  m.momentIndex += 1;
  m.stamina = m.maxStamina;
  m.sequence = [];
  m.surplusPts = 0;
  m.hasGkEdgeCard = false;

  const startMin = p.isYouth ? 58 : (p.role === "Canterano Suplente" ? 65 : 15);
  const stepMin = Math.floor((90 - startMin) / m.momentsTotal);
  m.minute = Math.min(92, startMin + (m.momentIndex - 1) * stepMin + Math.floor(Math.random() * 5));

  // Dificultad reequilibrada: umbral realista según defensa/portero rival
  const r = Math.random();
  if (r < 0.08) {
    m.momentType = "penalty";
    m.phase = "penalty_kick";
  } else if (r < 0.26) {
    m.momentType = "setpiece";
    m.phase = "cards";
    const isFreeKick = Math.random() < 0.55;
    m.duelActor = {
      name: isFreeKick ? "Tiro Libre Directo (22m)" : "Saque de Esquina / Falta Lateral",
      traitLabel: isFreeKick ? "BARRERA + ARQUERO" : "CENTRO / REMATE",
      tip: "Cartas de Balón Parado ganan +30%. Supera la barrera para encarar al portero."
    };
    m.targetThreshold = p.isYouth ? 11.2 : (divObj.skillMin * 2.4 + 6.5);
    m.hand = [];
    drawCards(p.form >= 6 ? 4 : 3);
  } else if (r < 0.54) {
    m.momentType = "defense";
    m.phase = "cards";
    const att = m.roster.attackers[Math.floor(Math.random() * m.roster.attackers.length)];
    m.duelActor = {
      name: `${att.name} (${att.pos})`,
      traitLabel: `TÁCTICA RIVAL: ${m.oppTacticObj.short}`,
      tip: "Usa cartas de Defensa o Presión para frenar su avance.",
      bonusTypes: ["Defensa", "Físico"]
    };
    m.targetThreshold = p.isYouth ? 10.5 : (divObj.skillMin * 2.3 + 5.8);
    m.hand = [];
    drawCards(p.form >= 6 ? 4 : 3);
  } else {
    m.momentType = "attack";
    m.phase = "cards";
    const def = m.roster.defenders[Math.floor(Math.random() * m.roster.defenders.length)];
    const traitDesc = def.trait === "slow"
      ? "Central Lento: Desborde y Físico ganan +25%."
      : "Marcaje Férreo: Asociación y Construcción ganan +25%.";
    m.duelActor = {
      name: `${def.name} (DEF ${def.defensa.toFixed(1)})`,
      traitLabel: def.trait === "slow" ? "LENTO AL GIRO" : "MARCAJE FÉRREO",
      tip: `${traitDesc} · Tu táctica: ${m.myTacticObj.short}.`,
      bonusTypes: def.trait === "slow" ? ["Desborde", "Físico"] : ["Asociación", "Construcción"]
    };
    m.targetThreshold = p.isYouth ? 11.4 : (def.defensa * 2.45 + 6.2);
    m.hand = [];
    drawCards(p.form >= 6 ? 4 : 3);
  }

  renderMatchUI();
}

function getEffectiveCardCost(cardObj) {
  const m = state.match;
  const tpl = CARD_TEMPLATES[cardObj.templateId];
  let cost = tpl.cost;
  if (m.sequence.length > 0) {
    const prevTpl = CARD_TEMPLATES[m.sequence[m.sequence.length - 1].templateId];
    if (prevTpl.effect === "discountNext") {
      cost = Math.max(0, cost - 1);
    }
  }
  return cost;
}

function calculateSequencePreview() {
  const m = state.match;
  const p = state.player;
  const jugadasLvl = p.skills.jugadas || 0;

  let total = 0;
  let comboStep = 0;
  let boostNextShot = false;

  m.sequence.forEach(cardObj => {
    const tpl = CARD_TEMPLATES[cardObj.templateId];
    let val = computeCardPower(cardObj);

    if (m.myTacticObj) {
      if (m.myTacticObj.bonusCardTypes.includes(tpl.type)) val *= 1.22;
      if (m.myTacticObj.penaltyCardTypes.includes(tpl.type)) val *= 0.85;
    }

    if (m.duelActor && m.duelActor.bonusTypes && m.duelActor.bonusTypes.includes(tpl.type)) {
      val *= 1.25;
    }
    if (m.momentType === "setpiece" && tpl.type === "Balón Parado") {
      val *= 1.30;
    }
    if (boostNextShot && tpl.type === "Remate") {
      val *= 1.22;
      boostNextShot = false;
    }

    const techBonus = (p.specialtyRevealed && p.specialty === "technical") ? 0.12 : 0;
    let mult = 1.0;
    if (comboStep === 1) mult = 1.06 + jugadasLvl * 0.02 + techBonus;
    else if (comboStep >= 2) mult = 1.15 + jugadasLvl * 0.03 + techBonus;

    total += val * mult;
    comboStep += (tpl.effect === "doubleCombo" ? 2 : 1);
    if (tpl.effect === "boostShot") boostNextShot = true;
  });

  if (m.sequence.length > 0) {
    total += Math.floor(p.exp) * 0.30;
  }

  const formMult = 0.82 + (p.form / 10) * 0.25;
  total *= formMult;

  const finalMult = comboStep <= 1 ? 1.0 : (comboStep === 2 ? (1.06 + jugadasLvl * 0.02) : (1.15 + jugadasLvl * 0.03));
  return { total, mult: finalMult };
}

function playCardFromHand(uid) {
  const m = state.match;
  if (m.phase !== "cards" || m.sequence.length >= 3) return;
  const idx = m.hand.findIndex(c => c.uid === uid);
  if (idx === -1) return;
  const cardObj = m.hand[idx];
  const cost = getEffectiveCardCost(cardObj);
  if (m.stamina < cost) return;

  m.stamina -= cost;
  m.hand.splice(idx, 1);
  m.sequence.push(cardObj);

  if (CARD_TEMPLATES[cardObj.templateId].effect === "draw1") {
    drawCards(1);
  }
  renderMatchUI();
}

function removeCardFromSequence(seqIdx) {
  const m = state.match;
  if (m.phase !== "cards" || seqIdx < 0 || seqIdx >= m.sequence.length) return;
  const returned = m.sequence.splice(seqIdx);
  returned.forEach(c => m.hand.push(c));

  const tempSeq = [...m.sequence];
  m.sequence = [];
  let spent = 0;
  tempSeq.forEach(c => {
    spent += getEffectiveCardCost(c);
    m.sequence.push(c);
  });
  m.stamina = Math.max(0, m.maxStamina - spent);
  renderMatchUI();
}

function renderMatchUI() {
  const m = state.match;
  const p = state.player;

  document.getElementById("m-comp").textContent = p.isYouth ? `JUVENILES · SEM. ${p.youthWeek}/5` : `JORNADA ${p.week} · [${m.myTacticObj.short} vs ${m.oppTacticObj.short}]`;
  document.getElementById("m-teams").textContent = `${p.club} vs. ${m.rivalName}`;
  document.getElementById("m-score").textContent = `${m.myGoals} - ${m.rivalGoals}`;
  document.getElementById("m-moment-count").textContent = `Momento ${m.momentIndex}/${m.momentsTotal} ${m.matchYellows > 0 ? "🟨" : ""}`;

  const tagEl = document.getElementById("m-moment-tag");
  tagEl.className = "moment-tag";
  const meterBox = document.getElementById("m-meter-box");
  const middleArea = document.getElementById("m-middle-area");
  const bottomArea = document.getElementById("m-bottom-area");

  if (m.phase === "penalty_kick") {
    tagEl.classList.add("pen");
    tagEl.textContent = `MIN ${m.minute}' · ¡PENALTI!`;
    meterBox.style.display = "none";

    middleArea.innerHTML = `
      <div class="opponent-duel-card" style="border-color:var(--red);">
        ${renderSprite("duel_pen", 68)}
        <div style="flex:1;">
          <div class="opp-header">
            <strong style="font-size:13px;">${m.roster.gk.name} (POR ${m.roster.gk.porteria.toFixed(1)})</strong>
            <span class="opp-trait-badge">BP ${Math.floor(p.skills.balonParado)}</span>
          </div>
          <div class="opp-tip" style="color:#FFF;">Duelo desde los once metros. Elige dónde colocar el disparo.</div>
        </div>
      </div>
      <div class="scenario-desc">Tu <strong>Balón Parado</strong>, <strong>Anotación</strong> y <strong>Experiencia</strong> deciden el lanzamiento.</div>
    `;
    bottomArea.innerHTML = `
      <div class="duel-choice-panel">
        <div style="font-size:10px; font-weight:900; text-align:center; color:var(--ink-muted);">LANZAMIENTO DE PENALTI</div>
        <div class="duel-choice-grid">
          <button class="duel-choice-btn" onclick="resolvePenalty('left')"><span style="font-size:20px;">⬅️</span><strong style="font-size:12px;">Izquierda</strong></button>
          <button class="duel-choice-btn" onclick="resolvePenalty('center')"><span style="font-size:20px;">🎯</span><strong style="font-size:12px;">Centro</strong></button>
          <button class="duel-choice-btn" onclick="resolvePenalty('right')"><span style="font-size:20px;">➡️</span><strong style="font-size:12px;">Derecha</strong></button>
        </div>
      </div>
    `;
    return;
  }

  if (m.phase === "gk_duel") {
    tagEl.textContent = `MIN ${m.minute}' · ¡FRENTE AL ARQUERO!`;
    meterBox.style.display = "none";

    middleArea.innerHTML = `
      <div class="opponent-duel-card" style="border-color:var(--green);">
        ${renderSprite("duel_gk", 68)}
        <div style="flex:1;">
          <div class="opp-header">
            <strong style="font-size:13px; color:#6EE7B7;">¡Superado! (+${m.surplusPts.toFixed(1)} pts)</strong>
            <span class="opp-trait-badge" style="background:var(--green);">POR ${m.roster.gk.porteria.toFixed(1)}</span>
          </div>
          <div class="opp-tip" style="color:#FFF;">${m.roster.gk.name} achica espacios. Elige cómo definir:</div>
        </div>
      </div>
      <div class="scenario-desc">El portero intentará adivinar tu palo. Tu <strong>Anotación / Balón Parado</strong> debe superar su parada.</div>
    `;
    bottomArea.innerHTML = `
      <div class="duel-choice-panel">
        <div style="font-size:10px; font-weight:900; text-align:center; color:var(--ink-muted);">DEFINICIÓN ANTE EL ARQUERO</div>
        <div class="duel-choice-grid">
          <button class="duel-choice-btn" onclick="resolveGkDuel('finesse')"><span style="font-size:20px;">🎯</span><strong style="font-size:12px;">Colocada</strong><span style="font-size:10px; color:var(--ink-muted);">ANO + JUG</span></button>
          <button class="duel-choice-btn" onclick="resolveGkDuel('power')"><span style="font-size:20px;">💥</span><strong style="font-size:12px;">Potente</strong><span style="font-size:10px; color:var(--ink-muted);">ANO + LAT</span></button>
          <button class="duel-choice-btn" onclick="resolveGkDuel('bp')"><span style="font-size:20px;">📐</span><strong style="font-size:12px;">Con Efecto</strong><span style="font-size:10px; color:var(--ink-muted);">BP + PAS</span></button>
        </div>
      </div>
    `;
    return;
  }

  if (m.phase === "def_box") {
    tagEl.classList.add("def");
    tagEl.textContent = `MIN ${m.minute}' · ¡EN TU ÁREA!`;
    meterBox.style.display = "none";

    middleArea.innerHTML = `
      <div class="opponent-duel-card" style="border-color:var(--red);">
        ${renderSprite("duel_def", 68)}
        <div style="flex:1;">
          <div class="opp-header">
            <strong style="font-size:13px; color:#FCA5A5;">El rival pisa tu área</strong>
            <span class="opp-trait-badge">DEF ${Math.floor(p.skills.defensa)}</span>
          </div>
          <div class="opp-tip" style="color:#FFF;">El <strong>Corte duro</strong> es más potente pero tiene mayor riesgo de tarjeta.</div>
        </div>
      </div>
      <div class="scenario-desc">Decide si arriesgas con entrada al corte o tapas ángulo con cabeza fría.</div>
    `;
    bottomArea.innerHTML = `
      <div class="duel-choice-panel">
        <div style="font-size:10px; font-weight:900; text-align:center; color:var(--ink-muted);">ACCIÓN DEFENSIVA</div>
        <div class="duel-choice-grid">
          <button class="duel-choice-btn" onclick="resolveDefBox('tackle')"><span style="font-size:20px;">🛡️</span><strong style="font-size:12px;">Corte Duro</strong><span style="font-size:10px; color:var(--red);">DEF (Riesgo 🟨)</span></button>
          <button class="duel-choice-btn" onclick="resolveDefBox('cover')"><span style="font-size:20px;">⚡</span><strong style="font-size:12px;">Cobertura</strong><span style="font-size:10px; color:var(--ink-muted);">LAT + DEF</span></button>
          <button class="duel-choice-btn" onclick="resolveDefBox('read')"><span style="font-size:20px;">🧠</span><strong style="font-size:12px;">Tapar Línea</strong><span style="font-size:10px; color:var(--ink-muted);">JUG + EXP</span></button>
        </div>
      </div>
    `;
    return;
  }

  meterBox.style.display = "block";
  let sceneKey = "duel_att";
  if (m.momentType === "defense") {
    tagEl.classList.add("def");
    sceneKey = "duel_def";
  } else if (m.momentType === "setpiece") {
    tagEl.classList.add("setpiece");
    sceneKey = "act_freekick";
  }
  tagEl.textContent = `MIN ${m.minute}' · ${m.momentType === "defense" ? "DEFENSA" : (m.momentType === "setpiece" ? "BALÓN PARADO" : "ATAQUE")}`;

  const preview = calculateSequencePreview();
  document.getElementById("m-current-pts").textContent = `Jugada: ${preview.total.toFixed(1)} pts`;
  document.getElementById("m-target-pts").textContent = `Objetivo: ${m.targetThreshold.toFixed(1)} pts`;

  const maxBar = m.targetThreshold * 1.35;
  const fillPct = Math.min(100, (preview.total / maxBar) * 100);
  const targetPct = Math.min(95, (m.targetThreshold / maxBar) * 100);

  const fillEl = document.getElementById("m-meter-fill");
  fillEl.style.width = `${fillPct}%`;
  fillEl.classList.toggle("success", preview.total >= m.targetThreshold);
  document.getElementById("m-target-line").style.left = `${targetPct}%`;

  document.getElementById("m-stamina").textContent = `⚡ Estamina: ${m.stamina} / ${m.maxStamina}`;
  document.getElementById("m-combo-mult").textContent = `Combo: x${preview.mult.toFixed(2)}`;

  const renderSlot = (i) => {
    if (m.sequence[i]) {
      const c = m.sequence[i];
      const tpl = CARD_TEMPLATES[c.templateId];
      return `
        <div class="combo-slot" onclick="removeCardFromSequence(${i})">
          <div style="font-size:8px; font-weight:900; color:var(--amber);">TOQUE ${i + 1}</div>
          ${renderSprite(tpl.icon, 32)}
          <div style="font-size:9.5px; font-weight:900; line-height:1.1;">${tpl.name}</div>
        </div>
      `;
    }
    return `<div class="combo-slot empty">Toque ${i + 1}</div>`;
  };

  middleArea.innerHTML = `
    <div class="opponent-duel-card">
      ${renderSprite(sceneKey, 64)}
      <div style="flex:1; min-width:0;">
        <div class="opp-header">
          <strong style="font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${m.duelActor.name}</strong>
          <span class="opp-trait-badge">${m.duelActor.traitLabel}</span>
        </div>
        <div class="opp-tip">${m.duelActor.tip}</div>
      </div>
    </div>
    <div class="combo-board">
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span style="font-size:10px; font-weight:900; color:var(--ink-muted);">Pizarra de jugada</span>
        <span class="mono" style="font-size:11px;">Nota: ${m.note.toFixed(1)}</span>
      </div>
      <div class="combo-slots">
        ${renderSlot(0)}
        <span class="combo-arrow">→</span>
        ${renderSlot(1)}
        <span class="combo-arrow">→</span>
        ${renderSlot(2)}
      </div>
      <div class="combo-hint" style="color:${preview.total >= m.targetThreshold ? "var(--green)" : "var(--ink)"};">
        ${preview.total >= m.targetThreshold ? "✅ Supera el umbral táctico" : "Encadena 2 o 3 cartas del carril inferior"}
      </div>
    </div>
  `;

  const handHtml = m.hand.map(c => {
    const tpl = CARD_TEMPLATES[c.templateId];
    const effCost = getEffectiveCardCost(c);
    const canPlay = m.stamina >= effCost && m.sequence.length < 3;
    const isSyn = (m.duelActor && m.duelActor.bonusTypes && m.duelActor.bonusTypes.includes(tpl.type)) ||
                  (m.momentType === "setpiece" && tpl.type === "Balón Parado") ||
                  (m.myTacticObj && m.myTacticObj.bonusCardTypes.includes(tpl.type));
    const pwr = computeCardPower(c).toFixed(1);

    return `
      <div class="hand-card ${canPlay ? "" : "disabled"} ${tpl.curse ? "curse" : (tpl.signature ? "signature" : "")} ${isSyn ? "synergy" : ""}" onclick="playCardFromHand('${c.uid}')">
        <div>
          <div class="hand-card-header">
            <span class="cost-badge">⚡ ${effCost}</span>
            <span class="info-mini-btn" onclick="event.stopPropagation(); inspectCard('${c.uid}')">i</span>
          </div>
          <div class="card-art-wrap" style="margin:2px 0 4px 0;">${renderSprite(tpl.icon, 54)}</div>
          <div style="font-size:12px; font-weight:900; line-height:1.15; margin-bottom:2px;">${tpl.name}</div>
          <span class="card-type-tag">${tpl.type} ${isSyn ? "★" : ""}</span>
        </div>
        <div>
          <div class="card-power">${tpl.curse ? "Lastre" : "+" + pwr + " pts"}</div>
          <div style="font-size:9.5px; color:var(--ink-muted); line-height:1.2;">${tpl.desc}</div>
        </div>
      </div>
    `;
  }).join("");

  bottomArea.innerHTML = `
    <div style="padding:0 12px 4px 12px; display:flex; justify-content:space-between; font-size:10px; font-weight:800; color:var(--ink-muted);">
      <span>MANO (★ = VENTAJA TÁCTICA)</span>
      <span>Mazo: ${m.drawPile.length}</span>
    </div>
    <div class="hand-rail">${handHtml}</div>
    <div class="match-controls">
      <button class="btn-secondary" onclick="skipMoment()">Pasar</button>
      <button class="btn-primary" style="padding:11px 12px; font-size:14px;" onclick="executeSequence()">Ejecutar Jugada</button>
    </div>
  `;
}

function skipMoment() {
  const m = state.match;
  if (m.momentType === "defense") {
    m.phase = "def_box";
    renderMatchUI();
    return;
  }
  showMomentOutcome("Jugada conservadora", "Mantienes el balón sin arriesgar.", "var(--amber)");
}

function evaluateCardBooking(riskBase) {
  const m = state.match;
  const p = state.player;
  if (p.isYouth) return null;

  let prob = riskBase;
  if (p.character < 45) prob += 0.12;
  if (p.condition <= 4) prob += 0.12;
  if (p.specialtyRevealed && p.specialty === "composed") prob *= 0.65;

  if (Math.random() < prob) {
    m.matchYellows += 1;
    p.yellowCards += 1;
    if (m.matchYellows >= 2) {
      m.sentOff = true;
      p.redCardsTotal += 1;
      p.suspendedWeeks = 1;
      p.yellowCards = Math.max(0, p.yellowCards - 2);
      return "🟥 ¡SEGUNDA AMARILLA Y EXPULSIÓN! Te vas a la ducha antes de tiempo y cumplirás 1 partido de sanción.";
    }
    return `🟨 Tarjeta amarilla vista en la acción (Acumuladas en liga: ${p.yellowCards}/3).`;
  }
  return null;
}

function executeSequence() {
  const m = state.match;
  const p = state.player;
  if (m.sequence.length === 0) { skipMoment(); return; }

  const preview = calculateSequencePreview();
  const compBonus = (p.specialtyRevealed && p.specialty === "composed") ? 0.06 : 0;
  const isCrit = Math.random() < (p.skills.jugadas * 0.015 + p.exp * 0.01 + compBonus);
  const finalPts = isCrit ? preview.total * 1.22 : preview.total;

  let usedRiskyTackle = false;
  m.sequence.forEach(c => {
    const tpl = CARD_TEMPLATES[c.templateId];
    if (tpl.skill && !tpl.curse) addSkillPe(tpl.skill, 0.45);
    if (tpl.effect === "purgeSelfTemp") removeCurseCard("nervios");
    if (tpl.effect === "coachLove") m.note = Math.min(10, m.note + 0.3);
    if (tpl.effect === "gkEdge") m.hasGkEdgeCard = true;
    if (tpl.effect === "riskyTackle") usedRiskyTackle = true;
  });

  if (m.momentType === "defense") {
    if (finalPts >= m.targetThreshold) {
      m.note = Math.min(10, m.note + 0.75);
      addSkillPe("defensa", 0.55);
      const bookMsg = usedRiskyTackle ? evaluateCardBooking(0.10) : null;
      const caBonusTxt = (m.myTacticObj.id === "ca") ? "<br>⚡ <em>¡Contragolpe activado por táctica!</em>" : "";
      showMomentOutcome(
        "¡Robo limpio!",
        `Cortaste el avance rival (${finalPts.toFixed(1)} vs ${m.targetThreshold.toFixed(1)}).` + caBonusTxt + (bookMsg ? `<br><br><strong>${bookMsg}</strong>` : ""),
        bookMsg ? "var(--amber)" : "var(--green)"
      );
    } else {
      m.phase = "def_box";
      renderMatchUI();
    }
    return;
  }

  if (finalPts >= m.targetThreshold) {
    m.surplusPts = Math.min(4.5, (finalPts - m.targetThreshold) * 0.75) + (isCrit ? 1.5 : 0);
    m.phase = "gk_duel";
    renderMatchUI();
  } else {
    m.note = Math.max(3.5, m.note - 0.45);
    showMomentOutcome("Frenado por el rival", `No superaste la línea defensiva (${finalPts.toFixed(1)} vs ${m.targetThreshold.toFixed(1)}).`, "var(--red)");
  }
}

function resolveGkDuel(choice) {
  const m = state.match;
  const p = state.player;
  const gkSkill = m.roster.gk.porteria || 5;

  // Duelo de arquero más realista: el portero adivina 1 de 3 opciones y tiene base sólida
  const gkGuess = ["finesse", "power", "bp"][Math.floor(Math.random() * 3)];
  const gkGuessedRight = (choice === gkGuess);

  let myAttack = m.surplusPts * 0.65 + Math.floor(p.exp) * 0.25;
  if (choice === "finesse") myAttack += p.skills.anotacion * 0.95 + p.skills.jugadas * 0.45;
  else if (choice === "power") {
    const powMult = (p.specialtyRevealed && p.specialty === "powerful") ? 1.20 : 1.0;
    myAttack += (p.skills.anotacion * 1.0 + p.skills.lateral * 0.50) * powMult;
  } else {
    myAttack += p.skills.balonParado * 1.05 + p.skills.pases * 0.45;
  }

  if (m.hasGkEdgeCard) myAttack += 1.4;
  if (p.specialtyRevealed && p.specialty === "composed") myAttack += 1.1;

  const gkPower = gkSkill * 1.85 + (gkGuessedRight ? 2.4 : 0.0) + (Math.random() * 2.6 - 1.0);

  if (myAttack >= gkPower) {
    m.myGoals += 1;
    m.goalsScored += 1;
    m.note = Math.min(10, m.note + 1.15);
    addSkillPe("anotacion", 0.65);
    showMomentOutcome("¡GOOOL!", `Superaste al guardameta (${myAttack.toFixed(1)} vs ${gkPower.toFixed(1)}).`, "var(--green)");
  } else if (myAttack >= gkPower * 0.84) {
    m.note = Math.min(10, m.note + 0.20);
    showMomentOutcome("¡Paradón del portero!", `${gkGuessedRight ? "Adivinó tu intención y " : ""}desvió el disparo (${myAttack.toFixed(1)} vs ${gkPower.toFixed(1)}).`, "var(--amber)");
  } else {
    m.note = Math.max(3.5, m.note - 0.35);
    showMomentOutcome("Remate detenido", `El portero atrapó sin problemas (${myAttack.toFixed(1)} vs ${gkPower.toFixed(1)}).`, "var(--red)");
  }
}

function resolveDefBox(choice) {
  const m = state.match;
  const p = state.player;
  let defVal = p.skills.defensa * 1.05 + p.exp * 0.40;
  let cardRisk = 0.04;

  if (choice === "tackle") {
    defVal *= 1.16;
    cardRisk = 0.24;
  } else if (choice === "cover") {
    defVal += p.skills.lateral * 0.65;
    cardRisk = 0.09;
  } else {
    defVal += p.skills.jugadas * 0.65;
    cardRisk = 0.02;
  }

  if (p.specialtyRevealed && p.specialty === "powerful" && choice === "tackle") defVal *= 1.20;

  const bookMsg = evaluateCardBooking(cardRisk);
  const need = m.targetThreshold * 0.56;

  if (defVal >= need) {
    m.note = Math.min(10, m.note + 0.75);
    addSkillPe("defensa", 0.60);
    showMomentOutcome(
      "¡Salvador en el área!",
      "Evitaste el remate franco del rival." + (bookMsg ? `<br><br><strong>${bookMsg}</strong>` : ""),
      bookMsg ? "var(--amber)" : "var(--green)"
    );
  } else {
    m.rivalGoals += 1;
    m.note = Math.max(3.5, m.note - 0.6);
    showMomentOutcome(
      "Gol rival",
      "El delantero superó la última línea y marcó." + (bookMsg ? `<br><br><strong>${bookMsg}</strong>` : ""),
      "var(--red)"
    );
  }
}

function resolvePenalty(side) {
  const m = state.match;
  const p = state.player;
  const gkSkill = m.roster.gk.porteria || 5;
  const gkSide = ["left", "center", "right"][Math.floor(Math.random() * 3)];
  const compChance = (p.specialtyRevealed && p.specialty === "composed") ? 0.20 : 0.06;
  const fooled = (side !== gkSide) || (Math.random() < compChance + p.exp * 0.01);
  const kick = (side === "center" ? p.skills.jugadas + p.skills.balonParado : p.skills.anotacion + p.skills.balonParado) + (fooled ? 4.2 : 0);

  if (kick >= gkSkill * 1.35) {
    m.myGoals += 1;
    m.goalsScored += 1;
    m.note = Math.min(10, m.note + 1.1);
    addSkillPe("balonParado", 0.65);
    showMomentOutcome("¡GOL DE PENALTI!", fooled ? "Engañaste al guardameta." : "Golpeo firme que superó al portero.", "var(--green)");
  } else {
    m.note = Math.max(3.5, m.note - 0.85);
    showMomentOutcome("¡Penalti detenido!", "El portero adivinó el lanzamiento.", "var(--red)");
  }
}

function showMomentOutcome(headline, detail, badgeColor) {
  const m = state.match;
  const isLast = m.sentOff || (m.momentIndex >= m.momentsTotal);

  openModal(`
    <span class="stamp-badge" style="border-color:${badgeColor}; color:${badgeColor};">MINUTO ${m.minute}'</span>
    <h3 class="press-title" style="margin:8px 0 6px 0; font-size:21px;">${headline}</h3>
    <p style="font-size:13px; line-height:1.4; margin:0 0 13px 0;">${detail}</p>
    <div style="background:var(--paper-dark); padding:8px 10px; border-radius:6px; font-size:12px; margin-bottom:13px; display:flex; justify-content:space-between;">
      <span>Marcador: <strong>${m.myGoals} - ${m.rivalGoals}</strong></span>
      <span>Nota: <strong>${m.note.toFixed(1)}</strong></span>
    </div>
    <button class="btn-primary" onclick="${isLast ? "finishMatch()" : "continueMatch()"}">
      ${isLast ? "Pitido Final →" : "Siguiente Momento →"}
    </button>
  `, true);
}

function continueMatch() {
  closeModal();
  setupNextMoment();
}

// ----------------------------------------------------------------------------
// CIERRE DE PARTIDO, BECA DE CANTERA Y FIN DE TEMPORADA
// ----------------------------------------------------------------------------

function simulateRoundFixtures(myRivalName, myGoals, rivalGoals) {
  const roundIdx = Math.min(state.fixtures.length - 1, Math.max(0, state.player.week - 1));
  const roundPairs = state.fixtures[roundIdx] || [];
  const myIdx = state.league.findIndex(t => t.isMe);

  roundPairs.forEach(([hIdx, aIdx]) => {
    const tH = state.league[hIdx];
    const tA = state.league[aIdx];
    let gH = 0, gA = 0;

    if (hIdx === myIdx) {
      gH = myGoals;
      gA = rivalGoals;
    } else if (aIdx === myIdx) {
      gH = rivalGoals;
      gA = myGoals;
    } else {
      const diff = (tH.roster.zoneMid + tH.roster.zoneAtt - tH.roster.zoneDef) - (tA.roster.zoneMid + tA.roster.zoneAtt - tA.roster.zoneDef) + 1.5;
      gH = Math.max(0, Math.round((1.0 + diff * 0.12) * Math.random() * 1.35));
      gA = Math.max(0, Math.round((0.9 - diff * 0.08) * Math.random() * 1.25));
    }

    tH.pj += 1; tA.pj += 1;
    tH.gf += gH; tH.gc += gA;
    tA.gf += gA; tA.gc += gH;
    if (gH > gA) { tH.pts += 3; tH.pg += 1; tA.pp += 1; }
    else if (gA > gH) { tA.pts += 3; tA.pg += 1; tH.pp += 1; }
    else { tH.pts += 1; tA.pts += 1; tH.pe += 1; tA.pe += 1; }

    if (!tH.isMe && gH > 0) {
      const sc = state.scorers.find(s => s.club === tH.name && !s.isMe);
      if (sc && Math.random() < 0.60) sc.goals += Math.min(2, gH);
    }
    if (!tA.isMe && gA > 0) {
      const sc = state.scorers.find(s => s.club === tA.name && !s.isMe);
      if (sc && Math.random() < 0.60) sc.goals += Math.min(2, gA);
    }
  });
}

function applyAnnualAgeDecline() {
  const p = state.player;
  if (p.age < 28) return [];

  const losses = [];
  SKILL_DEFS.forEach(sd => {
    if (p.age >= sd.declineAge) {
      let drop = sd.decay[0];
      if (p.age >= 34) drop = sd.decay[2];
      else if (p.age >= 31) drop = sd.decay[1];

      if (drop > 0) {
        const before = Math.floor(p.skills[sd.key]);
        p.skills[sd.key] = Math.max(1.0, p.skills[sd.key] - drop);
        const after = Math.floor(p.skills[sd.key]);
        if (after < before) {
          losses.push(`${sd.label} bajó a ${after}`);
        }
      }
    }
  });

  if (p.age >= 29) {
    p.condition = Math.max(3, p.condition - 1);
  }
  return losses;
}

function rollPostMatchInjury() {
  const p = state.player;
  if (p.isYouth) return null;

  const riskPct = computeInjuryRiskPercent();
  if (Math.random() * 100 >= riskPct) return null;

  const severityRoll = Math.random();
  if (severityRoll < 0.62) {
    p.injuryWeeks = 1;
    p.injuryName = "Sobrecarga en el isquiotibial";
  } else if (severityRoll < 0.90) {
    p.injuryWeeks = 2;
    p.injuryName = "Esguince de tobillo grado II";
  } else {
    p.injuryWeeks = 4;
    p.injuryName = "Rotura fibrilar en el cuádriceps";
  }
  p.form = Math.max(2, p.form - 2);
  state.press.unshift({
    title: `Parte médico: ${p.name}, baja por ${p.injuryName}`,
    body: `Los servicios médicos estiman ${p.injuryWeeks} jornada(s) de recuperación.`
  });
  return `🏥 ¡LESIÓN! ${p.injuryName} (${p.injuryWeeks} jornada(s) de baja).`;
}

function handleEndOfSeason() {
  const p = state.player;
  const sorted = [...state.league].sort((a, b) => (b.pts - a.pts) || ((b.gf - b.gc) - (a.gf - a.gc)));
  const rank = sorted.findIndex(t => t.isMe) + 1;

  const sortedScorers = [...state.scorers].sort((a, b) => b.goals - a.goals);
  let goldenBootNote = "";
  if (sortedScorers.length > 0 && sortedScorers[0].isMe && sortedScorers[0].goals >= 5) {
    p.goldenBoots += 1;
    p.exp = Math.min(20.9, p.exp + 0.6);
    goldenBootNote = `🥇 ¡MÁXIMO GOLEADOR DE LA LIGA (${sortedScorers[0].goals} goles)! `;
    state.press.unshift({
      title: `🥇 ${p.name} se corona Máximo Goleador de ${getDivObj(p.div).name}`,
      body: `Con ${sortedScorers[0].goals} tantos en 14 jornadas, su valor de mercado se dispara.`
    });
  }

  p.season += 1;
  p.week = 1;
  p.age += 1;
  p.yellowCards = 0;
  const decaySummary = applyAnnualAgeDecline();

  if (p.isOnLoan && p.parentClub) {
    p.isOnLoan = false;
    p.club = p.parentClub;
    p.div = p.parentDiv;
    p.country = p.parentCountry || p.country;
    p.parentClub = null;
    p.parentDiv = null;
    p.role = "Canterano Suplente";
    p.wage = Math.round(getDivObj(p.div).wageBase * 0.85);
    initLeague(p.div, p.club);
    state.press.unshift({
      title: `🔄 Fin de cesión: ${p.name} regresa a ${p.club}`,
      body: `Tras foguearse una temporada fuera, se incorpora a la plantilla de ${getDivObj(p.div).name}.`
    });
    return { decaySummary, extraNote: goldenBootNote + `Regresas de tu cesión a ${p.club} (${getDivObj(p.div).name}).` };
  }

  if (rank === 1 && p.div > 1) {
    p.div -= 1;
    p.wage = Math.round(getDivObj(p.div).wageBase * 0.95);
    initLeague(p.div, p.club);
    return { decaySummary, extraNote: goldenBootNote + `🏆 ¡CAMPEONES Y ASCENSO a ${getDivObj(p.div).name}!` };
  }

  initLeague(p.div, p.club);
  return { decaySummary, extraNote: goldenBootNote + `Nueva temporada (Temp. ${p.season}) con ${p.age} años.` };
}

function finishMatch() {
  closeModal();
  document.getElementById("match-overlay").classList.remove("active");

  const m = state.match;
  const p = state.player;
  const cObj = getCountryObj();

  if (Math.random() < 0.22) m.myGoals += 1;
  if (Math.random() < 0.28) m.rivalGoals += 1;

  p.matchesPlayed += 1;
  p.goals += m.goalsScored;
  p.seasonGoals += m.goalsScored;
  p.ratingSum += m.note;
  p.exp = Math.min(20.9, p.exp + (p.isYouth ? 0.25 : 0.45));

  const myScorerEntry = state.scorers.find(s => s.isMe);
  if (myScorerEntry) myScorerEntry.goals = p.seasonGoals;

  const isMvp = !p.isYouth && (m.note >= 8.0 || (m.goalsScored >= 2 && m.myGoals > m.rivalGoals));
  if (isMvp) {
    p.mvpCount += 1;
    p.form = Math.min(10, p.form + 1);
  }

  let trainingReport = "";
  const blue = state.blueSlot;
  if (blue) {
    if (blue.id === "blue_cond") {
      p.condition = Math.min(10, p.condition + 2);
      p.form = Math.min(10, p.form + 1);
      p.overloadWeeks = 0;
      addSkillPe("defensa", 1.5);
      trainingReport = "Entreno de Condición: +2 Condición y +1 Forma.";
    } else {
      const ageMult = getAgeTrainingFactor(p.age);
      const staffMult = getStaffMultiplier();
      const noteBonus = m.note >= 7.5 ? 1.10 : 1.0;
      const totalPe = 6.5 * ageMult * staffMult * noteBonus;
      const ups = addSkillPe(blue.primarySkill, totalPe);
      if (blue.secondarySkill) addSkillPe(blue.secondarySkill, 1.2 * ageMult);
      p.overloadWeeks += 1;
      const sLabel = SKILL_DEFS.find(s => s.key === blue.primarySkill).label;
      trainingReport = `${blue.name}: +${totalPe.toFixed(1)} PE en ${sLabel}` + (ups > 0 ? ` (¡SUBE A NIVEL ${Math.floor(p.skills[blue.primarySkill])}!)` : ".");
    }
  }

  p.condition = Math.max(1, p.condition - 1);
  if (m.note >= 7.0) p.form = Math.min(10, p.form + 1);
  else if (m.note < 5.2) p.form = Math.max(1, p.form - 1);

  let suspensionAlert = "";
  if (!p.isYouth && p.yellowCards >= 3) {
    p.yellowCards = 0;
    p.suspendedWeeks = Math.max(p.suspendedWeeks, 1);
    suspensionAlert = "🟨🟨🟨 ¡3ª AMARILLA! Cumplirás 1 partido de sanción la próxima jornada.";
  } else if (m.sentOff) {
    suspensionAlert = "🟥 Expulsado: cumplirás 1 partido de sanción la próxima jornada.";
  }

  const injuryAlert = rollPostMatchInjury();
  const newSigs = checkSignatureUnlocks();
  let decaySummary = [];
  let seasonExtraNote = "";

  if (p.isYouth) {
    if (p.youthWeek === 1) {
      if (p.skills.anotacion >= p.skills.jugadas && p.skills.anotacion >= p.skills.lateral) p.pos = "DEL";
      else if (p.skills.lateral > p.skills.jugadas) p.pos = "EXT";
      else p.pos = "MED";
    }

    const triggerBonus = (!p.youthBonusClaimed) && (p.youthWeek === 2);
    const canReveal = (!p.specialtyRevealed) && (p.youthWeek >= 3) && (p.youthWeek === 5 || Math.random() < 0.55);

    if (p.youthWeek < p.youthMaxWeeks) {
      p.youthWeek += 1;
      p.days = (p.days + 7) % 28;
      saveGame();
      updateTopBar();
      renderCurrentTab();

      if (triggerBonus) {
        triggerYouthBonusChoice();
        return;
      }
      if (canReveal) {
        triggerSpecialtyRoleEvent();
        return;
      }
    } else {
      p.isYouth = false;
      p.age = 16;
      p.week = 1;
      p.club = p.seniorClub;
      p.role = "Canterano Suplente";
      p.wage = getDivObj(5).wageBase;
      p.condition = 9;
      p.form = 8;
      initLeague(5, p.club);
      state.press.unshift({
        title: `¡${p.name} cumple 16 años y sube al primer equipo de ${p.club}!`,
        body: `Tras graduarse en la cantera como ${p.pos}, debutará en ${getDivObj(5).name}.`
      });
      saveGame();
      updateTopBar();
      renderCurrentTab();
    }
  } else {
    simulateRoundFixtures(m.rivalName, m.myGoals, m.rivalGoals);

    p.money += p.wage;
    if (m.note >= 7.2) p.coachTrust = Math.min(100, p.coachTrust + 10);
    if (p.role === "Canterano Suplente" && p.coachTrust >= 72) p.role = "Titular";
    if (m.note >= 7.5 || isMvp) maybeGenerateRealisticOffer(false);

    if (p.week >= p.maxWeeks) {
      const endRes = handleEndOfSeason();
      decaySummary = endRes.decaySummary;
      seasonExtraNote = endRes.extraNote;
    } else {
      p.week += 1;
    }

    saveGame();
    updateTopBar();
    renderCurrentTab();
  }

  const mktVal = computeMarketValue();

  openModal(`
    <span class="stamp-badge">ACTA DEL PARTIDO</span>
    <h3 class="press-title" style="margin:8px 0 6px 0; font-size:21px;">${p.club} ${m.myGoals} - ${m.rivalGoals} ${m.rivalName}</h3>
    ${isMvp ? `<div style="background:var(--amber-light); border:1.5px solid var(--amber); padding:6px 8px; border-radius:6px; font-size:12px; font-weight:900; color:var(--amber); margin-bottom:8px; display:flex; align-items:center; gap:8px;">${renderSprite("trophy_mvp", 44)} <span>¡ELEGIDO MVP DEL PARTIDO!</span></div>` : ""}
    ${seasonExtraNote ? `<div style="background:var(--green-light); border:1.5px solid var(--green); padding:7px 8px; border-radius:6px; font-size:12px; font-weight:800; margin-bottom:8px;">${seasonExtraNote}</div>` : ""}
    <div class="notebook-card" style="font-size:12.5px;">
      <div>Nota: <strong class="mono" style="color:var(--green);">${m.note.toFixed(1)} / 10</strong> · Goles: <strong>${m.goalsScored}</strong> · Valor: <strong>${formatMoney(mktVal)}</strong></div>
      ${!p.isYouth ? `<div>Sueldo: <strong>+${p.wage} ${cObj.currency}</strong> · EXP: <strong>${p.exp.toFixed(1)}</strong></div>` : ""}
      ${trainingReport ? `<div style="color:var(--blue); font-weight:800; margin-top:5px;">🔷 ${trainingReport}</div>` : ""}
      ${suspensionAlert ? `<div style="color:var(--amber); font-weight:800; margin-top:5px;">${suspensionAlert}</div>` : ""}
      ${injuryAlert ? `<div style="color:var(--red); font-weight:800; margin-top:5px;">${injuryAlert}</div>` : ""}
      ${newSigs.length > 0 ? `<div style="color:var(--purple); font-weight:800; margin-top:4px;">★ Nueva carta firma: ${newSigs.join(", ")}</div>` : ""}
      ${decaySummary.length > 0 ? `<div style="color:var(--red); font-weight:800; margin-top:4px;">⏳ Desgaste por edad (${p.age}a): ${decaySummary.join(", ")}</div>` : ""}
    </div>
    <button class="btn-primary" onclick="closeModal()">Continuar</button>
  `, true);
}

function triggerYouthBonusChoice() {
  openModal(`
    <span class="stamp-badge" style="border-color:var(--green); color:var(--green);">BECA DE CANTERA · 15 AÑOS</span>
    <h3 class="press-title" style="margin:8px 0 6px 0; font-size:20px;">Elige tu especialización juvenil</h3>
    <p style="font-size:13px; line-height:1.4; margin:0 0 12px 0;">
      Los técnicos de la academia te ofrecen un plan personalizado para reforzar tu juego antes de dar el salto al fútbol profesional:
    </p>
    <div class="action-option" onclick="applyYouthBonus('att')">
      <div style="display:flex; align-items:center; gap:9px;">
        ${renderSprite("blue_ano", 48)}
        <div>
          <strong style="font-size:12.5px;">Beca de Definición y Área</strong>
          <div style="font-size:11px; color:var(--green); font-weight:700;">Añade carta «Instinto de Área» + 5 PE en Anotación</div>
        </div>
      </div>
      <span>→</span>
    </div>
    <div class="action-option" onclick="applyYouthBonus('mid')">
      <div style="display:flex; align-items:center; gap:9px;">
        ${renderSprite("blue_jug", 48)}
        <div>
          <strong style="font-size:12.5px;">Beca de Pizarra y Creación</strong>
          <div style="font-size:11px; color:var(--green); font-weight:700;">Añade carta «Brújula del Mediocampo» + 5 PE en Jugadas</div>
        </div>
      </div>
      <span>→</span>
    </div>
    <div class="action-option" onclick="applyYouthBonus('def')">
      <div style="display:flex; align-items:center; gap:9px;">
        ${renderSprite("blue_def", 48)}
        <div>
          <strong style="font-size:12.5px;">Beca de Sacrificio y Cobertura</strong>
          <div style="font-size:11px; color:var(--green); font-weight:700;">Añade carta «Pulmón de Hierro» + 5 PE en Defensa</div>
        </div>
      </div>
      <span>→</span>
    </div>
  `, true);
}

function applyYouthBonus(choice) {
  const p = state.player;
  p.youthBonusClaimed = true;

  let addedName = "";
  if (choice === "att") {
    state.deck.push({ uid: "yb_att_" + Date.now(), templateId: "instinto_gol", level: 1 });
    addSkillPe("anotacion", 5.0);
    addedName = "Instinto de Área (+5 PE Anotación)";
  } else if (choice === "mid") {
    state.deck.push({ uid: "yb_mid_" + Date.now(), templateId: "brujula_medio", level: 1 });
    addSkillPe("jugadas", 5.0);
    addedName = "Brújula del Mediocampo (+5 PE Jugadas)";
  } else {
    state.deck.push({ uid: "yb_def_" + Date.now(), templateId: "pulmon_acero", level: 1 });
    addSkillPe("defensa", 5.0);
    addedName = "Pulmón de Hierro (+5 PE Defensa)";
  }

  saveGame();
  updateTopBar();
  renderCurrentTab();

  openModal(`
    <span class="stamp-badge" style="border-color:var(--purple); color:var(--purple);">CARTA AÑADIDA AL MAZO</span>
    <h3 class="press-title" style="margin:8px 0 6px 0; font-size:20px;">${addedName}</h3>
    <p style="font-size:13px; margin:0 0 14px 0;">Ya tienes esta carta especial en tu libreta de partido para los próximos encuentros.</p>
    <button class="btn-primary" onclick="closeModal()">Continuar</button>
  `, true);
}

function triggerSpecialtyRoleEvent() {
  const p = state.player;
  openModal(`
    <span class="stamp-badge" style="border-color:var(--purple); color:var(--purple);">MOMENTO DE CANTERA · ${p.age} AÑOS</span>
    <h3 class="press-title" style="margin:8px 0 6px 0; font-size:20px;">Un destello en el barro</h3>
    <p style="font-size:13px; line-height:1.42; margin:0 0 12px 0;">
      Al terminar el partido juvenil, el ojeador anota algo en su libreta tras ver cómo respondes bajo presión. ¿Qué define tu juego?
    </p>
    <div class="action-option" onclick="revealSpecialty('roll_quick')">
      <div><strong style="font-size:12.5px;">⚡ Romper espacios y velocidad</strong><div style="font-size:11px; color:var(--ink-muted);">Puede revelar Rápido o Sin Especialidad</div></div>
      <span>→</span>
    </div>
    <div class="action-option" onclick="revealSpecialty('roll_tech')">
      <div><strong style="font-size:12.5px;">🎯 Toque preciso y visión</strong><div style="font-size:11px; color:var(--ink-muted);">Puede revelar Técnico o Sin Especialidad</div></div>
      <span>→</span>
    </div>
    <div class="action-option" onclick="revealSpecialty('roll_power')">
      <div><strong style="font-size:12.5px;">💪 Fuerza, golpeo o templanza</strong><div style="font-size:11px; color:var(--ink-muted);">Puede revelar Potente, Cabeza Fría o Sin Especialidad</div></div>
      <span>→</span>
    </div>
  `, true);
}

function revealSpecialty(path) {
  const p = state.player;
  p.specialtyRevealed = true;
  if (Math.random() < 0.28) p.specialty = "none";
  else if (path === "roll_quick") p.specialty = "quick";
  else if (path === "roll_tech") p.specialty = "technical";
  else p.specialty = Math.random() < 0.5 ? "powerful" : "composed";

  const info = p.specialty === "none"
    ? { title: "Sin Especialidad (Versátil)", body: "Asimila mejor cada Carta Azul de entrenamiento (+12% PE)." }
    : SPECIALTIES.find(s => s.id === p.specialty);

  saveGame();
  updateTopBar();
  renderCurrentTab();

  openModal(`
    <span class="stamp-badge" style="border-color:var(--green); color:var(--green);">ESPECIALIDAD REVELADA</span>
    <h3 class="press-title" style="margin:8px 0 6px 0; font-size:21px;">${info.name || info.title}</h3>
    <p style="font-size:13px; line-height:1.42; margin:0 0 14px 0;">${info.desc || info.body}</p>
    <button class="btn-primary" onclick="closeModal()">Anotar en la Libreta</button>
  `, true);
}

function openModal(html, centered = false) {
  const backdrop = document.getElementById("modal-backdrop");
  const sheet = document.getElementById("modal-sheet");
  sheet.innerHTML = html;
  backdrop.classList.toggle("modal-center", centered);
  backdrop.classList.add("active");
}

function closeModal() {
  document.getElementById("modal-backdrop").classList.remove("active");
}

function closeModalOnBg(e) {
  if (e.target.id === "modal-backdrop") closeModal();
}


// ============================================================================
// v.0.1.10 — RASGOS DE IDENTIDAD DEL JUGADOR Y RESPALDO DE PARTIDA (SOBRE v.0.1.9)
// ============================================================================
const V10_TRAITS = {
  cazagoles:    { name: "Cazagoles de Área",          skillKey: "anotacion",   desc: "+12% eficacia en remates y definición en el área." },
  organizador:  { name: "Organizador de Juego",       skillKey: "jugadas",     desc: "+12% eficacia en visión, pases y control del ritmo." },
  carrilero:    { name: "Carrilero Eléctrico",         skillKey: "lateral",     desc: "+12% eficacia en desbordes por banda y transiciones." },
  balon_parado: { name: "Especialista a Balón Parado",  skillKey: "balonParado", desc: "+15% eficacia en faltas directas y balón parado." }
};

function ensureV10PlayerFields() {
  if (!Array.isArray(state.player.traits)) state.player.traits = [];
  if (!("activeTrait" in state.player)) state.player.activeTrait = null;
}

function checkV10TraitsUnlock() {
  ensureV10PlayerFields();
  const s = state.player.skills || {};
  for (const [key, tr] of Object.entries(V10_TRAITS)) {
    if ((s[tr.skillKey] || 0) >= 6.0 && !state.player.traits.includes(key)) {
      state.player.traits.push(key);
      if (!state.player.activeTrait) state.player.activeTrait = key;
      state.press.unshift({
        title: `Rasgo Desbloqueado: ${tr.name}`,
        body: `${state.player.name} alcanza nivel 6+ en ${tr.skillKey.toUpperCase()} y activa "${tr.name}".`
      });
    }
  }
}

function setV10ActiveTrait(key) {
  ensureV10PlayerFields();
  if (!state.player.traits.includes(key)) return;
  state.player.activeTrait = key;
  saveGame();
  renderCurrentTab();
}

function showV10TraitModal(key) {
  const tr = V10_TRAITS[key];
  if (!tr) return;
  openModal(`
    <span class="stamp-badge">Rasgo de Identidad</span>
    <h3 class="press-title" style="margin:8px 0 6px 0;">${tr.name}</h3>
    <p style="font-size:13px; line-height:1.4;">${tr.desc}</p>
    <p style="font-size:11.5px; color:var(--ink-muted);">Requisito: alcanzar nivel <strong>6.0</strong> en <strong>${tr.skillKey.toUpperCase()}</strong>.</p>
    <button class="btn-primary" onclick="closeModal()">Cerrar</button>
  `, true);
}

function openV10ExportModal() {
  saveGame();
  const raw = localStorage.getItem(STORAGE_KEY) || JSON.stringify({ player: state.player, deck: state.deck });
  const code = btoa(unescape(encodeURIComponent(raw)));
  openModal(`
    <h3 class="press-title" style="margin-top:0;">Exportar Partida (v.0.1.10)</h3>
    <p style="font-size:12px; color:var(--ink-muted);">Copia este código para guardar un respaldo externo de tu carrera:</p>
    <textarea id="v10-exp-txt" readonly style="width:100%; height:96px; font-size:10.5px; font-family:monospace; border:2px solid var(--ink); border-radius:6px; padding:7px; background:#FFFDF8;">${code}</textarea>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:10px;">
      <button class="btn-secondary" onclick="copyV10ExportCode()">Copiar Código</button>
      <button class="btn-primary" style="padding:8px; font-size:12px;" onclick="closeModal()">Cerrar</button>
    </div>
  `, true);
}

function copyV10ExportCode() {
  const ta = document.getElementById("v10-exp-txt");
  if (!ta) return;
  ta.select();
  try { navigator.clipboard.writeText(ta.value); } catch (e) {}
  alert("Código copiado al portapapeles.");
}

function openV10ImportModal() {
  openModal(`
    <h3 class="press-title" style="margin-top:0;">Importar Partida (v.0.1.10)</h3>
    <p style="font-size:12px; color:var(--ink-muted);">Pega aquí un código de respaldo exportado previamente:</p>
    <textarea id="v10-imp-txt" placeholder="Pega el código aquí..." style="width:100%; height:96px; font-size:10.5px; font-family:monospace; border:2px solid var(--ink); border-radius:6px; padding:7px; background:#FFFDF8;"></textarea>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:10px;">
      <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn-primary" style="padding:8px; font-size:12px;" onclick="confirmV10ImportCode()">Importar</button>
    </div>
  `, true);
}

function confirmV10ImportCode() {
  const ta = document.getElementById("v10-imp-txt");
  if (!ta || !ta.value.trim()) return;
  try {
    const jsonStr = decodeURIComponent(escape(atob(ta.value.trim())));
    const parsed = JSON.parse(jsonStr);
    if (!parsed || !parsed.player) throw new Error("Datos inválidos");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    closeModal();
    loadSavedGame();
    alert("Partida restaurada correctamente.");
  } catch (e) {
    alert("Código inválido o incompleto.");
  }
}

function injectV10PlayerPanels() {
  if (state.activeTab !== "player") return;
  const main = document.getElementById("main-view");
  if (!main || document.getElementById("v10-player-panels")) return;
  ensureV10PlayerFields();
  checkV10TraitsUnlock();

  const p = state.player;
  const specObj = SPECIALTIES.find(sp => sp.id === p.specialty);
  const wrap = document.createElement("div");
  wrap.id = "v10-player-panels";
  wrap.innerHTML = `
    <div class="notebook-card" style="margin-top:10px; background:var(--paper-card);">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:6px;">
        <span style="font-size:10.5px; font-weight:900; text-transform:uppercase;">Identidad y Rasgos</span>
        <span style="font-size:10px; font-weight:900; padding:2px 7px; border-radius:5px; border:1.5px solid var(--amber); background:var(--amber-light);">
          ${specObj ? "★ " + specObj.name : "Especialidad pendiente"}
        </span>
      </div>
      <div style="font-size:11px; color:var(--ink-muted); margin-bottom:7px;">
        ${specObj ? specObj.desc : "Alcanza nivel 6.0 en una habilidad clave para desbloquear rasgos."}
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:5px;">
        ${Object.entries(V10_TRAITS).map(([k, tr]) => {
          const unlocked = p.traits.includes(k);
          const active = p.activeTrait === k;
          return `<button class="filter-chip ${active ? "active" : ""}" style="${!unlocked ? "opacity:0.55; border-style:dashed;" : ""}" onclick="${unlocked ? `setV10ActiveTrait('${k}')` : `showV10TraitModal('${k}')`}">${unlocked ? (active ? "✓ " : "") + tr.name : "🔒 " + tr.name}</button>`;
        }).join("")}
      </div>
    </div>

    <div class="notebook-card">
      <div style="font-size:10.5px; font-weight:900; text-transform:uppercase; margin-bottom:4px;">Respaldo de Partida</div>
      <div style="font-size:11px; color:var(--ink-muted); margin-bottom:8px;">
        Guarda o restaura un código de respaldo además del autoguardado local.
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:7px;">
        <button class="btn-secondary" onclick="openV10ExportModal()">📤 Exportar Save</button>
        <button class="btn-secondary" onclick="openV10ImportModal()">📥 Importar Save</button>
      </div>
    </div>
  `;
  main.appendChild(wrap);
}

const _v10PrevRenderCurrentTab = renderCurrentTab;
renderCurrentTab = function() {
  checkV10TraitsUnlock();
  _v10PrevRenderCurrentTab();
  injectV10PlayerPanels();
};

checkSavedGameOnBoot();
