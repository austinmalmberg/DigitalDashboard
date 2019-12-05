
import config from '../config';

const KELVIN_CONST = -273.15;

function kConverter(k) {

  const c = k + KELVIN_CONST;

  if (config.weather.units !== 'imperial')
    return Math.round(c * 10) / 10;

  const f = c * 9/5 + 32;
  return Math.round(f);
}

export { kConverter };
