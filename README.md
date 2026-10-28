# elearning.forgov.qld.gov.au

Extract/place each module in `modules/<name>/index.html`. You can also add standalone `.html` files directly inside `modules/`.

Regenerate the module listing after changes:

```sh
node scripts/generate-modules.js
```

The command updates `modules/modules.json`. Module subfolders are ignored by Git; the manifest is included.

Do not commit modules (excluded via .gitignore)