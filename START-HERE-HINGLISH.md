# Yahan se shuru karein

## 1. GitHub par upload

ZIP ko extract karein. Extracted folder ke **andar ke saare files/folders** apni GitHub repository ke root mein upload karein. Root mein `README.md`, `package.json`, `scripts` aur `skills` dikhne chahiye. ZIP ko bina extract kiye repo mein rakhna installation nahi hai.

## 2. Antigravity ko repository link dein

Yeh prompt paste karein; URL aur path badal dein:

```text
Is repository se Atlas Studio install karo:
https://github.com/MERA_USERNAME/MERI_REPOSITORY

Pehle README aur scripts/install.mjs inspect karo. Repository ko mere
website code se alag tools folder mein clone karo. Node 22+ check karo.
Doctor aur tests run karo. Meri existing website workspace ke liye
installer ka --dry-run dikhao. Meri approval ke baad --yes se install karo.
Kisi existing file ko overwrite mat karo, aur secrets Git mein mat daalo.
Phir /skills mein atlas-studio verify karne mein meri madad karo.
```

Website folder pehle se bana hona chahiye. Installer ka command:

```text
node scripts/install.mjs --workspace "WEBSITE_KA_ABSOLUTE_PATH" --dry-run
node scripts/install.mjs --workspace "WEBSITE_KA_ABSOLUTE_PATH" --yes
```

Installation sirf us workspace mein hota hai: `.agents/skills/atlas-studio/`. Yeh global machine settings nahi badalta. Naya Antigravity session khol kar `/skills` check karein.

## 3. Normal prompt se website

```text
Atlas Studio use karo. Mere perfume brand ke liye premium 3D website banao.
Soft studio lighting, editorial typography, polished mobile design aur
subtle animated background chahiye. Existing project ko inspect karke
suitable recipes use karo, custom brand content add karo aur browser mein
test karo. Paid generation aur deployment se pehle mujhse poochna.
```

Food version:

```text
Atlas Studio use karke premium restaurant landing page banao. Ingredient
burst ya pasta spiral se original 3D composition, warm colors aur bold
readable typography chahiye. Motion pause, reduced-motion fallback,
responsive navigation aur honest reservation/contact flow do.
```

## 4. Library dekhna

Repository root se:

```text
node skills/atlas-studio/scripts/atlas.mjs gallery --out my-library
node skills/atlas-studio/scripts/atlas.mjs serve --dir my-library --port 3000
```

Browser mein `http://127.0.0.1:3000` kholein. Collection select karein, search karein, **Inspect recipe** aur **Run preview** use karein. Command band karne ke liye Ctrl+C.

## Isme kya real hai?

- 120 runnable 3D background presets: 12 base geometries ke 10 treatments.
- 120 product/food/sculpture scene presets.
- 600 actual browser animation configurations.
- 1,950 actual font-family references; font files preinstalled nahi hain.
- 1,200 color palettes; selected text/button pairs ka contrast computed hai.
- 1,600 UI aur 5,400 code-structure recipes; combinations hain, independently handmade finished websites nahi.
- 1 main skill + 37 focused workflows; local generators, search, safe installer aur tests.

## Google Stitch

Apna authorized Stitch account aur private API/MCP setup chahiye. Toolkit mein Stitch handoff/workflow hai, free unlimited image API nahi. Integration available na ho to agent local original assets ke saath kaam kar sakta hai. Key kabhi frontend, prompt examples ya GitHub mein paste na karein.

## Zaroori limits

Plugin model ki intelligence/context limits unlock nahi karta aur nonstop infinite thinking guarantee nahi deta. Photoreal food/liquid animation ke liye achhe licensed assets ya approved generation ki zaroorat pad sakti hai. Toolkit original procedural starter scenes deta hai. Generated form demos real email/order nahi bhejte jab tak actual backend connect na ho.

Koi output folder pehle se exist ho to naya naam use karein—tool jaan-boojhkar overwrite refuse karta hai.
