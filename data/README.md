# Timeline content data

The app loads **`timeline-data.json`** at startup. Edit that file (or the CSV sheet) to change timeline content.

## Files

| File | Role |
|------|------|
| `timeline-data.json` | **Source of truth** — loaded by `index.html` |
| `timeline-data.csv` | Spreadsheet-friendly export for bulk editing |

After editing the JSON by hand, no build step is needed — refresh the browser.

To regenerate CSV from JSON:

```bash
node scripts/export-timeline-data.mjs
```

## JSON shape

```json
{
  "eras": [
    {
      "id": "cenozoic",
      "label": "Cenozoic",
      "start": 0,
      "end": 66,
      "eon": "Phanerozoic",
      "desc": "...",
      "color": "#e8b96a",
      "colorLight": "#f7e4bb",
      "above": false,
      "periods": [
        {
          "name": "Quaternary",
          "start": 0,
          "end": 2.6,
          "desc": "...",
          "epochs": [
            { "name": "Holocene", "start": 0, "end": 0.012, "desc": "..." }
          ]
        }
      ]
    }
  ]
}
```

Eras without periods omit the `periods` field. Periods without epochs omit `epochs`. Optional fields: `img`, `imgCredit`, `imgDesc`, `above`.

Dates are **millions of years ago** (0 = present).

## CSV columns

Each row is one epoch (or one period/era when no child levels exist). See column headers in `timeline-data.csv`. Era and period fields repeat on each row for easy sheet editing.

## Import in the app

**Import** in the header loads a `.csv` or `.json` into memory for the current session. To persist changes, save back to `data/timeline-data.json`.

Serve the project over HTTP so the JSON file can load:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.
