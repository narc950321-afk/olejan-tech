const WHATSAPP_NUMBER = "573103725246";
const itemConfig = {
  forro: { label: "Forro para celular", icon: "▣", check: "check-forro", detail: () => document.querySelector("#case-color").value },
  audifonos: { label: "Audífonos inalámbricos", icon: "◉", check: "check-audifonos", detail: () => document.querySelector("#buds-color").value },
  smartwatch: { label: "Smartwatch", icon: "◫", check: "check-smartwatch", detail: () => document.querySelector("#watch-color").value },
  vidrio: { label: "Vidrio protector", icon: "◇", check: "check-vidrio", detail: () => "Transparente" }
};
const phoneModel = document.querySelector("#phone-model"), summaryList = document.querySelector("#summary-list"), chips = document.querySelector("#selection-chips"), modelSummary = document.querySelector("#model-summary"), actionMessage = document.querySelector("#action-message");
const selectedItems = () => Object.entries(itemConfig).filter(([, item]) => document.querySelector(`#${item.check}`).checked);

function updateCombo() {
  const selected = selectedItems();
  document.querySelector("#item-count").textContent = `${selected.length} ${selected.length === 1 ? "producto" : "productos"}`;
  modelSummary.textContent = phoneModel.value.trim() || "Sin especificar";
  summaryList.innerHTML = selected.map(([key, item]) => `<div class="summary-item"><span class="summary-icon">${item.icon}</span><div><strong>${item.label}</strong><small>${item.detail()}</small></div><button type="button" data-remove="${key}" aria-label="Quitar ${item.label}">×</button></div>`).join("") || '<div class="summary-item"><strong>No has seleccionado productos</strong></div>';
  chips.innerHTML = selected.map(([key, item]) => `<span class="chip">${item.label}: ${item.detail()} <button type="button" data-remove="${key}" aria-label="Quitar">×</button></span>`).join("");
  Object.keys(itemConfig).forEach(key => { const checked = document.querySelector(`#${itemConfig[key].check}`).checked; document.querySelector(`[data-item="${key}"]`).classList.toggle("selected", checked); document.querySelector(`[data-preview="${key}"]`).classList.toggle("hidden", !checked); });
  document.querySelector(".empty-combo").hidden = selected.length > 0;
}
document.querySelectorAll('.option-card input[type="checkbox"], .option-card select').forEach(control => control.addEventListener("change", updateCombo));
phoneModel.addEventListener("input", updateCombo);
document.addEventListener("click", event => { const key = event.target.dataset.remove; if (key) { document.querySelector(`#${itemConfig[key].check}`).checked = false; updateCombo(); } });

function validateModel(){if(phoneModel.value.trim())return true;phoneModel.classList.add("field-error");phoneModel.focus();actionMessage.textContent="Escribe el modelo del celular para preparar el combo correcto.";setTimeout(()=>phoneModel.classList.remove("field-error"),700);return false}
function comboMessage(){const list=selectedItems().map(([,item])=>`• ${item.label}: ${item.detail()}`).join("\n");return `Hola OLEJAN TECH, quiero cotizar este combo:\n\n${list}\n\nModelo del celular: ${phoneModel.value.trim()}\nPrecio por confirmar.`}
document.querySelector("#quote-combo").addEventListener("click",()=>{if(!validateModel())return;window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(comboMessage())}`,"_blank","noopener,noreferrer")});
document.querySelectorAll("[data-whatsapp]").forEach(link=>link.addEventListener("click",event=>{event.preventDefault();window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola OLEJAN TECH, quiero información sobre sus productos.")}`,"_blank","noopener,noreferrer")}));
const menuButton=document.querySelector(".menu-button"),nav=document.querySelector(".header nav");menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open))});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));updateCombo();
const catalogTrack=document.querySelector("#catalog-track");
catalogTrack.scrollLeft=0;
document.querySelector("#catalog-previous").addEventListener("click",()=>catalogTrack.scrollBy({left:-220,behavior:"smooth"}));
document.querySelector("#catalog-next").addEventListener("click",()=>catalogTrack.scrollBy({left:220,behavior:"smooth"}));
document.querySelectorAll("[data-go-to]").forEach(card=>card.addEventListener("click",()=>{const target=document.querySelector(`[data-item="${card.dataset.goTo}"]`);target.scrollIntoView({behavior:"smooth",block:"center"});target.classList.add("catalog-highlight");setTimeout(()=>target.classList.remove("catalog-highlight"),1200)}));
