// script.js
const API_BASE = "http://127.0.0.1:8000";
// const API_BASE = ""; // empty = same host. set to "http://127.0.0.1:8000" if serving from different origin
const runBtn = document.getElementById("runBtn");
const healthBtn = document.getElementById("healthBtn");
const healthStatus = document.getElementById("healthStatus");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const status = document.getElementById("status");
const responsesContainer = document.getElementById("responsesContainer");
const panels = document.getElementById("panels");
const summaryCard = document.getElementById("summaryCard");
const summaryText = document.getElementById("summaryText");
const topPerformer = document.getElementById("topPerformer");
const uniqueDomains = document.getElementById("uniqueDomains");
const totalCitations = document.getElementById("totalCitations");
const avgResponse = document.getElementById("avgResponse");
const exportBtn = document.getElementById("exportBtn");

const domainsChartCtx = document.getElementById("domainsChart").getContext("2d");
const modelsChartCtx = document.getElementById("modelsChart").getContext("2d");
let domainsChart = null;
let modelsChart = null;

function setProgress(p) {
  progress.classList.remove("hidden");
  progressBar.style.width = `${p}%`;
  if (p >= 100) {
    setTimeout(()=>progress.classList.add("hidden"), 400);
  }
}

function setStatus(text, danger = false) {
  status.textContent = text;
  status.style.color = danger ? "#ff8b8b" : "var(--muted)";
}

// read selected models from checkboxes
function getSelectedModels() {
  const boxes = document.querySelectorAll(".models input[type=checkbox]");
  return Array.from(boxes).filter(b => b.checked).map(b => b.value);
}

// simple helper to pretty-print long text
function createResponseCard(model, text) {
  const wrap = document.createElement("div");
  wrap.className = "response";
  const title = document.createElement("div");
  title.className = "model-title";
  title.innerText = model;
  const pre = document.createElement("pre");
  pre.style.whiteSpace = "pre-wrap";
  pre.style.margin = "0";
  pre.textContent = text;
  wrap.appendChild(title);
  wrap.appendChild(pre);
  return wrap;
}

// tab switching
document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.addEventListener("click",(e)=>{
    document.querySelectorAll(".tab-btn").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".tab-content").forEach(c=>c.classList.remove("active"));
    const id = btn.dataset.tab;
    document.getElementById(id).classList.add("active");
  });
});

// health check
healthBtn.addEventListener("click", async ()=>{
  setStatus("Checking backend...");
  try{
    const res = await fetch(`${API_BASE}/api/health`);
    if (!res.ok) {
      healthStatus.textContent = "✖️ Not found";
      healthStatus.style.background = "rgba(255,0,0,0.06)";
      setStatus("Backend health check failed", true);
      return;
    }
    const data = await res.json();
    healthStatus.textContent = data.status || "ok";
    healthStatus.style.background = "rgba(34,197,94,0.06)";
    setStatus("Backend reachable");
  }catch(err){
    healthStatus.textContent = "✖️ Offline";
    healthStatus.style.background = "rgba(255,0,0,0.06)";
    setStatus("Backend offline or CORS blocked", true);
  }
});

// main run button
runBtn.addEventListener("click", async ()=>{
  const prompt = document.getElementById("prompt").value.trim();
  const models = getSelectedModels();
  const targetDomain = document.getElementById("targetDomain").value.trim();

  if (!prompt) { setStatus("Please enter a prompt", true); return; }
  if (!models.length) { setStatus("Select at least one model", true); return; }

  // UI prep
  responsesContainer.innerHTML = "";
  panels.classList.remove("hidden");
  summaryCard.classList.add("hidden");
  document.getElementById("topMetrics").classList.add("hidden");
  setStatus("Querying models...");
  setProgress(5);
  exportBtn.disabled = true;

  try{
    // 1) Query backend AI endpoint
    setProgress(10);
    const qRes = await fetch(`${API_BASE}/api/ai/query`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ prompt, models })
    });

    if (!qRes.ok) {
      const txt = await qRes.text();
      setStatus(`AI query failed: ${qRes.status} ${txt}`, true);
      setProgress(0);
      return;
    }

    const qJson = await qRes.json();
    const responses = qJson.responses || {};
    setProgress(45);
    setStatus("Analyzing responses...");

    // show raw responses
    const container = responsesContainer;
    for (const [model, text] of Object.entries(responses)) {
      container.appendChild(createResponseCard(model, text));
    }

    // 2) Ask analysis metrics
    const mRes = await fetch(`${API_BASE}/api/analysis/metrics`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ responses })
    });
    if (!mRes.ok) {
      setStatus("Metrics computation failed", true);
      setProgress(0);
      return;
    }
    const metricsJson = await mRes.json();
    setProgress(70);
    setStatus("Preparing visualizations...");

    // 3) If user provided targetDomain, compute GEO score
    let geoScore = null;
    if (targetDomain) {
      // build global_counts by aggregating per-model domains if available on backend
      // backend's /api/analysis may or may not return global_domains; if not, frontend skips GEO.
      const global_counts = metricsJson.global_domains || {}; // backend may include this
      if (Object.keys(global_counts).length) {
        const gRes = await fetch(`${API_BASE}/api/geo/score`, {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({ global_counts, target_domain: targetDomain, total_models: models.length })
        });
        if (gRes.ok) {
          const gJson = await gRes.json();
          geoScore = gJson.geo_score;
        }
      }
    }

    // Populate summary, top metrics
    // try to read fields produced by analyzer_service: metrics, rankings, global_domains, citations, summary, insights
    const metrics = metricsJson.metrics || metricsJson; // some backends might return direct metrics
    const rankings = metricsJson.rankings || [];
    const global_domains = metricsJson.global_domains || {};
    const citations = metricsJson.citations || {};

    // Top metrics UI
    summaryCard.classList.remove("hidden");
    document.getElementById("summaryText").innerText = metricsJson.summary || "Summary not provided by backend.";
    document.getElementById("topPerformer").innerText = (rankings[0] && rankings[0][0]) ? `${rankings[0][0]} (${rankings[0][1]}%)` : "N/A";
    document.getElementById("uniqueDomains").innerText = Object.keys(global_domains).length || "0";
    document.getElementById("totalCitations").innerText = Object.values(citations).reduce((a,b)=>a+(b||0),0) || "0";
    const avgLen = metrics && Object.keys(metrics).length ? Math.round(Object.values(metrics).reduce((s,m)=>s+(m.response_length||0),0) / Object.keys(metrics).length) : 0;
    document.getElementById("avgResponse").innerText = `${avgLen} chars`;

    // Show metrics table
    document.getElementById("metricsTableWrap").innerHTML = createMetricsTableHTML(metrics);

    // Charts: domains chart (top 12)
    const domPairs = Object.entries(global_domains || {}).sort((a,b)=>b[1]-a[1]).slice(0,12);
    const domLabels = domPairs.map(d=>d[0]);
    const domValues = domPairs.map(d=>d[1]);
    if (domainsChart) domainsChart.destroy();
    domainsChart = new Chart(domainsChartCtx, {
      type: 'bar',
      data:{ labels: domLabels, datasets:[{label:'Mentions', data:domValues, backgroundColor: 'rgba(107,124,255,0.9)'}] },
      options:{ responsive:true, plugins:{legend:{display:false}}}
    });

    // Models chart: visibility score per model
    const modelLabels = Object.keys(metrics || {});
    const modelScores = modelLabels.map(m=>metrics[m].visibility_score || 0);
    if (modelsChart) modelsChart.destroy();
    modelsChart = new Chart(modelsChartCtx, {
      type:'bar',
      data:{ labels: modelLabels, datasets:[{label:'Visibility Score', data:modelScores, backgroundColor:'rgba(34,197,94,0.9)'}] },
      options:{ responsive:true, plugins:{legend:{display:false}}, scales:{ y:{ beginAtZero:true, max:100 }} }
    });

    setProgress(100);
    setStatus("Analysis complete");
    exportBtn.disabled = false;

    // store last result for export
    window._LAST_RESULT = { prompt, targetDomain, models, responses, metricsJson, geoScore };
  }catch(err){
    console.error(err);
    setStatus("Unexpected error: " + err.message, true);
    setProgress(0);
  }
});

function createMetricsTableHTML(metrics){
  if(!metrics || !Object.keys(metrics).length) return "<div class='muted'>No metrics returned</div>";
  let html = "<table style='width:100%;border-collapse:collapse'><thead><tr><th style='text-align:left;padding:8px;opacity:0.7'>Model</th><th style='padding:8px'>Response Length</th><th style='padding:8px'>Domain Mentions</th><th style='padding:8px'>Unique Domains</th><th style='padding:8px'>Visibility</th></tr></thead><tbody>";
  for(const [model,data] of Object.entries(metrics)){
    html += `<tr style='border-top:1px solid rgba(255,255,255,0.03)'><td style='padding:8px'>${model}</td><td style='padding:8px;text-align:center'>${data.response_length||0}</td><td style='padding:8px;text-align:center'>${data.domain_count||0}</td><td style='padding:8px;text-align:center'>${data.unique_domains||0}</td><td style='padding:8px;text-align:center'>${data.visibility_score||0}%</td></tr>`;
  }
  html += "</tbody></table>";
  return html;
}

// export button
exportBtn.addEventListener("click", ()=>{
  if(!window._LAST_RESULT) return;
  const data = JSON.stringify(window._LAST_RESULT, null, 2);
  const blob = new Blob([data], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "geo_analysis.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});
