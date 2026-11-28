#!/usr/bin/env python3
"""Make a new shop app from this project (same design, new brand).

Example:
  python3 tools/make_app.py --name "Rawa Shop" --phone 9647501234567 \
      --domain rawa-shop.pages.dev --icon icon.png --bg inside.jpg --out rawa-shop.zip

--icon : square logo image (any size)       --bg : picture shown inside the app (home screen)
--phone: with country code, no + (e.g. 9647501234567)
--domain: the Cloudflare Pages address of the new app (no https://)
--tagline: optional small text (hidden in the current design)
Needs: Pillow  (pip install pillow)
"""
import argparse, base64, io, os, re, shutil, sys, zipfile
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.dirname(HERE)
OLD_NAME, OLD_DOMAIN, OLD_PHONE = "Penguin", "penguin-dzb.pages.dev", "9647504736935"
OLD_TAGLINE = "ببینـە ، داخازبـکە ، خوشیێ ببـە"


def must(s, a, b, count=None):
    n = s.count(a)
    if n == 0 or (count and n != count):
        sys.exit(f"!! expected '{a[:40]}' x{count or '>=1'} but found {n} (the template changed?)")
    return s.replace(a, b)


def edge_color(im):
    px = []
    w, h = im.size
    for x in range(0, w, max(1, w // 32)):
        px += [im.getpixel((x, 2)), im.getpixel((x, h - 3))]
    for y in range(0, h, max(1, h // 32)):
        px += [im.getpixel((2, y)), im.getpixel((w - 3, y))]
    return tuple(sum(p[i] for p in px) // len(px) for i in range(3))


def has_arabic(s):
    return any("\u0600" <= c <= "\u06ff" for c in s)


def font(size):
    for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
              "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf",
              "C:/Windows/Fonts/arialbd.ttf", "/Library/Fonts/Arial Bold.ttf"):
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def make_icons(out, icon_path, name):
    ic = Image.open(icon_path).convert("RGB")
    s = min(ic.size)
    ic = ic.crop(((ic.width - s) // 2, (ic.height - s) // 2, (ic.width - s) // 2 + s, (ic.height - s) // 2 + s))
    big = ic.resize((512, 512), Image.LANCZOS)
    big.save(os.path.join(out, "icon-512.png"))
    ic.resize((192, 192), Image.LANCZOS).save(os.path.join(out, "icon-192.png"))
    bg = edge_color(big)
    m = Image.new("RGB", (512, 512), bg)
    inner = big.resize((360, 360), Image.LANCZOS)
    m.paste(inner, (76, 76))
    m.save(os.path.join(out, "icon-maskable.png"))
    buf = io.BytesIO(); big.save(buf, "PNG")
    b64 = base64.b64encode(buf.getvalue()).decode()
    open(os.path.join(out, "icon.svg"), "w").write(
        f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><image width="512" height="512" href="data:image/png;base64,{b64}"/></svg>')
    return big, bg


def make_og(out, big, bg, name):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), bg)
    S = 600
    ic = big.resize((S, S), Image.LANCZOS)
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).rectangle([30, 30, S - 30, S - 30], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(18))
    img.paste(ic, (30, 15), mask)
    d = ImageDraw.Draw(img)
    lum = 0.299 * bg[0] + 0.587 * bg[1] + 0.114 * bg[2]
    col = (255, 255, 255) if lum < 140 else (30, 30, 30)
    size = 112
    kw = dict(direction="rtl", language="ckb") if has_arabic(name) else {}
    while size > 36:
        f = font(size)
        if d.textlength(name, font=f, **kw) <= 500:
            break
        size -= 6
    f = font(size)
    w = d.textlength(name, font=f, **kw)
    bb = d.textbbox((0, 0), name, font=f, **kw)
    d.text((900 - w / 2, (H - (bb[3] - bb[1])) / 2 - bb[1]), name, font=f, fill=col, **kw)
    img.save(os.path.join(out, "og-image.jpg"), quality=88, optimize=True)


def bg_data_uri(path):
    im = Image.open(path).convert("RGB")
    im.thumbnail((1000, 1000), Image.LANCZOS)
    for q in (82, 74, 66, 58):
        buf = io.BytesIO(); im.save(buf, "JPEG", quality=q, optimize=True)
        if buf.tell() < 120_000:
            break
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--name", required=True)
    ap.add_argument("--phone", required=True)
    ap.add_argument("--domain", required=True)
    ap.add_argument("--icon", required=True)
    ap.add_argument("--bg", required=True)
    ap.add_argument("--tagline", default="")
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    name = a.name.strip()
    phone = re.sub(r"\D", "", a.phone)
    domain = re.sub(r"^https?://|/+$", "", a.domain.strip())
    if not re.fullmatch(r"9647\d{9}", phone):
        print(f"?? phone {phone} does not look like 9647XXXXXXXXX - check it")
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-") or "shop"
    tmp = os.path.join(os.path.dirname(os.path.abspath(a.out)), f".build-{slug}")
    shutil.rmtree(tmp, ignore_errors=True)
    shutil.copytree(SRC, tmp, ignore=shutil.ignore_patterns("tools", ".git", "*.zip", ".build-*", "__pycache__"))

    p = os.path.join(tmp, "index.html")
    h = open(p, encoding="utf-8").read()
    h = must(h, "بەخێربێیت بۆ پێنگوین", f"بەخێربێیت بۆ {name}")
    h = must(h, "أهلاً بك في البطريق", f"أهلاً بك في {name}")
    h = must(h, OLD_DOMAIN, domain)
    h = must(h, OLD_PHONE, phone, 2)
    h = must(h, OLD_TAGLINE, a.tagline)
    h = must(h, OLD_NAME, name)
    m = re.search(r'(<img class="bgimg"[^>]*src=")data:image/[a-z]+;base64,[A-Za-z0-9+/=]+(")', h)
    if not m:
        sys.exit("!! background image tag not found")
    h = h[:m.start()] + m.group(1) + bg_data_uri(a.bg) + m.group(2) + h[m.end():]
    open(p, "w", encoding="utf-8").write(h)

    p = os.path.join(tmp, "manifest.json")
    s = open(p, encoding="utf-8").read()
    s = must(s, OLD_NAME, name)
    open(p, "w", encoding="utf-8").write(s)

    p = os.path.join(tmp, "sw.js")
    s = open(p, encoding="utf-8").read()
    s = re.sub(r"const CACHE='[^']*'", f"const CACHE='{slug}-v1'", s)
    open(p, "w", encoding="utf-8").write(s)

    p = os.path.join(tmp, "_worker.js")
    s = open(p, encoding="utf-8").read()
    s = must(s, "بۆتی Penguin", f"بۆتی {name}", 1)
    open(p, "w", encoding="utf-8").write(s)

    open(os.path.join(tmp, "README.md"), "w", encoding="utf-8").write(name + "\n")
    big, bg = make_icons(tmp, a.icon, name)
    make_og(tmp, big, bg, name)

    out = os.path.abspath(a.out)
    if os.path.exists(out):
        os.remove(out)
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(os.listdir(tmp)):
            z.write(os.path.join(tmp, f), f)
    shutil.rmtree(tmp, ignore_errors=True)
    print("OK ->", out)
    print("Still to do on Cloudflare: new D1 database bound as DB, and ADMIN_PASSWORD / TG_TOKEN / TG_CHAT for this shop.")


if __name__ == "__main__":
    main()
