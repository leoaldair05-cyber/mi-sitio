// ==================== BOTONES DONAR ====================
const donateBtn1 = document.getElementById('toDonate');
if (donateBtn1) {
  donateBtn1.addEventListener('click', () => {
    window.location.href = "donaciones.html";
  });
}

const donateBtn2 = document.getElementById('toDonate2');
if (donateBtn2) {
  donateBtn2.addEventListener('click', () => {
    window.location.href = "donaciones.html";
  });
}

// ==================== ACORDEÓN ====================
const accordionItems = document.querySelectorAll('.acc-item[data-acc]');

accordionItems.forEach(item => {
  const head = item.querySelector('.acc-head');
  
  head.addEventListener('click', () => {
    // Si ya está activo, cerrar
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    } else {
      // Cerrar todos los demás
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      // Abrir el clickeado
      item.classList.add('active');
    }
  });
});

// ==================== BOTONES DE MONTO RÁPIDO ====================
const amountButtons = document.querySelectorAll('.amount-btn');
const amountInput = document.getElementById('donAmount');

if (amountButtons.length > 0 && amountInput) {
  amountButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover selección de todos los botones
      amountButtons.forEach(b => b.classList.remove('selected'));
      
      // Seleccionar el botón clickeado
      btn.classList.add('selected');
      
      // Actualizar el valor del input
      const amount = btn.dataset.amount;
      amountInput.value = amount;
    });
  });
  
  // Si el usuario escribe manualmente, deseleccionar botones
  amountInput.addEventListener('input', () => {
    amountButtons.forEach(b => b.classList.remove('selected'));
  });
}

// ==================== FORMULARIO DE DONACIÓN ====================
const donateButton = document.getElementById("donateBtn");
if (donateButton) {
  donateButton.addEventListener("click", () => {
    const name = document.getElementById("donorName").value.trim();
    const email = document.getElementById("donorEmail").value.trim();
    const amount = Number(document.getElementById("donAmount").value);
    const campaign = document.getElementById("campaignSelect").value;
    const isMonthly = document.getElementById("monthlyDonation")?.checked || false;

    // Validación
    if (!name || amount <= 0) {
      alert("Por favor ingresa un nombre y un monto válido (mínimo $10).");
      return;
    }

    if (amount < 10) {
      alert("El monto mínimo de donación es de $10 pesos.");
      return;
    }

    // Mensaje de agradecimiento
    const originalText = donateButton.textContent;
    donateButton.textContent = isMonthly ? "¡Gracias por tu compromiso mensual! 💙" : "¡Gracias por tu donación! 🙏";
    donateButton.disabled = true;
    
    // Mostrar alert con más información
    setTimeout(() => {
      alert(`¡Muchas gracias ${name}! 🙏\n\nTu donación de $${amount.toLocaleString()} MXN para ${getCampaignName(campaign)} ha sido registrada.\n\n${isMonthly ? '✅ Donación mensual activada' : ''}\n\nRecibirás un correo de confirmación en ${email || 'tu correo'}.\n\n💙 Cada peso cuenta para llevar agua limpia a quienes más lo necesitan.`);
      
      // Resetear formulario
      document.getElementById("donationForm").reset();
      
      // Restaurar botón
      donateButton.textContent = originalText;
      donateButton.disabled = false;
      
      // Deseleccionar botones de monto
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
    }, 1500);
  });
}

// Función auxiliar para nombres de campaña
function getCampaignName(campaign) {
  const names = {
    'filtros': 'Filtros comunitarios',
    'pozos': 'Reparación de pozos',
    'educacion': 'Programas educativos',
    'captacion': 'Captación pluvial',
    'analisis': 'Análisis de calidad',
    'reforestacion': 'Reforestación',
    'donde-mas-se-necesite': 'Donde más se necesite'
  };
  return names[campaign] || campaign;
}

// ==================== BOTÓN LIMPIAR ====================
const clearButton = document.getElementById("clearBtn");
if (clearButton) {
  clearButton.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que quieres limpiar el formulario?")) {
      document.getElementById("donationForm").reset();
      // Deseleccionar botones de monto
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
    }
  });
}

// ==================== ANIMACIÓN AL CARGAR ====================
document.addEventListener('DOMContentLoaded', () => {
  // Animar cards al aparecer
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 50);
  });
});