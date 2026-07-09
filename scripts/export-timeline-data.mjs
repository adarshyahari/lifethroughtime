#!/usr/bin/env node
/**
 * Regenerate timeline-data.csv from timeline-data.json
 * Usage: node scripts/export-timeline-data.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const jsonPath = path.join(root, 'data', 'timeline-data.json');
const csvPath = path.join(root, 'data', 'timeline-data.csv');

const { eras } = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const COLS = [
  'era_id', 'era_label', 'era_start', 'era_end', 'era_eon', 'era_desc', 'era_color', 'era_colorLight', 'era_above',
  'era_img', 'era_imgCredit', 'era_imgDesc',
  'period_name', 'period_start', 'period_end', 'period_desc',
  'period_img', 'period_imgCredit', 'period_imgDesc',
  'epoch_name', 'epoch_start', 'epoch_end', 'epoch_desc',
  'epoch_img', 'epoch_imgCredit', 'epoch_imgDesc',
];

function cell(v) {
  if (v === undefined || v === null) return '';
  const s = String(v);
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

function eraFields(e) {
  return {
    era_id: e.id ?? '', era_label: e.label ?? '', era_start: e.start ?? '', era_end: e.end ?? '',
    era_eon: e.eon ?? '', era_desc: e.desc ?? '', era_color: e.color ?? '', era_colorLight: e.colorLight ?? '',
    era_above: e.above === undefined ? '' : e.above, era_img: e.img ?? '', era_imgCredit: e.imgCredit ?? '',
    era_imgDesc: e.imgDesc ?? '',
  };
}

function periodFields(p) {
  return {
    period_name: p.name ?? '', period_start: p.start ?? '', period_end: p.end ?? '',
    period_desc: p.desc ?? '', period_img: p.img ?? '', period_imgCredit: p.imgCredit ?? '',
    period_imgDesc: p.imgDesc ?? '',
  };
}

function epochFields(ep) {
  return {
    epoch_name: ep.name ?? '', epoch_start: ep.start ?? '', epoch_end: ep.end ?? '',
    epoch_desc: ep.desc ?? '', epoch_img: ep.img ?? '', epoch_imgCredit: ep.imgCredit ?? '',
    epoch_imgDesc: ep.imgDesc ?? '',
  };
}

const rows = [];
for (const era of eras) {
  const ef = eraFields(era);
  const periods = Array.isArray(era.periods) ? era.periods : [];
  if (!periods.length) { rows.push({ ...ef }); continue; }
  for (const period of periods) {
    const pf = periodFields(period);
    const epochs = Array.isArray(period.epochs) ? period.epochs : [];
    if (!epochs.length) { rows.push({ ...ef, ...pf }); continue; }
    for (const epoch of epochs) rows.push({ ...ef, ...pf, ...epochFields(epoch) });
  }
}

const csv = [COLS.join(',')].concat(rows.map(r => COLS.map(c => cell(r[c])).join(','))).join('\n');
fs.writeFileSync(csvPath, csv);
console.log(`Wrote ${rows.length} rows to ${csvPath}`);
