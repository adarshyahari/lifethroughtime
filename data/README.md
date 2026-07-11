# Timeline content

Edit **`timeline-data.csv`** to change timeline text, dates, colors, and images. The app loads this file on startup.

Serve the project over HTTP (CSV fetch does not work on `file://`):

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` and refresh after saving CSV changes.

## CSV columns

Each row is one **epoch**. Periods without epochs get one row with empty epoch columns. Eras without periods get one row with empty period and epoch columns.

| Column | Level | Notes |
|--------|-------|-------|
| `era_id` | Era | Stable ID (e.g. `cenozoic`) — keep unchanged unless adding a new era |
| `era_label` | Era | Display name |
| `era_start`, `era_end` | Era | Millions of years ago |
| `era_eon` | Era | e.g. Phanerozoic |
| `era_desc` | Era | Card description |
| `era_color`, `era_colorLight` | Era | Hex colors |
| `era_above` | Era | `true` / `false` / blank (auto-alternate card position) |
| `era_img`, `era_imgCredit`, `era_imgDesc` | Era | Optional hover image |
| `era_img2`, `era_img2Credit`, `era_img2Desc` | Era | Optional second image, shown only in the map view (`map.html`), below the first |
| `period_*` | Period | Same pattern |
| `epoch_*` | Epoch | Same pattern |

Era and period fields repeat on every row so the sheet is easy to filter and edit in Google Sheets or Excel.

Dates are in **millions of years ago** (0 = present). Leave optional fields blank; do not delete columns.

In `era_desc` (and other `*_desc` fields shown in the map view's info panel), separate sentences into short paragraphs with a blank line — `map.html` renders each as its own `<p>`.
