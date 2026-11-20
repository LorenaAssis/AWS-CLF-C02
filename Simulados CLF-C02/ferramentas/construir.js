// Gera dados/banco.js (simulados) e dados/docs.js (resumos em HTML) para o site abrir direto do arquivo.
// Uso: node construir.js <pasta dados> <guia.md> <aula1.md> <aula2.md>
const fs = require("fs"), path = require("path");
const [dir, mdGuia, mdDet, mdA1, mdA2] = process.argv.slice(2);

const banco = {};
for (let n = 1; n <= 4; n++) {
  const f = path.join(dir, `simulado${n}.json`);
  if (!fs.existsSync(f)) { console.log(`simulado${n}.json: ausente`); continue; }
  const d = JSON.parse(fs.readFileSync(f, "utf8").replace(/^\uFEFF/, ""));
  banco[n] = { titulo: d.titulo || `Simulado ${n}`, questions: d.questions };
  console.log(`simulado${n}.json: ${d.questions.length} questoes`);
}
fs.writeFileSync(path.join(dir, "banco.js"), "window.BANCO = " + JSON.stringify(banco) + ";\n", "utf8");

function md2html(file, prefix) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  function inline(s) {
    s = esc(s);
    const codes = [];
    s = s.replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
    s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    s = s.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
    s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    s = s.replace(/(^|[\s(])\*([^*\s][^*]*)\*(?=[\s).,;:]|$)/g, "$1<i>$2</i>");
    s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[+i]}</code>`);
    return s;
  }
  function quizHtml(titulo, blk) {
    const qs = []; let cur = null, campo = null;
    for (const raw of blk) {
      const ln = raw.trim(); if (!ln) continue;
      let m;
      if ((m = ln.match(/^\*\*(\d+)\.\*\*\s*(.*)$/))) { cur = { q: m[2], opts: [], r: "", e: "" }; qs.push(cur); campo = "q"; }
      else if (cur && (m = ln.match(/^([A-F])\)\s*(.*)$/))) { cur.opts.push(m[2]); campo = "o"; }
      else if (cur && (m = ln.match(/^Resposta:\s*(.*)$/i))) { cur.r = m[1]; campo = "r"; }
      else if (cur && (m = ln.match(/^Explica\u00E7\u00E3o:\s*(.*)$/i))) { cur.e = m[1]; campo = "e"; }
      else if (cur) {
        if (campo === "q") cur.q += " " + ln;
        else if (campo === "o") cur.opts[cur.opts.length - 1] += " " + ln;
        else if (campo === "e") cur.e += " " + ln;
      }
    }
    const out = [`<details class="quiz"><summary class="quiz-t">\uD83E\uDDEA ${inline(titulo)} <span class="quiz-n">(${qs.length} perguntas, toque para abrir)</span></summary><p class="quiz-sub">Responda e confira na hora. S\u00E3o perguntas no estilo da prova.</p>`];
    qs.forEach((q, n) => {
      const r = q.r.split(/[,\s]+/).filter(Boolean).map((x) => "ABCDEF".indexOf(x.toUpperCase())).filter((x) => x >= 0);
      if (!r.length || r.some((x) => x >= q.opts.length)) throw new Error(`quiz "${titulo}" pergunta ${n + 1}: resposta invalida`);
      const multi = r.length > 1;
      out.push(`<div class="qz" data-r="${r.join(",")}" data-multi="${multi ? 1 : 0}"><p class="qz-q"><b>${n + 1}.</b> ${inline(q.q)}</p>${multi ? "" : '<p class="note" style="margin:0 0 8px">Escolha uma resposta.</p>'}<div class="qz-o" role="group">` +
        q.opts.map((o, k) => `<button type="button" class="opt qz-b${multi ? " multi" : ""}" data-k="${k}" aria-pressed="false"><span class="k">${"ABCDEF"[k]}</span><span class="t">${inline(o)}</span></button>`).join("") +
        `</div>${multi ? '<button type="button" class="btn qz-check" style="margin-top:10px">Verificar</button>' : ""}<div class="expl qz-e" hidden><b class="h qz-res"></b>${inline(q.e)}</div></div>`);
    });
    out.push(`<p class="quiz-score" aria-live="polite"></p></details>\n`);
    return out.join("");
  }
  const lines = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/);
  let html = "", i = 0, ck = 0, title = "", nq = 0;
  const toc = [];
  const isTable = (l) => /^\s*\|.*\|\s*$/.test(l);
  const cells = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m;
    if ((m = l.match(/^:::quiz\s*(.*)$/))) {
      const blk = []; i++;
      while (i < lines.length && !/^:::\s*$/.test(lines[i])) { blk.push(lines[i]); i++; }
      i++; nq++;
      html += quizHtml(m[1] || "Teste rápido", blk); continue;
    }
    if ((m = l.match(/^(#{1,4})\s+(.*)$/))) {
      const lv = m[1].length;
      let id = "";
      if (lv === 1 && !title) title = m[2].replace(/\*\*/g, "");
      if (lv === 2) { id = `${prefix}-sec${toc.length}`; toc.push({ id, t: m[2].replace(/\*\*/g, "") }); }
      html += `<h${lv}${id ? ` id="${id}"` : ""}>${inline(m[2])}</h${lv}>\n`; i++; continue;
    }
    if ((m = l.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/))) {
      const src = m[2].replace(/^.*?imagens\//, "imagens/");
      html += `<figure class="fig"><a href="${esc(src)}" target="_blank" rel="noopener" title="Clique para ampliar"><img src="${esc(src)}" alt="${esc(m[1])}"></a><figcaption>${esc(m[1])} · clique para ampliar</figcaption></figure>\n`; i++; continue;
    }
    if (/^---+\s*$/.test(l)) { html += "<hr>\n"; i++; continue; }
    if (isTable(l) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
      const head = cells(l); i += 2; const rows = [];
      while (i < lines.length && isTable(lines[i])) { rows.push(cells(lines[i])); i++; }
      html += `<div class="tablewrap"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>` +
        rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("") + "</tbody></table></div>\n";
      continue;
    }
    if (/^>\s?/.test(l)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, "")); i++; }
      html += `<blockquote>${inline(buf.join(" "))}</blockquote>\n`; continue;
    }
    if (/^\s*([-*]|\d+\.)\s+/.test(l)) {
      const stack = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        const mm = lines[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
        const indent = mm[1].length, tag = /\d/.test(mm[2]) ? "ol" : "ul";
        let text = mm[3], box = "";
        const cm = text.match(/^\[( |x)\]\s+(.*)$/);
        if (cm) { box = `<input type="checkbox" data-ck="${prefix}-${ck++}" aria-label="Marcar como estudado"> `; text = cm[2]; }
        while (stack.length && indent < stack[stack.length - 1].indent) { html += `</li></${stack.pop().tag}>`; }
        if (!stack.length || indent > stack[stack.length - 1].indent) { stack.push({ indent, tag }); html += `<${tag}${box ? ' class="ck"' : ""}><li>`; }
        else { html += "</li><li>"; }
        html += box + inline(text);
        i++;
      }
      while (stack.length) html += `</li></${stack.pop().tag}>`;
      html += "\n"; continue;
    }
    const buf = [l.trim()]; i++;
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|---|>|\s*\||\s*([-*]|\d+\.)\s)/.test(lines[i])) { buf.push(lines[i].trim()); i++; }
    html += `<p>${inline(buf.join(" "))}</p>\n`;
  }
  console.log(`${path.basename(file)}: ${html.length} chars, ${toc.length} secoes, ${ck} checkboxes, tabelas=${(html.match(/<table>/g) || []).length}, quizzes=${nq}`);
  return { title, html, toc };
}
const docs = { resumo: md2html(mdGuia, "resumo"), det: md2html(mdDet, "det"), aula1: md2html(mdA1, "aula1"), aula2: md2html(mdA2, "aula2") };
fs.writeFileSync(path.join(dir, "docs.js"), "window.DOCS = " + JSON.stringify(docs) + ";\n", "utf8");
if (fs.existsSync(path.join(dir, "resumo.js"))) fs.unlinkSync(path.join(dir, "resumo.js"));
console.log("banco.js e docs.js gerados.");
