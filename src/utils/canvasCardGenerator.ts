// High-Resolution 2D Canvas Generator for Poetic Cards & Social Media Assets
export interface CardRenderOptions {
  title: string;
  verses: string;
  authorOrPseudonym: string;
  archetype?: string;
  format: "post" | "story" | "banner"; // 1080x1080, 1080x1920, 1200x630
  theme: "gold_alchemy" | "dark_mystic" | "ancient_parchment" | "amethyst";
}

export function renderPoeticCard(
  canvas: HTMLCanvasElement,
  options: CardRenderOptions
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Dimensions
  let width = 1080;
  let height = 1080;
  if (options.format === "story") {
    height = 1920;
  } else if (options.format === "banner") {
    width = 1200;
    height = 630;
  }

  canvas.width = width;
  canvas.height = height;

  // Background Styles
  if (options.theme === "gold_alchemy") {
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.75);
    bgGrad.addColorStop(0, "#121927");
    bgGrad.addColorStop(1, "#05070d");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle Gold Grid / Constellation dots
    ctx.fillStyle = "rgba(217, 119, 6, 0.15)";
    for (let i = 0; i < 40; i++) {
      const x = (Math.sin(i * 99) * 0.5 + 0.5) * width;
      const y = (Math.cos(i * 77) * 0.5 + 0.5) * height;
      const r = (i % 3) + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Border Frame
    ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, width - 100, height - 100);

    ctx.strokeStyle = "rgba(245, 158, 11, 0.2)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(62, 62, width - 124, height - 124);

    // Corner Ornaments
    drawCornerOrnament(ctx, 50, 50, "#f59e0b");
    drawCornerOrnament(ctx, width - 50, 50, "#f59e0b");
    drawCornerOrnament(ctx, 50, height - 50, "#f59e0b");
    drawCornerOrnament(ctx, width - 50, height - 50, "#f59e0b");
  } else if (options.theme === "dark_mystic") {
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, "#090d16");
    bgGrad.addColorStop(0.5, "#0b1329");
    bgGrad.addColorStop(1, "#040711");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
    ctx.lineWidth = 3;
    ctx.strokeRect(55, 55, width - 110, height - 110);
  } else if (options.theme === "ancient_parchment") {
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, "#1c1917");
    bgGrad.addColorStop(1, "#0c0a09");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(214, 211, 209, 0.3)";
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, width - 120, height - 120);
  } else {
    // Amethyst
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, width * 0.8);
    bgGrad.addColorStop(0, "#1e112a");
    bgGrad.addColorStop(1, "#09040d");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(192, 132, 252, 0.35)";
    ctx.lineWidth = 3;
    ctx.strokeRect(55, 55, width - 110, height - 110);
  }

  // Header / Badge
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let currentY = options.format === "story" ? 220 : 150;

  // Archetype or Top Badge
  const badgeText = options.archetype ? `✦ ${options.archetype.toUpperCase()} ✦` : "✦ EL ALQUIMISTA LITERARIO ✦";
  ctx.font = "600 20px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillStyle = options.theme === "gold_alchemy" ? "#fbbf24" : "#38bdf8";
  ctx.fillText(badgeText, width / 2, currentY);

  // Title
  currentY += 60;
  ctx.font = "700 48px 'Cinzel', serif";
  ctx.fillStyle = "#ffffff";
  wrapText(ctx, options.title, width / 2, currentY, width - 240, 56);

  // Divider Line
  currentY += options.title.length > 30 ? 90 : 60;
  ctx.strokeStyle = options.theme === "gold_alchemy" ? "rgba(245, 158, 11, 0.5)" : "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 120, currentY);
  ctx.lineTo(width / 2 + 120, currentY);
  ctx.stroke();

  // Verses
  currentY += 60;
  const verseLines = options.verses.split("\n").filter((l, i) => i < 16); // max 16 lines for readability
  ctx.font = "italic 400 30px 'Cormorant Garamond', Georgia, serif";
  ctx.fillStyle = "#e2e8f0";

  const lineHeight = 42;
  for (const line of verseLines) {
    if (line.trim() === "") {
      currentY += lineHeight * 0.6;
    } else {
      ctx.fillText(line.trim(), width / 2, currentY);
      currentY += lineHeight;
    }
  }

  // Footer / Pseudonym
  const footerY = height - 120;
  ctx.font = "500 24px 'Cinzel', serif";
  ctx.fillStyle = options.theme === "gold_alchemy" ? "#fde68a" : "#cbd5e1";
  ctx.fillText(`— ${options.authorOrPseudonym || "Poeta Anónimo"} —`, width / 2, footerY);

  ctx.font = "400 16px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
  ctx.fillText("Micro Activo Interactivo • El Alquimista Literario", width / 2, footerY + 36);
}

function drawCornerOrnament(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 12, 0, Math.PI * 2);
  ctx.stroke();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

export function downloadCanvasImage(canvas: HTMLCanvasElement, filename: string): void {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png", 1.0);
  link.click();
}
