import { db } from "./db.server";

export async function getCompanyCurrencyAmount(
  amount: number,
  currency: string
) {
  const currencyData = await db.currency.findUnique({
    where: {
      name: currency,
    },
  });
  if (amount && currencyData?.exchange_rate) {
    amount *= currencyData?.exchange_rate;
  }
  return amount;
}

async function getSettingsValue(settingName: string) {
  return db.settings.findUnique({
    where: { name: settingName },
    select: { value: true },
  });
}

interface TafqeetISO {
  uSingle: string;
  uDouble: string;
  uPlural: string;
  uGender: string;
  sSingle: string;
  sDouble: string;
  sPlural: string;
  sGender: string;
  fraction: number;
}

interface TafqeetOptions {
  comma?: string;
  legal?: string;
  format?: string;
}

interface TafqeetProps {
  numIn: number;
  code: string;
  op?: TafqeetOptions;
}

function tafqeet(
  numIn: number = 0,
  code: string,
  op: TafqeetOptions = {}
): string {
  let iso: TafqeetISO = tafqeetISOList[code];
  if (!iso) {
    throw new Error("Currency code not in the list!");
  }
  let arr: string[] = (numIn + "").split(
      (0.1).toLocaleString().substring(1, 2)
    ),
    out: string = nToW(arr[0], iso.uGender == "female", op, [
      iso.uSingle,
      iso.uDouble,
      iso.uPlural,
    ]),
    frc: string = arr[1] ? (arr[1] + "000").substring(0, iso.fraction) : "0";
  if (frc != "0") {
    out +=
      "، و" +
      (op.format == "short"
        ? frc + "/1" + "0".repeat(+iso.fraction) + " " + iso.uSingle
        : nToW(frc, iso.sGender == "female", op, [
            iso.sSingle,
            iso.sDouble,
            iso.sPlural,
          ]));
  }
  return out;

  // sourcery skip: avoid-function-declarations-in-blocks
  function nToW(
    numIn: string = "0",
    fm: boolean,
    { comma, legal }: TafqeetOptions = {},
    names: string[]
  ): string {
    if (numIn == "0") {
      return "صفر " + iso.uSingle;
    }
    let tS: string[] = [
        "",
        "ألف",
        "مليون",
        "مليار",
        "ترليون",
        "كوادرليون",
        "كوينتليون",
        "سكستليون",
      ],
      tM: string[] = [
        "",
        "واحد",
        "اثنان",
        "ثلاثة",
        "أربعة",
        "خمسة",
        "ستة",
        "سبعة",
        "ثمانية",
        "تسعة",
        "عشرة",
      ],
      tF: string[] = [
        "",
        "واحدة",
        "اثنتان",
        "ثلاث",
        "أربع",
        "خمس",
        "ست",
        "سبع",
        "ثمان",
        "تسع",
        "عشر",
      ],
      num: string = (numIn += ""),
      tU: string[] = [...tM],
      t11: string[] = [...tM],
      out: string = "",
      n99: number,
      SpWa: string = " و",
      miah: string = "مائة",
      last: number =
        ~~(
          ((numIn = "0".repeat((numIn.length * 2) % 3) + numIn).replace(
            /0+$/g,
            ""
          ).length +
            2) /
          3
        ) - 1;
    t11[0] = "عشر";
    t11[1] = "أحد";
    t11[2] = "اثنا";
    // Add a null check and provide a default empty array
    const matches = numIn.match(/.{3}/g) || [];
    matches.forEach((n, i) => {
      if (+n) {
        out += do999(numIn.length / 3 - i - 1, n, i == last);
        if (i !== last) {
          out += (comma == "on" ? "،" : "") + SpWa;
        }
      }
    });

    let sub: string = " " + names[0],
      n: number = +(num + "").slice(-2);
    if (n > 10) {
      sub = " " + tanween(names[0]);
    } else if (n > 2) {
      sub = " " + names[2];
    } else if (n > 0) {
      sub = names[n - 1] + " " + (fm ? tF[n] : tM[n]);
    }
    return out + sub;

    function tanween(
      n: string,
      a: string[] = n.split(" "),
      L: number = a.length - 1
    ): string {
      const strTF = (
        str: string,
        l: string = str.slice(-1),
        o: string = str + "ًا"
      ): string => {
        if (l === "ا") {
          o = str.slice(0, -1) + "ًا";
        } else if (l === "ة") {
          o = str + "ً";
        }
        return o;
      };
      for (let i = 0; i <= L; i++) {
        if (!i || i === L) {
          a[i] = strTF(a[i]);
        }
      }
      return a.join(" ");
    }

    function do999(sPos: number, num: string, last: boolean): string {
      let scale: string = tS[sPos],
        n100: number = ~~(+num / 100),
        nU: number = (n99 = +num % 100) % 10,
        n10: number = ~~(n99 / 10),
        w100: string = "",
        w99: string = "",
        e8: string = nU == 8 && fm && !scale ? "ي" : "";
      if (fm && !scale) {
        [tU, t11, t11[0], t11[1], t11[2]] = [
          [...tF],
          [...tF],
          "عشرة",
          "إحدى",
          "اثنتا",
        ];
        if (n99 > 20) {
          tU[1] = "إحدى";
        }
      }
      if (n100) {
        if (n100 > 2) {
          w100 = tF[n100] + miah;
        } else if (n100 == 1) {
          w100 = miah;
        } else {
          w100 = miah.slice(0, -1) + (!n99 || legal == "on" ? "تا" : "تان");
        }
      }
      if (n99 > 19) {
        w99 = tU[nU] + (nU ? SpWa : "") + (n10 == 2 ? "عشر" : tF[n10]) + "ون";
      } else if (n99 > 10) {
        w99 = t11[nU] + e8 + " " + t11[0];
      } else if (n99 > 2) {
        w99 = tU[n99] + e8;
      }
      let nW: string = w100 + (n100 && n99 ? SpWa : "") + w99;
      if (!scale) {
        return nW;
      }
      if (!n99) {
        return nW + " " + scale;
      }
      if (n99 > 2) {
        return (
          nW +
          " " +
          (n99 > 10
            ? scale + (last ? "" : "ًا")
            : sPos < 3
            ? [, "آلاف", "ملايين"][sPos]
            : tS[sPos] + "ات")
        );
      }
      nW =
        (n100
          ? w100 + (legal == "on" && n99 < 3 ? " " + scale : "") + SpWa
          : "") + scale;
      return n99 == 1 ? nW : nW + (last ? "ا" : "ان");
    }
  }
}

export default tafqeet;

//==================== Common ISO Currency List in Arabic ===============
let tafqeetISOList: { [key: string]: TafqeetISO } = {
  AED: {
    uSingle: "درهم إماراتي",
    uDouble: "درهمان إماراتيان",
    uPlural: "دراهم إماراتية",
    uGender: "male",
    sSingle: "فلس",
    sDouble: "فلسان",
    sPlural: "فلوس",
    sGender: "male",
    fraction: 2,
  },

  BHD: {
    uSingle: "دينار بحريني",
    uDouble: "ديناران بحرينيان",
    uPlural: "دنانير بحرينية",
    uGender: "male",
    sSingle: "فلس",
    sDouble: "فلسان",
    sPlural: "فلوس",
    sGender: "male",
    fraction: 3,
  },

  EGP: {
    uSingle: "جنيه مصري",
    uDouble: "جنيهان مصريان",
    uPlural: "جنيهات مصرية",
    uGender: "male",
    sSingle: "قرش",
    sDouble: "قرشان",
    sPlural: "قروش",
    sGender: "male",
    fraction: 2,
  },

  EUR: {
    uSingle: "يورو",
    uDouble: "يوروان",
    uPlural: "يوروات",
    uGender: "male",
    sSingle: "سنت",
    sDouble: "سنتان",
    sPlural: "سنتات",
    sGender: "male",
    fraction: 2,
  },

  GBP: {
    uSingle: "جنيه إسترليني",
    uDouble: "جنيهان إسترلينيان",
    uPlural: "جنيهات إسترلينية",
    uGender: "male",
    sSingle: "بنس",
    sDouble: "بنسان",
    sPlural: "بنسات",
    sGender: "male",
    fraction: 2,
  },

  INR: {
    uSingle: "روبية هندية",
    uDouble: "روبيتان هنديتان",
    uPlural: "روبيات هندية",
    uGender: "female",
    sSingle: "بيسة",
    sDouble: "بيستان",
    sPlural: "بيسات",
    sGender: "female",
    fraction: 2,
  },

  IQD: {
    uSingle: "دينار عراقي",
    uDouble: "ديناران عراقيان",
    uPlural: "دنانير عراقية",
    uGender: "male",
    sSingle: "فلس",
    sDouble: "فلسان",
    sPlural: "فلوس",
    sGender: "male",
    fraction: 2,
  },

  JOD: {
    uSingle: "دينار أردني",
    uDouble: "ديناران أردنيان",
    uPlural: "دنانير أردنية",
    uGender: "male",
    sSingle: "فلس",
    sDouble: "فلسان",
    sPlural: "فلوس",
    sGender: "male",
    fraction: 3,
  },

  KWD: {
    uSingle: "دينار كويتي",
    uDouble: "ديناران كويتيان",
    uPlural: "دنانير كويتية",
    uGender: "male",
    sSingle: "فلس",
    sDouble: "فلسان",
    sPlural: "فلوس",
    sGender: "male",
    fraction: 3,
  },

  LBP: {
    uSingle: "ليرة لبنانية",
    uDouble: "ليرتان لبنانيتان",
    uPlural: "ليرات لبنانية",
    uGender: "female",
    sSingle: "قرش",
    sDouble: "قرشان",
    sPlural: "قروش",
    sGender: "male",
    fraction: 2,
  },

  LYD: {
    uSingle: "دينار ليبي",
    uDouble: "ديناران ليبيان",
    uPlural: "دنانير ليبية",
    uGender: "male",
    sSingle: "درهم",
    sDouble: "درهمان",
    sPlural: "دراهم",
    sGender: "male",
    fraction: 3,
  },

  MAD: {
    uSingle: "درهم مغربي",
    uDouble: "درهمان مغربيان",
    uPlural: "دراهم مغربية",
    uGender: "male",
    sSingle: "سنتيم",
    sDouble: "سنتيمان",
    sPlural: "سنتيمات",
    sGender: "male",
    fraction: 2,
  },

  OMR: {
    uSingle: "ريال عماني",
    uDouble: "ريالان عمانيان",
    uPlural: "ريالات عمانية",
    uGender: "male",
    sSingle: "بيسة",
    sDouble: "بيستان",
    sPlural: "بيسات",
    sGender: "female",
    fraction: 3,
  },

  QAR: {
    uSingle: "ريال قطري",
    uDouble: "ريالان قطريان",
    uPlural: "ريالات قطرية",
    uGender: "male",
    sSingle: "درهم",
    sDouble: "درهمان",
    sPlural: "دراهم",
    sGender: "male",
    fraction: 2,
  },

  SAR: {
    uSingle: "ريال سعودي",
    uDouble: "ريالان سعوديان",
    uPlural: "ريالات سعودية",
    uGender: "male",
    sSingle: "هللة",
    sDouble: "هللتان",
    sPlural: "هللات",
    sGender: "female",
    fraction: 2,
  },

  SYP: {
    uSingle: "ليرة سورية",
    uDouble: "ليرتان سوريتان",
    uPlural: "ليرات سورية",
    uGender: "female",
    sSingle: "قرش",
    sDouble: "قرشان",
    sPlural: "قروش",
    sGender: "male",
    fraction: 2,
  },

  USD: {
    uSingle: "دولار أمريكي",
    uDouble: "دولاران أمريكيان",
    uPlural: "دولارات أمريكية",
    uGender: "male",
    sSingle: "سنت",
    sDouble: "سنتان",
    sPlural: "سنتات",
    sGender: "male",
    fraction: 2,
  },

  //==== add here
}; // end of list