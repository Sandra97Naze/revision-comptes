// src/config/cycles.ts
export const CYCLES = {
  IMMOBILISATIONS: {
    nom: "Immobilisations",
    comptes: ["20", "21", "23", "28", "29"],
    controles: [
      "Rapprochement tableau des immobilisations",
      "Vérification des entrées/sorties",
      "Contrôle des amortissements",
      "Inventaire physique"
    ]
  },
  STOCKS: {
    nom: "Stocks",
    comptes: ["31", "32", "33", "34", "35", "37", "39"],
    controles: [
      "Inventaire physique",
      "Valorisation",
      "Dépréciation",
      "Cut-off"
    ]
  },
  CLIENTS: {
    nom: "Clients et comptes rattachés",
    comptes: ["41", "416", "417", "418", "491"],
    controles: [
      "Balance âgée",
      "Circularisation",
      "Provision créances douteuses",
      "Cut-off"
    ]
  },
  FOURNISSEURS: {
    nom: "Fournisseurs",
    comptes: ["40", "401", "404", "408"],
    controles: [
      "Balance âgée",
      "Circularisation",
      "FNP",
      "Cut-off"
    ]
  },
  TRESORERIE: {
    nom: "Trésorerie",
    comptes: ["50", "51", "52", "53", "54", "58"],
    controles: [
      "Rapprochements bancaires",
      "État de rapprochement",
      "Confirmation des soldes",
      "Valeurs en caisse"
    ]
  },
  SOCIAL: {
    nom: "Social",
    comptes: ["42", "43", "44"],
    controles: [
      "Charges sociales",
      "Provisions CP/RTT",
      "Contrôle paie",
      "Déclarations sociales"
    ]
  },
  FISCAL: {
    nom: "Fiscal",
    comptes: ["44", "445", "447"],
    controles: [
      "TVA",
      "CET",
      "IS",
      "Autres taxes"
    ]
  },
  CAPITAUX: {
    nom: "Capitaux",
    comptes: ["10", "11", "12", "13", "14", "15", "16", "17"],
    controles: [
      "Variation des capitaux propres",
      "Affectation résultat",
      "Emprunts",
      "Provisions"
    ]
  }
};
