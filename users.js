// Bloque: Usuarios
const Users = {
    current: null,
    data: null,

    init() {
        const sel = document.getElementById('player-name-input');
        if (sel) sel.addEventListener('change', e => this.load(e.target.value));
    },

    load(name) {
        if (!name) { this.current = null; this.data = null; this._hideHUD(); return; }
        this.current = name;
        this.data = Storage.getUser(name);

        if (this.data.equippedBanner === 'royal_zenith' || this.data.equippedBanner === 'celestial_king') {
            const rows = Storage.getLeaderboard ? Storage.getLeaderboard() : [];
            const isTop1 = rows.length > 0 && rows[0].name === name;
            const actuallyOwned = (this.data.ownedBanners || []).includes(this.data.equippedBanner);
            if (!isTop1 && !actuallyOwned) {
                this.data.equippedBanner = null;
                this.save();
            }
        }

        this._showHUD();
        this._updateHUD();
        this._showPreview();
    },

    save() {
        if (this.current) Storage.saveUser(this.current, this.data);
    },

    addCoins(n) {
        if (!this.data) return;
        let newCoins = (this.data.coins || 0) + n;
        if (newCoins > 3000) {
            console.warn("Anti-Cheat: Coins capped at 3000.");
            newCoins = 3000;
        }
        this.data.coins = Math.max(0, newCoins);
        this.save();
        this._updateHUD();
    },

    updateHighScore(s) {
        if (!this.data) return;
        if (s > 3000) {
            console.warn("Anti-Cheat: Score capped at 3000.");
            s = 3000;
        }
        if (s > (this.data.highScore || 0)) {
            this.data.highScore = s;
            this.save();
        }
    },

    equipBanner(id) {
        if (!this.data) return;
        const rows = Storage.getLeaderboard ? Storage.getLeaderboard() : [];
        const isTop1 = rows.length > 0 && rows[0].name === this.current;
        const isTopBanner = id === 'royal_zenith' || id === 'celestial_king';
        const canEquip = (this.data.ownedBanners || []).includes(id) || (isTopBanner && isTop1);
        if (!canEquip) return;

        this.data.equippedBanner = id;
        this.save();
        this._updateHUD();
        this._applyBannerToName();
    },

    unequipBanner() {
        if (!this.data) return;
        this.data.equippedBanner = null;
        this.save();
        this._updateHUD();
        this._applyBannerToName();
    },

    buyBanner(id) {
        if (!this.data) return false;
        const b = getBanner(id);
        if (!b) return false;
        if ((this.data.ownedBanners || []).includes(id)) return false;
        if (this.data.coins < b.price) return false;
        this.data.coins -= b.price;
        this.data.ownedBanners = this.data.ownedBanners || [];
        this.data.ownedBanners.push(id);
        this.save();
        this._updateHUD();
        return true;
    },

    _showHUD() {
        const h = document.getElementById('shop-hud');
        if (h) h.style.display = 'flex';
    },
    _hideHUD() {
        const h = document.getElementById('shop-hud');
        if (h) h.style.display = 'none';
    },
    _updateHUD() {
        const c = document.getElementById('hud-coins-val');
        if (c && this.data) c.textContent = this.data.coins;
    },
    _showPreview() {
        const data = this.data;
        if (!data) return;
        const c = document.getElementById('card-coins-val');
        if (c) c.textContent = data.coins || 0;
        const s = document.getElementById('card-score-val');
        if (s) s.textContent = data.highScore || 0;
        const bp = document.getElementById('card-banner-preview');
        if (bp) {
            bp.innerHTML = '';
            if (data.equippedBanner && typeof getBanner === 'function') {
                const bn = getBanner(data.equippedBanner);
                if (bn) {
                    const sp = document.createElement('span');
                    sp.className = bn.css;
                    sp.style.fontSize = '0.9em';
                    sp.textContent = this.current;
                    bp.appendChild(document.createTextNode('🎖 '));
                    bp.appendChild(sp);
                }
            }
        }
    },
    _applyBannerToName() {
        const nameSpan = document.getElementById('player-name-display');
        if (!nameSpan || !this.data) return;
        nameSpan.className = '';
        if (this.data.equippedBanner) {
            const b = getBanner(this.data.equippedBanner);
            if (b) nameSpan.className = b.css;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => Users.init());
