// =============================================================================
// js/ui.js — Gestor de Interfaz: Notificaciones y Sonidos
// =============================================================================

class UIManager {
    constructor() {
        // Los sonidos se obtienen del DOM cuando estén disponibles
        this.sounds = {};
    }

    init() {
        // Mapear sonidos del DOM (ya existen en index.html)
        this.sounds = {
            correct:   document.getElementById('correct-sound'),
            incorrect: document.getElementById('incorrect-sound'),
            victory:   document.getElementById('victory-sound')
        };

        // Escuchar evento de monedas actualizadas (del SecuritySystem)
        document.addEventListener('coinsUpdated', function (e) {
            var displays = document.querySelectorAll('.coins-display');
            displays.forEach(function (d) { d.textContent = e.detail.amount; });
        });

        // Inicializar Security si está disponible
        if (typeof Security !== 'undefined') {
            Security.setCoins(Security.getCoins());
        }
    }

    playSound(soundName) {
        var snd = this.sounds[soundName];
        if (snd) {
            try { snd.currentTime = 0; snd.play().catch(function () {}); } catch (e) {}
        }
    }

    showNotification(title, message, type) {
        type = type || 'info';
        var notif = document.createElement('div');
        notif.className = 'notification ' + type;
        notif.innerHTML = '<strong>' + title + '</strong><br><span>' + message + '</span>';
        document.body.appendChild(notif);
        setTimeout(function () {
            notif.classList.add('fade-out');
            setTimeout(function () { notif.remove(); }, 500);
        }, 3000);
    }
}

const UI = new UIManager();

document.addEventListener('DOMContentLoaded', function () {
    UI.init();
    // NOTA: ShopUI no existe. La tienda usa el objeto Shop de js/shop.js directamente.
});
