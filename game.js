// =============================================================================
// js/game.js — Motor del juego (stub de compatibilidad)
// =============================================================================
// NOTA: La lógica principal del juego está en el script inline de index.html.
// Este archivo existe para que el sistema de carga no falle, pero NO registra
// listeners adicionales para evitar la doble ejecución de acciones del juego.
//
// Si deseas mover la lógica del juego a este archivo en el futuro, descomenta
// y adapta el código. Por ahora es intencionalmente un stub vacío.
// =============================================================================

// Referencia global vacía (por si algo externo llama a Game.*)
window.Game = window.Game || {
    start:       function() {},
    checkAnswer: function() {},
    nextLevel:   function() {},
    gameOver:    function() {},
    returnToMenu:function() {}
};
