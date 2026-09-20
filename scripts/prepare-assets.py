"""One-off asset preparation. Reads source media from _local/ and writes web-ready
files into public/. Re-run whenever the source media changes.

Requires Pillow, numpy, scipy (all present on the dev machine).
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
LOCAL = ROOT / "_local"
PUBLIC = ROOT / "public"

LOGO_SRC = LOCAL / "logo" / "WhatsApp Image 2026-09-20 at 10.31.22 P8M.jpeg"
BOX_SRC = LOCAL / "docs" / "product_carousel" / "WhatsApp Image 2026-09-20 at 10.31.21 PM.jpeg"
PRODUCT_VIDEO_SRC = LOCAL / "docs" / "product_carousel" / "product.mp4"
FOUNDER_SRC = LOCAL / "About" / "founder" / "founder-image.jpeg"
FOUNDER_VIDEO_SRC = LOCAL / "About" / "founder" / "WhatsApp Video 2026-09-20 at 10.31.23 PM.mp4"

BG_DARK = (11, 21, 18)


def remove_white_matte(img: Image.Image) -> Image.Image:
    """Exact un-matting for coloured artwork composited on pure white."""
    rgb = np.asarray(img.convert("RGB")).astype(np.float32)
    alpha = 255.0 - rgb.min(axis=2)
    alpha[alpha < 8] = 0
    a = alpha / 255.0
    safe = np.where(a > 0, a, 1)[..., None]
    colour = (rgb - (1 - a)[..., None] * 255.0) / safe
    colour = np.clip(colour, 0, 255)
    out = np.dstack([colour, alpha]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def content_bbox(alpha: np.ndarray, threshold: int = 10):
    ys, xs = np.where(alpha > threshold)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def prepare_logo():
    logo = remove_white_matte(Image.open(LOGO_SRC))
    alpha = np.asarray(logo)[..., 3]
    x0, y0, x1, y1 = content_bbox(alpha)
    full = logo.crop((x0, y0, x1, y1))
    pad = 24
    canvas = Image.new("RGBA", (full.width + pad * 2, full.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(full, (pad, pad), full)
    canvas.save(PUBLIC / "media" / "logo" / "vanpure-logo.png", optimize=True)

    # The wings mark sits above the wordmark. The wordmark is much wider than the
    # wings, so the first row whose ink spans most of the logo width starts it.
    ink = alpha > 10
    row_width = np.array([np.ptp(np.where(r)[0]) if r.any() else 0 for r in ink])
    wordmark_top = int(np.argmax(row_width > (x1 - x0) * 0.7))
    # Only the wings' own columns count, so the tall "V" of the wordmark can't sneak in.
    wing_columns = np.where(ink[y0 : y0 + 150].any(axis=0))[0]
    cx0, cx1 = int(wing_columns.min()) - 12, int(wing_columns.max()) + 12
    mark_alpha = np.zeros_like(alpha)
    mark_alpha[: wordmark_top - 4, cx0:cx1] = alpha[: wordmark_top - 4, cx0:cx1]
    mx0, my0, mx1, my1 = content_bbox(mark_alpha)
    mark = logo.crop((mx0, my0, mx1, my1))
    side = max(mark.width, mark.height) + 40
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(mark, ((side - mark.width) // 2, (side - mark.height) // 2), mark)
    square.save(PUBLIC / "media" / "logo" / "vanpure-mark.png", optimize=True)
    return square


def rounded_icon(mark: Image.Image, size: int) -> Image.Image:
    icon = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(icon)
    radius = int(size * 0.22)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=BG_DARK + (255,))
    inner = int(size * 0.78)
    scaled = mark.resize((inner, inner), Image.LANCZOS)
    icon.paste(scaled, ((size - inner) // 2, (size - inner) // 2), scaled)
    return icon


def prepare_favicons(mark: Image.Image):
    for size, name in [
        (32, "favicon-32.png"),
        (180, "apple-touch-icon.png"),
        (192, "icon-192.png"),
        (512, "icon-512.png"),
    ]:
        rounded_icon(mark, size).save(PUBLIC / name, optimize=True)
    rounded_icon(mark, 64).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])


def cut_out_box(img: Image.Image) -> Image.Image:
    """Remove the flat grey studio background and the soft reflection under the box."""
    rgb = np.asarray(img.convert("RGB")).astype(np.int16)
    grey = rgb.mean(axis=2)
    saturation = rgb.max(axis=2) - rgb.min(axis=2)
    flat_bg = (np.abs(grey - 245) <= 5) & (saturation <= 6)
    labels, _ = ndimage.label(flat_bg)
    border_labels = np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))
    background = np.isin(labels, border_labels[border_labels > 0])

    # Everything below the lowest dark row is the box's reflection.
    dark_rows = np.where((grey < 90).sum(axis=1) > 20)[0]
    box_bottom = int(dark_rows.max())
    background[box_bottom + 2 :] = True

    # The box casts a soft neutral-grey shadow onto the backdrop. Any large
    # zero-saturation grey region that touches the background is part of it;
    # grey anti-aliased text on the box is small and enclosed, so it survives.
    shadow_candidates = (saturation <= 8) & (grey > 110) & (grey < 243)
    shadow_labels, shadow_count = ndimage.label(shadow_candidates)
    if shadow_count:
        near_background = ndimage.binary_dilation(background, iterations=3)
        touching = np.unique(shadow_labels[near_background])
        touching = touching[touching > 0]
        sizes = ndimage.sum(shadow_candidates, shadow_labels, touching)
        big_touching = touching[np.asarray(sizes) > 1500]
        background |= np.isin(shadow_labels, big_touching)
    background = ndimage.binary_closing(background, iterations=2)

    # Keep only the box itself; drops sparkles and specks left in the backdrop.
    foreground_labels, count = ndimage.label(~background)
    if count > 1:
        sizes = ndimage.sum(~background, foreground_labels, range(1, count + 1))
        background = foreground_labels != (int(np.argmax(sizes)) + 1)

    alpha = np.where(background, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.8))
    out = img.convert("RGBA")
    out.putalpha(alpha_img)
    x0, y0, x1, y1 = content_bbox(np.asarray(alpha_img), threshold=20)
    return out.crop((x0, y0, x1, y1))


def prepare_product():
    box = cut_out_box(Image.open(BOX_SRC))
    out_dir = PUBLIC / "media" / "product"
    for width in (1600, 800):
        scale = width / box.width
        resized = box.resize((width, round(box.height * scale)), Image.LANCZOS)
        resized.save(out_dir / f"multashva-box-{width}.webp", quality=88, method=6)
        resized.save(out_dir / f"multashva-box-{width}.png", optimize=True)

    # 16:9 poster for the product video: box centred on the site's dark canvas.
    poster = Image.new("RGB", (1280, 720), BG_DARK)
    scale = 1100 / box.width
    small = box.resize((1100, round(box.height * scale)), Image.LANCZOS)
    poster.paste(small, ((1280 - small.width) // 2, (720 - small.height) // 2), small)
    poster.save(out_dir / "product-poster.webp", quality=82, method=6)
    (out_dir / "product.mp4").write_bytes(PRODUCT_VIDEO_SRC.read_bytes())
    return box


def prepare_founder():
    photo = Image.open(FOUNDER_SRC).convert("RGB")
    out_dir = PUBLIC / "media" / "founder"
    photo.resize((800, round(photo.height * 800 / photo.width)), Image.LANCZOS).save(
        out_dir / "vansh-choudhary.webp", quality=86, method=6
    )
    square = photo.crop((0, 0, photo.width, photo.width))
    square.resize((320, 320), Image.LANCZOS).save(out_dir / "vansh-choudhary-avatar.webp", quality=86, method=6)

    # 9:16 poster for the founder video (no ffmpeg available to grab a real frame).
    target_w = round(photo.height * 9 / 16)
    left = (photo.width - target_w) // 2
    portrait = photo.crop((left, 0, left + target_w, photo.height))
    portrait.resize((540, 960), Image.LANCZOS).save(out_dir / "founder-poster.webp", quality=82, method=6)
    (out_dir / "founder-message.mp4").write_bytes(FOUNDER_VIDEO_SRC.read_bytes())


def prepare_og(box: Image.Image, logo_path: Path):
    W, H = 1200, 630
    og = Image.new("RGB", (W, H), (6, 11, 9))
    glow = Image.new("RGB", (W, H), (6, 11, 9))
    draw = ImageDraw.Draw(glow)
    draw.ellipse((650, 80, 1250, 620), fill=(70, 55, 20))
    draw.ellipse((-200, -150, 500, 400), fill=(45, 25, 80))
    draw.ellipse((200, 400, 800, 900), fill=(12, 60, 35))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    og = Image.blend(og, glow, 0.9)

    scale = 620 / box.width
    small = box.resize((620, round(box.height * scale)), Image.LANCZOS)
    og.paste(small, (W - small.width - 40, (H - small.height) // 2 + 20), small)

    logo = Image.open(logo_path).convert("RGBA")
    logo = logo.resize((220, round(logo.height * 220 / logo.width)), Image.LANCZOS)
    og.paste(logo, (56, 48), logo)

    draw = ImageDraw.Draw(og)
    bold = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 54)
    regular = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 26)
    draw.text((60, 260), "VANPURE", font=bold, fill=(242, 245, 243))
    draw.text((60, 322), "MULTASHVA", font=bold, fill=(229, 199, 107))
    draw.text((60, 400), "Complete Vitality & Wellness Formula", font=regular, fill=(159, 176, 168))
    draw.text((60, 440), "100 softgel capsules  |  Launch price Rs 75/strip", font=regular, fill=(159, 176, 168))
    og.save(PUBLIC / "og-image.jpg", quality=88)


if __name__ == "__main__":
    mark = prepare_logo()
    prepare_favicons(mark)
    box = prepare_product()
    prepare_founder()
    prepare_og(box, PUBLIC / "media" / "logo" / "vanpure-logo.png")
    for path in sorted(PUBLIC.rglob("*")):
        if path.is_file():
            print(f"{path.relative_to(PUBLIC)}  {path.stat().st_size // 1024} KB")
