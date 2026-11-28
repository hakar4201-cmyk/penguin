Penguin

== New shop from this template ==
1. Unzip this project on a computer / or upload it to Claude with: name, phone (9647XXXXXXXXX), logo (square), inside picture, new address (xxx.pages.dev).
2. Run:  python3 tools/make_app.py --name "Shop Name" --phone 9647501234567 --domain shop.pages.dev --icon logo.png --bg inside.jpg --out shop.zip
3. Upload the files in shop.zip to a NEW GitHub repo and connect it to Cloudflare Pages.
4. On Cloudflare (new app): create a D1 database bound as DB, and set ADMIN_PASSWORD, TG_TOKEN, TG_CHAT (never put these in GitHub).
5. In the app: Management -> press the Telegram buttons once.
The "tools" folder is not needed by the app itself.
