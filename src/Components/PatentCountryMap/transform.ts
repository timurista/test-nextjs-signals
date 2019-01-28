import countryCodeMap from "./countryCodeMap";

export function transformDate(dateNum: number) {
  let s = dateNum.toString();
  if (s[s.length - 1] === "0") s = s.slice(0, s.length) + "1";
  return s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6);
}

function transformer(data: any) {
  let countries: any = [];
  const countryCords: any = [];
  let top = {};

  for (let item of data) {
    const date = new Date(transformDate(item.key));
    for (let c of item.country_count.buckets) {
      const countryInfo = countryCodeMap[c.key.toUpperCase()];

      countries.push({
        countryAbbrev: c.key,
        name: countryInfo.name,
        count: c.doc_count,
        date
      });

      if (top[c.key]) {
        top[c.key].count += c.doc_count;
      } else {
        top[c.key] = {
          label: countryInfo.name,
          count: c.doc_count,
          cords: [countryInfo.lat, countryInfo.long]
        };
      }

      countryCords.push([countryInfo.lat, countryInfo.long]);
    }
  }
  const topCountries = Object.values(top).sort((a, b) => b.count - a.count);
  return { topCountries, countries, countryCords };
}

export default transformer;
