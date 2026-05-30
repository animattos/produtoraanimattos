const DATA = {
  "PEPÊ": {
    title: "PEPÊ",
    description: `coloca esse personagem na pose do rascunho, não seguir os traços do rascunho e apenas seguir a pose fiel mostrada no rascunho.

Um filhote de javali com um estilo cartoon super carismático e expressivo.

Características Físicas e Cores
• Corpo Baby: Ele segue a estética "chibi" ou "baby", com uma cabeça proporcionalmente grande, corpo redondo e rechonchudo, e membros curtos.
• Bípede: O design o representa ficando em pé nas duas patas traseiras, podendo também andar em quatro patas.
• Focinho: Possui um focinho de porco proeminente e rosado.
• Presas: Pequenos dentes-de-sabre arredondados.
• Paleta de Cores Marrons: tons de marrom quente e ferrugem; barriga e interior das orelhas em creme/bege.
• Cabelo Escuro: topete e crina marrom muito escuro.
• Textura: leve granulada nas áreas de sombra.
• Olhos Grandes e Expressivos: íris âmbar/marrom-avermelhada.
• Orelhas Pontudas, Cauda Curta, Traços com line art limpa.
Ilustração: estilo cartoon infantil, traços limpos, cores chapadas com nuances, acabamento suave e texturizado.`,
    image: "imagens/bichos/pepe.jpg"
  },
 



  "SASÁ": {
    title: "SASÁ",
    description: `AÇÃO - coloca essa personagem na pose do rascunho, não seguir os traços do rascunho e apenas seguir a pose fiel mostrada no rascunho.

Uma filhote de leopardo (ou jaguar) com um estilo cartoon super carismático e expressivo.

Características Físicas
• Coloração: O corpo tem um tom vibrante de laranja dourado, com o peito, a barriga e o focinho em um tom creme/bege mais claro. Algumas leves texturas nos pontos de sombreamentos para uma sensação tátil, de desenho à mão.
• Padrão de Pintas: Possui manchas arredondadas em marrom escuro distribuídas de forma harmônica pela cabeça, braços, pernas e cauda.
• Olhos: São grandes e expressivos, com íris na cor verde esmeralda e cílios delicados, o que confere uma aparência amigável e juvenil.
• Orelhas: Arredondadas, com o interior em tom de rosa e a borda externa marrom, combinando com as manchas.
• Sorriso: O sorriso sempre mostra as pequenas presas e a língua, junto com as bochechas levemente rosadas.
• Traços: O contorno é feito com linhas firmes e limpas; há um pequeno tufo de pelos no topo da cabeça e detalhes de pelagem nas laterais do rosto e no peito.
• Anatomia: Segue o estilo chibi/antropomórfico (fica de pé em duas patas), com mãos e pés grandes e arredondados; formas arredondadas e amigáveis.
Ilustração infantil digital vibrante e dinâmica no estilo cartoon, traços limpos, arte final precisa e cores chapadas com nuances; acabamento suave e texturizado, lembrando "classic storybook illustration".`,
    image: "imagens/bichos/sasa.jpg"
  },



  "ONÇA": {
    title: "ONÇA",
    description: `AÇÃO - coloca essa personagem na pose do rascunho, não seguir os traços do rascunho e apenas seguir a pose fiel mostrada no rascunho.

Uma filhote de leopardo (ou jaguar) com um estilo cartoon super carismático e expressivo.

Características Físicas
• Coloração: O corpo tem um tom vibrante de laranja dourado, com o peito, a barriga e o focinho em um tom creme/bege mais claro. Algumas leves texturas nos pontos de sombreamentos para uma sensação tátil, de desenho à mão.
• Padrão de Pintas: Possui manchas arredondadas em marrom escuro distribuídas de forma harmônica pela cabeça, braços, pernas e cauda.
• Olhos: São grandes e expressivos, com íris na cor verde esmeralda e cílios delicados, o que confere uma aparência amigável e juvenil.
• Orelhas: Arredondadas, com o interior em tom de rosa e a borda externa marrom, combinando com as manchas.
• Sorriso: O sorriso sempre mostra as pequenas presas e a língua, junto com as bochechas levemente rosadas.
• Traços: O contorno é feito com linhas firmes e limpas; há um pequeno tufo de pelos no topo da cabeça e detalhes de pelagem nas laterais do rosto e no peito.
• Anatomia: Segue o estilo chibi/antropomórfico (fica de pé em duas patas), com mãos e pés grandes e arredondados; formas arredondadas e amigáveis.
Ilustração infantil digital vibrante e dinâmica no estilo cartoon, traços limpos, arte final precisa e cores chapadas com nuances; acabamento suave e texturizado, lembrando "classic storybook illustration".`,
    image: "imagens/bichos/sasa.jpg"
  }
};








const qInput = document.getElementById('query');
const actionInput = document.getElementById('action');
const btnSearch = document.getElementById('btnSearch');
const resultEl = document.getElementById('result');
const titleEl = document.getElementById('resultTitle');
const descEl = document.getElementById('resultDesc');
const imgEl = document.getElementById('resultImage');
const btnCopyImage = document.getElementById('btnCopyImage');
const btnCopyText = document.getElementById('btnCopyText');
const searchRows = document.querySelectorAll('.search-row'); // rows to hide when showing results

// normalize
function norm(s){ return String(s || "").trim().toUpperCase(); }

// compose description: if user provided action, prefix it with "AÇÃO - " and then the base description
function composeDescription(entry){
  const base = entry.description || "";
  const action = (actionInput && actionInput.value || "").trim();
  if(action){
    return `AÇÃO - ${action}\n\n${base}`;
  }
  // if no custom action, include original base (which already described action in some entries)
  return base;
}

function hideSearchRows(){
  searchRows.forEach(r => r.classList.add('hidden'));
}
function showSearchRows(){
  searchRows.forEach(r => r.classList.remove('hidden'));
}

function showResult(entry){
  titleEl.textContent = entry.title;
  descEl.textContent = composeDescription(entry);

  // ensure path is URI-encoded (handles spaces/accents) and provide a safe fallback
  try {
    // Request image with anonymous CORS so we can draw to canvas as a fallback if fetch fails
    imgEl.crossOrigin = 'anonymous';
    imgEl.src = encodeURI(entry.image || '/modelsheet.jpg');
  } catch (e) {
    imgEl.crossOrigin = 'anonymous';
    imgEl.src = '/modelsheet.jpg';
  }
  imgEl.alt = entry.title;

  // if image fails to load, use the modelsheet fallback (guaranteed asset)
  imgEl.onerror = () => {
    if (!imgEl.src.endsWith('/modelsheet.jpg')) {
      imgEl.crossOrigin = 'anonymous';
      imgEl.src = '/modelsheet.jpg';
      imgEl.alt = entry.title + ' (imagem não disponível)';
    }
  };

  // hide the search inputs while showing the result
  hideSearchRows();
  resultEl.classList.remove('hidden');
}

// search handler
function search(){
  const key = norm(qInput.value);
  if(!key) return;
  const entry = DATA[key];
  if(entry){
    showResult(entry);
  } else {
    titleEl.textContent = "Nenhum resultado";
    descEl.textContent = `Nenhum item pré-cadastrado com o nome "${qInput.value}". Tente: PEPÊ, JAVALI, PORCO.`;
    imgEl.src = "";
    imgEl.alt = "sem imagem";
    // hide search rows even for "no result" to match behaviour
    hideSearchRows();
    resultEl.classList.remove('hidden');
  }
}

// reset search to allow a new search after copy
function resetSearch(){
  qInput.value = "";
  if(actionInput) actionInput.value = "";
  qInput.focus();
  // show search inputs again and clear result
  showSearchRows();
  resultEl.classList.add('hidden');
  titleEl.textContent = "";
  descEl.textContent = "";
  imgEl.src = "";
  imgEl.alt = "";
}

/* copy text-only */
async function copyTextOnly(){
  const title = titleEl.textContent || "";
  const text = title + "\n\n" + descEl.textContent;
  try{
    await navigator.clipboard.writeText(text);
    flashButton(btnCopyText, "Copiado");
    // clear and prepare for new search after a short delay
    setTimeout(() => resetSearch(), 600);
  }catch(e){
    console.error("copyTextOnly failed", e);
    flashButton(btnCopyText, "Erro");
  }
}

/* copy image-only */
async function copyImageOnly(){
  if(!imgEl.src) return flashButton(btnCopyImage, "Sem imagem");

  // Try fetch -> clipboard first. If that fails (CORS or fetch error), try canvas fallback.
  try{
    // Attempt to fetch the image (works for same-origin or permissive CORS)
    const resp = await fetch(imgEl.src, { mode: 'cors' });
    if (!resp.ok) throw new Error('fetch failed ' + resp.status);
    const blob = await resp.blob();

    // Try writing to clipboard
    if (navigator.clipboard && window.ClipboardItem) {
      const clipboardItem = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([clipboardItem]);
      flashButton(btnCopyImage, "Copiado");
      setTimeout(() => resetSearch(), 600);
      return;
    } else {
      // If ClipboardItem not available, fall through to canvas fallback
      throw new Error('Clipboard API not fully supported');
    }
  }catch(fetchErr){
    // fallback: draw image into canvas and export blob (works if image loaded with crossOrigin='anonymous')
    try{
      const canvas = document.createElement('canvas');
      const w = imgEl.naturalWidth || imgEl.width;
      const h = imgEl.naturalHeight || imgEl.height;
      if(!w || !h) throw new Error('imagem não carregada');

      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imgEl, 0, 0, w, h);

      const blob = await new Promise((res, rej) => {
        canvas.toBlob(b => b ? res(b) : rej(new Error('toBlob falhou')), 'image/png');
      });

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
        flashButton(btnCopyImage, "Copiado");
        setTimeout(() => resetSearch(), 600);
        return;
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        // as a last resort, copy a data URL as text so the user can paste it (some apps accept)
        const dataUrl = await new Promise((res) => {
          const tmp = document.createElement('canvas');
          tmp.width = canvas.width; tmp.height = canvas.height;
          tmp.getContext('2d').drawImage(canvas,0,0);
          res(tmp.toDataURL('image/png'));
        });
        await navigator.clipboard.writeText(dataUrl);
        flashButton(btnCopyImage, "Copiado");
        setTimeout(() => resetSearch(), 600);
        return;
      } else {
        throw new Error('Clipboard not supported');
      }
    }catch(fallbackErr){
      console.warn("copyImageOnly failed (fetchErr, fallbackErr):", fetchErr, fallbackErr);
      flashButton(btnCopyImage, "Erro");
    }
  }
}

// small UI feedback
function flashButton(button, text){
  const prev = button.textContent;
  button.textContent = text;
  button.disabled = true;
  setTimeout(()=>{ button.textContent = prev; button.disabled = false; }, 1400);
}

function escapeHtml(s){
  return (s||'').replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

// events
btnSearch.addEventListener('click', search);
qInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter') search(); });
btnCopyImage.addEventListener('click', copyImageOnly);
btnCopyText.addEventListener('click', copyTextOnly);

// start with empty input
qInput.value = "";
actionInput.value = "";