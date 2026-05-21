// Bloque: Efectos
class EffectsSystem {
    constructor() {
        this.particlePool = [];
        this.container = document.createElement('div');
        this.container.id = 'vfx-layer';
        this.container.style.position = 'fixed';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100vw';
        this.container.style.height = '100vh';
        this.container.style.pointerEvents = 'none';
        this.container.style.zIndex = '9999';
        
        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(this.container);
        });
    }

    spawnParticles(x, y, count = 10, color = '#ffcc00', type = 'normal') {
        for(let i=0; i<count; i++) {
            const particle = document.createElement('div');
            particle.className = `particle ${type}`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 50 + 20;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity - 20;
            
            particle.style.setProperty('--vx', `${vx}px`);
            particle.style.setProperty('--vy', `${vy}px`);
            
            this.container.appendChild(particle);
            
            setTimeout(() => {
                if(particle.parentNode) particle.remove();
            }, 1000);
        }
    }

    playAura(type) {
        const body = document.body;
        body.classList.remove('aura-cosmic', 'aura-inferno', 'aura-divine');
        body.classList.add(`aura-${type}`);
        
        setTimeout(() => {
            body.classList.remove(`aura-${type}`);
        }, 3000);
    }
}

const Effects = new EffectsSystem();
